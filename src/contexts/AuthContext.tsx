
import React, { createContext, useContext } from "react";
import { AuthContextType } from "@/types/auth";
import { UserProgress } from "@/types"; 
import { useAuthState } from "@/hooks/useAuthState";
import { handleLogin, handleRegister, handleLogout, handleUpdateUserProgress } from "@/utils/authUtils";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, isLoading, setIsLoading } = useAuthState();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log("AuthContext: Starting login process");
      await handleLogin(email, password);
      console.log("AuthContext: Login process complete, waiting for auth state change");
    } catch (error: any) {
      console.error("AuthContext: Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      // Assurez-vous de toujours remettre isLoading à false
      console.log("AuthContext: Login finally block, setting isLoading to false");
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      console.log("AuthContext: Starting registration process");
      await handleRegister(email, password, name);
      console.log("AuthContext: Registration complete");
    } catch (error: any) {
      console.error("AuthContext: Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      console.log("AuthContext: Registration finally block, setting isLoading to false");
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("AuthContext: Starting logout process");
      await handleLogout();
      setUser(null);
      console.log("AuthContext: Logout complete, user set to null");
    } catch (error: any) {
      console.error("AuthContext: Logout error:", error);
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateUserProgress = async (progress: Partial<UserProgress>) => {
    if (!user) {
      console.warn("AuthContext: Cannot update progress, no user logged in");
      return;
    }
    
    try {
      console.log("AuthContext: Updating user progress:", progress);
      await handleUpdateUserProgress(user.id, progress);
      setUser({
        ...user,
        progress: {
          ...user.progress,
          ...progress
        }
      });
      console.log("AuthContext: Progress updated successfully");
    } catch (error: any) {
      console.error("AuthContext: Update progress error:", error);
      toast({
        title: "Erreur de mise à jour",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  console.log("AuthContext: Current auth state:", { user, isLoading });

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUserProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
