
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Exercise } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

export type ExerciseType = {
  id: string;
  nom: string;
  description: string | null;
  type: string;
  valeur_cible: number;
  image_url: string | null;
  video_url: string | null;
  categorie: string | null;
};

// Transformer les données Supabase en format d'exercice pour notre application
const mapSupabaseToExerciseFormat = (
  item: ExerciseType, 
  progression?: { valeur_realisee: number, termine: boolean }
): Exercise => {
  const isReps = item.type === 'repetition';
  
  return {
    id: item.id,
    name: item.nom,
    description: item.description || undefined,
    type: isReps ? "reps" : "duration",
    [isReps ? "reps" : "duration"]: item.valeur_cible,
    completed: progression ? progression.valeur_realisee : 0,
    image: item.image_url || undefined,
    video: item.video_url || undefined
  };
};

export const useDailyExercises = (programId?: string, dayNumber?: number) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["dailyExercises", programId, dayNumber, user?.id],
    queryFn: async () => {
      if (!programId || !dayNumber || !user) {
        return [];
      }

      console.log(`Fetching exercises for program ${programId}, day ${dayNumber}`);
      
      try {
        // 1. Trouver l'ID du jour correspondant au numéro de jour et au programme
        const { data: jourData, error: jourError } = await supabase
          .from("jours")
          .select("id")
          .eq("programme_id", programId)
          .eq("numero_jour", dayNumber)
          .single();

        if (jourError) {
          console.error("Error fetching day:", jourError);
          throw jourError;
        }

        if (!jourData) {
          console.warn(`No day found for program ${programId}, day ${dayNumber}`);
          return [];
        }

        const jourId = jourData.id;
        
        // 2. Récupérer tous les exercices pour ce jour
        const { data: exercicesData, error: exercicesError } = await supabase
          .from("exercices")
          .select("*")
          .eq("jour_id", jourId)
          .order("ordre");

        if (exercicesError) {
          console.error("Error fetching exercises:", exercicesError);
          throw exercicesError;
        }

        if (!exercicesData || exercicesData.length === 0) {
          console.warn(`No exercises found for day ${dayNumber}`);
          return [];
        }

        // 3. Récupérer la progression de l'utilisateur pour ces exercices
        const { data: progressionData, error: progressionError } = await supabase
          .from("progression_exercice")
          .select("*")
          .eq("user_id", user.id)
          .in("exercice_id", exercicesData.map(ex => ex.id));

        if (progressionError) {
          console.error("Error fetching progression:", progressionError);
          // Ne pas échouer ici, on peut continuer sans la progression
        }

        const progressionMap = (progressionData || []).reduce((acc, curr) => {
          acc[curr.exercice_id] = curr;
          return acc;
        }, {} as Record<string, any>);

        // 4. Mapper les exercices avec leur progression
        const exercises = exercicesData.map((exercice: ExerciseType) => {
          const progression = progressionMap[exercice.id];
          return mapSupabaseToExerciseFormat(exercice, progression);
        });

        console.log(`Found ${exercises.length} exercises for day ${dayNumber}`);
        return exercises;
      } catch (err) {
        console.error("Error in useDailyExercises:", err);
        throw err;
      }
    },
    enabled: !!programId && !!dayNumber && !!user,
    retry: 1,
    refetchOnWindowFocus: false
  });
};

// Hook pour mettre à jour la progression d'un exercice
export const updateExerciseProgress = async (
  userId: string, 
  exerciseId: string, 
  value: number,
  dayNumber: number
) => {
  try {
    // Vérifier d'abord si une entrée existe déjà
    const { data: existingData, error: checkError } = await supabase
      .from("progression_exercice")
      .select("*")
      .eq("user_id", userId)
      .eq("exercice_id", exerciseId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // Pas d'erreur si aucun résultat
      console.error("Error checking exercise progression:", checkError);
      throw checkError;
    }

    if (existingData) {
      // Mettre à jour l'entrée existante
      const { error: updateError } = await supabase
        .from("progression_exercice")
        .update({
          valeur_realisee: value,
          termine: value >= existingData.valeur_cible,
        })
        .eq("id", existingData.id);

      if (updateError) {
        console.error("Error updating exercise progression:", updateError);
        throw updateError;
      }
    } else {
      // Créer une nouvelle entrée
      const { error: insertError } = await supabase
        .from("progression_exercice")
        .insert({
          user_id: userId,
          exercice_id: exerciseId,
          valeur_realisee: value,
          termine: false, // Sera mis à jour une fois qu'on connaîtra la valeur cible
          jour_numero: dayNumber
        });

      if (insertError) {
        console.error("Error creating exercise progression:", insertError);
        throw insertError;
      }
    }

    return true;
  } catch (err) {
    console.error("Error in updateExerciseProgress:", err);
    return false;
  }
};
