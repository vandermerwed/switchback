import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildDocument } from "../src/engine/build";
import { formatDiagnostic } from "../src/engine/diagnostics";
import type { SpecPage } from "../src/engine/types";
import { loadCatalogue } from "../src/registry/catalogue";

const cat = loadCatalogue();
const pages: SpecPage[] = [];
for (const c of cat.components.values()) {
  for (const [name, ex] of Object.entries(c.examples)) {
    pages.push({
      id: `W1-P${pages.length + 1}`,
      component: c.meta.id,
      title: `${c.meta.name} · ${name}`,
      data: ex.data ?? {},
      ...(ex.variant ? { variant: ex.variant } : {}),
    });
  }
}
for (const p of cat.presets.values())
  pages.push({ id: `W1-P${pages.length + 1}`, component: p.id, title: `${p.name} · preset` });

const richKit = {
  pens: ["black", "blue", "red", "green", "orange", "purple"].map((colour) => ({ colour })),
  highlighter: true,
  pencil: true,
  scissors: true,
  tape: true,
  glue: true,
  index_cards: true,
  sticky_notes: true,
  coins: true,
  timer: true,
  wall_space: true,
  camera: true,
};
const result = buildDocument(
  {
    switchback: 1,
    title: "Switchback contact sheet",
    subtitle: "every component, variant and preset",
    kit: richKit,
    pages,
  },
  { skipStyleChecks: true, clock: () => new Date(0) },
);
for (const d of result.diagnostics) console.error(formatDiagnostic(d));
if (!result.html) process.exit(1);

const out = resolve(import.meta.dirname, "..", "out");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "contact-sheet.html"), result.html);
if (process.argv.includes("--png")) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
  await page.setContent(result.html, { waitUntil: "load" });
  await page.screenshot({ path: join(out, "contact-sheet.png"), fullPage: true });
  await browser.close();
}
console.log(`wrote ${join(out, "contact-sheet.html")} (${pages.length} pages)`);
