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
    <div className=" stats-vertical shadow">
      {isLoading && <LazySpinner show={isLoading} />}
      {isError || (error && <Error error={error} />)}
      {data && (
        <>
          <div className="stat">
            <div className="stat-title">{data.item.name}</div>
            <div className="stat-value">Stock: {data.item.stock}</div>
          </div>
          <div className="stat">
            <div className="items-center">
              <button
                className="btn btn-success btn-circle"
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
                  "➕"
                )}
              </button>
            </div>
            <div className="stat">
              <div className="items-center">
                <button
                  className="btn btn-error btn-circle"
                  onClick={() => removeStock()}
                  disabled={
                    addStockMutation.isPending || removeStockMutation.isPending || data.item.stock === 0
                  }
                >
                  {removeStockMutation.isPending ? (
                    <span className="loading loading-spinner text-error"></span>
                  ) : (
                    "➖"
                  )}
                </button>
              </div>
            </div>
            <div className="stat">
              <input
                type="number"
                className="input input-bordered"
                value={quantityStock}
                onChange={(e) => setQuantityStock(Number(e.target.value))}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stock;
