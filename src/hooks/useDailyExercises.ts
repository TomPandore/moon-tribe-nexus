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
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(programId)) {
          console.error("Invalid UUID format for programId:", programId);
          return [];
        }

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

export const updateExerciseProgress = async (
  userId: string, 
  exerciseId: string, 
  value: number,
  dayNumber: number
) => {
  try {
    console.log(`Updating exercise progress: user=${userId}, exercise=${exerciseId}, value=${value}`);
    
    const { data: existingData, error: checkError } = await supabase
      .from("progression_exercice")
      .select("*")
      .eq("user_id", userId)
      .eq("exercice_id", exerciseId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking exercise progression:", checkError);
      throw checkError;
    }

    const { data: exerciseData, error: exerciseError } = await supabase
      .from("exercices")
      .select("valeur_cible")
      .eq("id", exerciseId)
      .single();
      
    if (exerciseError) {
      console.error("Error fetching exercise data:", exerciseError);
      throw exerciseError;
    }
    
    const targetValue = exerciseData.valeur_cible;
    const isCompleted = value >= targetValue;

    if (existingData) {
      const { error: updateError } = await supabase
        .from("progression_exercice")
        .update({
          valeur_realisee: value,
          termine: isCompleted,
        })
        .eq("id", existingData.id);

      if (updateError) {
        console.error("Error updating exercise progression:", updateError);
        throw updateError;
      }
    } else {
      const { error: insertError } = await supabase
        .from("progression_exercice")
        .insert({
          user_id: userId,
          exercice_id: exerciseId,
          valeur_realisee: value,
          termine: isCompleted,
          jour_numero: dayNumber
        });

      if (insertError) {
        console.error("Error creating exercise progression:", insertError);
        throw insertError;
      }
    }

    console.log(`Exercise progress updated successfully: value=${value}, completed=${isCompleted}`);
    return true;
  } catch (err) {
    console.error("Error in updateExerciseProgress:", err);
    return false;
  }
};
