import type { PurchaseResponse } from "@/api/shop/purchaseApi";
import Table from "@/components/common/table/Table";

// A type alias for the nested items property
type PurchaseItem = PurchaseResponse["purchases"][number]["items"][number];

type TableProps = {
  className?: string;
  data: PurchaseItem[];
};

const ItemsTable = ({ data, className }: TableProps) => {
  const columns = Object.keys(data[0]) as (keyof PurchaseItem)[];

  return <Table columns={columns} data={data} className={className} />;
};

export default ItemsTable;
