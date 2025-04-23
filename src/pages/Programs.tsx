
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { programs } from "@/data/programs";

// Utilitaire pour split la liste par catégories
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
    <div className="min-h-screen bg-[#f8fafb] relative overflow-x-hidden transition-colors">
      <div className="w-full h-[140px] md:h-[190px] bg-gradient-to-b from-[#f4f7f3] to-[#f8fafb] flex items-end pb-8 mb-4">
        <img
          src="/lovable-uploads/b2241549-ce89-484c-98c7-e2cb86c69ba7.png"
          alt=""
          className="max-w-[220px] md:max-w-xs pointer-events-none opacity-80 absolute top-0 right-0"
          style={{ zIndex: 1 }}
        />
        <div className="container z-10">
          <Logo />
        </div>
      </div>
      <header className="container flex justify-end items-center mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="border-[#dedede] text-tribal-green hover:text-[#fff] hover:bg-tribal-green font-extrabold uppercase"
        >
          Déconnexion
        </Button>
      </header>
      <main className="container mx-auto px-2 sm:px-4 pb-12 z-10 relative">
        <h1
          className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-[#293321] uppercase"
          style={{
            letterSpacing: ".01em",
            fontFamily: "Oswald, 'Inter', sans-serif"
          }}
        >
          Choisis ton rituel MoHero
        </h1>
        <div className="max-w-2xl mx-auto text-lg text-[#586442] mb-10 font-medium text-center">
          <span>
            Explore les programmes gratuits ou découvre la <b className="text-tribal-green">Voie MoHero</b> pour transformer ta pratique.
          </span>
        </div>
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-black mb-5 tracking-tight text-[#45a162] uppercase" style={{fontFamily: "Oswald, 'Inter', sans-serif"}}>
            🌿 Programmes Découverte <span className="text-xs ml-2 rounded-full px-3 py-1 bg-[#eaf3e1] text-[#45a162] font-bold">Gratuit</span>
          </h2>
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
        <section>
          <h2 className="text-xl md:text-2xl font-black mb-5 tracking-tight text-[#b8833c] uppercase" style={{fontFamily: "Oswald, 'Inter', sans-serif"}}>
            🔥 Voie MoHero
          </h2>
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
              className="bg-tribal-green text-black font-black text-lg px-10 py-5 rounded-lg shadow hover:bg-[#b1f206]"
              onClick={() => navigate("/dashboard")}
              disabled={isLoading}
              variant="default"
            >
              <ArrowUp className="mr-2 h-5 w-5" />
              Retourner à mon programme actuel
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Programs;
