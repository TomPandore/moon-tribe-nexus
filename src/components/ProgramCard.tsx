import React from "react";
import { Program } from "@/types";
import { Button } from "@/components/ui/button";
import placeholder from "/placeholder.svg";
import { Leaf, Zap, TreeDeciduous, Waves, Flame } from "lucide-react";

type CardIconId = "origin" | "rituels-nomades" | "souffle-jaguar" | "corps-chene" | "fureur-jaguar" | "maree-crocodile";

function getProgramIcon(id: string) {
  switch (id) {
    case "origin":
      return <Flame className="text-[#ffb300]" size={26} />;
    case "rituels-nomades":
      return <Leaf className="text-[#45a162]" size={26} />;
    case "souffle-jaguar":
      return <Zap className="text-[#eabb21]" size={26} />;
    case "corps-chene":
      return <TreeDeciduous className="text-[#45a162]" size={26} />;
    case "fureur-jaguar":
      return <Zap className="text-[#eabb21]" size={26} />;
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
  simple = false,
}) => {
  if (simple) {
    return (
      <div
        className={`
          group bg-white border border-[#e4e9e1] rounded-2xl overflow-hidden shadow-sm transition-all
          hover:shadow-lg hover:border-tribal-green
          relative min-h-[250px] flex flex-col px-6 pt-7 pb-6 cursor-pointer
          ${isSelected ? "ring-2 ring-tribal-green border-tribal-green" : ""}
        `}
        onClick={onSelect}
        tabIndex={0}
        role="button"
        aria-pressed={isSelected}
      >
        <div className="flex flex-row items-center gap-3 mb-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f8ef] ring-1 ring-[#e4e9e1]">
            {getProgramIcon(program.id)}
          </div>
          <h3 className="font-black text-lg tracking-tight text-[#283321] uppercase" style={{ fontFamily: "Oswald, 'Inter', sans-serif" }}>
            {program.name}
          </h3>
        </div>
        <p className="text-sm text-[#4e593e] mb-4">{program.description}</p>
        <div className="flex flex-wrap gap-1 mb-6">
          {program.focus.map((f, i) => (
            <span key={i} className="bg-[#f0f1ef] text-[#45a162] px-2 py-1 text-xs rounded font-semibold tracking-tight">{f}</span>
          ))}
        </div>
        <Button
          className={`
            w-full h-10 font-bold text-base rounded-lg
            ${isSelected
              ? "bg-tribal-green text-black hover:bg-[#b1f206]"
              : "bg-[#f3f3f0] text-[#222] hover:bg-tribal-green hover:text-black"
            }
            transition
          `}
          onClick={e => {
            e.stopPropagation();
            onSelect();
          }}
          variant="default"
        >
          {isSelected ? "Continuer" : "Choisir ce programme"}
        </Button>
        {isSelected && (
          <div className="absolute top-3 right-3 bg-tribal-green/90 text-black font-extrabold text-xs px-3 py-1 rounded-full z-30 drop-shadow-sm">
            Sélectionné
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={`
        group bg-[#161616e8] border transition-all rounded-2xl overflow-hidden p-0 shadow-none
        border-[#24271d]
        hover:scale-[1.025] hover:shadow-lg
        relative min-h-[360px]
        ${isSelected ? "ring-2 ring-tribal-green border-tribal-green" : ""}
      `}
      onClick={onSelect}
    >
      <div className="h-32 w-full relative overflow-hidden neo-blur">
        <img
          src={program.image || placeholder}
          alt={program.name}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.75)" }}
          onError={e => (e.currentTarget.src = placeholder)}
        />
        <div className="absolute top-3 left-3 z-20 bg-[#181b0c]/80 rounded-full p-1">
          {getProgramIcon(program.id)}
        </div>
        {program.illustration && (
          <img
            src={program.illustration}
            alt=""
            className="absolute bottom-1 right-1 w-14 h-14 opacity-80 pointer-events-none"
            style={{mixBlendMode: "lighten"}}
          />
        )}
      </div>
      <div className="px-5 pt-4 pb-6 flex flex-col flex-1 justify-between h-[calc(100%-8rem)]">
        <h3 className="font-black text-lg tracking-tight mb-1 text-gradient-primary uppercase" style={{fontFamily: "Oswald, 'Inter', sans-serif"}}>{program.name}</h3>
        <p className="text-md text-tribal-green mb-2 font-semibold">{program.description}</p>
        <div className="flex gap-3 items-center mb-2 text-xs font-bold uppercase">
          <span className="py-0.5 px-2 rounded-md bg-[#161a10] text-tribal-yellow tracking-wide">
            {program.duration} jours
          </span>
          <span className="text-xs text-[#a9ca48]">
            Difficulté : {program.difficulty === "easy" ? "Débutant" : program.difficulty === "medium" ? "Intermédiaire" : "Avancé"}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {program.focus.map((f, i) => (
            <span key={i} className="bg-[#1b220e] text-[#ccff00] px-2 py-1 text-xs rounded-xl font-bold tracking-tight">{f}</span>
          ))}
        </div>
        <Button
          className={`
            w-full mt-auto h-11 font-black text-lg transition
            ${isSelected
              ? "bg-[#ccff00] text-black hover:bg-[#b9ed00]"
              : "bg-[#1d2612] text-[#afff00] hover:bg-[#273710] hover:text-[#111]"
            }
          `}
          onClick={e => {
            e.stopPropagation();
            onSelect();
          }}
          variant="default"
        >
          {isSelected ? "Continuer" : "Choisir ce programme"}
        </Button>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-tribal-green/90 text-black font-extrabold text-xs px-3 py-1 rounded-full z-30 drop-shadow">
          Sélectionné
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
