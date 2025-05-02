
import { Program, DailyRitual, Exercise } from "@/types";

export type ProgramContextType = {
  availablePrograms: Program[];
  currentProgram: Program | null;
  currentRitual: DailyRitual | null;
  selectProgram: (programId: string) => void;
  updateExerciseProgress: (exerciseId: string, value: number) => void;
  completeRitual: () => void;
  isLoading: boolean;
};
