
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
    <div className="min-h-screen bg-[#0f0f0f] relative overflow-x-hidden">
      {/* Texture de fond tribale */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        background: "url(/lovable-uploads/1b6475fd-aa0b-4602-9a08-ff76c3a326c0.png) repeat center center",
        opacity: 0.033,
        mixBlendMode: "lighten"
      }}/>
      <header className="px-4 py-4 flex justify-between items-center z-10 relative">
        <Logo />
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="border-[#242b19] text-tribal-green hover:text-[#222] hover:bg-tribal-green font-extrabold uppercase"
        >
          Déconnexion
        </Button>
      </header>
      <main className="container mx-auto px-4 py-8 z-10 relative">
        <h1
          className="
            text-4xl md:text-5xl font-black mb-2 tracking-tight text-gradient-primary uppercase
          "
          style={{
            letterSpacing: ".03em",
            fontFamily: "Oswald, 'Inter', sans-serif"
          }}
        >
          Choisis ton rituel MoHero
        </h1>
        <div className="max-w-2xl mx-auto text-lg text-[#b9e850e8] mb-12 font-semibold text-center">
          <span>Explore les programmes gratuits pour découvrir ou débloque l’expérience complète MoHero avec la Voie MoHero.</span>
        </div>
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-[#ccff00] uppercase" style={{fontFamily: "Oswald, 'Inter', sans-serif"}}>
            🌿 Programmes Découverte <span className="text-xs ml-2 rounded-full px-3 py-1 bg-[#1d220c] text-[#b0e042]">Gratuit</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {freePrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelect={() => handleProgramSelect(program.id)}
                isSelected={currentProgram?.id === program.id}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-[#ffb300] uppercase" style={{fontFamily: "Oswald, 'Inter', sans-serif"}}>
            🔥 Voie MoHero
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelect={() => handleProgramSelect(program.id)}
                isSelected={currentProgram?.id === program.id}
              />
            ))}
          </div>
        </section>
        {user && currentProgram && (
          <div className="mt-12 text-center">
            <Button
              className="bg-[#ccff00] text-black font-black text-lg px-10 py-5 rounded-lg shadow transition hover:bg-[#b8eb00]"
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
