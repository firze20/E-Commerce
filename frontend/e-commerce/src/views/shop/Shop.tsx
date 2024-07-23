import LazySpinner from "@/components/LazySpinner";
import Product from "@/components/Product";
import Pagination from "./components/Pagination";
import Drawer from "./components/Drawer";
import { useQueryStore } from "@/hooks/shop/useQueryStore";
import { useQueryCategories } from "@/hooks/shop/useQueryCategories";
import { usePagination } from "@/context/shop/PaginationProvider";
import { useState } from "react";

const Shop = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { data, isLoading, isSuccess, isError } = useQueryStore(currentPage, filters);
  const { data: categories, isError: categoriesError } = useQueryCategories();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFiltersChange = (newFilters: Record<string, any>) => {
    setCurrentPage(1);
    setFilters(newFilters);
  };

  return (
    <div>
      {isError ? <p className="text-red-900">There was a problem</p> : null}
      {isLoading ? <LazySpinner show /> : null}
      {isSuccess ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          {categoriesError ? (
            <p className="text-red-900">There was a problem</p>
          ) : null}
          {categories ? <Drawer categories={categories!} onFiltersChange={handleFiltersChange} /> : null}
          {/* <Drawer categories={categories!} /> */}
          <Pagination
            totalPages={data?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <div className="flex flex-wrap justify-center gap-6 mb-9">
            {data?.items.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Shop;
