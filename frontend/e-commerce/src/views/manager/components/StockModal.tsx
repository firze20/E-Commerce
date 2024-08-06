import Modal from "@/components/common/modal/Modal";

type StockModalProps = {
  isOpen: boolean;
  onClose: () => void;
  stock: number;
  itemName: string;
  addStock: () => void;
  removeStock: () => void;
};

const StockModal = ({
  isOpen,
  onClose,
  addStock,
  removeStock,
  stock,
  itemName,
}: StockModalProps) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div>
          <h2>{itemName}</h2>
          <p>Stock: {stock}</p>
          <div className="form-control">
            <button type="button" className="btn btn-primary" onClick={() => addStock}>
              +
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => removeStock}>
              -
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StockModal;
