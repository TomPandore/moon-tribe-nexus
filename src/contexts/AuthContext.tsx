
import React, { createContext, useContext } from "react";
import { User, UserProgress, Session, UserClan } from "@/types";
import { useSessionManager } from "@/hooks/useSessionManager";
import { useAuthOperations } from "@/hooks/useAuthOperations";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string, userMetadata?: Record<string, any>) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
  updateUserClan: (clan: UserClan) => Promise<string | undefined>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, isLoading, setUser } = useSessionManager();
  const { login, register, logout, updateUserProgress, updateUserClan } = useAuthOperations(setUser);

  const handleUpdateUserProgress = async (progress: Partial<UserProgress>) => {
    if (!user) return;
    
    try {
      const updatedProgress = await updateUserProgress(user.id, user.progress, progress);
      setUser({
        ...user,
        progress: updatedProgress
      });
    } catch (error) {
      console.error("Failed to update user progress:", error);
    }
  };
  
  const handleUpdateUserClan = async (clan: UserClan) => {
    if (!user) return;
    
    try {
      const clanId = await updateUserClan(user.id, clan);
      setUser({
        ...user,
        clan,
        clanId
      });
      return clanId;
    } catch (error) {
      console.error("Failed to update user clan:", error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        isLoading, 
        login, 
        register, 
        logout,
        updateUserProgress: handleUpdateUserProgress,
        updateUserClan: handleUpdateUserClan
      }}
    >
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
