import { useQueryItem } from "@/hooks/useQueryItem";
import { useParams, useNavigate } from "react-router-dom";
import LazySpinner from "@/components/LazySpinner";

const Item = () => {
  const { id } = useParams();

  const navigage = useNavigate();

  const { data, isLoading, isSuccess, isError } = useQueryItem(Number(id));

  const navigateToShop = () => {
    navigage("/shop");
  };

  return (
    <div className="card glass w-96 m-auto">
        { isError ? (
            <p className="text-red-900">There was a problem</p>
        ) : null}
        {isLoading ? (
            <LazySpinner show />
        ) : null}
        { isSuccess ? (
            <div>
                <figure>
                    <img
                        src={data?.item.image}
                        alt={data?.item.name}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{data?.item.name}</h2>
                    <p>{data?.item.description}</p>
                    <p>Price: {data?.item.price}</p>
                    <p>We have <span className="text-green-600">{data?.item.stock}</span> left in stock!</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={navigateToShop}>Back to shop</button>
                    </div>
                </div>
            </div>
        ): null }
        </div>
  );
};

export default Item;
