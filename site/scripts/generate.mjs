// Prebuild: writes everything the site's docs and showcase read that must never drift from the
// CLI package itself — the component catalogue, its rendered previews, the CLI reference, and
// (from Task 5) the showcase workbooks. Run by `pnpm --filter @switchback/site build` (via the
// package's own `prebuild` script) and `pnpm --filter @switchback/site dev`.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalogue, renderComponent } from "@vandermerwed/switchback";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const repoRoot = join(siteRoot, "..");
const cliPath = join(repoRoot, "packages", "switchback", "dist", "cli.js");

const previewsDir = join(siteRoot, "public", "generated", "previews");
const generatedDir = join(siteRoot, "src", "generated");

mkdirSync(previewsDir, { recursive: true });
mkdirSync(generatedDir, { recursive: true });

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function dataFieldsOf(schema) {
  return Object.keys(schema?.properties ?? {});
}

// --- The component and preset catalogue --------------------------------------------------
const catalogue = loadCatalogue();
const catalogueEntries = [];

for (const [id, component] of catalogue.components) {
  const meta = component.meta;
  catalogueEntries.push({
    id,
    kind: meta.kind,
    title: meta.name,
    intent: meta.intent,
    tags: meta.tags,
    phase: meta.phase,
    variants: meta.variants,
    dataFields: dataFieldsOf(meta.data),
    grounding: meta.grounding,
  });
}

for (const [id, preset] of catalogue.presets) {
  const base = catalogue.components.get(preset.extends);
  catalogueEntries.push({
    id,
    kind: "preset",
    title: preset.name,
    intent: base?.meta.intent ?? "",
    extends: preset.extends,
    attribution: preset.attribution,
    licence: preset.licence,
    tags: preset.tags,
    phase: base?.meta.phase ?? "either",
    variants: base?.meta.variants ?? [],
    dataFields: dataFieldsOf({ properties: preset.data }),
    grounding: preset.grounding ?? base?.meta.grounding,
  });
}

// Render every component and preset's default example, exactly as the CLI would, and fail the
// build loudly if any of them produces an error diagnostic — a preview is never shipped broken.
const renderErrors = [];
for (const entry of catalogueEntries) {
  const result = renderComponent(entry.id, { paper: "A4", embedFonts: true, catalogue });
  const errors = result.diagnostics.filter((d) => d.level === "error");
  if (errors.length || !result.html) {
    renderErrors.push(`${entry.id}: ${JSON.stringify(errors.length ? errors : result.diagnostics)}`);
    continue;
  }
  writeFileSync(join(previewsDir, `${entry.id}.html`), result.html, "utf8");
}
if (renderErrors.length) {
  throw new Error(`generate.mjs: could not render every preview:\n${renderErrors.join("\n")}`);
}

writeJson(join(generatedDir, "catalogue.json"), catalogueEntries);

// --- The CLI reference, generated from the CLI's own --help text ------------------------
const commands = ["init", "profile", "list", "show", "build", "proof", "media", "legend", "validate"];
const cliEntries = commands.map((command) => ({
  command,
  help: execFileSync(process.execPath, [cliPath, command, "--help"], { encoding: "utf8" }).trim(),
}));
writeJson(join(generatedDir, "cli.json"), cliEntries);

console.log(
  `generate.mjs: wrote ${catalogueEntries.length} previews, catalogue.json and cli.json (${cliEntries.length} commands).`,
);
