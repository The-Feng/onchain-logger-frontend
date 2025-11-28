import { useMemo, useEffect } from "react";
import { useLogEntries } from "../hooks/useLogEntries";
import { appConfig } from "../lib/config";

interface LogTableProps {
  onError?: (message: string) => void;
}

function formatTimestamp(value: string) {
  const date = new Date(Number(value) * 1000);
  return date.toLocaleString();
}

export function LogTable({ onError }: LogTableProps) {
  const { data, isFetching, refetch, error } = useLogEntries();
  const { subgraphUrl } = appConfig;

  const rows = useMemo(() => data ?? [], [data]);

  useEffect(() => {
    if (error) {
      const errorMsg = (error as Error).message || "查询数据失败";
      let friendlyMsg = errorMsg;
      if (errorMsg.includes("not started syncing")) {
        friendlyMsg = "子图正在同步中，请稍后再试";
      } else if (errorMsg.includes("Not found") || errorMsg.includes("404")) {
        friendlyMsg = "子图 URL 配置错误，请检查 VITE_SUBGRAPH_URL";
      }
      onError?.(friendlyMsg);
    }
  }, [error, onError]);

  useEffect(() => {
    if (!subgraphUrl) {
      onError?.("未配置子图 URL，请在 .env 文件中设置 VITE_SUBGRAPH_URL");
    }
  }, [subgraphUrl, onError]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2>链上事件</h2>
          <p>数据由 The Graph 子图提供，每 10 秒自动刷新</p>
        </div>
        <button className="ghost" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "同步中…" : "刷新"}
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>日志 ID</th>
              <th>发送者</th>
              <th>Topic</th>
              <th>消息</th>
              <th>Metadata</th>
              <th>时间</th>
              <th>交易</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((entry: any) => (
              <tr key={entry.id}>
                <td>{entry.logId}</td>
                <td title={entry.writer}>{entry.writer.slice(0, 6)}…{entry.writer.slice(-4)}</td>
                <td>{entry.topic}</td>
                <td>{entry.data}</td>
                <td className="metadata">{entry.metadata}</td>
                <td>{formatTimestamp(entry.timestamp)}</td>
                <td>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${entry.transactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    查看
                  </a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                  暂无数据，请先写入事件。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
