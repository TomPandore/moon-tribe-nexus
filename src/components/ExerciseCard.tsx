
import React, { useState } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  onUpdate: (exerciseId: string, value: number) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onUpdate }) => {
  const [incrementAmount, setIncrementAmount] = useState(
    exercise.type === "reps" ? 5 : 10
  );
  
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
