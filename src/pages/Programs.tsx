
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { ArrowUp, LogOut } from "lucide-react";
import { programs } from "@/data/programs";

const getProgramsByCategory = (cat) => programs.filter(p => p.category === cat);

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const { selectProgram, currentProgram, isLoading } = useProgram();
  const { user, logout } = useAuth();

  const freePrograms = getProgramsByCategory("free");
  const premiumPrograms = getProgramsByCategory("premium");

  const handleProgramSelect = (programId: string) => {
    selectProgram(programId);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background pattern */}
      <div className="absolute inset-0 tribal-pattern pointer-events-none"></div>
      
      <header className="relative z-10 container mx-auto pt-6 pb-4 px-4">
        <div className="flex justify-between items-center">
          <Logo />
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
      </header>
      
      <main className="relative z-10 container mx-auto px-4 py-6 pb-20">
        <h1 className="text-3xl md:text-4xl mb-3 text-tribal-green">
          Choisis ton rituel
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
          Explore les programmes gratuits ou découvre la <span className="text-tribal-green font-medium">Voie MoHero</span> pour transformer ta pratique.
        </p>
        
        {/* Programmes Découverte */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-muted w-1 h-8"></div>
            <h2 className="text-xl md:text-2xl font-bold text-tribal-green flex items-center">
              Programmes Découverte
              <span className="ml-3 text-xs py-1 px-3 rounded-full bg-muted text-tribal-green font-semibold">
                Gratuit
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        {/* Voie MoHero premium */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-tribal-orange w-1 h-8"></div>
            <h2 className="text-xl md:text-2xl font-bold text-tribal-orange flex items-center">
              Voie MoHero
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="bg-tribal-orange text-white font-bold text-lg px-8 py-6 rounded-md hover:bg-tribal-orange/90"
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
