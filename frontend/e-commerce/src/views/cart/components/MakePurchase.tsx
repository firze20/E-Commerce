import Modal from "@/components/common/modal/Modal";

type MakePurchaseProps = {
  isOpen: boolean;
  onClose: () => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  result: string;
};

const MakePurchase = ({ isOpen, onClose, isPending, isError, isSuccess, result }: MakePurchaseProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        {isPending ? (
          <span className="">Processing Purchase</span>
        ): null}
        {
          isError ? (
            <span>Error making purchase</span>
          ) : null
        }
        {
          isSuccess ? (
            <span>Purchase successful {result}</span>
          ) : null
        }
      </div>
    </Modal>
  );
};

export default MakePurchase;
