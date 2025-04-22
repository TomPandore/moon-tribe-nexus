
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
        className="max-w-md bg-black/80 border-acid-yellow/30 rounded-xl shadow-acid relative px-0 pt-0 animate-scale-in"
        style={{
          boxShadow:
            "0 0 120px 0 rgba(175, 255, 0, 0.15), 0 1.5px 12px -2px rgba(46, 204, 64, 0.4)",
        }}
      >
        <div className="flex flex-col items-center p-5">
          <div className="mb-3 flex items-center gap-2">
            <Video className="text-acid-yellow animate-glow-tribal" />
            <span className="text-lg font-tribal uppercase tracking-wider text-acid-yellow drop-shadow-[0_1px_4px_rgba(175,255,0,0.7)]">{exerciseName}</span>
          </div>
          {videoUrl ? (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black mb-1 border-2 border-acid-yellow/40 shadow-acid">
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
            <div className="w-full h-40 flex items-center justify-center text-jungle-green bg-black/40 border border-acid-yellow/30 rounded-lg">
              Vidéo non disponible
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseMediaPopup;
