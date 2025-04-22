
export type Exercise = {
  id: string;
  name: string;
  description?: string;
  reps?: number;
  duration?: number;
  type: 'reps' | 'duration';
  completed: number;
  image?: string; // Ajout image illustrative (URL ou chemin public)
  video?: string; // Ajout URL vidéo (ex : YouTube ou mp4)
};

export type DailyRitual = {
  day: number;
  title: string;
  description?: string;
  exercises: Exercise[];
  completed: boolean;
};

export type Program = {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  focus: string[];
  image?: string;
};

export type UserProgress = {
  currentProgram?: string;
  currentDay: number;
  lastCompletedDay?: number;
  streak: number;
  totalCompletedDays: number;
  startDate?: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  progress: UserProgress;
};

