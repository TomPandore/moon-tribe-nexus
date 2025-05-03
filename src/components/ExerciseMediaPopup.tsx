
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Video, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExerciseMediaPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseName: string;
  videoUrl?: string;
}

const ExerciseMediaPopup: React.FC<ExerciseMediaPopupProps> = ({ open, onOpenChange, exerciseName, videoUrl }) => {
  const isMobile = useIsMobile();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[90vw] mx-auto p-4 h-auto max-h-[90vh] my-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Video className="text-primary" size={18} />
            {exerciseName}
          </DialogTitle>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Fermer</span>
        </DialogClose>
        
        {videoUrl ? (
          <div className="w-full rounded-xl overflow-hidden bg-black mb-1">
            <AspectRatio ratio={9/16} className="bg-black">
              <iframe
                src={videoUrl}
                title={exerciseName}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </AspectRatio>
          </div>
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-gray-500 bg-muted rounded-lg">
            Vidéo non disponible
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseMediaPopup;
