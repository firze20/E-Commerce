import LazySpinner from "@/components/LazySpinner";
import Product from "@/components/Product";
import Pagination from "./components/Pagination";
import Drawer from "./components/Drawer";
import { useQueryStore } from "@/hooks/shop/useQueryStore";
import { usePagination } from "@/context/shop/PaginationProvider";

const Shop = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const { data, isLoading, isSuccess, isError } = useQueryStore(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {isError ? <p className="text-red-900">There was a problem</p> : null}
      {isLoading ? <LazySpinner show /> : null}
      {isSuccess ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <Drawer />
          <Pagination
            totalPages={data?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-9">
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
