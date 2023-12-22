import { ReactNode, forwardRef } from "react";
import classNames from "classnames";

type ModalProps = {
  children: ReactNode;
  className?: string;
};

export type ModalRef = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ className, children }, ref) => {
  return (
    <dialog ref={ref} className={classNames(className)}>
      {children}
    </dialog>
  );
});

Modal.displayName = "Modal";

export default Modal;
