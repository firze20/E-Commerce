import { useAddStockMutation } from "@/hooks/manager/useAddStockMutation";
import { useRemoveStockMutation } from "@/hooks/manager/useRemoveStockMutation";
import { useQueryItem } from "@/hooks/shop/useQueryItem";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Error from "@/components/common/error/Error";
import { useParams } from "react-router-dom";
import { useState } from "react";

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
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      {isLoading && <LazySpinner show={isLoading} />}
      {isError || (error && <Error error={error} />)}
      {data && (
        <div className="stat">
          <div className="stat-title">{data.item.name}</div>
          <div className="stat-value">Stock: {data.item.stock}</div>
          <div className="stat-actions">
            <button className="btn btn-accent" onClick={() => addStock()}>
              Add Stock
            </button>
            <button className="btn btn-accent" onClick={() => removeStock()}>
              Remove Stock
            </button>
            <input
              type="number"
              value={quantityStock}
              onChange={(e) => setQuantityStock(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
