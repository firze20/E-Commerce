import { useQueryCart } from "@/hooks/cart/useQueryCart";
import { useClearCartMutation } from "@/hooks/cart/useClearCartMutation";
import { useRemoveItemMutation } from "@/hooks/cart/useRemoveItemMutation";
import LazySpinner from "@/components/LazySpinner";

const MyCart = () => {
  const { data, isLoading, isSuccess, isError } = useQueryCart();

  const { mutate: emptyCart, isPending: clearingCart } = useClearCartMutation();

  const { mutate: removeItem, isPending: removingItem } =
    useRemoveItemMutation();

  const shouldButtonsBeDisabled = () => {
    return data?.totalItems === 0 || clearingCart || removingItem;
  };

  const handleOnEmptyCart = () => {
    emptyCart();
  };

  const handlePurchase = () => {};

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  return (
    <div className="flex w-full flex-col border-opacity-50 mt-9">
      <div className="card bg-base-300 rounded-box grid h-auto place-items-center">
        <LazySpinner show={isLoading} />
        {isSuccess && data ? (
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Total Items</div>
              <div className="stat-value">{data.totalItems}</div>
              <div className="stat-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleOnEmptyCart}
                  disabled={shouldButtonsBeDisabled()}
                >
                  Empty Cart{" "}
                </button>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Price</div>
              <div className="stat-value">{data.totalPrice}$</div>
              <div className="stat-actions">
                <button
                  className="btn btn-success"
                  disabled={shouldButtonsBeDisabled()}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-info">
            Ups you don't have a cart 🙁, sign up if you don't have an account
            and sign in to start shopping!
          </p>
        )}
        {isError && (
          <p className="text-error">Something went wrong try to sign in</p>
        )}
      </div>
      <div className="divider">Items: </div>
      <div className="card bg-base-300 rounded-box grid h-auto place-items-center">
        <LazySpinner show={isLoading} />
        {isSuccess && data && data.cart.length > 0 ? (
          data.cart.map((item) => {
            return (
              <div
                className="card card-side bg-base-100 shadow-xl max-w-xl max-h-fit mt-2"
                key={item.id}
              >
                <figure>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-sm max-h-36"
                  />
                </figure>
                <div className="card-body text-righ">
                  <h2 className="card-title">{item.name}</h2>
                  <p>{item.description}</p>
                  <p>Price: {item.price}$</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => removeItem(item.id)}
                      disabled={shouldButtonsBeDisabled()}
                    >
                      Remove from cart
                    </button>
                    <button className="btn btn-secondary">
                      Change Quantity
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-info">Nothing to see here</p>
        )}
      </div>
    </div>

    // <div className="mockup-window border-base-300 border">
    //   <div className="border-base-300 flex justify-center border-t px-4 py-16">
    //     {isLoading && <p>Loading...</p>}
    //     {isSuccess && (
    //       <div>
    //         <h1>My Cart</h1>
    //         <p>Items in cart: {data?.cart?.length}</p>
    //         <p>Total price: {data?.totalPrice}</p>
    //       </div>
    //     )}
    //     {isError && <p className="text-error">Something went wrong</p>}
    //   </div>
    // </div>
  );
};

export default MyCart;
