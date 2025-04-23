
import React from "react";
import { Program } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, TreeDeciduous, Flame, Zap, Waves } from "lucide-react";
import Image from "@/components/ui/image";

function getProgramIcon(id: string) {
  switch (id) {
    case "origin":
      return <Flame className="text-primary" size={20} />;
    case "rituels-nomades":
      return <Leaf className="text-primary" size={20} />;
    case "souffle-jaguar":
      return <Zap className="text-amber-400" size={20} />;
    case "corps-chene":
      return <TreeDeciduous className="text-primary" size={20} />;
    case "fureur-jaguar":
      return <Zap className="text-orange-500" size={20} />;
    case "maree-crocodile":
      return <Waves className="text-teal-500" size={20} />;
    default:
      return null;
  }
}

interface ProgramCardProps {
  program: Program & { illustration?: string };
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
      {program.illustration && (
        <div className="mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-lg">
          <Image 
            src={program.illustration} 
            alt={program.name} 
            className="w-full h-40 object-cover"
          />
        </div>
      )}
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary">
          {getProgramIcon(program.id)}
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1">
            {program.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {program.description}
          </p>
        </div>
      </div>
      
      <div className="mt-2 flex flex-wrap gap-2 mb-4">
        {program.focus.map((f, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="px-3 py-1 bg-secondary/10 text-secondary-foreground border-0 hover:bg-secondary/20"
          >
            {f}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-2">
        <Badge variant="outline" className="bg-secondary/50">
          {program.duration} jours
        </Badge>
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
