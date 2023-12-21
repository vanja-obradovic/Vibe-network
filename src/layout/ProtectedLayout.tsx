import LandingPage from "../pages/LandingPage";
import MainLayout from "./MainLayout";
import { useAccount } from "wagmi";

const ProtectedLayout = () => {
  const { isConnected } = useAccount();

  if (!isConnected) return <LandingPage />;

  return <MainLayout />;
};

export default ProtectedLayout;
