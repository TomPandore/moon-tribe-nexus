
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showValue?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max, 
  className,
  showValue = false
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={cn("progress-tribal", className)}>
      <div 
        className="progress-tribal-fill transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
      {showValue && (
        <div className="text-xs text-white mt-1 text-right">
          {value}/{max}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
