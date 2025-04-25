
import { useState, useEffect } from "react";
import { Session, User } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export const useSessionManager = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        
        // Synchronous session update
        setSession(currentSession);
        
        // If we have a session, schedule async processing
        if (currentSession?.user) {
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .single();

              if (error) throw error;

              if (profile) {
                const progressData = profile.progress ? 
                  profile.progress : 
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
              
              setIsLoading(false);
            } catch (error) {
              console.error("Error getting profile:", error);
              setIsLoading(false);
            }
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
          console.log("User set to null");
        }
      }
    );

    // Check existing session
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Session check completed:", currentSession ? "Session exists" : "No session");
        
        if (!currentSession) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoading(false);
      }
    };

    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Session refresh effect
  useEffect(() => {
    if (session) {
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

  return { user, session, isLoading, setUser };
};
