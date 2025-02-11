export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      brands: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      notes: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      perfumes: {
        Row: {
          id: string;
          name: string;
          brand_id: string;
          release_year: number;
          gender: "Masculine" | "Feminine" | "Unisex";
          image_url: string | null;
          rating: number;
          status: ("NEW" | "LIMITED" | "BESTSELLER" | "DISCONTINUED")[];
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand_id: string;
          release_year?: number;
          gender: "Masculine" | "Feminine" | "Unisex";
          image_url?: string | null;
          rating?: number;
          status?: ("NEW" | "LIMITED" | "BESTSELLER" | "DISCONTINUED")[];
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          brand_id?: string;
          release_year?: number;
          gender?: "Masculine" | "Feminine" | "Unisex";
          image_url?: string | null;
          rating?: number;
          status?: ("NEW" | "LIMITED" | "BESTSELLER" | "DISCONTINUED")[];
          created_at?: string;
        };
      };
      perfume_categories: {
        Row: {
          perfume_id: string;
          category_id: string;
        };
        Insert: {
          perfume_id: string;
          category_id: string;
        };
        Update: {
          perfume_id?: string;
          category_id?: string;
        };
      };
      perfume_notes: {
        Row: {
          perfume_id: string;
          note_id: string;
          note_type: "top" | "heart" | "base";
        };
        Insert: {
          perfume_id: string;
          note_id: string;
          note_type: "top" | "heart" | "base";
        };
        Update: {
          perfume_id?: string;
          note_id?: string;
          note_type?: "top" | "heart" | "base";
        };
      };
    };
  };
}
