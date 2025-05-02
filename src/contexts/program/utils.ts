
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Fonction pour supprimer toutes les progressions d'exercices d'un utilisateur
export const deleteUserExerciseProgress = async (userId: string) => {
  try {
    // Supprimer tous les enregistrements de progression pour cet utilisateur
    const { error } = await supabase
      .from('progression_exercice')
      .delete()
      .eq('user_id', userId);
      
    if (error) throw error;
    
    console.log("Progression des exercices supprimée avec succès");
    return true;
  } catch (error: any) {
    console.error("Erreur lors de la suppression de la progression:", error.message);
    toast({
      title: "Erreur de réinitialisation",
      description: "Impossible de supprimer l'historique des exercices",
      variant: "destructive"
    });
    return false;
  }
};
