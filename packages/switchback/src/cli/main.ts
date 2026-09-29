#!/usr/bin/env node
import { processIo } from "./io";
import { run } from "./run";

run(process.argv.slice(2), processIo, process.env).then(
  (code) => {
    process.exitCode = code;
  },
  (error: unknown) => {
    processIo.err(error instanceof Error ? (error.stack ?? error.message) : String(error));
    process.exitCode = 1;
  },
);
