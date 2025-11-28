import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import App from "./App.tsx";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appConfig } from "./lib/config.ts";

// 如果配置了自定义 RPC，创建自定义 chain；否则使用默认 sepolia
const sepoliaChain = appConfig.customRpcUrl
  ? {
      ...sepolia,
      rpcUrls: {
        default: {
          http: [appConfig.customRpcUrl],
        },
        public: {
          http: [appConfig.customRpcUrl],
        },
      },
    }
  : sepolia;

const wagmiConfig = getDefaultConfig({
  appName: "Onchain Logger",
  projectId: appConfig.walletConnectId || "demo",
  chains: [sepoliaChain],
  ssr: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
