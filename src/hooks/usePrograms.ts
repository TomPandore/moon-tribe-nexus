
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ProgramType = {
  id: string;
  nom: string;
  description: string | null;
  duree_jours: number;
  type: string | null;
  tags: string[];
  image_url: string | null;
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
      return data as ProgramType[];
    }
  });
};
