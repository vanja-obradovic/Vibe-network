import { useAccount, useDisconnect } from "wagmi";
const DashboardPage = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      Connected successfully page - {address} <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
};

export default DashboardPage;
