type ProductProps = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

const Product = (props: ProductProps) => {
  const { id, name, description, price, image } = props;

  return (
    <div className="card bg-base-200 w-96 shadow-xl text-center m-auto">
      <figure className="h-48">
        <img
          src={image}
          alt={name}
          className="object-contain w-full h-full"
        />
      </figure>
      <div className="card-body mt-auto">
        <h2 className="card-title m-auto">{name}</h2>
        <p>{description}</p>
        <p>Price: {price}$</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Add to Cart</button>
          <button className="btn btn-accent">View more details</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
