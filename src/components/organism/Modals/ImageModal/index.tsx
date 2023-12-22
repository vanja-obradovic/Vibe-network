import { forwardRef, useImperativeHandle, useRef } from "react";
import Modal, { ModalRef } from "../../../molecule/Modal";
import classNames from "classnames";
import Coins from "../../../../../public/images/Coins.png";
import Share from "../../../../../public/images/Share.png";
import { numberFormatter } from "../../../../app/utils/numbers";
import { ReactComponent as BackArrow } from "../../../../../public/images/BackArrow.svg";

type ImageModalProps = {
  className?: string;
  shares?: number;
  donations?: number;
};

const ImageModal = forwardRef<ModalRef, ImageModalProps>(({ className, shares, donations }, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        modalRef.current?.showModal();
      },
      close: () => {
        modalRef.current?.close();
      },
    };
  });
  return (
    <Modal ref={modalRef} className="relative m-0 w-full bg-transparent backdrop:bg-black/50">
      <>
        <button onClick={() => modalRef.current?.close()} className="absolute left-2 top-2 text-white">
          <BackArrow />
        </button>
        <div
          className={classNames(className, "mx-auto flex h-screen max-h-screen w-1/2 flex-col  items-center gap-y-7")}
        >
          <img
            src="https://www.hindustantimes.com/ht-img/img/2023/11/03/900x1600/dogs_1698994013491_1698994013816.jpg"
            alt="image placeholder"
            className="h-[90%]"
          />
          <div className="flex items-center gap-x-16">
            <span className="flex items-center gap-x-3 text-sm font-medium text-white">
              <img src={Coins} alt="coins image" className="brightness-0 invert" />
              {numberFormatter(shares)}
            </span>
            <span className="flex items-center gap-x-3 text-sm font-medium text-white">
              <img src={Share} alt="share image" className="brightness-0 invert" />
              {numberFormatter(donations)}
            </span>
          </div>
        </div>
      </>
    </Modal>
  );
});

ImageModal.displayName = "ImageModal";

export default ImageModal;
