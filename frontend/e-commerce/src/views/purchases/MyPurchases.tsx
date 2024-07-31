import { useQueryPurchases } from "@/hooks/purchases/useQueryPurchases";
import Table from "@/components/common/table/Table";

const MyPurchases = () => {

  const { data, isLoading, isSuccess, isError } = useQueryPurchases();

  return (
    <div>
      Your purchase history
      <Table columns={["Date", "Item", "Price"]} data={[]} />
    </div>
  )
}

export default MyPurchases
