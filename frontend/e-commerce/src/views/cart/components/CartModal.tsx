import { useState } from "react";
import Modal from "@/components/common/modal/Modal";
import type { Quantity } from "@/api/cart/cartApi";

type CartModalProps = {
  isOpen: boolean;
  isUpdating: boolean;
  onClose: () => void;
  itemId: number;
  itemName: string;
  quantity: number;
  handleSaveChanges: (id: number, quantity: Quantity) => void;
};

const CartModal = ({
  isOpen,
  isUpdating,
  onClose,
  itemId,
  itemName,
  quantity,
  handleSaveChanges,
}: CartModalProps) => {
  const [newQuantity, setNewQuantity] = useState(quantity);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="stack">
        <div className="card bg-base-200 h-auto w-auto text-center shadow-md">
          <div className="card-body">{newQuantity}</div>
          <div className="card-title">{itemName} quantity</div>
        </div>
      </div>
      <div className="flex justify-center text-center">
        <div className="card-actions mt-2">
          <button
            className="btn btn-primary"
            onClick={() => setNewQuantity(newQuantity + 1)}
          >
            +
          </button>
          <button
            className="btn btn-primary"
            disabled={newQuantity === 1}
            onClick={() => setNewQuantity(newQuantity - 1)}
          >
            -
          </button>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="btn btn-primary"
          disabled={newQuantity === quantity || isUpdating}
          onClick={() => handleSaveChanges(itemId, { quantity: newQuantity})}
        >
            {isUpdating ? (
                <span className="loading loading-spinner bg-accent"></span>
            ): "Save Changes"}
        </button>
      </div>
    </Modal>
  );
};

export default CartModal;
