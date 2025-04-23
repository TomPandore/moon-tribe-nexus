import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import ExerciseCard from "@/components/ExerciseCard";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Flame } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const DailyRitual: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentProgram, currentRitual, updateExerciseProgress, completeRitual } = useProgram();
  const { user } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);

  if (!user || !currentProgram || !currentRitual) {
    navigate("/programs");
    return null;
  }

  const totalExercises = currentRitual.exercises.length;
  const completedExercises = currentRitual.exercises.filter(ex => {
    const target = ex.type === "reps" ? ex.reps! : ex.duration!;
    return ex.completed >= target;
  }).length;
  
  const allExercisesCompleted = completedExercises === totalExercises;

  const handleCompleteRitual = () => {
    if (!allExercisesCompleted) {
      toast({
        title: "Exercices incomplets",
        description: "Complète tous les exercices avant de valider le rituel",
        variant: "destructive"
      });
      return;
    }

    setIsCompleting(true);
    setTimeout(() => {
      completeRitual();
      setIsCompleting(false);
    }, 1000);
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
    <main className="relative z-10 container mx-auto px-4 py-6 pb-20 max-w-3xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{currentProgram.name}</h1>
          <div className="flex items-center bg-muted px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-muted-foreground">
              Jour {user.progress.currentDay}/{currentProgram.duration}
            </span>
          </div>
        </div>
        <ProgressBar 
          value={user.progress.currentDay} 
          max={currentProgram.duration} 
          className="h-2"
        />
      </div>

      {/* Section Rituel */}
      <section className="app-card mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{currentRitual.title}</h2>
          <span className="text-sm font-medium">
            {completedExercises}/{totalExercises}
          </span>
        </div>

        <p className="text-primary font-medium mb-4 text-lg">
          {getEncouragingMessage()}
        </p>

        {currentRitual.description && (
          <p className="text-muted-foreground mb-6">{currentRitual.description}</p>
        )}

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
              <div className="text-xl font-bold">{user.progress.totalCompletedDays}</div>
            </div>
          </div>
        </div>
      </section>

      <h3 className="text-lg font-bold mb-4">Exercices à compléter</h3>

      <div className="mb-20">
        {currentRitual.exercises.map((exercise, idx) => (
          <React.Fragment key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              onUpdate={updateExerciseProgress}
            />
            {idx < currentRitual.exercises.length - 1 && (
              <Separator className="exercise-separator" />
            )}
          </React.Fragment>
        ))}
      </div>

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
                : "Complète tous les exercices pour valider"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default DailyRitual;
