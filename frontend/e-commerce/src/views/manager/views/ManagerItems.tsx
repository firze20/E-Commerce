import SearchBar from "../components/SearchBar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryStore } from "@/hooks/shop/useQueryStore";
import { useQueryCategories } from "@/hooks/shop/useQueryCategories";
import Pagination from "@/components/common/pagination/Pagination";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Table, { TableColumn } from "@/components/common/table/Table";
import { Item } from "@/api/types";

const ManagerItems = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const onEditClick = useCallback(
    (id: number) => {
      navigate(`/manager/edit-item/${id}`);
    },
    [navigate]
  );

  const onStockClick = useCallback(
    (id: number) => {
      navigate(`/manager/stock/${id}`);
    },
    [navigate]
  );

  const { data: categories } = useQueryCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data, isLoading, isSuccess, isError } = useQueryStore(page, {
    name: search,
    category: selectedCategory,
  });

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory]);

  const paginationProps = useMemo(() => ({
    totalPages: data?.totalPages || 1,
    currentPage: page,
    onPageChange: setPage, 
  }), [data?.totalPages, page]);

  const columns: TableColumn<Item>[] = useMemo(
    () => [
      {
        key: "id",
        header: "Edit",
        render: (_, row) => (
          <button
            className="btn btn-xs btn-outline btn-secondary"
            onClick={() => onEditClick(row.id)}
          >
            ✏️
          </button>
        ),
      },
      {
        key: "id",
        header: "Stock",
        render: (_, row) => (
          <button
            className="btn btn-accent btn-xs"
            onClick={() => onStockClick(row.id)}
          >
            Stock 📈📉
          </button>
        ),
      },
      {
        key: "name",
        header: "Name",
        render: (value) => <span>{value}</span>,
      },
      {
        key: "description",
        header: "Description",
        render: (value) => <span>{value}</span>,
      },
      {
        key: "price",
        header: "Price",
        render: (value) => <span>{value}$</span>,
      },
    ],
    []
  );

  return (
    <div>
      <SearchBar search={search} handleSearch={setSearch} />
      <select
        className="select select-bordered select-sm w-full my-2"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory || ""}
      >
        <option value="">Select a Category</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <LazySpinner show={isLoading} />
      {isSuccess && data ? (
        <>
          <Pagination
            {...paginationProps}
          />
          <Table
            columns={columns}
            data={data.items}
            className="table table-zebra table-xs table-fixed"
          />
        </>
      ) : null}
      {isError ? <div>Error fetching store data</div> : null}
    </div>
  );
};

export default ManagerItems;
