
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProgramChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  newProgramName?: string;
}

const ProgramChangeDialog: React.FC<ProgramChangeDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  newProgramName,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Changer de programme ?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              En changeant de programme, <strong>toute votre progression actuelle sera définitivement supprimée</strong> et vous repartirez à zéro{newProgramName ? ` sur "${newProgramName}"` : ''}.
            </p>
            <p>
              Si vous revenez à ce programme à l'avenir, vous devrez recommencer depuis le jour 1.
            </p>
            <p>
              Êtes-vous sûr de vouloir continuer ?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">
            Confirmer et réinitialiser
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProgramChangeDialog;
