
import React, { useState } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Video, Check } from "lucide-react";
import ExerciseMediaPopup from "./ExerciseMediaPopup";
import { Separator } from "@/components/ui/separator";

interface ExerciseCardProps {
  exercise: Exercise;
  onUpdate: (exerciseId: string, value: number) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onUpdate }) => {
  const [incrementAmount, setIncrementAmount] = useState(
    exercise.type === "reps" ? 5 : 10
  );
  const [mediaOpen, setMediaOpen] = useState(false);

  const target = exercise.type === "reps" ? exercise.reps! : exercise.duration!;
  const isCompleted = exercise.completed >= target;

  const handleIncrement = () => {
    if (isCompleted) return;
    const newValue = Math.min(target, exercise.completed + incrementAmount);
    onUpdate(exercise.id, newValue);
  };

  const handleDecrement = () => {
    if (isCompleted) return;
    const newValue = Math.max(0, exercise.completed - incrementAmount);
    onUpdate(exercise.id, newValue);
  };

  return (
    <div className="exercise-block">
      <div className="exercise-header">
        {exercise.image && (
          <button
            type="button"
            onClick={() => setMediaOpen(true)}
            className="focus:outline-none relative flex-shrink-0"
            aria-label={`Voir la vidéo pour ${exercise.name}`}
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              className={`w-16 h-16 rounded-md object-cover border border-border`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Video className="text-gray-500 bg-white/60 rounded-full p-1 w-7 h-7" strokeWidth={2} />
            </div>
          </button>
        )}
        <div>
          <div className="exercise-title">{exercise.name}</div>
          {exercise.description && (
            <div className="exercise-description">{exercise.description}</div>
          )}
          <div className="exercise-stats">
            {exercise.type === "reps"
              ? `${exercise.reps} répétitions`
              : `${exercise.duration} secondes`}
          </div>
        </div>
        <div className="ml-auto flex items-center">
          {isCompleted && (
            <Check className="text-primary" size={20} />
          )}
        </div>
      </div>

      <ProgressBar 
        value={exercise.completed} 
        max={target}
        showValue={true}
        className="h-2 mt-2"
      />

      {!isCompleted && (
        <div className="exercise-actions">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDecrement}
            disabled={exercise.completed <= 0}
          >
            <Minus size={16} />
          </Button>
          {[5, 10, 20].map((amount) => (
            <button
              key={amount}
              type="button"
              className={`px-2 py-1 text-xs font-medium rounded ${
                incrementAmount === amount
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
              onClick={() => setIncrementAmount(amount)}
            >
              +{amount}
            </button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleIncrement}
          >
            <Plus size={16} />
          </Button>
        </div>
      )}

      <ExerciseMediaPopup
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        exerciseName={exercise.name}
        videoUrl={exercise.video}
      />
    </div>
  );
};

export default ExerciseCard;
