import { forwardRef, useImperativeHandle, useRef } from "react";
import Modal, { ModalRef } from "../../../molecule/Modal";
import classNames from "classnames";
import Coins from "../../../../../public/images/Coins.png";
import Share from "../../../../../public/images/Share.png";
import { numberFormatter } from "../../../../app/utils/numbers";
import { ReactComponent as BackArrow } from "../../../../../public/images/BackArrow.svg";
import toast from "react-hot-toast";

type ImageModalProps = {
  className?: string;
  shares?: number;
  canDonate?: boolean;
  donations?: number;
  media: string;
  donate: ModalRef | null;
};

const ImageModal = forwardRef<ModalRef, ImageModalProps>(
  ({ className, shares, donations, media, donate, canDonate }, ref) => {
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
      <Modal ref={modalRef} className="relative h-full w-full bg-transparent backdrop:bg-black/50">
        <>
          <button onClick={() => modalRef.current?.close()} className="absolute left-2 top-2 text-white">
            <BackArrow />
          </button>
          <div className={classNames(className, "mx-auto flex h-full w-1/2 flex-col items-center gap-y-7")}>
            <img src={media} alt="image placeholder" className="h-[90%] object-contain" />

            <div className="flex flex-1 items-center gap-x-16">
              <button
                className="flex items-center gap-x-3 text-sm font-medium text-white"
                onClick={() => {
                  if (canDonate === false) toast.error("You can't sponsor yourself");
                  else donate?.open();
                }}
              >
                <img src={Coins} alt="coins image" className="brightness-0 invert" />
                {numberFormatter(shares)}
              </button>
              <button className="flex items-center gap-x-3 text-sm font-medium text-white">
                <img src={Share} alt="share image" className="brightness-0 invert" />
                {numberFormatter(donations)}
              </button>
            </div>
          </div>
        </>
      </Modal>
    );
  }
);

ImageModal.displayName = "ImageModal";

export default ImageModal;
