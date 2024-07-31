import Modal from "@/components/common/modal/Modal";

type MakePurchaseProps = {
  isOpen: boolean;
  onClose: () => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  result: string;
  error: string | null;
};

const MakePurchase = ({ isOpen, onClose, isPending, isError, isSuccess, result, error }: MakePurchaseProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {isPending ? (
          <span className="loading loading-spinner text-primary">Processing Purchase</span>
        ): null}
        {
          isError || error ? (
            <span className="text-warn">{error}</span>
          ) : null
        }
        {
          isSuccess ? (
            <span className="text-success">Purchase successful: {result}</span>
          ) : null
        }
      </div>
    </Modal>
  );
};

export default MakePurchase;
