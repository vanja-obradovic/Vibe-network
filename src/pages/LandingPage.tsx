import Landing_BG from "../../public/images/landing_bg.png";
import Logo from "../../public/images/logo.svg";
import Metamask from "../../public/images/metamask.png";
import WalletConnect from "../../public/images/walletconnect.png";

const LandingPage = () => {
  return (
    <div className="grid max-h-screen grid-cols-[auto_1fr]">
      <div className="relative">
        <img src={Landing_BG} alt="landing background" />
        <img src={Logo} alt="vibe logo" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="flex flex-col justify-center gap-y-16 pl-9">
        <div>
          <p className="text-text-muted">Connect your wallet</p>
          <p className="text-text-muted">
            Need help connecting a wallet?{" "}
            <a href="" className="no-underline">
              Read our FAQ
            </a>
          </p>
        </div>
        <div className="flex w-fit flex-col gap-y-4">
          <button className="flex h-20 w-80 items-center  gap-x-9 rounded-2xl border-2 border-[rgba(255,255,255,0.24)] py-4  backdrop-blur-md [background:radial-gradient(267.72%_139.47%_at_0%_2.78%,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.00)_100%)]">
            <img src={Metamask} alt="metamask logo" className="pl-20" />
            <span>MetaMask</span>
          </button>
          <button className="flex h-20 w-80 items-center  gap-x-9 rounded-2xl border-2 border-[rgba(255,255,255,0.24)] py-4  backdrop-blur-md [background:radial-gradient(267.72%_139.47%_at_0%_2.78%,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.00)_100%)]">
            <img src={WalletConnect} alt="walletconnect logo" className="pl-20" />
            <span>WalletConnect</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
