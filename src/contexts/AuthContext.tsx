
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserProgress } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("AuthProvider mounted");
    let mounted = true;

    const setUpListener = () => {
      // Configuration de l'écouteur d'état d'authentification
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log("Auth state changed:", event, session?.user?.id);
          
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session?.user && mounted) {
              try {
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();

                if (profile && mounted) {
                  // Initialize default progress object if it's null
                  const progressData: UserProgress = profile.progress ? 
                    profile.progress as UserProgress : 
                    {
                      currentDay: 1,
                      streak: 0,
                      totalCompletedDays: 0
                    };

                  setUser({
                    id: session.user.id,
                    email: session.user.email!,
                    name: profile.name,
                    progress: progressData
                  });
                  console.log("User set from profile:", profile);
                }
              } catch (error) {
                console.error("Error getting profile:", error);
              }
            }
          } else if (event === 'SIGNED_OUT') {
            if (mounted) {
              setUser(null);
              console.log("User signed out, set to null");
            }
          }
          
          if (mounted) {
            setIsLoading(false);
          }
        }
      );

      return subscription;
    };

    // Vérifier la session actuelle au chargement initial
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log("No session found on load");
          if (mounted) setIsLoading(false);
        } else {
          console.log("Session found on load:", session.user?.id);
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile && mounted) {
              // Initialize default progress object if it's null
              const progressData: UserProgress = profile.progress ? 
                profile.progress as UserProgress : 
                {
                  currentDay: 1,
                  streak: 0,
                  totalCompletedDays: 0
                };

              setUser({
                id: session.user.id,
                email: session.user.email!,
                name: profile.name,
                progress: progressData
              });
              console.log("User set from profile on initial load:", profile);
            }
          } catch (error) {
            console.error("Error getting profile on initial load:", error);
          } finally {
            if (mounted) setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (mounted) setIsLoading(false);
      }
    };

    const subscription = setUpListener();
    checkSession();
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", email);
      setIsLoading(true);
      
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
      
      // Auth state change will handle setting the user
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false); // Set isLoading to false only on error
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
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur MoHero !",
      });
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
