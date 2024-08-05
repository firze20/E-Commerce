import { useNavigate } from "react-router-dom";

type ProductProps = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

const Product = (props: ProductProps) => {
  const { id, name, description, price, image } = props;

  const navigate = useNavigate();

  const onItemClick = () => {
    navigate(`/shop/item/${id}`);
  };

  return (
    <div className="card bg-base-200 w-96 shadow-xl text-center m-auto">
      <figure className="h-48 w-48 mx-auto">
        <img src={image} alt={name} className="object-contain w-full h-full" />
      </figure>
      <div className="card-body mt-auto">
        <h2 className="card-title m-auto">{name}</h2>
        <p className="h-20 overflow-y-auto overflow-ellipsis">{description}</p>
        <p>Price: {price}$</p>
        <div className="card-actions justify-center">
          <button className="btn btn-accent" onClick={onItemClick}>View more details</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
