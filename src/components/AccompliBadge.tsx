
import React from "react";
import { Check } from "lucide-react";

const AccompliBadge: React.FC<{ animated?: boolean }> = ({ animated = true }) => (
  <span
    className={`
      inline-flex items-center gap-1 px-2 py-0.5 rounded-full 
      font-semibold text-xs bg-[#F2FCE2] text-[#8B5CF6] border border-[#C9F2B7]
      shadow-sm
      ${animated ? "animate-scale-in" : ""}
    `}
    style={{ minWidth: 80, justifyContent: "center" }}
  >
    <Check className="w-4 h-4 text-[#8B5CF6]" strokeWidth={3} />
    Accompli
  </span>
);

export default AccompliBadge;
