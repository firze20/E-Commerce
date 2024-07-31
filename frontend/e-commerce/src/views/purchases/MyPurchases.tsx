import { useQueryPurchases } from "@/hooks/purchases/useQueryPurchases";
import Table from "@/components/common/table/Table";

const MyPurchases = () => {
  const { data, isLoading, isSuccess, isError } = useQueryPurchases();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {isSuccess && data ? (
        data.purchases.length > 0 ? (
          <>
            <h2>Your purchase history</h2>
            <Table data={data.purchases} />
          </>
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