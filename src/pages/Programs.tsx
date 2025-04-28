
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { usePrograms } from "@/hooks/usePrograms";
import ProgramSection from "@/components/programs/ProgramSection";
import ProgramChangeDialog from "@/components/programs/ProgramChangeDialog";
import { useToast } from "@/hooks/use-toast";

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const { selectProgram, currentProgram, isLoading: isProgramChanging } = useProgram();
  const { user } = useAuth();
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { data: programs = [], isLoading, error } = usePrograms();
  const { toast } = useToast();

  // Filtrer les programmes par type
  const freePrograms = programs.filter(p => p.category === "free");
  const premiumPrograms = programs.filter(p => p.category === "premium");
  
  console.log("Current programs:", { all: programs, free: freePrograms, premium: premiumPrograms });

  const handleProgramSelect = (programId: string) => {
    console.log(`Selecting program with ID: ${programId}`);
    
    // Vérifier si le programme existe dans la liste
    const programExists = programs.some(p => p.id === programId);
    if (!programExists) {
      toast({
        title: "Programme non trouvé",
        description: `Impossible de trouver le programme avec l'ID: ${programId}`,
        variant: "destructive"
      });
      return;
    }
    
    if (!currentProgram) {
      selectProgram(programId);
      toast({
        title: "Programme sélectionné",
        description: "Chargement du programme en cours...",
      });
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
      toast({
        title: "Programme modifié",
        description: "Chargement du nouveau programme en cours...",
      });
      setShowConfirmDialog(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  if (error) {
    console.error("Error in Programs component:", error);
  }

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

        {error ? (
          <div className="p-4 mb-8 bg-destructive/10 border border-destructive rounded-md">
            <h3 className="text-lg font-medium text-destructive mb-2">Erreur de chargement</h3>
            <p className="text-destructive/80">{error.message}</p>
            <p className="mt-2 text-sm text-muted-foreground">Essayez de rafraîchir la page ou contactez le support technique.</p>
          </div>
        ) : null}

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
