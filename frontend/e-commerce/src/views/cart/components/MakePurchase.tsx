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

const MakePurchase = ({
  isOpen,
  onClose,
  isPending,
  isError,
  isSuccess,
  result,
  error,
}: MakePurchaseProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {isPending ? (
          <span className="loading loading-spinner text-primary">
            Processing Purchase
          </span>
        ) : null}
        {isError || error ? (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        ) : null}
        {isSuccess ? (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{result}</span>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default MakePurchase;
