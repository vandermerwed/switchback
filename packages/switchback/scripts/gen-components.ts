import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { generateIndex } from "../src/registry/codegen";

const root = resolve(import.meta.dirname, "..");
const out = join(root, "src/generated/components.ts");
const code = generateIndex(root);

if (process.argv.includes("--check")) {
  const current = readFileSync(out, "utf8").replace(/\r\n/g, "\n");
  if (current !== code) {
    console.error("src/generated/components.ts is stale; run `pnpm gen`");
    process.exit(1);
  }
  console.log("generated index is current");
} else {
  writeFileSync(out, code, "utf8");
  console.log(`wrote ${out}`);
}
