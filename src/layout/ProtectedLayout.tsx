import LandingPage from "../pages/LandingPage";
import MainLayout from "./MainLayout";

const ProtectedLayout = () => {
  const connected = false;

  if (!connected) return <LandingPage />;

  return <MainLayout />;
};

export default ProtectedLayout;
