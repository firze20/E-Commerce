type TableProps = {
  className?: string;
  columns: string[];
  data: any[];
};

const Table = ({ columns, data, className }: TableProps) => {
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
          {data.map((row, index) => (
            <tr>
              <th>1</th>
            </tr>
          ))}
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
