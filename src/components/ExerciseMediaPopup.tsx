
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Video } from "lucide-react";

interface ExerciseMediaPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseName: string;
  videoUrl?: string;
}

const ExerciseMediaPopup: React.FC<ExerciseMediaPopupProps> = ({
  open,
  onOpenChange,
  exerciseName,
  videoUrl,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md bg-black/70 border-gold/40 rounded-xl shadow-gold relative px-0 pt-0"
        style={{
          boxShadow:
            "0 0 120px 0 #FFD70033, 0 1.5px 12px -2px #22df9955",
        }}
      >
        <div className="flex flex-col items-center p-5">
          <div className="mb-3 flex items-center gap-2">
            <Video className="text-gold animate-glow-gold" />
            <span className="text-lg font-bold text-gold drop-shadow-[0_1px_4px_#FFD700aa] tracking-wider">{exerciseName}</span>
          </div>
          {videoUrl ? (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black mb-1 border-2 border-gold/60 shadow-gold">
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
            <div className="w-full h-40 flex items-center justify-center text-jungle-green bg-black/40 border border-gold/50 rounded-lg">
              Vidéo non disponible
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseMediaPopup;

