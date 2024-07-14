import { useQuery } from "@tanstack/react-query";
import { fetchStore, StoreDataResponse } from "@/api/storeApi";
import LazySpinner from "@/components/LazySpinner";

const Shop = () => {

  const { data, isLoading, isSuccess, isError } = useQuery<StoreDataResponse>({
    queryKey: ["store"],
    queryFn: fetchStore,
  });

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
          <h3>Products</h3>
          <ul>
            {data?.items.map((item) => (
              <li key={item.id}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <img src={item.image} alt={item.name} />
              </li>
            ))}
          </ul>
        </div>
      ): null}
    </div>
  )
}

export default Shop