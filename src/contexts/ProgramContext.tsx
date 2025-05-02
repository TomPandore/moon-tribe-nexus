
import React, { createContext, useContext, useState, useEffect } from "react";
import { Program, DailyRitual, Exercise } from "@/types";
import { programs } from "@/data/programs";
import { getRitualsByProgram } from "@/data/rituals";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { usePrograms } from "@/hooks/usePrograms";
import { supabase } from "@/integrations/supabase/client";

type ProgramContextType = {
  availablePrograms: Program[];
  currentProgram: Program | null;
  currentRitual: DailyRitual | null;
  selectProgram: (programId: string) => void;
  updateExerciseProgress: (exerciseId: string, value: number) => void;
  completeRitual: () => void;
  isLoading: boolean;
};

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUserProgress } = useAuth();
  const { toast } = useToast();
  const { data: supabasePrograms = [] } = usePrograms();
  const [availablePrograms, setAvailablePrograms] = useState<Program[]>(programs);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [rituals, setRituals] = useState<DailyRitual[]>([]);
  const [currentRitual, setCurrentRitual] = useState<DailyRitual | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mettre à jour les programmes disponibles avec ceux de Supabase
  useEffect(() => {
    if (supabasePrograms.length > 0) {
      setAvailablePrograms(supabasePrograms);
    }
  }, [supabasePrograms]);

  // Charger le programme actuel depuis le localStorage
  useEffect(() => {
    if (user?.progress.currentProgram && availablePrograms.length > 0) {
      const program = availablePrograms.find(p => p.id === user.progress.currentProgram);
      if (program) {
        setCurrentProgram(program);
        const programRituals = getRitualsByProgram(program.id);
        setRituals(programRituals);
        
        // Trouver le rituel actuel basé sur le jour actuel
        const currentDay = user.progress.currentDay || 1;
        const ritual = programRituals.find(r => r.day === currentDay) || null;
        setCurrentRitual(ritual);
      } else {
        console.error("Programme non trouvé:", user.progress.currentProgram);
      }
    }
  }, [user, availablePrograms]);

  // Fonction pour supprimer toutes les progressions d'exercices d'un utilisateur
  const deleteUserExerciseProgress = async (userId: string) => {
    try {
      // Supprimer tous les enregistrements de progression pour cet utilisateur
      const { error } = await supabase
        .from('progression_exercice')
        .delete()
        .eq('user_id', userId);
        
      if (error) throw error;
      
      console.log("Progression des exercices supprimée avec succès");
    } catch (error: any) {
      console.error("Erreur lors de la suppression de la progression:", error.message);
      toast({
        title: "Erreur de réinitialisation",
        description: "Impossible de supprimer l'historique des exercices",
        variant: "destructive"
      });
    }
  };

  const selectProgram = async (programId: string) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour sélectionner un programme",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const program = availablePrograms.find(p => p.id === programId);
      if (!program) {
        throw new Error(`Programme non trouvé avec l'ID: ${programId}`);
      }
      
      console.log("Programme sélectionné:", program);
      
      // Si l'utilisateur change de programme, on supprime toutes ses progressions
      if (currentProgram && currentProgram.id !== programId) {
        await deleteUserExerciseProgress(user.id);
      }
      
      // Mettre à jour l'état local
      setCurrentProgram(program);
      
      const programRituals = getRitualsByProgram(program.id);
      setRituals(programRituals);
      
      // Réinitialiser à jour 1
      const ritual = programRituals.find(r => r.day === 1) || null;
      setCurrentRitual(ritual);
      
      // Mettre à jour la base de données
      // 1. Mettre à jour le programme_id dans la table profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          programme_id: programId,
          jour_actuel: 1
        })
        .eq('id', user.id);
        
      if (profileError) throw profileError;
      
      // 2. Mettre à jour l'état utilisateur dans le contexte
      updateUserProgress({
        currentProgram: program.id,
        currentDay: 1,
        startDate: new Date().toISOString()
      });
      
      toast({
        title: "Programme sélectionné",
        description: `Vous avez commencé le programme ${program.name}`,
      });
    } catch (error: any) {
      console.error("Erreur lors de la sélection du programme:", error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger le programme",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateExerciseProgress = (exerciseId: string, value: number) => {
    if (!currentRitual) return;
    
    const updatedExercises = currentRitual.exercises.map(exercise => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          completed: Math.min(exercise.type === 'reps' ? exercise.reps! : exercise.duration!, value)
        };
      }
      return exercise;
    });
    
    const updatedRitual = {
      ...currentRitual,
      exercises: updatedExercises
    };
    
    setCurrentRitual(updatedRitual);
    
    // Mettre à jour également dans le tableau des rituels
    const updatedRituals = rituals.map(ritual => 
      ritual.day === currentRitual.day ? updatedRitual : ritual
    );
    
    setRituals(updatedRituals);
  };
  
  const completeRitual = () => {
    if (!currentRitual || !user || !currentProgram) return;
    
    // Marquer le rituel comme complété
    const updatedRitual = {
      ...currentRitual,
      completed: true
    };
    
    // Mettre à jour les rituels
    const updatedRituals = rituals.map(ritual => 
      ritual.day === currentRitual.day ? updatedRitual : ritual
    );
    
    setRituals(updatedRituals);
    
    // Calculer le prochain jour
    const nextDay = user.progress.currentDay + 1;
    const isLastDay = nextDay > currentProgram.duration;
    
    // Mise à jour progrès utilisateur
    updateUserProgress({
      currentDay: isLastDay ? 1 : nextDay, // Si dernier jour, retour au jour 1
      lastCompletedDay: user.progress.currentDay,
      streak: user.progress.streak + 1,
      totalCompletedDays: user.progress.totalCompletedDays + 1
    });
    
    // Si c'est le dernier jour, afficher un toast de félicitations
    if (isLastDay) {
      toast({
        title: "Programme terminé !",
        description: `Félicitations ! Vous avez terminé le programme ${currentProgram.name} !`,
        variant: "default"
      });
    } else {
      toast({
        title: "Rituel complété !",
        description: `Bravo ! Vous êtes prêt pour le jour ${nextDay}`,
        variant: "default"
      });
    }
    
    // Mettre à jour le rituel courant
    if (!isLastDay) {
      const nextRitual = rituals.find(r => r.day === nextDay) || null;
      setCurrentRitual(nextRitual);
    }
  };

  return (
    <ProgramContext.Provider 
      value={{ 
        availablePrograms, 
        currentProgram, 
        currentRitual, 
        selectProgram, 
        updateExerciseProgress, 
        completeRitual,
        isLoading
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgram = () => {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error("useProgram must be used within a ProgramProvider");
  }
  return context;
};
