
import React from "react";
import { Button } from "@/components/ui/button";

interface CompleteRitualButtonProps {
  isCompleting: boolean;
  allExercisesCompleted: boolean;
  completedExercises: number;
  totalExercises: number;
  onComplete: () => void;
}

const CompleteRitualButton: React.FC<CompleteRitualButtonProps> = ({
  isCompleting,
  allExercisesCompleted,
  completedExercises,
  totalExercises,
  onComplete
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border z-20">
      <div className="container max-w-3xl mx-auto">
        <Button 
          className={`w-full py-6 ${allExercisesCompleted ? "bg-primary text-white" : "bg-muted text-foreground"}`}
          onClick={onComplete}
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
  );
};

export default CompleteRitualButton;
