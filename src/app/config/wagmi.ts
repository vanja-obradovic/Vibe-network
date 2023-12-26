import { createConfig, configureChains, sepolia } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY })]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({ options: { projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID } }),
  ],
});

export default config;
