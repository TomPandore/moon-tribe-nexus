
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType } from "@/types/auth";
import { User } from "@/types/auth";
import { UserProgress } from "@/types"; 
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Set up Supabase auth state detection
  useEffect(() => {
    console.log("AuthProvider: Initializing");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("AuthProvider: Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          try {
            console.log("AuthProvider: Fetching profile after sign in");
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error) {
              console.error("AuthProvider: Error fetching profile:", error);
              setUser(null);
            } else if (profile) {
              const progressData = profile.progress ? profile.progress : {
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
              console.log("AuthProvider: User set from profile:", profile);
            }
          } catch (error) {
            console.error("AuthProvider: Error in auth state change:", error);
          } finally {
            setIsLoading(false);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        console.log("AuthProvider: User signed out, set to null");
        setIsLoading(false);
      }
    });

    // THEN check for existing session
    const checkSession = async () => {
      try {
        console.log("AuthProvider: Checking initial session");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("AuthProvider: Session error:", error);
          setIsLoading(false);
          return;
        }
        
        if (!session) {
          console.log("AuthProvider: No session found");
          setIsLoading(false);
          return;
        }

        console.log("AuthProvider: Session found, user ID:", session.user?.id);
        if (session.user) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profileError) {
              console.error("AuthProvider: Profile error:", profileError);
              setIsLoading(false);
              return;
            }

            if (profile) {
              const progressData = profile.progress ? profile.progress : {
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
              console.log("AuthProvider: User set from profile on init:", profile);
            }
          } catch (error) {
            console.error("AuthProvider: Error getting profile on init:", error);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("AuthProvider: Error checking session:", error);
        setIsLoading(false);
      }
    };

    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("AuthProvider: Login attempt with email:", email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("AuthProvider: Login error:", error);
        throw error;
      }
      
      console.log("AuthProvider: Login successful", data.user?.id);
      // Let the auth state listener update the user
      return data;
    } catch (error) {
      console.error("AuthProvider: Login error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      console.log("AuthProvider: Registration attempt with email:", email);
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
        console.error("AuthProvider: Registration error:", error);
        throw error;
      }
      
      console.log("AuthProvider: Registration successful");
      return data;
    } catch (error) {
      console.error("AuthProvider: Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log("AuthProvider: Logout attempt");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("AuthProvider: Logout error:", error);
        throw error;
      }
      
      setUser(null);
      console.log("AuthProvider: Logout successful");
    } catch (error) {
      console.error("AuthProvider: Logout error:", error);
      throw error;
    }
  };

  const updateUserProgress = async (progress: Partial<UserProgress>) => {
    if (!user) {
      console.warn("AuthProvider: Cannot update progress, no user logged in");
      return;
    }
    
    try {
      console.log("AuthProvider: Updating user progress");
      const { error, data } = await supabase
        .from('profiles')
        .update({ progress })
        .eq('id', user.id);
        
      if (error) {
        console.error("AuthProvider: Update progress error:", error);
        throw error;
      }
      
      setUser({
        ...user,
        progress: {
          ...user.progress,
          ...progress
        }
      });
      
      console.log("AuthProvider: Progress update successful");
      return data;
    } catch (error) {
      console.error("AuthProvider: Update progress error:", error);
      throw error;
    }
  };

  console.log("AuthProvider: Current state:", { user, isLoading });

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
