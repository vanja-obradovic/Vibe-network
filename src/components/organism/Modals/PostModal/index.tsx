import { forwardRef, useImperativeHandle, useRef } from "react";
import Modal, { ModalRef } from "../../../molecule/Modal";
import Button from "../../../atom/Button";
import classNames from "classnames";
import { ReactComponent as UserPlaceholder } from "../../../../../public/images/userPlaceholder.svg";

type PostModalProps = {
  className?: string;
  name?: string;
};

const PostModal = forwardRef<ModalRef, PostModalProps>(({ className, name }, ref) => {
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
    <Modal ref={modalRef} className="w-1/2 rounded-3xl border-[16px] border-white/25 py-20 backdrop:bg-black/25">
      <div className={classNames(className, "mx-auto flex w-2/3 flex-col gap-y-2")}>
        <div className="flex items-center gap-x-2 text-text-muted">
          <UserPlaceholder />
          <input type="text" className="flex-1" placeholder={`How's your vibe today ${name ?? ""}?`} />
        </div>
        <Button type="button" className="self-end px-8 py-2" onClick={() => modalRef.current?.close()}>
          Post
        </Button>
      </div>
    </Modal>
  );
});

PostModal.displayName = "PostModal";

export default PostModal;
