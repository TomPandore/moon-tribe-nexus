
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types";

interface ProgressionCheck {
  shouldAdvance: boolean;
  lastLoginDate: Date | null;
  allExercisesCompleted: boolean;
}

export async function checkDayProgression(
  user: User, 
  dailyExercises: any[]
): Promise<ProgressionCheck> {
  // Get the last login timestamp from local storage
  const lastLoginStr = localStorage.getItem(`last_login_${user.id}`);
  const lastLogin = lastLoginStr ? new Date(lastLoginStr) : null;
  const now = new Date();

  // Check if it's a new day compared to last login
  const isNewDay = lastLogin ? 
    (now.getDate() !== lastLogin.getDate() || 
     now.getMonth() !== lastLogin.getMonth() || 
     now.getFullYear() !== lastLogin.getFullYear()) : false;

  // Determine if all exercises were completed
  const totalExercises = dailyExercises.length;
  const completedExercises = dailyExercises.filter(ex => {
    const target = ex.type === "reps" ? ex.reps! : ex.duration!;
    return ex.completed >= target;
  }).length;
  
  const allExercisesCompleted = completedExercises === totalExercises && totalExercises > 0;
  
  // Save the current login timestamp
  localStorage.setItem(`last_login_${user.id}`, now.toISOString());
  
  return {
    shouldAdvance: isNewDay,
    lastLoginDate: lastLogin,
    allExercisesCompleted
  };
}

export async function advanceToNextDay(
  user: User,
  currentDay: number,
  programDuration: number
): Promise<boolean> {
  try {
    // Calculate the next day
    const nextDay = currentDay + 1;
    
    // If we've reached the end of the program, cycle back to day 1
    const newDay = nextDay > programDuration ? 1 : nextDay;
    
    // Update the user progress in Supabase
    const newProgress = {
      ...user.progress,
      currentDay: newDay,
      lastCompletedDay: currentDay,
      totalCompletedDays: user.progress.totalCompletedDays + 1
    };
    
    const { error } = await supabase
      .from('profiles')
      .update({ 
        progress: newProgress,
        jour_actuel: newDay
      })
      .eq('id', user.id);
      
    if (error) throw error;
    
    console.log(`Automatically advanced from day ${currentDay} to day ${newDay}`);
    return true;
  } catch (error) {
    console.error("Error during automatic day advancement:", error);
    return false;
  }
}
