import { ReactComponent as UserPlaceholder } from "../../../../public/images/userPlaceholder.svg";
import { ReactComponent as Options } from "../../../../public/images/Options.svg";
import Coins from "../../../../public/images/Coins.png";
import Share from "../../../../public/images/Share.png";
import { numberFormatter } from "../../../app/utils/numbers";
import ImageModal from "../Modals/ImageModal";
import { useRef } from "react";
import { ModalRef } from "../../molecule/Modal";

type FeedCardProps = {
  name: string;
  timestamp: Date;
  text: string;
  media?: string;
  donations?: number;
  shares?: number;
};

const FeedCard = ({ name, text, donations, media, shares, timestamp }: FeedCardProps) => {
  const imageModalRef = useRef<ModalRef>(null);

  return (
    <>
      <ImageModal ref={imageModalRef} shares={10000} donations={2333} />
      <div className="grid grid-cols-[auto_1fr] gap-x-4 rounded-2xl bg-white/25 px-4 py-5 text-text-muted backdrop-blur-md">
        <div>
          <UserPlaceholder className="h-16 w-16" />
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex justify-between">
            <div className="space-x-2 self-center pt-2">
              <span className=" font-bold">{name}</span>
              <span>&middot;</span>
              <span>{timestamp.toTimeString()}</span>
            </div>
            <button className="h-fit p-1">
              <Options />
            </button>
          </div>
          <div className="flex flex-col gap-y-3">
            <div>{text}</div>
            <div>
              <img
                src={media}
                alt="image placehoder"
                className="aspect-video max-w-full object-cover hover:cursor-pointer"
                onClick={() => imageModalRef.current?.open()}
              />
            </div>
            <div className="flex items-center gap-x-16">
              <span className="flex items-center gap-x-3 text-sm font-medium">
                <img src={Coins} alt="coins image" />
                {numberFormatter(shares)}
              </span>
              <span className="font-meium flex items-center gap-x-3 text-sm font-medium">
                <img src={Share} alt="share image" />
                {numberFormatter(donations)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
