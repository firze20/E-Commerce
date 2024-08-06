import { useQueryItem } from "@/hooks/shop/useQueryItem";
import { useAddItemMutation } from "@/hooks/cart/useAddItemMutation";
import { AuthContext } from "@/context/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "@/components/common/loading/Skeleton";
import { useContext } from "react";
import { toast } from "react-toastify";

const Item = () => {
  const { id } = useParams();

  const { isAuthenticated } = useContext(AuthContext).authState;

  const navigage = useNavigate();

  const { data, isLoading, isSuccess, isError, error } = useQueryItem(
    Number(id)
  );

  const { mutate, isPending } = useAddItemMutation();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      mutate({
        id: Number(id),
      });
    } else toast.info("You need to be logged in to add items to the cart");
  };

  const navigateToShop = () => {
    navigage(-1);
  };

  return (
    <div className="card glass w-96 m-auto text-left">
      {isError || error ? (
        <p
          className={
            error?.response?.status === 404 ? "text-warning" : "text-error"
          }
        >
          {error?.response?.data?.message! || "An error occurred"}
        </p>
      ) : null}
      {isLoading ? <Skeleton show /> : null}
      {isSuccess ? (
        <div>
          <figure>
            <img src={data?.item.image} alt={data?.item.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-secondary">{data?.item.name}</h2>
            <div>
              <p className="text-info-content">{data?.item.description}</p>
              <span>Categories: </span>
              <ul className="text-info">
                {data?.item.categories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
            </div>

            <span>
              Price: <p className="text-primary">{data?.item.price}$</p>
            </span>
            <p>
              We have <span className="text-green-600">{data?.item.stock}</span>{" "}
              left in stock!
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={navigateToShop}>
                Back to shop
              </button>
              <button
                className="btn btn-accent"
                onClick={handleAddToCart}
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner bg-success"></span>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Item;
