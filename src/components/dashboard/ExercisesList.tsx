
import React from "react";
import { Exercise } from "@/types";
import ExerciseCard from "@/components/ExerciseCard";
import { Separator } from "@/components/ui/separator";

interface ExercisesListProps {
  exercises: Exercise[];
  onUpdateExercise: (exerciseId: string, value: number) => void;
  isLoading: boolean;
  error: any;
  refetchExercises: () => void;
}

const ExercisesList: React.FC<ExercisesListProps> = ({
  exercises,
  onUpdateExercise,
  isLoading,
  error,
  refetchExercises
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="spinner animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Chargement des exercices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-8 border border-destructive rounded-md">
        <p className="text-destructive">Erreur lors du chargement des exercices.</p>
        <button 
          onClick={() => refetchExercises()} 
          className="mt-2 text-sm text-primary hover:underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="p-4 mb-8 border border-muted rounded-md">
        <p className="text-center">Aucun exercice trouvé pour ce jour.</p>
      </div>
    );
  }

  return (
    <div className="mb-20">
      {exercises.map((exercise, idx) => (
        <React.Fragment key={exercise.id}>
          <ExerciseCard
            exercise={exercise}
            onUpdate={(exerciseId, value) => onUpdateExercise(exerciseId, value)}
          />
          {idx < exercises.length - 1 && (
            <Separator className="exercise-separator" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ExercisesList;
