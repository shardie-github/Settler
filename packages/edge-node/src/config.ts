import dotenv from "dotenv";

dotenv.config();

export const config = {
  cloudApiUrl: process.env.SETTLER_CLOUD_API_URL || "https://api.settler.dev",
  dataDir: process.env.SETTLER_DATA_DIR || "./data",
  nodeKey: process.env.SETTLER_NODE_KEY || "",
  heartbeatInterval: Number(process.env.SETTLER_HEARTBEAT_INTERVAL) || 30000, // 30 seconds
  syncInterval: Number(process.env.SETTLER_SYNC_INTERVAL) || 60000, // 1 minute
  batchSize: Number(process.env.SETTLER_BATCH_SIZE) || 100,
  enableOfflineMode: process.env.SETTLER_OFFLINE_MODE === "true",
  logLevel: process.env.LOG_LEVEL || "info",
};
