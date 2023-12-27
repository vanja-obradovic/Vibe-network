import { forwardRef, useImperativeHandle, useRef } from "react";
import Modal, { ModalRef } from "../../../molecule/Modal";
import Button from "../../../atom/Button";
import classNames from "classnames";
import { ReactComponent as UserPlaceholder } from "../../../../../public/images/userPlaceholder.svg";
import { useForm } from "react-hook-form";
import { useContract } from "../../../../context/contract";
import { useCreatePostMutation } from "../../../../app/queries/posts/useCreatePostMutation";
import toast from "react-hot-toast";
import { ContractTransactionResponse } from "ethers";

type PostModalProps = {
  className?: string;
  name?: string;
};

type FormDataType = {
  text: string;
};

const PostModal = forwardRef<ModalRef, PostModalProps>(({ className, name }, ref) => {
  const { contract } = useContract();
  const { mutateAsync: createPost } = useCreatePostMutation();

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
    createPost({ contract, text: data.text })
      .then((tx) => {
        toast.promise(
          (tx as ContractTransactionResponse).wait(),
          {
            success: "Post successful",
            loading: "Post pending",
            error: "Post error",
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
        <div className="flex items-center gap-x-2 text-text-muted">
          <UserPlaceholder />
          <input
            {...register("text")}
            type="text"
            className="flex-1"
            placeholder={`How's your vibe today ${name ?? ""}?`}
          />
        </div>
        <Button type="submit" className="self-end px-8 py-2" onClick={() => modalRef.current?.close()}>
          Post
        </Button>
      </form>
    </Modal>
  );
});

PostModal.displayName = "PostModal";

export default PostModal;
