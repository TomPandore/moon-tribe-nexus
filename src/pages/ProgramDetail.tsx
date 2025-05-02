
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProgram } from "@/contexts/program";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Program } from "@/types";
import Image from "@/components/ui/image";
import { Loader2, ChevronLeft, Check, Star } from "lucide-react";
import { usePrograms } from "@/hooks/usePrograms";
import { cn } from "@/lib/utils";
import ProgramPhases from "@/components/programs/ProgramPhases";

const ProgramDetail = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const { selectProgram, currentProgram, isLoading: isProgramChanging } = useProgram();
  const { data: programs = [], isLoading: isLoadingPrograms } = usePrograms();
  const { toast } = useToast();
  const [program, setProgram] = useState<Program | null>(null);

  // Récupérer les détails du programme
  useEffect(() => {
    if (!isLoadingPrograms && programId && programs.length > 0) {
      const foundProgram = programs.find(p => p.id === programId);
      if (foundProgram) {
        setProgram(foundProgram);
      } else {
        toast({
          title: "Programme non trouvé",
          description: "Impossible de trouver le programme demandé",
          variant: "destructive"
        });
        navigate("/programs");
      }
    }
  }, [programId, programs, isLoadingPrograms, toast, navigate]);

  if (isLoadingPrograms || !program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement du programme...</p>
        </div>
      </div>
    );
  }

  const handleSelectProgram = async () => {
    if (isProgramChanging) return;

    try {
      await selectProgram(program.id);
      toast({
        title: "Programme sélectionné",
        description: "Redirection vers votre rituel du jour...",
      });
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite",
        variant: "destructive",
      });
    }
  };

  // Générer le niveau de difficulté avec des étoiles
  const getDifficultyStars = () => {
    const maxStars = 5;
    let difficulty = 0;
    
    switch (program.difficulty) {
      case "easy": difficulty = 2; break;
      case "medium": difficulty = 3; break;
      case "hard": difficulty = 5; break;
      default: difficulty = 3;
    }
    
    return (
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={cn(
              i < difficulty ? "text-yellow-500 fill-yellow-500" : "text-gray-300",
              "mx-0.5"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header avec l'image du programme */}
      <div className="relative w-full h-64 md:h-80">
        <Image 
          src={program.illustration || program.image} 
          alt={program.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95"></div>
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 rounded-full p-2" 
          onClick={() => navigate("/programs")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 -mt-20 relative z-10 max-w-4xl">
        <div className="bg-card rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-muted-foreground">{program.duration} jours</span>
            <div className="h-4 w-px bg-muted"></div>
            {getDifficultyStars()}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {program.focus.map((tag, index) => (
              <Badge 
                key={index} 
                className="px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-foreground/80 mb-8">{program.description}</p>

          {/* Section "À quoi s'attendre" */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">À quoi s'attendre</h3>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {(program.resultats || program.focus).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                        <Check size={16} className="text-primary" />
                      </div>
                      <span>{program.resultats ? benefit : benefit === "Posture" 
                        ? "Améliorez votre posture" 
                        : benefit === "Mobilité" 
                          ? "Gagnez en mobilité et souplesse"
                          : benefit === "Force"
                            ? "Développez force et stabilité"
                            : benefit === "Respiration"
                              ? "Maîtrisez votre respiration"
                              : benefit === "Stress"
                                ? "Réduisez votre stress"
                                : `Travaillez votre ${benefit.toLowerCase()}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Aperçu du parcours */}
          <ProgramPhases program={program} />

          {/* Bouton pour choisir le programme */}
          <div className="mt-8">
            <Button
              onClick={handleSelectProgram}
              disabled={isProgramChanging}
              className="w-full py-6 text-lg"
            >
              {isProgramChanging ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Chargement...
                </>
              ) : currentProgram?.id === program.id ? (
                "Continuer ce programme"
              ) : (
                "Choisir ce programme"
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgramDetail;
