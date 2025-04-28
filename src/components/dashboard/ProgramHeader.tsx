
import React from "react";
import { Program } from "@/types";
import ProgressBar from "@/components/ProgressBar";

interface ProgramHeaderProps {
  program: Program;
  currentDay: number;
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({ program, currentDay }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{program.name}</h1>
      </div>
      <ProgressBar 
        value={currentDay} 
        max={program.duration} 
        className="h-2"
      />
    </div>
  );
};

export default ProgramHeader;
