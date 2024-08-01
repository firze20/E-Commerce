import { ReactNode, useEffect, useRef } from "react";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

const Modal = ({ children, isOpen, onClose, className }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (!isOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [isOpen]);

  const handleClose = () => onClose();

  return (
    <dialog ref={modalRef} className={`modal ${className}`} onClose={handleClose}>
      <div className="modal-box h-auto">
        {children}
        <div className="modal-action">
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
