
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserProgress } from "@/types";

export type User = {
  id: string;
  email: string;
  name?: string;
  progress: UserProgress;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
};
