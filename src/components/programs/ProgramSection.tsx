
import React from "react";
import { Program } from "@/types";
import ProgramCard from "@/components/ProgramCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface ProgramSectionProps {
  title: string;
  badge?: string;
  programs: Program[];
  isLoading: boolean;
  error: Error | null;
  onProgramSelect: (programId: string) => void;
  currentProgramId?: string;
}

const ProgramSection: React.FC<ProgramSectionProps> = ({
  title,
  badge,
  programs,
  isLoading,
  error,
  onProgramSelect,
  currentProgramId,
}) => {
  console.log(`Rendering ProgramSection: ${title}`, { 
    programsCount: programs.length, 
    isLoading, 
    currentProgramId 
  });
  
  if (programs.length > 0) {
    console.log(`First program in ${title}:`, programs[0]);
  }

  return (
    <section className="mb-12">
      <h2 className="text-lg md:text-xl font-medium mb-4 flex items-center">
        {title}
        {badge && (
          <span className="ml-3 badge badge-secondary">
            {badge}
          </span>
        )}
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
      ) : programs.length === 0 ? (
        <Alert className="mb-4">
          <AlertDescription>
            Aucun programme {title.toLowerCase()} disponible pour le moment.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map(program => (
            <ProgramCard
              key={program.id}
              program={program}
              onSelect={() => onProgramSelect(program.id)}
              isSelected={currentProgramId === program.id}
              simple
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProgramSection;
