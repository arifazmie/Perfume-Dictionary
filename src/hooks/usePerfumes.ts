import { useState, useEffect } from "react";
import { getPerfumes, getFilterOptions, type FilterOptions } from "@/lib/api";

export function usePerfumes(initialFilters: FilterOptions = {}) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [perfumes, setPerfumes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [{ perfumes: perfumesData, totalPages: total }, options] =
          await Promise.all([
            getPerfumes(filters),
            !filterOptions && getFilterOptions(),
          ]);
        setPerfumes(perfumesData);
        setTotalPages(total);
        if (options) setFilterOptions(options);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filters]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  return {
    perfumes,
    loading,
    error,
    filters,
    updateFilters,
    filterOptions,
    totalPages,
  };
}
