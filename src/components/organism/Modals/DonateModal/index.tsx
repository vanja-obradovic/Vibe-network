import classNames from "classnames";
import Modal, { ModalRef } from "../../../molecule/Modal";
import Button from "../../../atom/Button";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useContract } from "../../../../context/contract";
import { ReactComponent as UserPlaceholder } from "../../../../../public/images/userPlaceholder.svg";
import { useForm } from "react-hook-form";

type DonateModalProps = {
  className?: string;
  postID: number;
};

type FormDataType = {
  amount: number;
};

const DonateModal = forwardRef<ModalRef, DonateModalProps>(({ className, postID }, ref) => {
  const { contract } = useContract();

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

  const { register, handleSubmit } = useForm<FormDataType>();

  const submitHandler = (data: FormDataType) => {
    contract?.sponsorPost(data.amount, postID);
    alert("hello");
  };
  return (
    <Modal ref={modalRef} className="w-1/2 rounded-3xl border-[16px] border-white/25 py-20 backdrop:bg-black/25">
      <form
        className={classNames(className, "mx-auto flex w-2/3 flex-col gap-y-2")}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex items-center gap-x-2 text-text-muted">
          <UserPlaceholder />
          <input
            {...register("amount", { required: "Required" })}
            type="number"
            className="flex-1"
            placeholder={`Enter amount of ETH you want to donate...`}
          />
        </div>
        <Button type="submit" className="self-end px-8 py-2" onClick={() => modalRef.current?.close()}>
          Donate
        </Button>
      </form>
    </Modal>
  );
});

DonateModal.displayName = "DonateModal";

export default DonateModal;
