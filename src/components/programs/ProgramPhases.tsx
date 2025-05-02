
import React from "react";
import { Program } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface ProgramPhasesProps {
  program: Program;
}

const ProgramPhases: React.FC<ProgramPhasesProps> = ({ program }) => {
  // Utiliser parcours_resume s'il est disponible, sinon créer des phases dynamiquement
  const getPhases = () => {
    // Si nous avons des données de parcours_resume, utilisons-les
    if (program.parcours_resume && program.parcours_resume.length > 0) {
      return program.parcours_resume.map(phase => ({
        name: phase.titre,
        range: phase.sous_titre,
        description: phase.texte
      }));
    }
    
    // Sinon, créer dynamiquement les phases du programme basées sur sa durée
    const duration = program.duration;
    
    // Pour les programmes courts (moins de 10 jours), créer 2 phases
    if (duration < 10) {
      const phase1End = Math.floor(duration / 2);
      return [
        {
          name: "Fondation",
          range: `Jour 1-${phase1End}`,
          description: "Découverte et mise en place des bases"
        },
        {
          name: "Progression",
          range: `Jour ${phase1End + 1}-${duration}`,
          description: "Approfondissement et intégration"
        }
      ];
    } 
    // Pour les programmes moyens (10-21 jours), créer 3 phases
    else if (duration <= 21) {
      const phase1End = Math.floor(duration / 3);
      const phase2End = Math.floor(duration * 2 / 3);
      return [
        {
          name: "Découverte",
          range: `Jour 1-${phase1End}`,
          description: "Apprentissage des mouvements fondamentaux"
        },
        {
          name: "Adaptation",
          range: `Jour ${phase1End + 1}-${phase2End}`,
          description: "Intégration et progression"
        },
        {
          name: "Maîtrise",
          range: `Jour ${phase2End + 1}-${duration}`,
          description: "Perfectionnement et autonomie"
        }
      ];
    }
    // Pour les programmes longs, créer 4 phases
    else {
      const quarterDuration = Math.floor(duration / 4);
      return [
        {
          name: "Initiation",
          range: `Jour 1-${quarterDuration}`,
          description: "Découverte des principes fondamentaux"
        },
        {
          name: "Fondation",
          range: `Jour ${quarterDuration + 1}-${quarterDuration * 2}`,
          description: "Construction des bases solides"
        },
        {
          name: "Progression",
          range: `Jour ${quarterDuration * 2 + 1}-${quarterDuration * 3}`,
          description: "Intensification et approfondissement"
        },
        {
          name: "Maîtrise",
          range: `Jour ${quarterDuration * 3 + 1}-${duration}`,
          description: "Perfectionnement et autonomie"
        }
      ];
    }
  };

  const phases = getPhases();

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Aperçu du parcours</h3>
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            {phases.map((phase, index) => (
              <div key={index} className="relative mb-6 last:mb-0">
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">{phase.name}</h4>
                    <p className="text-sm text-muted-foreground">{phase.range}</p>
                  </div>
                </div>
                <div className="ml-3 pl-6 border-l border-muted">
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramPhases;
