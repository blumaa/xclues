export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          user_id?: string
        }
        Relationships: []
      }
      connection_groups: {
        Row: {
          color: string | null
          connection: string
          connection_type: string
          created_at: string | null
          difficulty: string | null
          difficulty_score: number
          genre: string
          id: string
          items: Json
          last_used_at: string | null
          metadata: Json | null
          status: Database["public"]["Enums"]["group_status"]
          usage_count: number
        }
        Insert: {
          color?: string | null
          connection: string
          connection_type: string
          created_at?: string | null
          difficulty?: string | null
          difficulty_score: number
          genre?: string
          id?: string
          items: Json
          last_used_at?: string | null
          metadata?: Json | null
          status?: Database["public"]["Enums"]["group_status"]
          usage_count?: number
        }
        Update: {
          color?: string | null
          connection?: string
          connection_type?: string
          created_at?: string | null
          difficulty?: string | null
          difficulty_score?: number
          genre?: string
          id?: string
          items?: Json
          last_used_at?: string | null
          metadata?: Json | null
          status?: Database["public"]["Enums"]["group_status"]
          usage_count?: number
        }
        Relationships: []
      }
      connection_types: {
        Row: {
          active: boolean
          category: string
          created_at: string | null
          description: string
          examples: string[] | null
          genre: string
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          category: string
          created_at?: string | null
          description: string
          examples?: string[] | null
          genre?: string
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          category?: string
          created_at?: string | null
          description?: string
          examples?: string[] | null
          genre?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          rating: number
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: never
          rating: number
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: never
          rating?: number
          user_id?: string | null
        }
        Relationships: []
      }
      game_events: {
        Row: {
          created_at: string
          event_type: string
          genre: string
          id: number
          puzzle_date: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          genre: string
          id?: never
          puzzle_date: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          genre?: string
          id?: never
          puzzle_date?: string
          user_id?: string | null
        }
        Relationships: []
      }
      gameplay: {
        Row: {
          completed: boolean
          created_at: string | null
          groups_solved: number
          id: string
          mistakes_made: number
          puzzle_date: string
          puzzle_id: string
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string | null
          groups_solved?: number
          id?: string
          mistakes_made?: number
          puzzle_date: string
          puzzle_id: string
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string | null
          groups_solved?: number
          id?: string
          mistakes_made?: number
          puzzle_date?: string
          puzzle_id?: string
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gameplay_puzzle_id_fkey"
            columns: ["puzzle_id"]
            isOneToOne: false
            referencedRelation: "puzzles"
            referencedColumns: ["id"]
          },
        ]
      }
      generator_configs: {
        Row: {
          config: Json
          created_at: string | null
          created_by: string
          id: string
          name: string
        }
        Insert: {
          config: Json
          created_at?: string | null
          created_by: string
          id?: string
          name: string
        }
        Update: {
          config?: Json
          created_at?: string | null
          created_by?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      group_feedback: {
        Row: {
          accepted: boolean
          connection: string
          connection_type_id: string | null
          created_at: string | null
          explanation: string | null
          generation_filters: Json | null
          genre: string
          id: string
          items: Json
          rejection_reason: string | null
        }
        Insert: {
          accepted: boolean
          connection: string
          connection_type_id?: string | null
          created_at?: string | null
          explanation?: string | null
          generation_filters?: Json | null
          genre?: string
          id?: string
          items: Json
          rejection_reason?: string | null
        }
        Update: {
          accepted?: boolean
          connection?: string
          connection_type_id?: string | null
          created_at?: string | null
          explanation?: string | null
          generation_filters?: Json | null
          genre?: string
          id?: string
          items?: Json
          rejection_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_feedback_connection_type_id_fkey"
            columns: ["connection_type_id"]
            isOneToOne: false
            referencedRelation: "connection_types"
            referencedColumns: ["id"]
          },
        ]
      }
      item_usage: {
        Row: {
          created_at: string | null
          genre: string
          id: string
          item_title: string
          last_used_at: string
          usage_count: number
        }
        Insert: {
          created_at?: string | null
          genre: string
          id?: string
          item_title: string
          last_used_at?: string
          usage_count?: number
        }
        Update: {
          created_at?: string | null
          genre?: string
          id?: string
          item_title?: string
          last_used_at?: string
          usage_count?: number
        }
        Relationships: []
      }
      pipeline_config: {
        Row: {
          ai_generation_batch_size: number
          created_at: string | null
          enabled: boolean
          genre: string
          id: string
          min_groups_per_color: number
          rolling_window_days: number
          updated_at: string | null
        }
        Insert: {
          ai_generation_batch_size?: number
          created_at?: string | null
          enabled?: boolean
          genre: string
          id?: string
          min_groups_per_color?: number
          rolling_window_days?: number
          updated_at?: string | null
        }
        Update: {
          ai_generation_batch_size?: number
          created_at?: string | null
          enabled?: boolean
          genre?: string
          id?: string
          min_groups_per_color?: number
          rolling_window_days?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      puzzles: {
        Row: {
          created_at: string | null
          genre: string
          group_ids: string[]
          groups: Json | null
          id: string
          metadata: Json | null
          puzzle_date: string | null
          source: string
          status: Database["public"]["Enums"]["puzzle_status"]
          title: string | null
        }
        Insert: {
          created_at?: string | null
          genre?: string
          group_ids?: string[]
          groups?: Json | null
          id?: string
          metadata?: Json | null
          puzzle_date?: string | null
          source?: string
          status?: Database["public"]["Enums"]["puzzle_status"]
          title?: string | null
        }
        Update: {
          created_at?: string | null
          genre?: string
          group_ids?: string[]
          groups?: Json | null
          id?: string
          metadata?: Json | null
          puzzle_date?: string | null
          source?: string
          status?: Database["public"]["Enums"]["puzzle_status"]
          title?: string | null
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          created_at: string | null
          current_streak: number
          games_played: number
          games_won: number
          last_played_date: string | null
          max_streak: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number
          games_played?: number
          games_won?: number
          last_played_date?: string | null
          max_streak?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number
          games_played?: number
          games_won?: number
          last_played_date?: string | null
          max_streak?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_daily_puzzle: {
        Args: { genre_param?: string; puzzle_date_param?: string }
        Returns: {
          created_at: string | null
          genre: string
          group_ids: string[]
          groups: Json | null
          id: string
          metadata: Json | null
          puzzle_date: string | null
          source: string
          status: Database["public"]["Enums"]["puzzle_status"]
          title: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "puzzles"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_next_available_date: {
        Args: { genre_param?: string }
        Returns: string
      }
      get_puzzle_completion_rate: {
        Args: { puzzle_id_param: string }
        Returns: number
      }
      get_recently_used_items: {
        Args: { p_cooldown_days?: number; p_genre: string }
        Returns: {
          item_title: string
        }[]
      }
      get_user_configs: {
        Args: { user_id_param: string }
        Returns: {
          config: Json
          created_at: string | null
          created_by: string
          id: string
          name: string
        }[]
        SetofOptions: {
          from: "*"
          to: "generator_configs"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      group_has_cooldown_items: {
        Args: { p_cooldown_days?: number; p_group_id: string }
        Returns: boolean
      }
      has_played_today: {
        Args: { today?: string; user_id_param: string }
        Returns: boolean
      }
      increment_group_usage: {
        Args: { group_ids: string[] }
        Returns: undefined
      }
      is_admin: { Args: { user_id_param: string }; Returns: boolean }
      record_item_usage: {
        Args: { p_genre: string; p_item_titles: string[] }
        Returns: undefined
      }
    }
    Enums: {
      group_status: "pending" | "approved" | "rejected"
      puzzle_status: "pending" | "approved" | "published" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      group_status: ["pending", "approved", "rejected"],
      puzzle_status: ["pending", "approved", "published", "rejected"],
    },
  },
} as const
