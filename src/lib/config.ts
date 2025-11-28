const loggerAddressEnv = import.meta.env.VITE_LOGGER_CONTRACT;
const loggerAddress = loggerAddressEnv ? (loggerAddressEnv as `0x${string}`) : undefined;
const subgraphUrl = import.meta.env.VITE_SUBGRAPH_URL || "";
const walletConnectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "";
const customRpcUrl = import.meta.env.VITE_SEPOLIA_RPC_URL || "";

if (!walletConnectId) {
  console.warn("未设置 VITE_WALLETCONNECT_PROJECT_ID，RainbowKit 将无法初始化");
}

export const appConfig = {
  loggerAddress,
  subgraphUrl,
  walletConnectId,
  customRpcUrl,
};
