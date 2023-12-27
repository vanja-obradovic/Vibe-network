import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import "./assets/style/app.scss";
import { queryClient } from "./app/config/react-query.ts";
import { WagmiConfig } from "wagmi";
import config from "./app/config/wagmi";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <App />
      </WagmiConfig>
      <Toaster toastOptions={{ position: "bottom-right", duration: 3000 }} />
    </QueryClientProvider>
  </React.StrictMode>
);
