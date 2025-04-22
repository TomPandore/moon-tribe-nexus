
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const { availablePrograms, selectProgram, currentProgram, isLoading } = useProgram();
  const { user, logout } = useAuth();
  
  const handleProgramSelect = (programId: string) => {
    selectProgram(programId);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pb-10 bg-gradient-to-b from-tribal-darker to-tribal-dark">
      <header className="px-4 py-4 flex justify-between items-center">
        <Logo />
        <Button 
          variant="outline" 
          size="sm"
          onClick={logout}
          className="border-tribal-gray-light text-tribal-purple hover:text-white hover:bg-tribal-purple"
        >
          Déconnexion
        </Button>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Choisissez votre programme</h1>
        <p className="text-gray-400 mb-8">
          Sélectionnez un programme qui correspond à vos objectifs et à votre niveau.
          Vous pouvez changer de programme à tout moment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availablePrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onSelect={() => handleProgramSelect(program.id)}
              isSelected={currentProgram?.id === program.id}
            />
          ))}
        </div>
        
        {user && currentProgram && (
          <div className="mt-10 text-center">
            <Button 
              className="tribal-btn-primary" 
              onClick={() => navigate("/dashboard")}
              disabled={isLoading}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Retourner à mon programme actuel
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Programs;
