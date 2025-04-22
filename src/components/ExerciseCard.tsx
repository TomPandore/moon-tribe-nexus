
import React, { useState } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";
import ExerciseMediaPopup from "./ExerciseMediaPopup";

// Lien vers une image illustrant le mouvement (exemple fourni par l'utilisateur pour testing/demo)
const EXAMPLE_PLACEHOLDER = "/lovable-uploads/1f2f97f3-bb50-463c-99b3-cd8dd70143c6.png";

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
    <div 
      className={`tribal-card relative mb-6 border-2 bg-black/75 border-gold-dark shadow-jungle transition-all hover:shadow-gold`}
      style={{ boxShadow: '0 6px 52px 0 #FFD70015, 0 2px 18px -2px #19ea5c22' }}
    >
      <div className="flex justify-between items-start">
        {/* Illustration : or, verteur, glow */}
        <div className="flex flex-col items-center pr-3">
          <button
            type="button"
            onClick={() => setMediaOpen(true)}
            className="relative group outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Voir la vidéo pour ${exercise.name}`}
          >
            <span className="absolute z-20 right-2 top-2 animate-glow-gold opacity-70">
              <Video className="w-7 h-7 text-gold drop-shadow-[0_0_3px_#FFD700cc]" strokeWidth={2.3} />
            </span>
            <img
              src={exercise.image || EXAMPLE_PLACEHOLDER}
              alt={`Illustration ${exercise.name}`}
              className="w-24 h-24 rounded-[1rem] border-4 border-gold object-cover shadow-gold group-hover:scale-105 group-hover:shadow-[0_0_16px_1px_#FFD70099,0_0_32px_14px_#22df991a] transition-transform"
            />
            <span className="absolute bottom-[-11px] left-1/2 -translate-x-1/2 w-16 h-3 bg-gradient-to-r from-gold/70 via-gold/40 to-gold/0 blur-sm rounded-sm pointer-events-none -z-10" />
          </button>
          <ExerciseMediaPopup
            open={mediaOpen}
            onOpenChange={setMediaOpen}
            exerciseName={exercise.name}
            videoUrl={exercise.video}
          />
        </div>

        <div className="flex-1 ml-1">
          <h3 className="text-xl font-semibold mb-1 text-gold">{exercise.name}</h3>
          {exercise.description && (
            <p className="text-sm text-jungle-green mb-2">{exercise.description}</p>
          )}
          <div className="text-gold font-medium">
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
          className={`rounded-full border-gold/60 bg-jungle-green/10 text-gold shadow-md shadow-gold/30
            hover:bg-gold hover:text-black transition-all ${isCompleted ? 'bg-jungle-green/60 text-black' : ''}`}
          onClick={handleIncrement}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <span className="text-xl font-bold">✓</span>
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
          className="bg-black/40"
        />
      </div>

      {!isCompleted && (
        <div className="flex gap-2 mt-3">
          {[5, 10, 20].map((amount) => (
            <button
              key={amount}
              className={`px-2 py-1 text-xs rounded font-semibold border transition-all
                ${
                  incrementAmount === amount
                    ? "bg-gold text-black border-gold shadow-gold"
                    : "bg-jungle-green/20 text-jungle-green border-transparent hover:border-gold/50"
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
