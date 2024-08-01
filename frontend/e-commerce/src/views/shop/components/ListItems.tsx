import { useQueryStore } from "@/hooks/shop/useQueryStore";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Product from "@/components/Product";
import Pagination from "../../../components/common/pagination/Pagination";

type ListItemsProps = {
  currentPage: number;
  filters: Record<string, any>;
  handlePageChange: (page: number) => void;
};

const ListItems = ({
  currentPage,
  filters,
  handlePageChange,
}: ListItemsProps) => {
  const { data, isLoading, isSuccess, isError } = useQueryStore(
    currentPage,
    filters
  );

  return (
    <div>
      {isError ? <p className="text-red-900">There was a problem</p> : null}
      {isLoading ? <LazySpinner show /> : null}
      {isSuccess ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          {/* <Drawer categories={categories!} /> */}
          <Pagination
            totalPages={data?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          {data?.items.length === 0 ? (
            <p>No results</p>
          ) : (
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
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ListItems;
