import classNames from "classnames";
import Modal, { ModalRef } from "../../../molecule/Modal";
import Button from "../../../atom/Button";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useContract } from "../../../../context/contract";
import { ReactComponent as UserPlaceholder } from "../../../../../public/images/userPlaceholder.svg";
import { useForm } from "react-hook-form";
import { useDonateMutation } from "../../../../app/queries/posts/useDonateMutation";
import { useAccount, useBalance } from "wagmi";
import { ContractTransactionResponse } from "ethers";
import { toast } from "react-hot-toast";

type DonateModalProps = {
  className?: string;
  postID: number;
};

type FormDataType = {
  amount: string;
};

const DonateModal = forwardRef<ModalRef, DonateModalProps>(({ className, postID }, ref) => {
  const { contract } = useContract();
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({ address: address });
  const { mutateAsync: donate, isPending } = useDonateMutation();

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataType>({ mode: "onChange" });

  const submitHandler = (data: FormDataType) => {
    donate({ contract, id: postID, amount: data.amount })
      .then((tx) => {
        toast.promise(
          (tx as ContractTransactionResponse).wait(),
          {
            success: "Donation successful",
            loading: "Donation pending",
            error: "Donation error",
          },
          { duration: 3000, loading: { duration: Infinity } }
        );
      })
      .catch((err) => {
        if (err.code === "ACTION_REJECTED") toast.error("User cancelled action");
        else toast.error("Unknown error, please try again");
      })
      .finally(() => modalRef.current?.close());
  };
  return (
    <Modal ref={modalRef} className="w-1/2 rounded-3xl border-[16px] border-white/25 py-20 backdrop:bg-black/25">
      <form
        className={classNames(className, "mx-auto flex w-2/3 flex-col gap-y-2")}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col justify-center gap-y-1 text-text-muted">
          {errors.amount ? <p className="text-red-600">{errors.amount.message}</p> : null}

          <div className="flex items-center gap-x-2">
            <UserPlaceholder />
            <input
              {...register("amount", {
                pattern: { value: /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/, message: "Input is not in number format" },
                required: "Amount is required",
                validate: (input) => {
                  return Number(input) > Number(balance?.formatted)
                    ? "Entered amount is greater than current balance"
                    : undefined;
                },
              })}
              type="text"
              className="flex-1"
              placeholder={`Enter amount of ETH you want to donate...`}
            />
          </div>
        </div>
        <Button type="submit" className="self-end px-8 py-2" disabled={isLoading || !isValid || isPending}>
          Donate
        </Button>
      </form>
    </Modal>
  );
});

DonateModal.displayName = "DonateModal";

export default DonateModal;
