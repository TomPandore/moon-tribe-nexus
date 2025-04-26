export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercices: {
        Row: {
          categorie: string | null
          description: string | null
          id: string
          image_url: string | null
          jour_id: string
          nom: string
          ordre: number | null
          type: string
          valeur_cible: number
          video_url: string | null
        }
        Insert: {
          categorie?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          jour_id: string
          nom: string
          ordre?: number | null
          type: string
          valeur_cible: number
          video_url?: string | null
        }
        Update: {
          categorie?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          jour_id?: string
          nom?: string
          ordre?: number | null
          type?: string
          valeur_cible?: number
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercices_jour_id_fkey"
            columns: ["jour_id"]
            isOneToOne: false
            referencedRelation: "jours"
            referencedColumns: ["id"]
          },
        ]
      }
      jours: {
        Row: {
          id: string
          numero_jour: number
          programme_id: string
        }
        Insert: {
          id?: string
          numero_jour: number
          programme_id: string
        }
        Update: {
          id?: string
          numero_jour?: number
          programme_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jours_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          jour_actuel: number | null
          name: string | null
          programme_id: string | null
          progress: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          jour_actuel?: number | null
          name?: string | null
          programme_id?: string | null
          progress?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          jour_actuel?: number | null
          name?: string | null
          programme_id?: string | null
          progress?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
        ]
      }
      programmes: {
        Row: {
          description: string | null
          duree_jours: number
          id: string
          image_url: string | null
          nom: string
          tags: string[] | null
          type: string | null
        }
        Insert: {
          description?: string | null
          duree_jours?: number
          id?: string
          image_url?: string | null
          nom: string
          tags?: string[] | null
          type?: string | null
        }
        Update: {
          description?: string | null
          duree_jours?: number
          id?: string
          image_url?: string | null
          nom?: string
          tags?: string[] | null
          type?: string | null
        }
        Relationships: []
      }
      progression_exercice: {
        Row: {
          date: string | null
          exercice_id: string
          id: string
          jour_numero: number | null
          termine: boolean | null
          user_id: string
          valeur_realisee: number
        }
        Insert: {
          date?: string | null
          exercice_id: string
          id?: string
          jour_numero?: number | null
          termine?: boolean | null
          user_id: string
          valeur_realisee: number
        }
        Update: {
          date?: string | null
          exercice_id?: string
          id?: string
          jour_numero?: number | null
          termine?: boolean | null
          user_id?: string
          valeur_realisee?: number
        }
        Relationships: [
          {
            foreignKeyName: "progression_exercice_exercice_id_fkey"
            columns: ["exercice_id"]
            isOneToOne: false
            referencedRelation: "exercices"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
