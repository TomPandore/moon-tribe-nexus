import React, { useState, useRef, useEffect } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  const [customValue, setCustomValue] = useState("");
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

  const handleCustomValueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customValue || isCompleted) return;

    const value = parseInt(customValue);
    if (isNaN(value)) return;

    const newValue = Math.min(target, exercise.completed + value);
    onUpdate(exercise.id, newValue);
    setCustomValue("");
  };

  return (
    <div
      className={`
        app-card 
        flex gap-4
        p-4 rounded-2xl border border-border bg-white 
        shadow-none
        transition-all
      `}
    >
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
            <div className="text-muted-foreground text-xs mt-1">
              {exercise.type === "reps"
                ? `${exercise.reps} répétitions`
                : `${exercise.duration} secondes`}
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
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
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

              <form 
                onSubmit={handleCustomValueSubmit} 
                className="flex items-center gap-2"
              >
                <Input
                  type="number"
                  min="1"
                  max={target}
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  className="w-12 h-8 text-center text-sm p-1"
                />
                <Button 
                  type="submit" 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-3"
                  disabled={!customValue}
                >
                  Ajouter
                </Button>
              </form>
            </div>
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
