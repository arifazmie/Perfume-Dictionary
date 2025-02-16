import React from "react";
import PerfumeCard from "./PerfumeCard";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface Perfume {
  id: string;
  image_url: string;
  name: string;
  brand: { name: string };
  release_year: number;
  rating: number;
  gender: string;
  status: string[];
}

interface PerfumeGridProps {
  perfumes?: Perfume[];
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const PerfumeGrid = ({
  perfumes = [],
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}: PerfumeGridProps) => {
  return (
    <div className="w-full min-h-[850px] bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex justify-center">
                <Skeleton className="w-[340px] h-[420px]" />
              </div>
            ))
          : perfumes.map((perfume) => (
              <div key={perfume.id} className="flex justify-center">
                <PerfumeCard
                  id={perfume.id}
                  image={perfume.image_url}
                  name={perfume.name}
                  brand={perfume.brand?.name}
                  year={perfume.release_year}
                  rating={perfume.rating}
                  gender={perfume.gender}
                  status={perfume.status}
                />
              </div>
            ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                onClick={() => onPageChange(currentPage - 1)}
                isActive={currentPage > 1}
              />
            </Pagination.Item>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item key={page}>
                <Pagination.Link
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                isActive={currentPage < totalPages}
              />
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    </div>
  );
};

export default PerfumeGrid;
