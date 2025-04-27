import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ExerciseCard from "@/components/ExerciseCard";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Flame, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useDailyExercises, updateExerciseProgress } from "@/hooks/useDailyExercises";
import { supabase } from "@/integrations/supabase/client";
import { usePrograms } from "@/hooks/usePrograms";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateUserProgress } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);
  const { data: allPrograms = [], isLoading: programsLoading } = usePrograms();
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  const [currentDay, setCurrentDay] = useState<number>(1);
  
  const { 
    data: dailyExercises = [], 
    isLoading: exercisesLoading, 
    refetch: refetchExercises,
    error: exercisesError 
  } = useDailyExercises(
    user?.progress?.currentProgram,
    user?.progress?.currentDay
  );

  useEffect(() => {
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
    
    const updatedExercises = dailyExercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          completed: value
        };
      }
      return ex;
    });
    
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
      
      setCurrentDay(isLastDay ? 1 : nextDay);
      
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
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{selectedProgram.name}</h1>
              <div className="flex items-center bg-muted px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-muted-foreground">
                  Jour {currentDay}/{selectedProgram.duration}
                </span>
              </div>
            </div>
            <ProgressBar 
              value={currentDay} 
              max={selectedProgram.duration} 
              className="h-2"
            />
          </div>
        )}

        <section id="ritual-section" className="app-card mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Rituel du Jour {currentDay}</h2>
            <span className="text-sm font-medium">
              {completedExercises}/{totalExercises}
            </span>
          </div>

          <p className="text-primary font-medium mb-4 text-lg">
            {getEncouragingMessage()}
          </p>

          <div className="mb-6">
            <ProgressBar 
              value={completedExercises} 
              max={totalExercises} 
              className="h-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="app-card flex items-center gap-3 p-3 shadow-none">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Flame size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Série actuelle</div>
                <div className="text-xl font-bold">{user.progress.streak}</div>
              </div>
            </div>
            <div className="app-card flex items-center gap-3 p-3 shadow-none">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total complété</div>
                <div className="text-xl font-bold">{`${completedExercises}/${totalExercises}`}</div>
              </div>
            </div>
          </div>
        </section>

        <h3 className="text-lg font-bold mb-4">Exercices à compléter</h3>
        
        {exercisesLoading ? (
          <div className="text-center py-8">
            <div className="spinner animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Chargement des exercices...</p>
          </div>
        ) : exercisesError ? (
          <div className="p-4 mb-8 border border-destructive rounded-md">
            <p className="text-destructive">Erreur lors du chargement des exercices.</p>
            <button 
              onClick={() => refetchExercises()} 
              className="mt-2 text-sm text-primary hover:underline"
            >
              Réessayer
            </button>
          </div>
        ) : dailyExercises.length === 0 ? (
          <div className="p-4 mb-8 border border-muted rounded-md">
            <p className="text-center">Aucun exercice trouvé pour ce jour.</p>
          </div>
        ) : (
          <div className="mb-20">
            {dailyExercises.map((exercise, idx) => (
              <React.Fragment key={exercise.id}>
                <ExerciseCard
                  exercise={exercise}
                  onUpdate={(exerciseId, value) => handleUpdateExerciseProgress(exerciseId, value)}
                />
                {idx < dailyExercises.length - 1 && (
                  <Separator className="exercise-separator" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border z-20">
          <div className="container max-w-3xl mx-auto">
            <Button 
              className={`w-full py-6 ${allExercisesCompleted ? "bg-primary text-white" : "bg-muted text-foreground"}`}
              onClick={handleCompleteRitual}
              disabled={isCompleting || !allExercisesCompleted}
              variant="default"
            >
              {isCompleting 
                ? "Validation en cours..." 
                : allExercisesCompleted 
                  ? "Valider le rituel du jour" 
                  : `Complète tous les exercices pour valider (${completedExercises}/${totalExercises})`}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
