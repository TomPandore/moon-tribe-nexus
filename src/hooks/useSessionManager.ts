
import { useState, useEffect } from "react";
import { Session, User, UserProgress, UserClan } from "@/types";
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
                .select('*, clans:clan_id(nom_clan, couleur_theme)')
                .eq('id', currentSession.user.id)
                .single();

              if (error) throw error;

              if (profile) {
                // Create a default progress object for new users
                const defaultProgress: UserProgress = {
                  currentDay: 1,
                  streak: 0,
                  totalCompletedDays: 0
                };
                
                // Type-safe handling of progress data
                let progressData: UserProgress;
                
                if (profile.progress) {
                  // Check if progress is an object with expected properties
                  const rawProgress = profile.progress as Record<string, any>;
                  progressData = {
                    currentDay: typeof rawProgress.currentDay === 'number' ? rawProgress.currentDay : 1,
                    streak: typeof rawProgress.streak === 'number' ? rawProgress.streak : 0,
                    totalCompletedDays: typeof rawProgress.totalCompletedDays === 'number' ? rawProgress.totalCompletedDays : 0,
                    currentProgram: rawProgress.currentProgram ? String(rawProgress.currentProgram) : undefined,
                    startDate: rawProgress.startDate ? String(rawProgress.startDate) : undefined,
                    lastCompletedDay: typeof rawProgress.lastCompletedDay === 'number' ? rawProgress.lastCompletedDay : undefined
                  };
                } else {
                  progressData = defaultProgress;
                }

                // Sync currentDay with jour_actuel if available
                if (profile.jour_actuel && profile.jour_actuel !== progressData.currentDay) {
                  progressData.currentDay = profile.jour_actuel;
                }

                // Sync currentProgram with programme_id if available
                if (profile.programme_id && !progressData.currentProgram) {
                  progressData.currentProgram = profile.programme_id;
                }

                // Get the clan from user metadata or from the joined clan data
                const userMetadata = currentSession.user.user_metadata || {};
                const clan = userMetadata.clan as UserClan | undefined;
                const clanFromDb = profile.clans ? profile.clans.nom_clan as UserClan : undefined;

                setUser({
                  id: currentSession.user.id,
                  email: currentSession.user.email!,
                  name: profile.name || userMetadata.name,
                  clan: clan || clanFromDb,
                  clanId: profile.clan_id,
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
