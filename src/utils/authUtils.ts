
import { supabase } from "@/integrations/supabase/client";
import { UserProgress } from "@/types";
import { toast } from "@/hooks/use-toast";

export const handleLogin = async (email: string, password: string) => {
  console.log("Attempting login with:", email);
  
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    throw error;
  }
  
  console.log("Login successful, data:", data);
  toast({
    title: "Connexion réussie",
    description: "Bienvenue sur MoHero !",
  });
  
  return data;
};

export const handleRegister = async (email: string, password: string, name?: string) => {
  console.log("Attempting registration with:", email);
  
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name
      }
    }
  });

  if (error) {
    console.error("Registration error:", error);
    throw error;
  }
  
  console.log("Registration successful, data:", data);
  toast({
    title: "Inscription réussie",
    description: "Veuillez vérifier votre email pour confirmer votre compte.",
  });
  
  return data;
};

export const handleLogout = async () => {
  console.log("Attempting logout");
  
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error);
    throw error;
  }
  
  console.log("Logout successful");
  toast({
    title: "Déconnexion réussie",
    description: "À bientôt sur MoHero !",
  });
};

export const handleUpdateUserProgress = async (userId: string, progress: Partial<UserProgress>) => {
  console.log("Updating user progress for:", userId, progress);
  
  const { error, data } = await supabase
    .from('profiles')
    .update({ progress })
    .eq('id', userId);
    
  if (error) {
    console.error("Update progress error:", error);
    throw error;
  }
  
  console.log("Progress update successful, data:", data);
  return data;
};
