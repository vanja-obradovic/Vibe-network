import { useAccount, useDisconnect, useEnsName } from "wagmi";
const DashboardPage = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const { disconnect } = useDisconnect();

  return (
    <div className="grid min-h-screen grid-cols-[291px_1fr_291px] gap-x-11 [&>*]:rounded-3xl [&>*]:[background:radial-gradient(267.72%_139.47%_at_0%_2.78%,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.00)_100%)]">
      <div className="max-h-96 border-[16px] border-white/25 backdrop-blur-md"></div>
      <div className="border-[16px] border-white/25 backdrop-blur-md">Connected successfully page</div>
      <div className="max-h-28 border-[16px] border-white/25 px-3 py-7 backdrop-blur-md">
        <button className="h-full w-full text-ellipsis rounded-2xl bg-[#F7F8FF]" onClick={() => disconnect()}>
          {ensName ?? address}
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
