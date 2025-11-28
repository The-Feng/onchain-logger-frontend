import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import { appConfig } from "../lib/config";

const LOGS_QUERY = gql`
  query LatestLogs($first: Int!, $skip: Int!) {
    logEntries(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
      id
      logId
      writer
      topic
      data
      metadata
      timestamp
      transactionHash
    }
  }
`;

async function fetchLogEntries() {
  if (!appConfig.subgraphUrl) {
    throw new Error("尚未设置 VITE_SUBGRAPH_URL");
  }
  try {
    const client = new GraphQLClient(appConfig.subgraphUrl);
    const data = await client.request(LOGS_QUERY, { first: 20, skip: 0 });
    // 确保返回的数据结构正确
    if (!data || typeof data !== 'object') {
      console.warn('GraphQL 返回数据格式异常:', data);
      return [];
    }
    return data.logEntries || [];
  } catch (error: any) {
    console.error('查询子图数据失败:', error);
    // 如果是子图还在同步中的错误，返回空数组而不是抛出错误
    if (error?.message?.includes('not started syncing')) {
      return [];
    }
    throw error;
  }
}

export function useLogEntries() {
  return useQuery({
    queryKey: ["logEntries"],
    queryFn: fetchLogEntries,
    refetchInterval: 10000,
    enabled: Boolean(appConfig.subgraphUrl),
  });
}
