
import React, { useState } from "react";
import { Exercise } from "@/types";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import ExerciseMediaPopup from "./ExerciseMediaPopup";

// Illustration vectorielle/tribal par défaut (option personnalisable)
const EXAMPLE_PLACEHOLDER = "/lovable-uploads/1d67265c-800e-41ce-b4cf-cc752ce60434.png";

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
      className="relative mb-6 rounded-2xl border-2 border-acid-yellow bg-[#0f0f0f]/95 shadow-lg hover:shadow-jungle transition-shadow duration-300 animate-fade-in"
      style={{
        boxShadow: '0 4px 28px 0 #19241766, 0 1.5px 8px -2px #afff001b',
        overflow: 'hidden',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='90' height='90' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='90' height='90' rx='24' fill='url(%23tribal-bg-grad)' fill-opacity='.12'/%3E%3Cdefs%3E%3ClinearGradient id='tribal-bg-grad' x1='0' y1='0' x2='90' y2='90' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230f0f0f'/%3E%3Cstop offset='1' stop-color='%2300ff37' stop-opacity='.07'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className="flex items-stretch gap-5 p-5">
        {/* Illustration section */}
        <div className="relative group mr-2 shrink-0">
          <button
            type="button"
            onClick={() => setMediaOpen(true)}
            className="relative focus-visible:ring-2 focus-visible:ring-acid-yellow rounded-xl overflow-hidden block w-20 h-20 shadow-md border-2 border-acid-yellow"
            aria-label={`Voir la vidéo pour ${exercise.name}`}
            style={{
              background: "#171917",
              boxShadow: "0 3px 13px #242 0.10",
            }}
          >
            <img
              src={exercise.image || EXAMPLE_PLACEHOLDER}
              alt={`Illustration ${exercise.name}`}
              className="object-cover w-full h-full rounded-xl"
              draggable={false}
              style={{background: "#000"}}
            />
            {/* Video overlay icon (minimal) */}
            <span className="absolute top-1.5 right-1.5 z-20 bg-black/80 rounded-full p-0.5 flex items-center shadow hover:scale-110 transition-transform">
              <Video className="w-5 h-5 text-acid-yellow" strokeWidth={2.1} />
            </span>
          </button>
          <ExerciseMediaPopup
            open={mediaOpen}
            onOpenChange={setMediaOpen}
            exerciseName={exercise.name}
            videoUrl={exercise.video}
          />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <h3 className="font-tribal text-2xl tracking-wide text-acid-yellow mb-1 leading-tight">{exercise.name}</h3>
          {exercise.description && (
            <p className="text-jungle-green font-medium text-base mb-2">{exercise.description}</p>
          )}
          <div className="text-acid-yellow font-semibold text-base mb-1">
            {exercise.type === "reps" ? (
              <span>{exercise.reps} répétitions</span>
            ) : (
              <span>{exercise.duration} secondes</span>
            )}
          </div>
        </div>

        {/* Action bouton */}
        <Button
          variant="outline"
          size="icon"
          className={`ml-3 self-start rounded-full border-acid-yellow border-2 bg-transparent text-acid-yellow hover:bg-acid-yellow/95 hover:text-black active:bg-jungle-green/70 active:text-black transition-all duration-150
            ${isCompleted ? 'bg-jungle-green/80 text-black border-none' : ''}`}
          onClick={handleIncrement}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <span className="text-xl font-bold">✓</span>
          ) : (
            <span className="text-lg font-bold">+</span>
          )}
        </Button>
      </div>
      {/* Progress Totem tribal */}
      <div className="px-6 pb-4">
        <ProgressBar 
          value={exercise.completed} 
          max={target} 
          showValue={true} 
          className="totem-progress"
        />
      </div>

      {/* Choix d'incrément - minimaliste vert/or */}
      {!isCompleted && (
        <div className="flex gap-3 px-6 pb-4">
          {[5, 10, 20].map((amount) => (
            <button
              key={amount}
              className={`px-3 py-1 text-sm rounded font-bold border-2 transition-all duration-150
                ${
                  incrementAmount === amount
                    ? "bg-acid-yellow text-black border-acid-yellow"
                    : "border-jungle-green text-jungle-green bg-[#1a201a]/80 hover:border-acid-yellow/60"
                }`}
              onClick={() => setIncrementAmount(amount)}
              aria-pressed={incrementAmount === amount}
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

