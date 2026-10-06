// Merge research/grounding.json into component, preset, style, protocol and catalogue files (research spec §9.2).
//
//   pnpm apply-grounding           write the merge; then run the printed biome command yourself
//   pnpm apply-grounding --check   exit 1 if any file differs from what a merge would produce (CI)
//
// Files are compared as parsed JSON, so formatting and line endings never count as a difference.
// A grounded style not yet in registry/styles.json (see PENDING_STYLES) warns, not errors: sub-project 3 adds the file.
// Exit codes: 0 written or up to date; 1 errors in grounding.json (nothing written), or --check found drift.

import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { applyGrounding, changedFiles, loadItemFiles, readGroundingFile } from "./research/grounding";

const root = resolve(import.meta.dirname, "..");
const check = process.argv.includes("--check");

const before = loadItemFiles(root);
const { files: after, errors, warnings } = applyGrounding(readGroundingFile(root), before);
for (const w of warnings) console.error(`warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\n${errors.length} error(s) in research/grounding.json; nothing was written`);
  process.exit(1);
}

const changed = changedFiles(before, after);
if (check) {
  if (changed.length) {
    console.error("out of date with research/grounding.json (run `pnpm apply-grounding`):");
    for (const c of changed) console.error(`  ${c.path}`);
    process.exit(1);
  }
  console.log("grounding is up to date");
  process.exit(0);
}

for (const c of changed) writeFileSync(join(root, c.path), `${JSON.stringify(c.value, null, 2)}\n`);
if (changed.length) {
  console.log(`wrote ${changed.length} file(s):`);
  for (const c of changed) console.log(`  ${c.path}`);
  console.log(
    "now run: npx biome format --write packages/switchback/components packages/switchback/presets packages/switchback/registry",
  );
} else console.log("grounding is up to date; nothing written");
