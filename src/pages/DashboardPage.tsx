import { useAccount, useBalance, useDisconnect, useEnsName } from "wagmi";
import { ReactComponent as Logo } from "../../public/images/logo.svg";
import Button from "../components/atom/Button";
import PostModal from "../components/organism/Modals/PostModal";
import { useEffect, useRef, useState } from "react";
import { ModalRef } from "../components/molecule/Modal";
import { ReactComponent as UserPlaceholder } from "../../public/images/userPlaceholder.svg";
import { useContract } from "../context/contract";
import { useForm } from "react-hook-form";
import { useGetPostsRanged } from "../app/queries/posts/useGetPostsRanged";
import { PostType } from "../app/types/post";
import FeedCard from "../components/organism/FeedCard";
import { useCreatePostMutation } from "../app/queries/posts/useCreatePostMutation";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPostCount } from "../app/queries/posts/useGetPostCount";
import { reduceAddress } from "../app/utils/helper";
import { ContractTransactionResponse, EventLog } from "ethers";
import toast from "react-hot-toast";
import { useGetDonationsQuery } from "../app/queries/posts/useGetDonationsQuery";
import { DonationType } from "../app/types/donation";

type FormPostType = {
  text: string;
};

type FormSearchType = {
  term: string;
};

const DashboardPage = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address: address });
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const { contract } = useContract();

  const postModalRef = useRef<ModalRef>(null);
  const name = ensName ?? reduceAddress(address ?? "err");

  const { data: postCount } = useGetPostCount({ contract });
  const { data, hasNextPage, fetchNextPage } = useGetPostsRanged({
    contract,
    total: postCount!,
    enabled: !!postCount,
  });
  const { data: donationLog } = useGetDonationsQuery({ contract });
  const { mutateAsync: createPost } = useCreatePostMutation();

  const { register, handleSubmit } = useForm<FormPostType>();
  const { register: registerSearch, handleSubmit: handleSearch, setValue } = useForm<FormSearchType>();
  const [searchFilter, setFilter] = useState<string>();

  const submitHandler = (data: FormPostType) => {
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
      });
  };

  const searchHandler = (data: FormSearchType) => {
    setFilter(data.term);
  };

  useEffect(() => {
    contract?.on("PostCreated", () => {
      toast.custom(
        <div className="flex flex-col items-center gap-y-2 rounded-2xl bg-white/75 px-2 py-1">
          New post/s available.
          <Button type="button" onClick={() => window.location.reload()} className="px-4 py-1">
            Refresh now
          </Button>
        </div>,
        { duration: 30000, position: "top-center", id: "new_post" }
      );
    });
  }, []);

  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    if (data)
      setPosts(
        // Map shouldn't iterate through whole data array over and over. It would be better to track from which page to start
        data.pages?.flatMap((raw) => {
          return raw.data.flatMap((post, index) => {
            if (searchFilter && post[1] !== searchFilter) return [];
            else
              return {
                id: post[1],
                msg: post[2],
                timestamp: Number(post[0]) * 1000,
                postID: raw.idRangeStart - index,
              } satisfies PostType;
          });
        })
      );
  }, [data, searchFilter]);

  function isEventLog(args: unknown): args is EventLog {
    return (args as EventLog).args !== undefined;
  }

  let donations: DonationType[] = [];
  if (donationLog)
    donations = donationLog.flatMap((log) => (isEventLog(log) ? [[log.args[0], log.args[1], log.args[2]]] : []));

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
          <div>
            <form onSubmit={handleSearch(searchHandler)} className="relative">
              <input
                type="text"
                placeholder="Search..."
                {...registerSearch("term", { minLength: 1 })}
                className="w-full rounded-2xl bg-white/25 px-1 py-2 text-text-muted backdrop-blur-md"
              />
              {searchFilter ? (
                <button
                  className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 p-1 leading-[0]"
                  onClick={() => {
                    setFilter(undefined);
                    setValue("term", "");
                  }}
                >
                  x
                </button>
              ) : null}
              {searchFilter ? `Showing posts for user ${searchFilter}` : null}
            </form>
          </div>
          <div className="flex flex-col gap-y-7">
            <h6>Update your Vibe</h6>
            <form
              className="flex flex-col gap-y-2 rounded-2xl bg-white/25 p-4 text-text-muted backdrop-blur-md"
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
              <Button type="submit" className="self-end px-9 py-3">
                POST
              </Button>
            </form>
          </div>
          <div className="flex flex-col gap-y-7">
            <h6>Feed</h6>
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<h4 className="text-center">Loading...</h4>}
              className="flex flex-col gap-y-5"
              endMessage={
                posts.length > 0 ? (
                  <p className="text-center">
                    <b>No more, go rest from scrolling :&#41;</b>
                  </p>
                ) : null
              }
            >
              {posts?.map((post, index) => {
                return (
                  <FeedCard
                    postID={post.postID}
                    name={post.id}
                    key={`${post.id} - ${index}`}
                    text={post.msg}
                    timestamp={post.timestamp}
                    donations={donations.filter((donation) => Number(donation[0]) === post.postID)}
                  ></FeedCard>
                );
              })}
              {posts.length === 0
                ? searchFilter
                  ? "No posts matching search term"
                  : "There are no posts, you can change that :)"
                : null}
            </InfiniteScroll>
          </div>
        </div>
        <div className="max-h-28 border-[16px] border-white/25 px-3 py-7 backdrop-blur-md">
          <button
            className="h-full w-full text-ellipsis rounded-2xl bg-[#F7F8FF]"
            onClick={() => disconnect()}
            title={address}
          >
            {ensName ?? reduceAddress(address ?? "err")}
          </button>
          <p className="text-center font-semibold">{`Balance: ${balance?.formatted} ${balance?.symbol}`}</p>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
