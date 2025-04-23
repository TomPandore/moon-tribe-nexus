
import React from "react";
import Image from "./ui/image"; // We'll create this component for consistent image handling

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "vertical" | "horizontal";
}

const Logo: React.FC<LogoProps> = ({ 
  size = "md", 
  variant = "vertical" 
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  if (variant === "horizontal") {
    return (
      <Image 
        src="/lovable-uploads/cb565ffb-337d-463e-8fe2-94fce5287a66.png" 
        alt="MoHero Logo" 
        className={`h-10 object-contain ${size === 'lg' ? 'h-16' : size === 'sm' ? 'h-8' : 'h-10'}`}
      />
    );
  }
  
  return (
    <div className="flex items-center">
      <span className={`font-bold ${sizeClasses[size]} bg-gradient-tribal bg-clip-text text-transparent`}>
        Mo<span className="text-tribal-orange">Hero</span>
      </span>
    </div>
  );
};

export default Logo;

