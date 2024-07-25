import Drawer from "./components/Drawer";
import { useQueryCategories } from "@/hooks/shop/useQueryCategories";
import ListItems from "./components/ListItems";
import { usePagination } from "@/context/shop/PaginationProvider";
import { useFilters } from "@/context/shop/FilterProvider";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const {filters, setFilters} = useFilters();
  const { data: categories } = useQueryCategories();

  const [searchParams, setSearchParams] = useSearchParams();

   // Initialize state from URL search params
   useEffect(() => {
    const page = searchParams.get('page');
    const filterParams = searchParams.get('filters');
    
    if (page) setCurrentPage(Number(page));
    if (filterParams) setFilters(JSON.parse(filterParams));
  }, [searchParams, setCurrentPage, setFilters]);


  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString(), filters: JSON.stringify(filters) });
  }, [setCurrentPage, setSearchParams, filters]);

  const handleFiltersChange = useCallback((newFilters: Record<string, any>) => {
    // Only update filters and reset page if filters have changed
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
      setCurrentPage(1);
      setSearchParams({ page: '1', filters: JSON.stringify(newFilters) });
    }
  }, [filters, setCurrentPage, setFilters, setSearchParams]);

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
