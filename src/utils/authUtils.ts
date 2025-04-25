
// We'll no longer use this file since we've moved the auth logic directly into the AuthContext
// to avoid potential circular dependencies or issues with state synchronization

import { supabase } from "@/integrations/supabase/client";
import { UserProgress } from "@/types";

// These functions are kept for reference but are no longer being used
export const handleLogin = async (email: string, password: string) => {
  console.log("AuthUtils: Attempting login with email:", email);
  
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("AuthUtils: Login error:", error);
    throw error;
  }
  
  console.log("AuthUtils: Login successful", data.user?.id);
  return data;
};

export const handleRegister = async (email: string, password: string, name?: string) => {
  console.log("AuthUtils: Attempting registration with email:", email);
  
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || ""
      }
    }
  });

  if (error) {
    console.error("AuthUtils: Registration error:", error);
    throw error;
  }
  
  console.log("AuthUtils: Registration successful");
  return data;
};

export const handleLogout = async () => {
  console.log("AuthUtils: Attempting logout");
  
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("AuthUtils: Logout error:", error);
    throw error;
  }
  
  console.log("AuthUtils: Logout successful");
};

export const handleUpdateUserProgress = async (userId: string, progress: Partial<UserProgress>) => {
  console.log("AuthUtils: Updating user progress for:", userId);
  
  const { error, data } = await supabase
    .from('profiles')
    .update({ progress })
    .eq('id', userId);
    
  if (error) {
    console.error("AuthUtils: Update progress error:", error);
    throw error;
  }
  
  console.log("AuthUtils: Progress update successful");
  return data;
};
