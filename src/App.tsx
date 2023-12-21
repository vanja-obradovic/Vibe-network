import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app/routes/routes";
import { WagmiConfig } from "wagmi";
import config from "./app/config/wagmi";

const App: FC = () => {
  return (
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
    </WagmiConfig>
  );
};

export default App;
