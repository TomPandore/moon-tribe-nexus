
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Program } from "@/types";

export type ProgramType = {
  id: string;
  nom: string;
  description: string | null;
  duree_jours: number;
  type: string | null;
  tags: string[];
  image_url: string | null;
};

// Fonction pour transformer les données de Supabase en format Programme
const mapSupabaseToProgramFormat = (item: ProgramType): Program => {
  return {
    id: item.id,
    name: item.nom,
    description: item.description || "",
    duration: item.duree_jours,
    difficulty: "medium", // Valeur par défaut
    focus: item.tags || [],
    image: item.image_url || "/lovable-uploads/c5934c7a-812b-43ad-95e0-ca8200ca260e.png",
    illustration: item.image_url || "/lovable-uploads/c5934c7a-812b-43ad-95e0-ca8200ca260e.png",
    category: item.type?.toLowerCase().includes('principal') ? "premium" : "free"
  };
};

export const usePrograms = () => {
  return useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programmes")
        .select("*")
        .order("nom");

      if (error) {
        console.error("Error fetching programs:", error);
        throw error;
      }
      
      console.log("Programs fetched from Supabase:", data);
      // Transformer les données pour correspondre à l'interface Program
      const formattedPrograms = (data as ProgramType[]).map(mapSupabaseToProgramFormat);
      return formattedPrograms;
    }
  });
};
