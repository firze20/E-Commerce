type TableProps<T> = {
    columns: (keyof T)[];
    data: T[];
    className?: string;
}

/**
 * A reusable table component.
 *
 * @template T - The type of data in the table rows.
 * @param {TableProps<T>} props - The props for the Table component.
 * @returns {JSX.Element} - The rendered table.
 */
const Table = <T,>({columns, data, className}: TableProps<T>): JSX.Element => {
  return (
    <table className={`table ${className}`}>
        {/* Table Head */}
        <thead>
            <tr>
                <th></th>
                {columns.map((column, index) => (
                    <th key={index}>{String(column)}</th>
                ))}
            </tr>
        </thead>
        {/* Table Body */}
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    {columns.map((column, index) => (
                        <td key={index}>{String(item[column])}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Table