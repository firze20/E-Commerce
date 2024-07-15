import LazySpinner from "@/components/LazySpinner";
import Product from "@/components/Product";
import Pagination from "@/components/Pagination";
import { useQueryStore } from "@/hooks/useQueryStore";
import { useNavigate } from "react-router-dom";

const Shop = () => {

  const { data, isLoading, isSuccess, isError } = useQueryStore();

 


  return (
    <div>
      <h2>Store Products!</h2>
      { isError ? (
        <p className="text-red-900">There was a problem</p>
      ) : null}
      {isLoading ? (
        <LazySpinner show />
      ) : null}
      { isSuccess ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <Pagination totalPages={data?.totalPages || 1} currentPage={data?.currentPage || 1} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-9">
          {
            data?.items.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))
          }
          </div>
        </div>
      ): null}
    </div>
  )
}

export default Shop