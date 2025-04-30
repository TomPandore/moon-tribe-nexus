
import React from "react";
import { Trophy, Flame, Shield } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import { User } from "@/types";
import { cn } from "@/lib/utils";

interface RitualSectionProps {
  currentDay: number;
  user: User;
  completedExercises: number;
  totalExercises: number;
  encouragingMessage: string;
}

const RitualSection: React.FC<RitualSectionProps> = ({
  currentDay,
  user,
  completedExercises,
  totalExercises,
  encouragingMessage
}) => {
  // Determine clan colors based on the user's clan
  const getClanBadge = () => {
    if (!user.clan) return null;

    const clanColors = {
      "ONOTKA": "bg-red-600",
      "EKLOA": "bg-blue-600",
      "OKWÁHO": "bg-green-600"
    };

    const clanColor = clanColors[user.clan] || "bg-primary/10";

    return (
      <div className="flex items-center gap-2 text-sm">
        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", clanColor)}>
          <Shield size={12} className="text-white" />
        </div>
        <span>Clan {user.clan}</span>
      </div>
    );
  };

  return (
    <section id="ritual-section" className="app-card mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Rituel du Jour {currentDay}</h2>
        {user.clan && getClanBadge()}
      </div>

      <p className="text-primary font-medium mb-4 text-lg">
        {encouragingMessage}
      </p>

      <div className="mb-6">
        <ProgressBar 
          value={completedExercises} 
          max={totalExercises} 
          className="h-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="app-card flex items-center gap-3 p-3 shadow-none">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Flame size={20} className="text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Série actuelle</div>
            <div className="text-xl font-bold">{user.progress.streak}</div>
          </div>
        </div>
        <div className="app-card flex items-center gap-3 p-3 shadow-none">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Trophy size={20} className="text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Exercices Accomplis</div>
            <div className="text-xl font-bold">{`${completedExercises}/${totalExercises}`}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RitualSection;
