import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { programs } from "@/data/programs";

const getProgramsByCategory = (cat: "free" | "premium") => 
  programs.filter(p => p.category === cat);

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const { selectProgram, currentProgram, isLoading } = useProgram();
  const { user } = useAuth();

  const freePrograms = getProgramsByCategory("free");
  const premiumPrograms = getProgramsByCategory("premium");

  const handleProgramSelect = (programId: string) => {
    selectProgram(programId);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto pt-6 pb-4 px-4">
        <div className="flex justify-between items-center">
          <Logo />
          {/* Bouton déconnexion retiré sur demande */}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6 pb-20 max-w-4xl">
        <h1 className="text-2xl md:text-3xl mb-2 font-medium">
          Choisissez votre programme
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Explorez nos programmes d'entraînement et trouvez celui qui correspond à vos objectifs.
        </p>
        
        {/* Programmes Découverte */}
        <section className="mb-12">
          <h2 className="text-lg md:text-xl font-medium mb-4 flex items-center">
            Programmes Découverte
            <span className="ml-3 badge badge-secondary">
              Gratuit
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freePrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelect={() => handleProgramSelect(program.id)}
                isSelected={currentProgram?.id === program.id}
                simple
              />
            ))}
          </div>
        </section>
        
        {/* Programmes Premium */}
        <section>
          <h2 className="text-lg md:text-xl font-medium mb-4">
            Programmes Premium
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {premiumPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelect={() => handleProgramSelect(program.id)}
                isSelected={currentProgram?.id === program.id}
                simple
              />
            ))}
          </div>
        </section>
        
        {user && currentProgram && (
          <div className="mt-12 text-center">
            <Button
              className="bg-primary text-white font-medium text-base px-6 py-5 rounded-lg hover:bg-primary/90"
              onClick={() => navigate("/dashboard")}
              disabled={isLoading}
            >
              <ArrowUp className="mr-2 h-5 w-5" />
              Retourner à mon programme
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Programs;
