import type { PurchaseResponse } from "@/api/shop/purchaseApi";

type TableProps = {
  className?: string;
  data: PurchaseResponse["purchases"];
};

const Table = ({ data, className }: TableProps) => {
  // If data is not empty, get columns from the keys of the first item
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="overflow-x-auto">
      <table className={`table ${className}`}>
        {/* Table Head */}
        <thead>
          <tr>
            {/* Table Headers */}
            <th></th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {/* Table Rows */}
          {/* Table Cells */}
          {/* {data.map((row, index) => (
            <tr>
              <th>{row.id}</th>
                <td>{row.createdAt}</td>
                <td>{row.items.map((item) => item.name).join(", ")}</td>
            </tr>
          ))} */}
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
