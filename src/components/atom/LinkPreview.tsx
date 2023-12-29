import classNames from "classnames";
import { useGetLinkPreviewQuery } from "../../app/queries/link/useGetLinkPreview";
import ImageModal from "../organism/Modals/ImageModal";
import { useRef } from "react";
import { ModalRef } from "../molecule/Modal";

type LinkPreviewProps = {
  className?: string;
  url: string;
  donate: ModalRef | null;
  canDonate?: boolean;
  donatedAmount: string;
};

const LinkPreview = ({ className, url, donatedAmount, donate, canDonate }: LinkPreviewProps) => {
  const { data: linkPreview, isLoading } = useGetLinkPreviewQuery({ url });

  const isWebPage = linkPreview?.description !== "" && linkPreview?.title !== "" && linkPreview?.image !== "";
  const imageModalRef = useRef<ModalRef>(null);

  return isLoading ? (
    <div>Loading....</div>
  ) : isWebPage ? (
    <a href={linkPreview?.url} target="__blank">
      <div className={classNames("flex items-center gap-x-4 rounded-2xl border border-text-muted/25 p-2", className)}>
        <div className="flex-1">
          <img src={linkPreview?.image} alt="link preview image" className="rounded-2xl object-contain" />
        </div>
        <div className="flex flex-[3] flex-col gap-y-2">
          <h2 className="text-lg font-semibold">{linkPreview?.title}</h2>
          <p>{linkPreview?.description}</p>
          <p>{linkPreview?.url}</p>
        </div>
      </div>
    </a>
  ) : (
    <>
      <ImageModal
        ref={imageModalRef}
        media={linkPreview.url}
        donations={donatedAmount}
        donateModal={donate}
        canDonate={canDonate}
      />
      <div>
        <img
          src={linkPreview.url}
          alt="image placehoder"
          className="aspect-video w-full max-w-full object-cover hover:cursor-pointer"
          onClick={() => imageModalRef.current?.open()}
        />
      </div>
    </>
  );
};

export default LinkPreview;
