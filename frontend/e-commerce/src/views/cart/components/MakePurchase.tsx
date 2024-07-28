import Modal from "@/components/common/modal/Modal";

type MakePurchaseProps = {
  isOpen: boolean;
  onClose: () => void;
  handlePurchase: () => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
};

const MakePurchase = ({ isOpen, onClose }: MakePurchaseProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>MakePurchase</div>
    </Modal>
  );
};

export default MakePurchase;
