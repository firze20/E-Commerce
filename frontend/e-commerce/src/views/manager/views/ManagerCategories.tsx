import { useQueryCategories } from "@/hooks/shop/useQueryCategories";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Table, {TableColumn} from "@/components/common/table/Table";
import { useNavigate } from "react-router-dom";
import { Category } from "@/api/types";
import Error from "@/components/common/error/Error";

const ManagerCategories = () => {

    const navigate = useNavigate();

    const { data, isLoading, isSuccess, isError, error } = useQueryCategories();

    const onEditClick = (id: number) => {
        navigate(`/manager/edit-category/${id}`);
    }

    const columns: TableColumn<Category>[] = [
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
            key: "name",
            header: "Name",
            render: (value) => (
                <span>{value}</span>
            ),
        },
        {
            key: "description",
            header: "Description",
            render: (value) => (
                <span>{value}</span>
            ),
        }
    ];

    return (
        <div className="shadow">
            {isLoading ? <LazySpinner show={isLoading} /> : null}
            {isError && error ? <Error error={error} /> : null}
            {isSuccess && data ? (
                <Table
                    columns={columns}
                    data={data}
                    className="table-fixed"
                />
            ): null}
        </div>
    );
};

export default ManagerCategories;