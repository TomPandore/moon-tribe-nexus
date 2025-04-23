
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showValue?: boolean;
  completed?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className,
  showValue = false,
  completed = false,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cn(
        "w-full h-1.5 rounded-full bg-gray-100 overflow-hidden transition-all duration-300",
        className
      )}
      aria-label="Progression de l'exercice"
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out",
          completed ? "bg-[#8B5CF6] animate-scale-in" : "bg-[#D6BCFA]"
        )}
        style={{
          width: `${percentage}%`,
        }}
      />
      {showValue && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {value}/{max}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
