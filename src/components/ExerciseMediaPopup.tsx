
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Video } from "lucide-react";

interface ExerciseMediaPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseName: string;
  videoUrl?: string;
}

const ExerciseMediaPopup: React.FC<ExerciseMediaPopupProps> = ({ open, onOpenChange, exerciseName, videoUrl }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-tribal-gray">
        <div className="flex flex-col items-center">
          <div className="mb-3 flex items-center gap-2">
            <Video className="text-tribal-purple" />
            <span className="text-lg font-bold">{exerciseName}</span>
          </div>
          {videoUrl ? (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black mb-1">
              <iframe
                src={videoUrl}
                title={exerciseName}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="w-full h-40 flex items-center justify-center text-gray-500 bg-tribal-gray-light rounded-lg">
              Vidéo non disponible
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseMediaPopup;

