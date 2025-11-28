export const onchainLoggerAbi = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "logId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "writer", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "topic", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "data", "type": "string" },
      { "indexed": false, "internalType": "bytes", "name": "metadata", "type": "bytes" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "LogStored",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "totalLogs",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "topic", "type": "string" },
      { "internalType": "string", "name": "data", "type": "string" },
      { "internalType": "bytes", "name": "metadata", "type": "bytes" }
    ],
    "name": "writeLog",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
