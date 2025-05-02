import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useDailyExercises, updateExerciseProgress } from "@/hooks/useDailyExercises";
import { usePrograms } from "@/hooks/usePrograms";
import { supabase } from "@/integrations/supabase/client";
import ProgramHeader from "@/components/dashboard/ProgramHeader";
import RitualSection from "@/components/dashboard/RitualSection";
import ExercisesList from "@/components/dashboard/ExercisesList";
import CompleteRitualButton from "@/components/dashboard/CompleteRitualButton";
import { useDayProgression } from "@/hooks/useDayProgression";
import { useProgram } from "@/contexts/program";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateUserProgress } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);
  const { data: allPrograms = [], isLoading: programsLoading } = usePrograms();
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [currentDay, setCurrentDay] = useState<number>(1);
  
  // First update: Get the current day from the user's progress
  React.useEffect(() => {
    if (user?.progress?.currentDay) {
      setCurrentDay(user.progress.currentDay);
    }
  }, [user?.progress?.currentDay]);
  
  const { 
    data: dailyExercises = [], 
    isLoading: exercisesLoading, 
    refetch: refetchExercises,
    error: exercisesError 
  } = useDailyExercises(
    user?.progress?.currentProgram,
    currentDay // Updated: Use the local state instead of user.progress.currentDay
  );

  const { dayProgressChecked } = useDayProgression(
    user,
    selectedProgram,
    currentDay,
    setCurrentDay, // Pass the setter function
    dailyExercises,
    exercisesLoading,
    refetchExercises
  );

  React.useEffect(() => {
    if (user?.progress?.currentProgram && allPrograms.length > 0) {
      const program = allPrograms.find(p => p.id === user.progress.currentProgram);
      if (program) {
        setSelectedProgram(program);
        setCurrentDay(user.progress.currentDay || 1);
      } else {
        console.error("Programme non trouvé:", user.progress.currentProgram);
        toast({
          title: "Erreur",
          description: "Programme non trouvé. Veuillez en sélectionner un autre.",
          variant: "destructive"
        });
        setTimeout(() => navigate("/programs"), 2000);
      }
    } else if (!user?.progress?.currentProgram && !programsLoading) {
      console.log("Aucun programme sélectionné, redirection...");
      navigate("/programs");
    }
  }, [user?.progress?.currentProgram, allPrograms, programsLoading]);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!selectedProgram && !programsLoading) {
    return null;
  }

  const totalExercises = dailyExercises.length;
  const completedExercises = dailyExercises.filter(ex => {
    const target = ex.type === "reps" ? ex.reps! : ex.duration!;
    return ex.completed >= target;
  }).length;
  
  const allExercisesCompleted = completedExercises === totalExercises && totalExercises > 0;

  const handleUpdateExerciseProgress = async (exerciseId: string, value: number) => {
    if (!user) return;
    
    try {
      await updateExerciseProgress(
        user.id, 
        exerciseId, 
        value,
        currentDay
      );
      refetchExercises();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la progression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la progression",
        variant: "destructive"
      });
    }
  };

  const handleCompleteRitual = async () => {
    if (!allExercisesCompleted || !user || !selectedProgram) {
      toast({
        title: "Exercices incomplets",
        description: "Complète tous les exercices avant de valider le rituel",
        variant: "destructive"
      });
      return;
    }

    setIsCompleting(true);
    
    try {
      const nextDay = currentDay + 1;
      const isLastDay = nextDay > selectedProgram.duration;
      
      const newProgress = {
        ...user.progress,
        currentDay: isLastDay ? 1 : nextDay,
        lastCompletedDay: currentDay,
        streak: user.progress.streak + 1,
        totalCompletedDays: user.progress.totalCompletedDays + 1
      };
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          progress: newProgress,
          jour_actuel: isLastDay ? 1 : nextDay
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      updateUserProgress(newProgress);
      setCurrentDay(isLastDay ? 1 : nextDay); // Update local state
      
      if (isLastDay) {
        toast({
          title: "Programme terminé !",
          description: `Félicitations ! Tu as terminé le programme ${selectedProgram.name} !`,
          variant: "default"
        });
      } else {
        toast({
          title: "Rituel complété !",
          description: `Bravo ! Tu es prêt pour le jour ${nextDay}`,
          variant: "default"
        });
      }
      
      setTimeout(() => {
        refetchExercises();
      }, 500);
      
    } catch (error) {
      console.error("Erreur lors de la complétion du rituel:", error);
      toast({
        title: "Erreur",
        description: "Impossible de valider le rituel du jour",
        variant: "destructive"
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const getEncouragingMessage = () => {
    const userName = user.name || "Champion";
    
    if (completedExercises === 0) {
      return `Bonjour ${userName} ! Prêt(e) à commencer ta séance ? Tu vas tout déchirer aujourd'hui ! 💪`;
    } else if (completedExercises < totalExercises / 2) {
      return `Continue comme ça ${userName} ! Tu es sur la bonne voie ! 🔥`;
    } else if (completedExercises < totalExercises) {
      return `Wow ${userName}, tu es en feu ! Plus que quelques exercices ! ⭐`;
    } else {
      return `Incroyable ${userName} ! Tu as terminé tous tes exercices, quelle détermination ! 🎉`;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <main className="relative z-10 container mx-auto px-4 py-6 pb-20 max-w-3xl">
        {selectedProgram && (
          <ProgramHeader 
            program={selectedProgram}
            currentDay={currentDay}
          />
        )}

        <RitualSection 
          currentDay={currentDay}
          user={user}
          completedExercises={completedExercises}
          totalExercises={totalExercises}
          encouragingMessage={getEncouragingMessage()}
        />

        <h3 className="text-lg font-bold mb-4">Exercices à compléter</h3>
        
        <ExercisesList 
          exercises={dailyExercises}
          onUpdateExercise={handleUpdateExerciseProgress}
          isLoading={exercisesLoading}
          error={exercisesError}
          refetchExercises={refetchExercises}
        />

        <CompleteRitualButton 
          isCompleting={isCompleting}
          allExercisesCompleted={allExercisesCompleted}
          completedExercises={completedExercises}
          totalExercises={totalExercises}
          onComplete={handleCompleteRitual}
        />
      </main>
    </div>
  );
};

export default Dashboard;
