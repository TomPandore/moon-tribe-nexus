
import React from "react";
import { Program } from "@/types";
import { Button } from "@/components/ui/button";
import ProgressBar from "./ProgressBar";
import placeholder from "/placeholder.svg";

interface ProgramCardProps {
  program: Program;
  onSelect: () => void;
  isSelected?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect, isSelected = false }) => {
  return (
    <div className={`tribal-card relative overflow-hidden cursor-pointer transition-all hover:translate-y-[-4px] ${isSelected ? 'border-tribal-purple' : ''}`} onClick={onSelect}>
      {isSelected && (
        <div className="absolute top-0 right-0 bg-tribal-purple text-white text-xs px-2 py-1 rounded-bl-md">
          Sélectionné
        </div>
      )}
      
      <div className="h-32 -mx-5 -mt-5 mb-4 overflow-hidden">
        <img 
          src={program.image || placeholder} 
          alt={program.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholder;
          }}
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-1">{program.name}</h3>
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{program.description}</p>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">Difficulté</span>
        <div className="flex items-center">
          <ProgressBar 
            value={program.difficulty === "easy" ? 1 : program.difficulty === "medium" ? 2 : 3} 
            max={3} 
            className="w-16 h-1"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400">Durée</span>
        <span className="text-sm font-medium">{program.duration} jours</span>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {program.focus.map((focus, index) => (
          <span 
            key={index} 
            className="text-xs bg-tribal-gray-light text-white px-2 py-1 rounded-full"
          >
            {focus}
          </span>
        ))}
      </div>
      
      <Button 
        className={isSelected ? "tribal-btn-accent w-full" : "tribal-btn-primary w-full"}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {isSelected ? "Continuer" : "Choisir ce programme"}
      </Button>
    </div>
  );
};

export default ProgramCard;
