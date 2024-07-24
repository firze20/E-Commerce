import Drawer from "./components/Drawer";
import { useQueryCategories } from "@/hooks/shop/useQueryCategories";
import ListItems from "./components/ListItems";
import { usePagination } from "@/context/shop/PaginationProvider";
import { useState } from "react";

const Shop = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { data: categories } = useQueryCategories();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFiltersChange = (newFilters: Record<string, any>) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  return (
    <div>
      {categories ? (
        <Drawer
          categories={categories!}
          onFiltersChange={handleFiltersChange}
        />
      ) : null}
      <ListItems
        currentPage={currentPage}
        filters={filters}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Shop;
