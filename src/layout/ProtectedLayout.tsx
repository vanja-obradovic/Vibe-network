import { ContractProvider } from "../context/contract";
import LandingPage from "../pages/LandingPage";
import MainLayout from "./MainLayout";
import { useAccount } from "wagmi";

const ProtectedLayout = () => {
  const { isConnected } = useAccount();

  if (!isConnected) return <LandingPage />;

  return (
    <ContractProvider>
      <MainLayout />
    </ContractProvider>
  );
};

export default ProtectedLayout;
