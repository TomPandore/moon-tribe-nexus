
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className, 
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback image
  const fallbackImage = "/lovable-uploads/c5934c7a-812b-43ad-95e0-ca8200ca260e.png";
  
  // Use the fallback image if the original source has an error
  const imageSrc = hasError ? fallbackImage : src;

  return (
    <>
      {isLoading && (
        <Skeleton 
          className={cn("w-full h-full", className)} 
        />
      )}
      <img 
        src={imageSrc} 
        alt={alt || "Image"}
        className={cn("", className, {
          "hidden": false, // On affiche toujours l'image maintenant
          "invisible absolute": isLoading
        })} 
        onLoad={() => setIsLoading(false)}
        onError={() => {
          console.log(`Trying to use fallback for: ${src}`);
          setIsLoading(false);
          setHasError(true);
        }}
        {...props} 
      />
    </>
  );
};

export default Image;
