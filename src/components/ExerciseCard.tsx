import React, { useState, useRef, useEffect } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import ExerciseMediaPopup from "./ExerciseMediaPopup";
import { Separator } from "@/components/ui/separator";
import AccompliBadge from "./AccompliBadge";

interface ExerciseCardProps {
  exercise: Exercise;
  onUpdate: (exerciseId: string, value: number) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onUpdate }) => {
  const [incrementAmount, setIncrementAmount] = useState(
    exercise.type === "reps" ? 5 : 10
  );
  const [mediaOpen, setMediaOpen] = useState(false);
  const [checkAnim, setCheckAnim] = useState(false);

  const target = exercise.type === "reps" ? exercise.reps! : exercise.duration!;
  const isCompleted = exercise.completed >= target;

  const previousCompleted = useRef(isCompleted);
  useEffect(() => {
    if (isCompleted && !previousCompleted.current) {
      setCheckAnim(true);
      setTimeout(() => setCheckAnim(false), 700);
    }
    previousCompleted.current = isCompleted;
  }, [isCompleted]);

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
    <div
      className={`
        app-card 
        flex flex-col gap-2 
        p-4 rounded-2xl border border-border bg-white 
        shadow-none
        transition-all
      `}
    >
      <div className="flex items-center gap-4 mb-2">
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
              className="w-14 h-14 rounded-md object-cover border border-border bg-white"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white/80 rounded-full p-1">
                {/* Placeholder for video icon */}
              </span>
            </div>
          </button>
        )}

        <div className="flex-1 min-w-0">
          <div className="font-medium text-lg leading-snug truncate">{exercise.name}</div>
          {exercise.description && (
            <div className="text-muted-foreground text-sm truncate">
              {exercise.description}
            </div>
          )}
          <div className="text-muted-foreground text-xs mt-1">
            {exercise.type === "reps"
              ? `${exercise.reps} répétitions`
              : `${exercise.duration} secondes`}
          </div>
        </div>

        <div className="ml-auto flex items-center min-w-[90px] justify-end">
          {isCompleted && (
            <span className={checkAnim ? "animate-scale-in" : ""}>
              <AccompliBadge animated={checkAnim} />
            </span>
          )}
        </div>
      </div>
      <ProgressBar
        value={exercise.completed}
        max={target}
        completed={isCompleted}
        className="my-1"
      />

      {!isCompleted && (
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDecrement}
            disabled={exercise.completed <= 0}
            aria-label="Réduire"
          >
            <Minus size={16} />
          </Button>
          {[5, 10, 20].map((amount) => (
            <button
              key={amount}
              type="button"
              className={`
                px-2 py-1 text-xs font-medium rounded
                ${incrementAmount === amount
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"}
                transition
              `}
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
            aria-label="Augmenter"
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
