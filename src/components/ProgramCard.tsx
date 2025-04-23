
import React from "react";
import { Program } from "@/types";
import { Button } from "@/components/ui/button";
import placeholder from "/placeholder.svg";
import { Leaf, TreeDeciduous, Flame, Zap, Waves } from "lucide-react";

function getProgramIcon(id: string) {
  switch (id) {
    case "origin":
      return <Flame className="text-tribal-orange" size={26} />;
    case "rituels-nomades":
      return <Leaf className="text-tribal-green" size={26} />;
    case "souffle-jaguar":
      return <Zap className="text-[#eabb21]" size={26} />;
    case "corps-chene":
      return <TreeDeciduous className="text-tribal-green" size={26} />;
    case "fureur-jaguar":
      return <Zap className="text-tribal-orange" size={26} />;
    case "maree-crocodile":
      return <Waves className="text-[#53cdb7]" size={26} />;
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
  // Design simplifié, épuré, naturel :
  return (
    <div
      className={`
        bg-white border border-[#e4e9e1] rounded-xl transition-all hover:border-tribal-green group
        flex flex-col min-h-[210px] px-6 pt-6 pb-5 relative cursor-pointer
        ${isSelected ? "border-tribal-green ring-2 ring-tribal-green" : ""}
        hover:shadow-sm
      `}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      style={{ boxShadow: isSelected ? "0 3px 24px 0 #d6eada30" : undefined }}
    >
      <div className="flex flex-row items-center gap-3 mb-3">
        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#f8fafb] border border-[#ecf3e3]">
          {getProgramIcon(program.id)}
        </div>
        <h3 className="font-black text-lg tracking-tight text-[#293321] uppercase" style={{ fontFamily: "Oswald, 'Inter', sans-serif" }}>
          {program.name}
        </h3>
      </div>
      <p className="text-base text-[#4e593e] mb-4">{program.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {program.focus.map((f, i) => (
          <span
            key={i}
            className="bg-[#f5f9ef] text-[#41a162] border border-[#d9e9ca] px-2.5 py-1 text-xs rounded-full font-semibold tracking-tight"
            style={{ lineHeight: "1.3" }}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mb-1">
        <span className="block text-sm font-bold rounded-full px-3 py-0.5 bg-[#f5f9ef] text-[#4e593e]">{program.duration} jours</span>
        {/* Suppression du niveau de difficulté */}
      </div>
      <Button
        className={`
          w-full h-10 font-bold text-base rounded-lg mt-1
          ${isSelected
            ? "bg-tribal-green text-black border-2 border-tribal-green hover:bg-[#d6f483]"
            : "bg-[#f1f1f1] text-[#2f3432] border hover:bg-tribal-green hover:text-black"
          }
          transition-all duration-100
        `}
        onClick={e => {
          e.stopPropagation();
          onSelect();
        }}
        variant="default"
        style={{ letterSpacing: "0.01em" }}
      >
        {isSelected ? "Continuer" : "Choisir ce programme"}
      </Button>
      {isSelected && (
        <div className="absolute top-3 right-3 bg-tribal-green text-black font-extrabold text-xs px-3 py-1 rounded-full z-30 shadow">
          Sélectionné
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
