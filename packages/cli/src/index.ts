#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { jobsCommand } from "./commands/jobs";
import { reportsCommand } from "./commands/reports";
import { webhooksCommand } from "./commands/webhooks";
import { adaptersCommand } from "./commands/adapters";

const program = new Command();

program
  .name("settler")
  .description("CLI tool for Settler API")
  .version("1.0.0");

program
  .option("-k, --api-key <key>", "API key")
  .option("-u, --base-url <url>", "Base URL", "https://api.settler.io");

// Add command groups
program.addCommand(jobsCommand);
program.addCommand(reportsCommand);
program.addCommand(webhooksCommand);
program.addCommand(adaptersCommand);

// Parse arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
