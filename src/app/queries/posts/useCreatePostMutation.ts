import { useMutation } from "@tanstack/react-query";
import { Contract } from "ethers";

const fetch = async ({ contract, text }: { contract: Contract; text: string }): Promise<unknown> => {
  return await contract?.createPost(text);
};

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: fetch,
  });
};
