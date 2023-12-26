import { useQuery } from "@tanstack/react-query";
import { RawPostType } from "../../types/post";
import { Contract } from "ethers";

export type Page = {
  data: RawPostType[];
  previousCursor?: number;
  nextCursor?: number;
};

const fetch = async ({ contract }: { contract: Contract }): Promise<number> => {
  return Number(await contract?.getLatestPostID()) + 1;
};

export const useGetPostCount = ({ contract }: { contract: Contract }) => {
  return useQuery({
    queryKey: ["post-count"],
    enabled: !!contract,
    queryFn: () => fetch({ contract }),
  });
};
