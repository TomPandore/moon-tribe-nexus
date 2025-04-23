
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ExerciseCard from "@/components/ExerciseCard";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Calendar, Trophy, Flame } from "lucide-react";

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
        description: "Complète tous les exercices avant de valider le rituel",
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
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background pattern */}
      <div className="absolute inset-0 tribal-pattern pointer-events-none"></div>
      
      <header className="relative z-10 container mx-auto pt-6 pb-4 px-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/programs")}
              className="border-tribal-green/70 text-tribal-green hover:bg-tribal-green/10"
            >
              Programmes
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="border-tribal-green/70 text-tribal-green hover:bg-tribal-green/10"
            >
              <LogOut size={16} className="mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      
      <main className="relative z-10 container mx-auto px-4 py-6 pb-20 max-w-3xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-tribal-green">{currentProgram.name}</h1>
            <div className="flex items-center bg-muted px-3 py-1 rounded-full">
              <Calendar size={16} className="mr-2 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Jour {user.progress.currentDay}/{currentProgram.duration}
              </span>
            </div>
          </div>
          <ProgressBar 
            value={user.progress.currentDay} 
            max={currentProgram.duration} 
            className="h-2"
          />
        </div>
        
        <div className="tribal-card mb-8 glass-panel">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-tribal-green">{currentRitual.title}</h2>
            <span className="text-sm text-tribal-orange font-medium">
              {completedExercises}/{totalExercises}
            </span>
          </div>
          
          {currentRitual.description && (
            <p className="text-muted-foreground mb-6">{currentRitual.description}</p>
          )}
          
          <div className="mb-6">
            <ProgressBar 
              value={completedExercises} 
              max={totalExercises} 
              className="h-2"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="tribal-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Flame size={20} className="text-tribal-orange" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Série actuelle</div>
                <div className="text-xl font-bold text-tribal-green">{user.progress.streak}</div>
              </div>
            </div>
            <div className="tribal-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Trophy size={20} className="text-tribal-orange" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total complété</div>
                <div className="text-xl font-bold text-tribal-green">{user.progress.totalCompletedDays}</div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-4 text-tribal-green">Exercices à compléter</h3>
        
        <div className="space-y-4 mb-20">
          {currentRitual.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onUpdate={updateExerciseProgress}
            />
          ))}
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border z-20">
          <div className="container max-w-3xl mx-auto">
            <Button 
              className={`w-full py-6 ${allExercisesCompleted ? 'bg-tribal-orange text-white' : 'bg-tribal-green/60 text-black'}`}
              onClick={handleCompleteRitual}
              disabled={isCompleting || !allExercisesCompleted}
              variant="default"
            >
              {isCompleting 
                ? "Validation en cours..." 
                : allExercisesCompleted 
                  ? "Valider le rituel du jour" 
                  : "Complète tous les exercices pour valider"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
