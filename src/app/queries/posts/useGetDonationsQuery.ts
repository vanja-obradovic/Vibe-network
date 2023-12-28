import { useQuery } from "@tanstack/react-query";
import { Contract, EventLog, Log } from "ethers";

const fetch = async ({ contract }: { contract: Contract }): Promise<(EventLog | Log)[]> => {
  return await contract.filters
    .PostSponsored()
    .getTopicFilter()
    .then((res) => contract.queryFilter(res));
};

export const useGetDonationsQuery = ({ contract }: { contract: Contract }) => {
  return useQuery({
    queryKey: ["donations"],
    enabled: !!contract,
    queryFn: () => fetch({ contract }),
  });
};
