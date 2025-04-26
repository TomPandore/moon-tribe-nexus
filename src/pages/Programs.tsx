import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProgram } from "@/contexts/ProgramContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { usePrograms } from "@/hooks/usePrograms";
import { Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription as AlertDialogDescription2, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const { selectProgram, currentProgram, isLoading: isProgramChanging } = useProgram();
  const { user } = useAuth();
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { data: programs, isLoading, error } = usePrograms();

  const premiumPrograms = programs?.filter(p => p.type === "premium") || [];
  const freePrograms = programs?.filter(p => p.type === "free") || [];

  const handleProgramSelect = (programId: string) => {
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

        {/* Programmes Découverte */}
        <section className="mb-12">
          <h2 className="text-lg md:text-xl font-medium mb-4 flex items-center">
            Programmes Découverte
            <span className="ml-3 badge badge-secondary">
              Gratuit
            </span>
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                Une erreur est survenue lors du chargement des programmes.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {freePrograms.map(program => (
                <ProgramCard
                  key={program.id}
                  program={{
                    id: program.id,
                    name: program.nom,
                    description: program.description || "",
                    duration: program.duree_jours,
                    difficulty: "medium",
                    focus: program.tags,
                    image: program.image_url || "",
                    category: "free"
                  }}
                  onSelect={() => handleProgramSelect(program.id)}
                  isSelected={currentProgram?.id === program.id}
                  simple
                />
              ))}
            </div>
          )}
        </section>

        {/* Section La Voie MoHero */}
        <section>
          <h2 className="text-lg md:text-xl font-medium mb-4">La Voie MoHero</h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                Une erreur est survenue lors du chargement des programmes.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {premiumPrograms.map(program => (
                <ProgramCard
                  key={program.id}
                  program={{
                    id: program.id,
                    name: program.nom,
                    description: program.description || "",
                    duration: program.duree_jours,
                    difficulty: "medium",
                    focus: program.tags,
                    image: program.image_url || "",
                    category: "premium"
                  }}
                  onSelect={() => handleProgramSelect(program.id)}
                  isSelected={currentProgram?.id === program.id}
                  simple
                />
              ))}
            </div>
          )}
        </section>

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

        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Changer de programme ?</AlertDialogTitle>
              <AlertDialogDescription2>
                Attention, en changeant de programme, vous perdrez toute votre progression actuelle et repartirez à zéro. Êtes-vous sûr de vouloir continuer ?
              </AlertDialogDescription2>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmProgramChange}>
                Confirmer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default Programs;
