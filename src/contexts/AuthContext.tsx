
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserProgress } from "@/types";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement et vérifier le localStorage
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("mohero_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Dans une vraie app, ceci serait une requête API
      // Ici on simule un login réussi
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        progress: {
          currentDay: 1,
          streak: 0,
          totalCompletedDays: 0
        }
      };
      
      setUser(mockUser);
      localStorage.setItem("mohero_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // Dans une vraie app, ceci serait une requête API
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        progress: {
          currentDay: 1,
          streak: 0,
          totalCompletedDays: 0
        }
      };
      
      setUser(mockUser);
      localStorage.setItem("mohero_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mohero_user");
  };

  const updateUserProgress = (progress: Partial<UserProgress>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        ...progress
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem("mohero_user", JSON.stringify(updatedUser));
  };

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
