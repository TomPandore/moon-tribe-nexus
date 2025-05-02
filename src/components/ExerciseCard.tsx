
import React, { useState, useRef, useEffect } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Video } from "lucide-react";
import ExerciseMediaPopup from "./ExerciseMediaPopup";
import { Separator } from "@/components/ui/separator";
import AccompliBadge from "./AccompliBadge";

interface ExerciseCardProps {
  exercise: Exercise;
  onUpdate: (exerciseId: string, value: number) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onUpdate }) => {
  const [incrementAmount, setIncrementAmount] = useState(
    exercise.type === "reps" ? 5 : 1
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
    <div className="app-card flex gap-4 p-4 rounded-2xl border border-border bg-white shadow-none transition-all">
      {exercise.image && (
        <button
          type="button"
          onClick={() => setMediaOpen(true)}
          className="focus:outline-none relative flex-shrink-0 h-32 w-32"
          aria-label={`Voir la vidéo pour ${exercise.name}`}
        >
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full rounded-xl object-cover border border-border bg-white"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white/80 rounded-full p-2">
              <Video size={20} className="text-primary" />
            </span>
          </div>
        </button>
      )}

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-lg leading-snug">{exercise.name}</h3>
            {exercise.description && (
              <p className="text-muted-foreground text-sm">
                {exercise.description}
              </p>
            )}
            <div className="text-sm font-semibold text-primary/80 mt-1">
              {exercise.type === "reps" 
                ? `${exercise.completed}/${exercise.reps} répétitions`
                : `${exercise.completed}/${exercise.duration} répétitions`
              }
            </div>
          </div>

          {isCompleted && (
            <span className={checkAnim ? "animate-scale-in" : ""}>
              <AccompliBadge animated={checkAnim} />
            </span>
          )}
        </div>

        <ProgressBar
          value={exercise.completed}
          max={target}
          completed={isCompleted}
          className="my-1"
        />

        {!isCompleted && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={handleDecrement}
              disabled={exercise.completed <= 0}
              aria-label="Réduire"
            >
              <Minus size={18} />
            </Button>

            {[1, 5, 10].map((amount) => (
              <button
                key={amount}
                type="button"
                className={`
                  min-w-[48px] h-10 px-3 py-2 text-sm font-medium rounded
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
              className="h-10 w-10"
              onClick={handleIncrement}
              aria-label="Augmenter"
            >
              <Plus size={18} />
            </Button>
          </div>
        )}
      </div>

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
