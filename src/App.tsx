import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./App.css";
import { LogWriter } from "./components/LogWriter";
import { LogTable } from "./components/LogTable";
import { Toast } from "./components/Toast";

interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    // 避免相同消息重复显示（5秒内）
    setToasts((prev) => {
      const now = Date.now();
      const recentSame = prev.find(
        (t) => t.message === message && t.type === type && now - t.id < 5000
      );
      if (recentSame) {
        return prev; // 如果5秒内有相同消息，不重复添加
      }
      return [...prev, { id: now, message, type }];
    });
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="page">
      <header>
        <div>
          <p className="eyebrow">Onchain Logger</p>
          <h1>通过事件把数据写上链并回读</h1>
          <p className="subtitle">
            合约在 Sepolia 上发出 LogStored 事件，The Graph 子图即时索引后由前端查询，并配合 Wagmi +
            RainbowKit 钱包互动。
          </p>
        </div>
        <ConnectButton />
      </header>
      <main className="main-layout">
        <div className="left-panel">
          <LogWriter onError={(msg) => showToast(msg, "error")} onSuccess={(msg) => showToast(msg, "success")} />
        </div>
        <div className="right-panel">
          <LogTable onError={(msg) => showToast(msg, "error")} />
        </div>
      </main>
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
