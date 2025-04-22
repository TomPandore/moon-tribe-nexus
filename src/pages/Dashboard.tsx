
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ExerciseCard from "@/components/ExerciseCard";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentProgram, currentRitual, updateExerciseProgress, completeRitual } = useProgram();
  const { user, logout } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);
  
  if (!user || !currentProgram || !currentRitual) {
    navigate("/programs");
    return null;
  }
  
  const totalExercises = currentRitual.exercises.length;
  const completedExercises = currentRitual.exercises.filter(ex => {
    const target = ex.type === "reps" ? ex.reps! : ex.duration!;
    return ex.completed >= target;
  }).length;
  
  const allExercisesCompleted = completedExercises === totalExercises;
  
  const handleCompleteRitual = () => {
    if (!allExercisesCompleted) {
      toast({
        title: "Exercices incomplets",
        description: "Vous devez compléter tous les exercices avant de valider le rituel",
        variant: "destructive"
      });
      return;
    }
    
    setIsCompleting(true);
    setTimeout(() => {
      completeRitual();
      setIsCompleting(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pb-10 bg-gradient-to-b from-tribal-darker to-tribal-dark">
      <header className="px-4 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/programs")}
            className="border-tribal-gray-light text-tribal-purple hover:text-white hover:bg-tribal-purple"
          >
            Programmes
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={logout}
            className="border-tribal-gray-light text-white hover:bg-tribal-gray-light"
          >
            Déconnexion
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">{currentProgram.name}</h1>
            <span className="text-sm bg-tribal-gray-light px-2 py-1 rounded-full">
              Jour {user.progress.currentDay}/{currentProgram.duration}
            </span>
          </div>
          <ProgressBar 
            value={user.progress.currentDay} 
            max={currentProgram.duration} 
            className="h-1.5"
          />
        </div>
        
        <div className="tribal-card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{currentRitual.title}</h2>
            <span className="text-sm text-tribal-orange">
              {completedExercises}/{totalExercises}
            </span>
          </div>
          
          {currentRitual.description && (
            <p className="text-gray-400 mb-6">{currentRitual.description}</p>
          )}
          
          <div className="mb-4">
            <ProgressBar 
              value={completedExercises} 
              max={totalExercises} 
              className="h-2"
            />
          </div>
          
          <div className="stats flex gap-4 mb-6">
            <div className="tribal-card flex-1 p-3 text-center">
              <div className="text-sm text-gray-400">Série actuelle</div>
              <div className="text-xl font-bold">{user.progress.streak}</div>
            </div>
            <div className="tribal-card flex-1 p-3 text-center">
              <div className="text-sm text-gray-400">Total complété</div>
              <div className="text-xl font-bold">{user.progress.totalCompletedDays}</div>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4">Exercices à compléter</h3>
        
        <div className="space-y-4">
          {currentRitual.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onUpdate={updateExerciseProgress}
            />
          ))}
        </div>
        
        <div className="mt-8 sticky bottom-4">
          <Button 
            className={`w-full py-6 ${allExercisesCompleted ? 'tribal-btn-accent' : 'tribal-btn-primary opacity-70'}`} 
            onClick={handleCompleteRitual}
            disabled={isCompleting}
          >
            {isCompleting 
              ? "Validation en cours..." 
              : allExercisesCompleted 
                ? "Valider le rituel du jour" 
                : "Complétez tous les exercices pour valider"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
