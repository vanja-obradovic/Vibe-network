import { useInfiniteQuery, QueryKey, InfiniteData } from "@tanstack/react-query";
import { RawPostType } from "../../types/post";
import { Contract } from "ethers";

export type Page = {
  data: RawPostType[];
  idRangeStart: number;
  previousCursor?: number;
  nextCursor?: number;
};

const fetch = async ({ contract, total, page }: { contract: Contract; total: number; page: number }): Promise<Page> => {
  const pages = Math.floor(total / 5);
  const remainder = total % 5;
  let data: RawPostType[] = [];
  if (remainder !== 0 && page === pages) data = await contract?.fetchPostsRanged(0, remainder);
  else data = await contract?.fetchPostsRanged((pages - page) * 5 + remainder - 5, 5);

  return {
    data: data.toReversed(),
    idRangeStart: (pages - page) * 5 + remainder - 1,
    nextCursor: data.length === 5 ? page + 1 : undefined,
    previousCursor: page > 0 ? page - 1 : undefined,
  };
};

export const useGetPostsRanged = ({
  contract,
  total,
  enabled = true,
}: {
  contract: Contract;
  total: number;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<Page, Error, InfiniteData<Page, unknown>, QueryKey, number>({
    queryKey: ["posts"],
    enabled: !!contract && enabled,
    queryFn: ({ pageParam }) => fetch({ contract, total, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page) => {
      return lastPage.nextCursor;
    },
    getPreviousPageParam: (firstPage: Page) => {
      return firstPage.previousCursor;
    },
  });
};
