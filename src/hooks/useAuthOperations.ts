
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserProgress, UserClan } from "@/types";

export const useAuthOperations = (setUser: any) => {
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
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
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string, userMetadata?: Record<string, any>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            ...userMetadata
          }
        }
      });

      if (error) throw error;

      // If user selects a clan, update the profiles table with clan_id
      if (userMetadata?.clan) {
        try {
          // Get the user that was just created
          const { data: authUser } = await supabase.auth.getUser();
          
          if (authUser?.user) {
            // Find clan_id from clan name
            const { data: clanData } = await supabase
              .from('clans')
              .select('id')
              .eq('nom_clan', userMetadata.clan)
              .single();
            
            if (clanData) {
              // Update the profile with clan_id
              await supabase
                .from('profiles')
                .update({ clan_id: clanData.id })
                .eq('id', authUser.user.id);
            }
          }
        } catch (err) {
          console.error("Error linking clan to user:", err);
        }
      }

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
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateUserProgress = async (userId: string, currentProgress: UserProgress, newProgress: Partial<UserProgress>) => {
    try {
      const updatedProgress = {
        ...currentProgress,
        ...newProgress
      };
      
      const { error } = await supabase
        .from('profiles')
        .update({ progress: updatedProgress })
        .eq('id', userId);
        
      if (error) throw error;

      return updatedProgress;
    } catch (error: any) {
      toast({
        title: "Erreur de mise à jour",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateUserClan = async (userId: string, clanName: UserClan) => {
    try {
      // Find clan_id from clan name
      const { data: clanData, error: clanError } = await supabase
        .from('clans')
        .select('id')
        .eq('nom_clan', clanName)
        .single();
        
      if (clanError || !clanData) {
        throw new Error(`Clan "${clanName}" non trouvé`);
      }
      
      // Update the profile with clan_id
      const { error } = await supabase
        .from('profiles')
        .update({ clan_id: clanData.id })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Clan mis à jour",
        description: `Vous appartenez désormais au clan ${clanName}`,
      });
      
      return clanData.id;
    } catch (error: any) {
      toast({
        title: "Erreur de mise à jour du clan",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return { login, register, logout, updateUserProgress, updateUserClan };
};
