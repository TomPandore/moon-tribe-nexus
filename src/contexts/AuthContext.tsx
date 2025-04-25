
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserProgress, Session } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // 1. Établir l'écouteur d'état d'authentification AVANT de vérifier la session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        
        // Mise à jour synchrone de l'état de la session
        setSession(currentSession);
        
        // Si nous avons une session, planifier un traitement asynchrone avec setTimeout
        if (currentSession?.user) {
          // Utiliser setTimeout pour éviter les deadlocks avec l'API Supabase
          setTimeout(async () => {
            try {
              // Récupérer le profil de l'utilisateur
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .single();

              if (error) throw error;

              if (profile) {
                // Initialize default progress object if it's null
                const progressData: UserProgress = profile.progress ? 
                  profile.progress as UserProgress : 
                  {
                    currentDay: 1,
                    streak: 0,
                    totalCompletedDays: 0
                  };

                setUser({
                  id: currentSession.user.id,
                  email: currentSession.user.email!,
                  name: profile.name,
                  progress: progressData
                });
                console.log("User set from profile:", profile);
              }
              
              // Marquons le chargement comme terminé après avoir configuré l'utilisateur
              setIsLoading(false);
            } catch (error) {
              console.error("Error getting profile:", error);
              setIsLoading(false);
            }
          }, 0);
        } else {
          // Pas de session, définir l'utilisateur à null
          setUser(null);
          setIsLoading(false);
          console.log("User set to null");
        }
      }
    );

    // 2. PUIS vérifier la session existante
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        // Ne rien faire d'autre ici - la session sera traitée par l'écouteur onAuthStateChange
        console.log("Session check completed:", currentSession ? "Session exists" : "No session");
        
        // S'il n'y a pas de session, nous devons marquer le chargement comme terminé
        // car l'écouteur ne sera pas déclenché
        if (!currentSession) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoading(false);
      }
    };

    checkSession();
    
    // Nettoyer l'abonnement quand le composant se démonte
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fonction pour rafraîchir la session avant expiration
  useEffect(() => {
    if (session) {
      // Configuration d'un intervalle pour rafraîchir la session avant expiration
      // Généralement, la durée d'expiration par défaut est de 1 heure, donc nous rafraîchissons après 50 minutes
      const refreshInterval = setInterval(async () => {
        try {
          const { error } = await supabase.auth.refreshSession();
          if (error) throw error;
          console.log("Session refreshed successfully");
        } catch (error) {
          console.error("Error refreshing session:", error);
        }
      }, 50 * 60 * 1000); // 50 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [session]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting login with:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log("Login successful");
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur MoHero !",
      });
      
      // Ne pas définir isLoading à false ici, laissez l'écouteur onAuthStateChange s'en charger
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false); // Définir isLoading à false uniquement en cas d'erreur
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
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
      
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateUserProgress = async (progress: Partial<UserProgress>) => {
    if (!user) return;
    
    try {
      const updatedProgress = {
        ...user.progress,
        ...progress
      };
      
      const { error } = await supabase
        .from('profiles')
        .update({ progress: updatedProgress })
        .eq('id', user.id);
        
      if (error) throw error;

      setUser({
        ...user,
        progress: updatedProgress
      });
    } catch (error: any) {
      toast({
        title: "Erreur de mise à jour",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, login, register, logout, updateUserProgress }}>
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
