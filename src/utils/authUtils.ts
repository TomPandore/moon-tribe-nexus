
import { supabase } from "@/integrations/supabase/client";
import { UserProgress } from "@/types";
import { toast } from "@/hooks/use-toast";

export const handleLogin = async (email: string, password: string) => {
  console.log("Attempting login with:", email);
  
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  
  console.log("Login successful, data:", data);
  toast({
    title: "Connexion réussie",
    description: "Bienvenue sur MoHero !",
  });
};

export const handleRegister = async (email: string, password: string, name?: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name
      }
    }
  });

  if (error) throw error;

  toast({
    title: "Inscription réussie",
    description: "Veuillez vérifier votre email pour confirmer votre compte.",
  });
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  
  toast({
    title: "Déconnexion réussie",
    description: "À bientôt sur MoHero !",
  });
};

export const handleUpdateUserProgress = async (userId: string, progress: Partial<UserProgress>) => {
  const { error } = await supabase
    .from('profiles')
    .update({ progress })
    .eq('id', userId);
    
  if (error) throw error;
};
