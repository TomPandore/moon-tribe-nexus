
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { usePrograms } from "@/hooks/usePrograms";
import ProgramSection from "@/components/programs/ProgramSection";
import ProgramChangeDialog from "@/components/programs/ProgramChangeDialog";
import { Program } from "@/types";

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const { selectProgram, currentProgram, isLoading: isProgramChanging } = useProgram();
  const { user } = useAuth();
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { data: programs = [], isLoading, error } = usePrograms();

  // Filtrer les programmes par type
  const freePrograms = programs.filter(p => p.category === "free");
  const premiumPrograms = programs.filter(p => p.category === "premium");
  
  console.log("Current programs:", { all: programs, free: freePrograms, premium: premiumPrograms });

  const handleProgramSelect = (programId: string) => {
    console.log(`Selecting program with ID: ${programId}`);
    
    if (!currentProgram) {
      selectProgram(programId);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      return;
    }

    if (currentProgram.id === programId) {
      navigate("/dashboard");
      return;
    }

    setSelectedProgramId(programId);
    setShowConfirmDialog(true);
  };

  const handleConfirmProgramChange = () => {
    if (selectedProgramId) {
      console.log(`Confirming program change to ID: ${selectedProgramId}`);
      selectProgram(selectedProgramId);
      setShowConfirmDialog(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto pt-6 pb-4 px-4">
        <div className="flex justify-between items-center">
          <Logo />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20 max-w-4xl">
        <h1 className="text-2xl md:text-3xl mb-2 font-medium">
          Choisissez votre programme
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Explorez nos programmes d'entraînement et trouvez celui qui correspond à vos objectifs.
        </p>

        <ProgramSection
          title="Programmes Découverte"
          badge="Gratuit"
          programs={freePrograms}
          isLoading={isLoading}
          error={error}
          onProgramSelect={handleProgramSelect}
          currentProgramId={currentProgram?.id}
        />

        <ProgramSection
          title="La Voie MoHero"
          programs={premiumPrograms}
          isLoading={isLoading}
          error={error}
          onProgramSelect={handleProgramSelect}
          currentProgramId={currentProgram?.id}
        />

        {user && currentProgram && (
          <div className="mt-12 text-center">
            <Button
              className="bg-primary text-white font-medium text-base px-6 py-5 rounded-lg hover:bg-primary/90"
              onClick={() => navigate("/dashboard")}
              disabled={isProgramChanging}
            >
              <ArrowUp className="mr-2 h-5 w-5" />
              Retourner à mon programme
            </Button>
          </div>
        )}

        <ProgramChangeDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          onConfirm={handleConfirmProgramChange}
        />
      </main>
    </div>
  );
};

export default Programs;
