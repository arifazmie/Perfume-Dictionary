import { supabase } from "./supabase";
import type { Database } from "@/types/database.types";

export type FilterOptions = {
  categories?: string[];
  brands?: string[];
  notes?: string[];
  gender?: string;
  search?: string;
  page?: number;
  pageSize?: number;
};

export async function getPerfumes(filters: FilterOptions = {}) {
  const { page = 1, pageSize = 12 } = filters;
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let query = supabase
    .from("perfumes")
    .select(
      `
      *,
      brand:brand_id(name)
    `,
    )
    .range(start, end);

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  if (filters.gender) {
    query = query.eq("gender", filters.gender);
  }

  if (filters.brands?.length) {
    query = query.in("brand_id", filters.brands);
  }

  if (filters.categories?.length) {
    const perfumeIds = await supabase
      .from("perfume_categories")
      .select("perfume_id")
      .in("category_id", filters.categories);
    if (!perfumeIds.error && perfumeIds.data) {
      query = query.in(
        "id",
        perfumeIds.data.map((p) => p.perfume_id),
      );
    }
  }

  if (filters.notes?.length) {
    const perfumeIds = await supabase
      .from("perfume_notes")
      .select("perfume_id")
      .in("note_id", filters.notes);
    if (!perfumeIds.error && perfumeIds.data) {
      query = query.in(
        "id",
        perfumeIds.data.map((p) => p.perfume_id),
      );
    }
  }

  const { data: perfumes, error } = await query;

  if (error) throw error;

  // Separate count query
  const { count } = await supabase
    .from("perfumes")
    .select("*", { count: "exact", head: true });

  return { perfumes, totalPages: Math.ceil((count || 0) / pageSize) };
}

export async function getFilterOptions() {
  const [categoriesResponse, brandsResponse, notesResponse, genderCounts] =
    await Promise.all([
      supabase.from("categories").select(`
        id,
        name,
        count: perfume_categories!inner(perfume_id)
      `),
      supabase.from("brands").select(`
        id,
        name,
        count: perfumes!inner(id)
      `),
      supabase.from("notes").select(`
        id,
        name,
        count: perfume_notes!inner(perfume_id)
      `),
      Promise.all([
        supabase
          .from("perfumes")
          .select("*", { count: "exact" })
          .eq("gender", "Unisex"),
        supabase
          .from("perfumes")
          .select("*", { count: "exact" })
          .eq("gender", "Feminine"),
        supabase
          .from("perfumes")
          .select("*", { count: "exact" })
          .eq("gender", "Masculine"),
      ]),
    ]);

  if (categoriesResponse.error) throw categoriesResponse.error;
  if (brandsResponse.error) throw brandsResponse.error;
  if (notesResponse.error) throw notesResponse.error;
  if (genderCounts.error) throw genderCounts.error;

  return {
    categories: categoriesResponse.data.map((c) => ({
      id: c.id,
      label: c.name,
      count: c.count?.length || 0,
    })),
    brands: brandsResponse.data.map((b) => ({
      id: b.id,
      label: b.name,
      count: b.count?.length || 0,
    })),
    notes: notesResponse.data.map((n) => ({
      id: n.id,
      label: n.name,
      count: n.count?.length || 0,
    })),
    genders: [
      { id: "Unisex", label: "Unisex", count: genderCounts[0].count || 0 },
      { id: "Feminine", label: "Feminine", count: genderCounts[1].count || 0 },
      {
        id: "Masculine",
        label: "Masculine",
        count: genderCounts[2].count || 0,
      },
    ],
  };
}
