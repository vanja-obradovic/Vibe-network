import { useMutation } from "@tanstack/react-query";
import { Contract, parseUnits } from "ethers";

const fetch = async ({
  contract,
  id,
  amount,
}: {
  contract: Contract;
  id: number;
  amount: string;
}): Promise<unknown> => {
  return await contract?.sponsorPost(id, { value: parseUnits(amount) });
};

export const useDonateMutation = () => {
  return useMutation({
    mutationFn: fetch,
  });
};
