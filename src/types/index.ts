
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
  clanId?: string;
  resultats?: string[];
  parcours_resume?: any[];
  niveau_difficulte?: string;
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

export type UserClan = "ONOTKA" | "EKLOA" | "OKWÁHO";

export type Clan = {
  id: string;
  nom_clan: UserClan;
  tagline: string;
  description: string;
  rituel_entree: string;
  image_url?: string;
  couleur_theme: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  clan?: UserClan;
  clanId?: string;
  progress: UserProgress;
};

export type Session = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: any;
};
