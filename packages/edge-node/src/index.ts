#!/usr/bin/env node

/**
 * Settler Edge Node
 * Local reconciliation engine with AI capabilities
 */

import { Command } from "commander";
import chalk from "chalk";
import { EdgeNodeService } from "./services/EdgeNodeService";
import { config } from "./config";
import { logger } from "./utils/logger";

const program = new Command();

program
  .name("settler-edge")
  .description("Settler Edge Node - Local reconciliation with AI")
  .version("1.0.0");

program
  .command("start")
  .description("Start the edge node service")
  .option("-c, --config <path>", "Path to config file")
  .option("-k, --node-key <key>", "Node authentication key")
  .action(async (options) => {
    try {
      logger.info("Starting Settler Edge Node...");

      const nodeKey = options.nodeKey || process.env.SETTLER_NODE_KEY;
      if (!nodeKey) {
        logger.error(
          "Node key is required. Set SETTLER_NODE_KEY environment variable or use --node-key"
        );
        process.exit(1);
      }

      const service = new EdgeNodeService({
        nodeKey,
        cloudApiUrl: config.cloudApiUrl,
        dataDir: config.dataDir,
      });

      await service.start();

      logger.info(chalk.green("Edge node started successfully"));

      // Graceful shutdown
      process.on("SIGINT", async () => {
        logger.info("Shutting down edge node...");
        await service.stop();
        process.exit(0);
      });

      process.on("SIGTERM", async () => {
        logger.info("Shutting down edge node...");
        await service.stop();
        process.exit(0);
      });
    } catch (error) {
      logger.error("Failed to start edge node", error);
      process.exit(1);
    }
  });

program
  .command("enroll")
  .description("Enroll this edge node with Settler Cloud")
  .requiredOption("-e, --enrollment-key <key>", "Enrollment key from Settler dashboard")
  .option("-n, --name <name>", "Node name")
  .option("-t, --type <type>", "Device type (server|embedded|mobile|edge_gateway)")
  .action(async (options) => {
    try {
      logger.info("Enrolling edge node...");

      const service = new EdgeNodeService({
        nodeKey: "", // Will be set after enrollment
        cloudApiUrl: config.cloudApiUrl,
        dataDir: config.dataDir,
      });

      const result = await service.enroll({
        enrollmentKey: options.enrollmentKey,
        name: options.name || `edge-node-${Date.now()}`,
        deviceType: options.type || "server",
      });

      logger.info(chalk.green(`Node enrolled successfully!`));
      logger.info(chalk.yellow(`Node ID: ${result.nodeId}`));
      logger.info(chalk.yellow(`Node Key: ${result.nodeKey}`));
      logger.info(chalk.yellow("Save this node key securely - it will not be shown again"));

      // Save node key to config
      await service.saveNodeKey(result.nodeKey);
    } catch (error) {
      logger.error("Enrollment failed", error);
      process.exit(1);
    }
  });

program
  .command("status")
  .description("Show edge node status")
  .action(async () => {
    try {
      const service = new EdgeNodeService({
        nodeKey: process.env.SETTLER_NODE_KEY || "",
        cloudApiUrl: config.cloudApiUrl,
        dataDir: config.dataDir,
      });

      const status = await service.getStatus();

      console.log(chalk.bold("Edge Node Status:"));
      console.log(`  Node ID: ${status.nodeId || "Not enrolled"}`);
      console.log(`  Status: ${status.status || "Unknown"}`);
      console.log(`  Last Heartbeat: ${status.lastHeartbeat || "Never"}`);
      console.log(`  Jobs Processed: ${status.jobsProcessed || 0}`);
      console.log(`  Local Storage: ${status.localStorageUsed || 0} MB`);
    } catch (error) {
      logger.error("Failed to get status", error);
      process.exit(1);
    }
  });

program.parse();
