/// <reference types="vite/client" />

// eslint-disable-next-line import/named
import { BrowserProvider, Eip1193Provider } from "ethers";
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  ethereum: BrowserProvider & Eip1193Provider;
}
