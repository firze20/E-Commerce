import { useAddStockMutation } from "@/hooks/manager/useAddStockMutation";
import { useRemoveStockMutation } from "@/hooks/manager/useRemoveStockMutation";
import { useQueryItem } from "@/hooks/shop/useQueryItem";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Error from "@/components/common/error/Error";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Stock = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQueryItem(Number(id));

  const addStockMutation = useAddStockMutation();
  const removeStockMutation = useRemoveStockMutation();

  const [quantityStock, setQuantityStock] = useState(data?.item.stock || 0);

  const addStock = () => {
    if (quantityStock > 0) {
      addStockMutation.mutate({
        id: Number(id),
        quantity: {
          quantity: quantityStock,
        },
      });
    } else addStockMutation.mutate({ id: Number(id) });
  };

  const removeStock = () => {
    if (quantityStock > data!.item.stock) {
      // Display an error message or handle the error appropriately
      toast.error("Cannot remove more stock than available", {
        toastId: "remove-stock",
      });
      return;
    }

    if (quantityStock > 0) {
      removeStockMutation.mutate({
        id: Number(id),
        quantity: {
          quantity: quantityStock,
        },
      });
    } else removeStockMutation.mutate({ id: Number(id) });
  };

  return (
    <div className="stats stats-horizontal lg:stats-horizontal shadow">
      {isLoading && <LazySpinner show={isLoading} />}
      {isError || (error && <Error error={error} />)}
      {data && (
        <div className="stat">
          <div className="stat-title">{data.item.name}</div>
          <div className="stat-value">Stock: {data.item.stock}</div>
          <div className="stat-actions">
            <div className="flex-col gap-3 mt-4 items-center">
              <button
                className="btn btn-success"
                onClick={() => addStock()}
                disabled={
                  addStockMutation.isPending || removeStockMutation.isPending
                }
              >
                {addStockMutation.isPending ? (
                  <span className="loading loading-spinner text-success">
                    Loading
                  </span>
                ) : (
                  "Add Stock ➕"
                )}
              </button>
              <button
                className="btn btn-error"
                onClick={() => removeStock()}
                disabled={
                  addStockMutation.isPending || removeStockMutation.isPending
                }
              >
                {removeStockMutation.isPending ? (
                  <span className="loading loading-spinner text-error"></span>
                ) : (
                  "Remove Stock ➖"
                )}
              </button>
              <input
                type="number"
                className="input input-bordered"
                value={quantityStock}
                onChange={(e) => setQuantityStock(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
