
import React from "react";
import { Program } from "@/types";
import { Button } from "@/components/ui/button";
import { Leaf, TreeDeciduous, Flame, Zap, Waves } from "lucide-react";

function getProgramIcon(id: string) {
  switch (id) {
    case "origin":
      return <Flame className="text-tribal-orange" size={28} />;
    case "rituels-nomades":
      return <Leaf className="text-tribal-green" size={28} />;
    case "souffle-jaguar":
      return <Zap className="text-[#eabb21]" size={28} />;
    case "corps-chene":
      return <TreeDeciduous className="text-tribal-green" size={28} />;
    case "fureur-jaguar":
      return <Zap className="text-tribal-orange" size={28} />;
    case "maree-crocodile":
      return <Waves className="text-[#53cdb7]" size={28} />;
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
        tribal-card transition-all overflow-hidden flex flex-col
        ${isSelected ? "border-tribal-green ring-1 ring-tribal-green" : ""}
        hover:shadow-xl hover:shadow-black/40 group
      `}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-secondary/70 border border-border">
          {getProgramIcon(program.id)}
        </div>
        <div>
          <h3 className="font-oswald text-xl text-tribal-green tracking-wide uppercase mb-1">
            {program.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {program.description}
          </p>
        </div>
      </div>
      
      <div className="mt-2 flex flex-wrap gap-1.5 mb-4">
        {program.focus.map((f, i) => (
          <span
            key={i}
            className="bg-muted text-tribal-green border border-muted px-2 py-0.5 text-xs rounded-full font-medium"
          >
            {f}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
          {program.duration} jours
        </span>
      </div>
      
      <Button
        className={`
          w-full h-11 font-bold text-base rounded-md mt-4
          ${isSelected
            ? "bg-tribal-green text-black border border-tribal-green hover:bg-[#d6f483]"
            : "bg-secondary text-tribal-green border hover:bg-tribal-green hover:text-black"
          }
          transition-all
        `}
        onClick={e => {
          e.stopPropagation();
          onSelect();
        }}
        variant="default"
      >
        {isSelected ? "Continuer" : "Choisir"}
      </Button>
      
      {isSelected && (
        <div className="absolute top-3 right-3 bg-tribal-green text-black font-bold text-xs px-3 py-1 rounded-full shadow-lg">
          Sélectionné
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
