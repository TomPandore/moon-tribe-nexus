
export interface Program {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: "easy" | "medium" | "hard";
  focus: string[];
  image: string;
  illustration?: string;
  category?: "free" | "premium";
}

export type Exercise = {
  id: string;
  name: string;
  description?: string;
  reps?: number;
  duration?: number;
  type: "reps" | "duration";
  completed: number;
  image?: string;
  video?: string;
};

export type DailyRitual = {
  day: number;
  title: string;
  description?: string;
  exercises: Exercise[];
  completed: boolean;
};

export type UserProgress = {
  currentProgram?: string;
  currentDay: number;
  streak: number;
  totalCompletedDays: number;
  startDate?: string;
  lastCompletedDay?: number;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  progress: UserProgress;
};

