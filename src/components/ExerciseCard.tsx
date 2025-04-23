
import React, { useState } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Video, Check } from "lucide-react";
import ExerciseMediaPopup from "./ExerciseMediaPopup";

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
    <div className={`tribal-card transition-all ${isCompleted ? 'border-tribal-green/50 bg-card/80' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex">
          {exercise.image && (
            <div
              className="relative mr-4 flex-shrink-0"
              style={{ minWidth: 80, minHeight: 80 }}
            >
              <button
                type="button"
                onClick={() => setMediaOpen(true)}
                className="focus:outline-none group relative"
                aria-label={`Voir la vidéo pour ${exercise.name}`}
              >
                <img
                  src={exercise.image}
                  alt={`Illustration ${exercise.name}`}
                  className={`w-20 h-20 rounded-lg object-cover border-2 ${isCompleted ? 'border-tribal-green' : 'border-tribal-orange'} group-hover:brightness-110 transition`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video
                    className={`opacity-90 bg-black/50 rounded-full p-1.5 ${isCompleted ? 'text-tribal-green' : 'text-tribal-orange'} w-9 h-9 group-hover:scale-105 transition`}
                    strokeWidth={2}
                  />
                </div>
              </button>
              <ExerciseMediaPopup
                open={mediaOpen}
                onOpenChange={setMediaOpen}
                exerciseName={exercise.name}
                videoUrl={exercise.video}
              />
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium mb-1 text-tribal-green">{exercise.name}</h3>
            {exercise.description && (
              <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
            )}
            <div className="text-tribal-orange font-medium">
              {exercise.type === "reps" ? (
                <span>{exercise.reps} répétitions</span>
              ) : (
                <span>{exercise.duration} secondes</span>
              )}
            </div>
          </div>
        </div>

        {isCompleted ? (
          <div className="bg-tribal-green/20 text-tribal-green rounded-full w-10 h-10 flex items-center justify-center">
            <Check size={20} strokeWidth={2.5} />
          </div>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-tribal-green text-tribal-green hover:bg-tribal-green/20"
            onClick={handleIncrement}
          >
            <Plus size={18} />
          </Button>
        )}
      </div>

      <div className="mt-4">
        <ProgressBar 
          value={exercise.completed} 
          max={target} 
          showValue={true} 
        />
      </div>

      {!isCompleted && (
        <div className="flex items-center gap-2 mt-4 justify-between">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 border-muted text-muted-foreground hover:bg-muted/30"
            onClick={handleDecrement}
            disabled={exercise.completed <= 0}
          >
            <Minus size={16} />
          </Button>
          
          <div className="flex gap-1">
            {[5, 10, 20].map((amount) => (
              <button
                key={amount}
                className={`px-2 py-1 text-xs rounded ${
                  incrementAmount === amount
                    ? "bg-tribal-green/20 border border-tribal-green/50 text-tribal-green"
                    : "bg-muted text-muted-foreground"
                }`}
                onClick={() => setIncrementAmount(amount)}
              >
                +{amount}
              </button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 border-tribal-green text-tribal-green hover:bg-tribal-green/20"
            onClick={handleIncrement}
          >
            <Plus size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
