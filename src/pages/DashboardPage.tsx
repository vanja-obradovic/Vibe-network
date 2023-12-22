import { useAccount, useDisconnect, useEnsName } from "wagmi";
import { ReactComponent as Logo } from "../../public/images/logo.svg";
import Button from "../components/atom/Button";
import PostModal from "../components/organism/Modals/PostModal";
import { useRef } from "react";
import { ModalRef } from "../components/molecule/Modal";
import { ReactComponent as UserPlaceholder } from "../../public/images/userPlaceholder.svg";
import FeedCard from "../components/organism/FeedCard";

const DashboardPage = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const { disconnect } = useDisconnect();

  const postModalRef = useRef<ModalRef>(null);

  const name = "3327";

  return (
    <>
      <PostModal ref={postModalRef} name={name} />
      <div className="grid min-h-screen grid-cols-[291px_1fr_291px] gap-x-11 [&>*]:rounded-3xl [&>*]:[background:radial-gradient(267.72%_139.47%_at_0%_2.78%,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.00)_100%)]">
        <div className="flex max-h-96 flex-col justify-between border-[16px] border-white/25 p-4 backdrop-blur-md">
          <Logo className="h-fit w-14 text-action-primary" />
          <Button type="button" className="w-full" onClick={() => postModalRef.current?.open()}>
            Write A Post
          </Button>
        </div>
        <div className="flex flex-col gap-y-14 border-[16px] border-white/25 p-4 backdrop-blur-md">
          <input type="text" placeholder="Search..." />
          <div className="flex flex-col gap-y-7">
            <h6>Update your Vibe</h6>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2 text-text-muted">
                <UserPlaceholder />
                <input type="text" className="flex-1" placeholder={`How's your vibe today ${name ?? ""}?`} />
              </div>
              <Button type="button" className="self-end px-9 py-3">
                POST
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-7">
            <h6>Feed</h6>
            <div className="flex flex-col gap-y-5">
              <FeedCard
                name="name"
                text="blabla"
                timestamp={new Date()}
                shares={6400}
                donations={3200}
                media={
                  "https://www.hindustantimes.com/ht-img/img/2023/11/03/900x1600/dogs_1698994013491_1698994013816.jpg"
                }
              ></FeedCard>
            </div>
          </div>
        </div>
        <div className="max-h-28 border-[16px] border-white/25 px-3 py-7 backdrop-blur-md">
          <button className="h-full w-full text-ellipsis rounded-2xl bg-[#F7F8FF]" onClick={() => disconnect()}>
            {ensName ?? address}
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
