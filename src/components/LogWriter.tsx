import type { FormEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { stringToHex } from "viem";
import { onchainLoggerAbi } from "../lib/abi";
import { appConfig } from "../lib/config";

interface LogWriterProps {
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

export function LogWriter({ onError, onSuccess }: LogWriterProps) {
  const { address, isConnected } = useAccount();
  const [topic, setTopic] = useState("test");
  const [message, setMessage] = useState("这是一条测试日志，用于验证链上事件写入和查询功能");
  const [metadata, setMetadata] = useState('{"timestamp":"' + new Date().toISOString() + '","source":"frontend","test":true}');
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const successShownRef = useRef<string | undefined>(undefined);

  const {
    writeContractAsync,
    isPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  // 当 txHash 变化时，重置成功提示标记
  useEffect(() => {
    if (txHash) {
      successShownRef.current = undefined;
    }
  }, [txHash]);

  // 只在成功且未显示过时显示提示
  useEffect(() => {
    if (isSuccess && txHash && successShownRef.current !== txHash) {
      successShownRef.current = txHash;
      onSuccess?.("交易已确认！");
    }
  }, [isSuccess, txHash, onSuccess]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const contractAddress = appConfig.loggerAddress;
    if (!contractAddress) {
      onError?.("请先在 .env 中设置 VITE_LOGGER_CONTRACT");
      return;
    }
    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: onchainLoggerAbi,
        functionName: "writeLog",
        args: [topic, message, metadata ? stringToHex(metadata) : "0x"],
      });
      setTxHash(hash);
      setMessage("");
      setMetadata("");
      onSuccess?.("交易已提交，等待确认中...");
    } catch (err: any) {
      console.error(err);
      const errorMsg = err?.message || err?.toString() || "提交交易失败";
      // 简化错误信息
      let friendlyMsg = errorMsg;
      if (errorMsg.includes("too long to respond") || errorMsg.includes("timeout")) {
        friendlyMsg = "RPC 请求超时，请稍后重试。如持续出现，建议在 .env 中配置 VITE_SEPOLIA_RPC_URL 使用更稳定的 RPC 端点（如 Infura 或 Alchemy）";
      } else if (errorMsg.includes("insufficient funds")) {
        friendlyMsg = "余额不足，请确保钱包有足够的 Sepolia ETH";
      } else if (errorMsg.includes("user rejected")) {
        friendlyMsg = "用户取消了交易";
      }
      onError?.(friendlyMsg);
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2>写入事件</h2>
          <p>通过 Wagmi 直接调用合约的 writeLog 函数</p>
        </div>
        <span className="badge">{address ? address.slice(0, 6) + "…" : "尚未连接"}</span>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Topic
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="status" required />
        </label>
        <label>
          Message
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="部署完成，版本1.0" rows={4} required />
        </label>
        <label>
          Metadata（可选）
          <textarea value={metadata} onChange={(e) => setMetadata(e.target.value)} placeholder='{"commit":"abc"}' rows={3} />
        </label>
        <button type="submit" disabled={!isConnected || isPending}>
          {isPending ? "提交交易中…" : "提交"}
        </button>
        {isConfirming && <p className="hint">等待区块确认…</p>}
        {isSuccess && <p className="hint success">交易已确认！</p>}
      </form>
    </div>
  );
}
