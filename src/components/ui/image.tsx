
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

  return (
    <>
      {isLoading && (
        <Skeleton 
          className={cn("w-full h-full", className)} 
        />
      )}
      <img 
        src={src} 
        alt={alt || "Image"}
        className={cn("", className, {
          "hidden": hasError,
          "invisible absolute": isLoading
        })} 
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
          console.error(`Failed to load image: ${src}`);
        }}
        {...props} 
      />
    </>
  );
};

export default Image;
