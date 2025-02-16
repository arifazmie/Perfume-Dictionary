import React from "react";
import Navbar from "./navigation/Navbar";
import CategoryFilter from "./filters/CategoryFilter";
import PerfumeGrid from "./perfume/PerfumeGrid";
import { usePerfumes } from "@/hooks/usePerfumes";

const Home = () => {
  const {
    perfumes,
    loading,
    error,
    filters,
    updateFilters,
    filterOptions,
    totalPages,
  } = usePerfumes();

  const handleSearch = (query: string) => {
    updateFilters({ search: query });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const handleFilterChange = (
    category: string,
    id: string,
    checked: boolean,
  ) => {
    let filterKey: string;
    switch (category) {
      case "category":
        filterKey = "categories";
        break;
      case "brand":
        filterKey = "brands";
        break;
      case "note":
        filterKey = "notes";
        break;
      case "gender":
        filterKey = "gender";
        break;
      default:
        filterKey = category;
    }

    if (filterKey === "gender") {
      updateFilters({ [filterKey]: checked ? id : undefined });
    } else {
      const currentFilters = filters[filterKey] || [];
      const newFilters = checked
        ? [...currentFilters, id]
        : currentFilters.filter((f) => f !== id);
      updateFilters({ [filterKey]: newFilters });
    }
  };

  if (error) {
    return <div className="p-4">Error loading perfumes: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={handleSearch} />

      <main className="pt-16 flex">
        <CategoryFilter
          onFilterChange={handleFilterChange}
          categories={filterOptions?.categories}
          brands={filterOptions?.brands}
          notes={filterOptions?.notes}
          genders={filterOptions?.genders}
        />

        <div className="flex-1">
          {filters.search && (
            <div className="p-4 border-b">
              <p className="text-sm text-muted-foreground">
                Showing results for "{filters.search}"
              </p>
            </div>
          )}

          <PerfumeGrid
            loading={loading}
            perfumes={perfumes}
            currentPage={filters.page || 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
