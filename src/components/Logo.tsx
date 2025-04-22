
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };
  
  return (
    <div className="flex items-center">
      <span className={`font-bold ${sizeClasses[size]} bg-gradient-tribal bg-clip-text text-transparent`}>
        Mo<span className="text-tribal-orange">Hero</span>
      </span>
    </div>
  );
};

export default Logo;
