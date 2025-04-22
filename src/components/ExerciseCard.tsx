
import React, { useState } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";
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

  return (
    <div className={`tribal-card mb-4 transition-all ${isCompleted ? 'border-tribal-green' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex">
          {exercise.image && (
            <div
              className="relative mr-4"
              style={{ minWidth: 70, minHeight: 70 }}
            >
              <button
                type="button"
                onClick={() => setMediaOpen(true)}
                className="focus:outline-none group"
                aria-label={`Voir la vidéo pour ${exercise.name}`}
              >
                <img
                  src={exercise.image}
                  alt={`Illustration ${exercise.name}`}
                  className={`w-20 h-20 rounded-xl object-cover border-2 border-tribal-purple group-hover:brightness-110 transition`}
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <Video
                    className="opacity-80 bg-black/50 rounded-full p-1 text-tribal-orange w-8 h-8 group-hover:scale-105 transition"
                    strokeWidth={2.5}
                  />
                </span>
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
            <h3 className="text-lg font-medium mb-1">{exercise.name}</h3>
            {exercise.description && (
              <p className="text-sm text-gray-400 mb-2">{exercise.description}</p>
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
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${isCompleted ? 'bg-tribal-green/20 border-tribal-green text-tribal-green' : 'hover:bg-tribal-purple/20'}`}
          onClick={handleIncrement}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <span className="text-xl">✓</span>
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="mt-4">
        <ProgressBar 
          value={exercise.completed} 
          max={target} 
          showValue={true} 
        />
      </div>

      {!isCompleted && (
        <div className="flex gap-2 mt-3">
          {[5, 10, 20].map((amount) => (
            <button
              key={amount}
              className={`px-2 py-1 text-xs rounded ${
                incrementAmount === amount
                  ? "bg-tribal-purple text-white"
                  : "bg-tribal-gray-light text-gray-300"
              }`}
              onClick={() => setIncrementAmount(amount)}
            >
              +{amount}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;

