import api from "./api";
import type { SearchFilters, SearchResult } from "../types/searchs.types";

/**
 * Recherche des répétiteurs selon les filtres actifs.
 * Endpoint conservé : GET /tutors
 * (le backend sera adapté pour retourner exactement la forme SearchResult)
 */
export async function searchTutors(
  filters: SearchFilters,
  page = 1
): Promise<SearchResult> {
  const params: Record<string, string | number> = { page };
  if (filters.subject)      params.subject = filters.subject;
  if (filters.level)        params.level = filters.level;
  if (filters.district)     params.district = filters.district;
  if (filters.maxPrice > 0) params.maxPrice = filters.maxPrice;

  const res = await api.get<SearchResult>("/tutors", { params });
  return res.data;
};
