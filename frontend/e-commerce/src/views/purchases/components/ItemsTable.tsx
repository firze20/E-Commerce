import type { PurchaseResponse } from "@/api/shop/purchaseApi";
import { TableColumn } from "@/components/common/table/Table";
import Table from "@/components/common/table/Table";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// A type alias for the nested items property
type PurchaseItem = PurchaseResponse["purchases"][number]["items"][number];

type TableProps = {
  className?: string;
  data: PurchaseItem[];
};

const ItemsTable = ({ data, className }: TableProps) => {
  const navigate = useNavigate();

  const handleNameClick = useCallback((id: number) => {
    navigate(`/shop/item/${id}`); 
  }, [navigate]);

  const columns: TableColumn<PurchaseItem>[] = [
    { 
      key: "name", 
      header: "Name", 
      className: "text-accent",
      render: (value, row) => (
        <span 
          onClick={() => handleNameClick(row.id)} 
          className="cursor-pointer text-primary hover:underline"
        >
          {value}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      className: "text-accent whitespace-nowrap",
      render: (value) => <span>{value}$</span>,
    },
    // { key: "description", header: "Description", className: "text-accent" },
    {
      key: "quantity",
      header: "Quantity",
      className: "text-accent whitespace-nowrap",
    },
    {
      key: "image",
      header: "Image",
      className: "text-accent",
      render: (value) => (
        <img src={value} alt="item" className="w-16 h-16 object-fit m-auto" />
      ),
    },
  ];

  return <Table columns={columns} data={data} className={className} />;
};

export default ItemsTable;
