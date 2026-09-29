import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { renderComponent } from "../src/engine/build";
import { formatDiagnostic } from "../src/engine/diagnostics";

const [id, example = "default"] = process.argv.slice(2);
if (!id) {
  console.error("usage: tsx scripts/preview.ts <component-or-preset-id> [example]");
  process.exit(2);
}
const result = renderComponent(id, { example });
for (const d of result.diagnostics) console.error(formatDiagnostic(d));
if (!result.html) process.exit(1);
const out = resolve(import.meta.dirname, "..", "out");
mkdirSync(out, { recursive: true });
const file = join(out, `preview-${id}-${example}.html`);
writeFileSync(file, result.html);
console.log(`wrote ${file}`);
