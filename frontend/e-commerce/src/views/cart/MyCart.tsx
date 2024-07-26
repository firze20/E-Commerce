import { useQueryCart } from "@/hooks/cart/useQueryCart";
import { useClearCartMutation } from "@/hooks/cart/useClearCartMutation";
import { useRemoveItemMutation } from "@/hooks/cart/useRemoveItemMutation";
import { useUpdateQuantityMutation } from "@/hooks/cart/useUpdateQuantityMutation";
import LazySpinner from "@/components/LazySpinner";
import { useState } from "react";
import CartModal from "./components/CartModal";
import type { Quantity } from "@/api/cart/cartApi";

const MyCart = () => {
  const { data, isLoading, isSuccess, isError } = useQueryCart();

  const { mutate: emptyCart, isPending: clearingCart } = useClearCartMutation();

  const { mutate: removeItem, isPending: removingItem } =
    useRemoveItemMutation();

  const { mutate: updateQuantity, isPending: updatingQuantity } = useUpdateQuantityMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => setIsModalOpen(false);

  const shouldButtonsBeDisabled = data?.totalItems === 0 || clearingCart || removingItem || updatingQuantity;

  const isPending = clearingCart || removingItem || updatingQuantity;

  const handleOnEmptyCart = () => {
    emptyCart();
  };

  const handleModifyQuantity = (id: number, quantity: Quantity) => {
    updateQuantity({id, quantity});
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
                  disabled={shouldButtonsBeDisabled}
                >
                  {isPending ? (
                    <span className="loading loading-spinner bg-success"></span>
                  ): "Empty Cart"}
                </button>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Price</div>
              <div className="stat-value">{data.totalPrice}$</div>
              <div className="stat-actions">
                <button
                  className="btn btn-success"
                  disabled={shouldButtonsBeDisabled}
                >
                  {isPending ? (
                    <span className="loading loading-spinner bg-success"></span>
                  ) : "Checkout"}
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
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={shouldButtonsBeDisabled}
                    >
                      {isPending ? (
                        <span className="loading loading-spinner bg-success"></span>
                      ): "Remove from cart"}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsModalOpen(true)}
                      disabled={shouldButtonsBeDisabled}
                    >
                      {isPending ? (
                        <span className="loading loading-spinner"></span>
                      ): "Change Quantity"}
                    </button>
                  </div>
                </div>
                <CartModal
                  isOpen={isModalOpen}
                  isUpdating={updatingQuantity}
                  onClose={handleModalClose}
                  quantity={item.quantity}
                  itemId={item.id}
                  itemName={item.name}
                  handleSaveChanges={handleModifyQuantity}
                />
              </div>
            );
          })
        ) : (
          <p className="text-info">Nothing to see here</p>
        )}
      </div>
    </div>
  );
};

export default MyCart;
