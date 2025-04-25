
import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { UserProgress } from "@/types";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider mounted");
    let mounted = true;

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user && mounted) {
            setIsLoading(true); // Indiquez que nous chargeons pendant la récupération du profil
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (profile && mounted) {
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
            } finally {
              if (mounted) setIsLoading(false);
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

    checkSession();
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, setUser, isLoading, setIsLoading };
};
