import { useQueryPurchases } from "@/hooks/purchases/useQueryPurchases";
import ItemsTable from "./components/ItemsTable";
import LazySpinner from "@/components/common/loading/LazySpinner";
import { formatDate } from "@/utils/formatDate";

const MyPurchases = () => {
  const { data, isLoading, isSuccess, isError } = useQueryPurchases();

  return (
    <div className="overflow-x-auto">
      <LazySpinner show={isLoading} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {isSuccess && data ? (
        data.purchases.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-secondary font-mono text-lg">Your purchase history</h2>
            {data.purchases.map((purchase, index) => (
              <div key={index} className="mt-5">
                <p className="text-info">{formatDate(purchase.createdAt)}</p>
                <p className="bg-neutral-600 text-neutral-50 rounded-lg">Spent: {purchase.totalPrice}$</p>
                <ItemsTable data={purchase.items} className="table-zebra table-xs table-fixed w-full mt-5" />
              </div>
            ))}
          </div>
        ) : (
          <p>Nothing to see here</p>
        )
      ) : (
        !isLoading && !isError && <p>You need to sign up or sign in to see your purchases</p>
      )}
    </div>
  );
};

export default MyPurchases;