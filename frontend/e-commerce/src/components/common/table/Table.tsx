/**
 * Represents a column in a table.
 * @template T The type of the data in the table.
 */
export type TableColumn<T> = {
  key: keyof T;
  header: string;
  className?: string;
  render?: (value: any, row: T) => JSX.Element;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
};

/**
 * A reusable table component.
 *
 * @template T - The type of data in the table rows.
 * @param {TableProps<T>} props - The props for the Table component.
 * @returns {JSX.Element} - The rendered table.
 */
const Table = <T,>({
  columns,
  data,
  className,
}: TableProps<T>): JSX.Element => {
  return (
    <table className={`table ${className}`}>
      {/* Table Head */}
      <thead>
        <tr>
          <th>#</th>
          {columns.map((column, index) => (
            <th key={index} className={column.className}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowIndex + 1}</td>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {column.render
                  ? column.render(row[column.key], row)
                  : String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
