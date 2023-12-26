import { ReactNode, createContext, useContext, useEffect, useState } from "react";
// eslint-disable-next-line import/named
import { ethers } from "ethers";
import snContract from "../contract/SocialNetwork";

type contractContextType = {
  provider: ethers.Provider;
  signer: ethers.JsonRpcSigner;
  accounts: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract: any;
};

const ContractContext = createContext<Partial<contractContextType>>({});

function ContractProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<Partial<contractContextType>>({});

  useEffect(() => {
    async function getContractBasics() {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            const contract = snContract(provider).connect(signer);
            setValue({ provider, signer, accounts, contract: contract });
          } else {
            console.log("Not connected");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    getContractBasics();
  }, []);

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
}

function useContract() {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a ContractProvider");
  }
  return context;
}

export { ContractProvider, useContract };
