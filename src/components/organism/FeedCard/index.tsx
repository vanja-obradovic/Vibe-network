import { ReactComponent as UserPlaceholder } from "../../../../public/images/userPlaceholder.svg";
import { ReactComponent as Options } from "../../../../public/images/Options.svg";
import Coins from "../../../../public/images/Coins.png";
import { useRef } from "react";
import { ModalRef } from "../../molecule/Modal";
import DonateModal from "../Modals/DonateModal";
import { format } from "date-fns";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { DonationType } from "../../../app/types/donation";
import { formatEther } from "ethers";
import LinkPreview from "../../atom/LinkPreview";

type FeedCardProps = {
  name: string;
  timestamp: number;
  text: string;
  donations?: DonationType[];
  postID: number;
};

const FeedCard = ({ name, text, donations, timestamp, postID }: FeedCardProps) => {
  const donateModalRef = useRef<ModalRef>(null);

  const { address } = useAccount();

  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  const url = urlRegex.exec(text);

  const textWoURL = text.replace(urlRegex, "");

  const donatedAmount = donations?.reduce((acc, curr) => {
    return (acc += curr[1]);
  }, 0n);

  return (
    <>
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
            {url?.[0] ? (
              <LinkPreview
                url={url[0]}
                donate={donateModalRef.current}
                donatedAmount={formatEther(donatedAmount ?? 0)}
                canDonate={
                  donations?.find((donation) => donation[2] === address) ? undefined : name === address ? false : true
                }
              />
            ) : null}

            <div className="flex items-center gap-x-16">
              <button
                onClick={() => {
                  if (name === address) toast.error("You can't sponsor yourself");
                  else if (donations?.find((donation) => donation[2] === address))
                    toast.error("You already donated to this post");
                  else donateModalRef.current?.open();
                }}
                className="flex items-center gap-x-3 text-sm font-medium"
              >
                <img src={Coins} alt="coins image" />
                {formatEther(donatedAmount ?? 0)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
