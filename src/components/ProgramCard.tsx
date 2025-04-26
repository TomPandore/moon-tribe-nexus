
import React from "react";
import { Program } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/image";

interface ProgramCardProps {
  program: Program;
  onSelect: () => void;
  isSelected?: boolean;
  simple?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onSelect,
  isSelected = false,
  simple = false
}) => {
  const imageUrl = program.illustration || program.image || "/lovable-uploads/c5934c7a-812b-43ad-95e0-ca8200ca260e.png";
  
  return (
    <div
      className={`
        app-card flex flex-col relative
        ${isSelected ? "border-primary ring-1 ring-primary/30" : ""}
      `}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      <div className="mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-lg">
        <Image 
          src={imageUrl} 
          alt={program.name} 
          className="w-full h-40 object-cover"
        />
      </div>
      
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-medium text-lg mb-1 text-left">
            {program.name}
            <span className="text-sm text-muted-foreground ml-2">({program.duration} jours)</span>
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 text-left">
            {program.description}
          </p>
        </div>
      </div>
      
      <div className="mt-4 mb-4 flex flex-wrap justify-start gap-2">
        {program.focus.slice(0, 3).map((f, i) => (
          <Badge
            key={i}
            variant="outline"
            className="px-3 py-1 bg-[#F1F1F1] text-foreground border-[#E5E5E5] hover:bg-[#E5E5E5]"
          >
            {f}
          </Badge>
        ))}
      </div>
      
      <Button
        className={`
          w-full h-10 font-medium text-sm rounded-lg mt-4
          ${isSelected
            ? "bg-primary text-white hover:bg-primary/90"
            : "bg-secondary text-foreground hover:bg-secondary/80"
          }
        `}
        onClick={e => {
          e.stopPropagation();
          onSelect();
        }}
        variant={isSelected ? "default" : "secondary"}
      >
        {isSelected ? "Continuer" : "Choisir"}
      </Button>
      
      {isSelected && (
        <div className="absolute top-3 right-3">
          <Badge variant="default" className="bg-primary">
            Sélectionné
          </Badge>
        </div>
      )}
    </div>
  );
};

export default ProgramCard;

