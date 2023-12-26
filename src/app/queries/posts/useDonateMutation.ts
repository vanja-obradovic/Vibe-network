import { useMutation } from "@tanstack/react-query";
import { Contract } from "ethers";

const fetch = async ({ contract, id }: { contract: Contract; id: number }): Promise<unknown> => {
  return await contract?.sponsorPost(id);
};

export const useDonateMutation = () => {
  return useMutation({
    mutationFn: fetch,
  });
};
