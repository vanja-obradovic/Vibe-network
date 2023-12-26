import Landing_BG from "../../public/images/landing_bg.png";
import { ReactComponent as Logo } from "../../public/images/logo.svg";
import Metamask from "../../public/images/metamask.png";
import WalletConnect from "../../public/images/walletconnect.png";
import { useConnect } from "wagmi";

const LandingPage = () => {
  const { connect, connectors } = useConnect();

  return (
    <div className={`grid max-h-screen grid-cols-2 bg-[url('/images/spheres.png')] bg-cover bg-center bg-no-repeat`}>
      <div className="relative">
        <img src={Landing_BG} alt="landing background" className="h-screen w-full object-cover" />
        <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
      </div>
      <div className="flex flex-col justify-center gap-y-16 pl-9">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-text-muted">Connect your wallet</h1>
          <div className="text-text-muted">
            Need help connecting a wallet?{" "}
            <a href="" className="underline">
              Read our FAQ
            </a>
          </div>
        </div>
        <div className="flex w-fit flex-col gap-y-4 backdrop-blur-md [&>*]:[background:radial-gradient(267.72%_139.47%_at_0%_2.78%,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.00)_100%)]">
          {connectors.map((connector) => {
            if (connector.name === "MetaMask")
              return (
                <button
                  className="flex h-20 w-80 items-center  gap-x-9 rounded-2xl border-2 border-[rgba(255,255,255,0.24)] py-4"
                  onClick={() => connect({ connector })}
                  key={connector.id}
                >
                  <img src={Metamask} alt="metamask logo" className="pl-20" />
                  <span>MetaMask</span>
                </button>
              );
            else if (connector.name === "WalletConnect")
              return (
                <button
                  className="flex h-20 w-80 items-center  gap-x-9 rounded-2xl border-2 border-[rgba(255,255,255,0.24)] py-4 "
                  onClick={() => connect({ connector })}
                  key={connector.id}
                >
                  <img src={WalletConnect} alt="walletconnect logo" className="pl-20" />
                  <span>WalletConnect</span>
                </button>
              );
            else return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
