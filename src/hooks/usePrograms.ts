
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
  clan_id: string | null;
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
    category: item.type?.toLowerCase().includes('principal') ? "premium" : "free",
    clanId: item.clan_id || undefined
  };
};

export const usePrograms = (clanId?: string) => {
  return useQuery({
    queryKey: ["programs", clanId],
    queryFn: async () => {
      console.log(`Fetching programs from Supabase${clanId ? ` for clan ${clanId}` : ''}...`);
      
      try {
        let query = supabase
          .from("programmes")
          .select("*")
          .order("nom");
          
        if (clanId) {
          // If clan ID is provided, filter by clan or get programs without clan
          query = query.or(`clan_id.eq.${clanId},clan_id.is.null`);
        }
        
        const { data, error } = await query;

        if (error) {
          console.error("Error fetching programs:", error);
          throw error;
        }
        
        console.log("Programs fetched from Supabase:", data);
        
        if (!data || data.length === 0) {
          console.warn("No programs found in Supabase!");
          return [];
        }
        
        // Transformer les données pour correspondre à l'interface Program
        const formattedPrograms = (data as ProgramType[]).map(item => {
          console.log(`Mapping program: ${item.id} - ${item.nom}`);
          return mapSupabaseToProgramFormat(item);
        });
        
        console.log("Formatted programs:", formattedPrograms);
        return formattedPrograms;
      } catch (err) {
        console.error("Error in usePrograms:", err);
        throw err;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false
  });
};

// Hook to fetch clan-specific programs
export const useClanPrograms = (clanId?: string) => {
  return useQuery({
    queryKey: ["clan-programs", clanId],
    queryFn: async () => {
      if (!clanId) return [];
      
      console.log(`Fetching clan-specific programs for clan ${clanId}...`);
      
      try {
        const { data, error } = await supabase
          .from("programmes")
          .select("*")
          .eq("clan_id", clanId)
          .order("nom");

        if (error) {
          console.error("Error fetching clan programs:", error);
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.warn(`No clan-specific programs found for clan ${clanId}`);
          return [];
        }
        
        const formattedPrograms = (data as ProgramType[]).map(item => {
          return mapSupabaseToProgramFormat(item);
        });
        
        return formattedPrograms;
      } catch (err) {
        console.error("Error in useClanPrograms:", err);
        throw err;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!clanId
  });
};

// Hook to fetch clan data
export const useClans = () => {
  return useQuery({
    queryKey: ["clans"],
    queryFn: async () => {
      console.log("Fetching clans from Supabase...");
      
      try {
        const { data, error } = await supabase
          .from("clans")
          .select("*")
          .order("nom_clan");

        if (error) {
          console.error("Error fetching clans:", error);
          throw error;
        }
        
        console.log("Clans fetched from Supabase:", data);
        return data || [];
      } catch (err) {
        console.error("Error in useClans:", err);
        throw err;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false
  });
};
