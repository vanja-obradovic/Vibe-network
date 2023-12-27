import { ReactComponent as UserPlaceholder } from "../../../../public/images/userPlaceholder.svg";
import { ReactComponent as Options } from "../../../../public/images/Options.svg";
import Coins from "../../../../public/images/Coins.png";
import Share from "../../../../public/images/Share.png";
import { numberFormatter } from "../../../app/utils/numbers";
import ImageModal from "../Modals/ImageModal";
import { useRef } from "react";
import { ModalRef } from "../../molecule/Modal";
import DonateModal from "../Modals/DonateModal";
import { format } from "date-fns";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

type FeedCardProps = {
  name: string;
  timestamp: number;
  text: string;
  donations?: number;
  shares?: number;
  postID: number;
};

const FeedCard = ({ name, text, donations, shares, timestamp, postID }: FeedCardProps) => {
  const imageModalRef = useRef<ModalRef>(null);
  const donateModalRef = useRef<ModalRef>(null);

  const { address } = useAccount();

  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  const media = urlRegex.exec(text);

  const textWoURL = text.replace(urlRegex, "");

  return (
    <>
      {media ? (
        <ImageModal
          ref={imageModalRef}
          media={media[0]}
          shares={10000}
          donations={2333}
          donate={donateModalRef.current}
          canDonate={name !== address}
        />
      ) : null}
      <DonateModal ref={donateModalRef} postID={postID} />
      <div className="grid grid-cols-[auto_1fr] gap-x-4 rounded-2xl bg-white/25 px-4 py-5 text-text-muted backdrop-blur-md">
        <div>
          <UserPlaceholder className="h-16 w-16" />
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between">
            <div className="space-x-2 self-center pt-2">
              <span className=" font-bold">{name}</span>
              <span>&middot;</span>
              <span>{format(timestamp, "dd.MM.yy (HH:mm)")}</span>
            </div>
            <button className="h-fit p-1">
              <Options />
            </button>
          </div>
          <div className="flex flex-col gap-y-3">
            <div>{textWoURL}</div>
            {media ? (
              <div>
                <img
                  src={media[0]}
                  alt="image placehoder"
                  className="aspect-video w-full max-w-full object-cover hover:cursor-pointer"
                  onClick={() => imageModalRef.current?.open()}
                />
              </div>
            ) : null}
            <div className="flex items-center gap-x-16">
              <button
                onClick={() => {
                  if (name === address) toast.error("You can't sponsor yourself");
                  else donateModalRef.current?.open();
                }}
                className="flex items-center gap-x-3 text-sm font-medium"
              >
                <img src={Coins} alt="coins image" />
                {numberFormatter(shares)}
              </button>
              <button className="font-meium flex items-center gap-x-3 text-sm font-medium">
                <img src={Share} alt="share image" />
                {numberFormatter(donations)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
