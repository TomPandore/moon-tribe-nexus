
import { useState, useEffect } from "react";
import { User, Program } from "@/types";
import { checkDayProgression, advanceToNextDay } from "@/utils/dayProgression";
import { useToast } from "@/hooks/use-toast";

export const useDayProgression = (
  user: User | null,
  selectedProgram: Program | null,
  currentDay: number,
  dailyExercises: any[],
  isLoading: boolean,
  refetchExercises: () => void
) => {
  const [dayProgressChecked, setDayProgressChecked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAndAdvanceDay = async () => {
      if (
        user && 
        selectedProgram && 
        !isLoading && 
        dailyExercises.length > 0 && 
        !dayProgressChecked
      ) {
        try {
          const { shouldAdvance, allExercisesCompleted } = await checkDayProgression(user, dailyExercises);
          
          if (shouldAdvance) {
            console.log("New day detected, advancing to next day...");
            const success = await advanceToNextDay(
              user, 
              currentDay, 
              selectedProgram.duration
            );
            
            if (success) {
              const nextDay = currentDay + 1 > selectedProgram.duration ? 1 : currentDay + 1;
              
              const newProgress = {
                ...user.progress,
                currentDay: nextDay,
                lastCompletedDay: currentDay
              };
              
              toast({
                title: "Nouveau jour",
                description: allExercisesCompleted 
                  ? "Tous les exercices d'hier étaient complétés. Voici tes nouveaux exercices !"
                  : "Un nouveau jour commence, les exercices d'hier n'ont pas tous été complétés.",
              });
              
              setTimeout(() => refetchExercises(), 500);
            }
          }
          setDayProgressChecked(true);
        } catch (error) {
          console.error("Error in day progression check:", error);
        }
      }
    };
    
    checkAndAdvanceDay();
  }, [user, selectedProgram, dailyExercises, isLoading, dayProgressChecked]);

  return {
    dayProgressChecked,
    setDayProgressChecked
  };
};
