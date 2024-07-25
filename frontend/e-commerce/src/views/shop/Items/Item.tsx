import { useQueryItem } from "@/hooks/shop/useQueryItem";
import { useParams, useNavigate } from "react-router-dom";
import LazySpinner from "@/components/LazySpinner";

const Item = () => {
  const { id } = useParams();

  const navigage = useNavigate();

  const { data, isLoading, isSuccess, isError } = useQueryItem(Number(id));

  const navigateToShop = () => {
    navigage(-1);
  };

  return (
    <div className="card glass w-96 m-auto text-left">
      {isError ? <p className="text-red-900">There was a problem</p> : null}
      {isLoading ? <LazySpinner show /> : null}
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

            <span>Price: <p className="text-primary">{data?.item.price}$</p></span>
            <p>
              We have <span className="text-green-600">{data?.item.stock}</span>{" "}
              left in stock!
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={navigateToShop}>
                Back to shop
              </button>
              <button className="btn btn-accent">Add to Cart</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Item;
