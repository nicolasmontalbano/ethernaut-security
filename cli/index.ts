#!/usr/bin/env node
import "dotenv/config";

import { Command } from "commander";

import { levels } from "./lib/levels.js";

const program = new Command();

program
  .name("ethernaut-security")
  .description("Run and inspect reproducible Ethernaut research")
  .showHelpAfterError()
  .showSuggestionAfterError();

program
  .command("levels")
  .description("List documented and planned levels")
  .action(() => {
    console.table(
      levels.map(({ name, vulnerability, status }) => ({
        level: name,
        vulnerability,
        status,
      })),
    );
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`CLI failed: ${message}`);
  process.exitCode = 1;
});
