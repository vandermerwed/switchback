// Prebuild: writes everything the site's docs and showcase read that must never drift from the
// CLI package itself — the component catalogue, its rendered previews, the CLI reference, and
// (from Task 5) the showcase workbooks. Run by `pnpm --filter @switchback/site build` (via the
// package's own `prebuild` script) and `pnpm --filter @switchback/site dev`.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  basisOf,
  buildDocument,
  groundingOf,
  loadCatalogue,
  originOf,
  renderComponent,
} from "@vandermerwed/switchback";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const repoRoot = join(siteRoot, "..");
const cliPath = join(repoRoot, "packages", "switchback", "dist", "cli.js");

const previewsDir = join(siteRoot, "public", "generated", "previews");
const generatedDir = join(siteRoot, "src", "generated");
const showcaseDir = join(siteRoot, "public", "generated", "showcase");
const showcaseSrcDir = join(siteRoot, "showcase");
const showcaseRequests = JSON.parse(readFileSync(join(showcaseSrcDir, "requests.json"), "utf8"));
const showcaseTmpDir = join(generatedDir, "showcase");

mkdirSync(previewsDir, { recursive: true });
mkdirSync(generatedDir, { recursive: true });
mkdirSync(showcaseDir, { recursive: true });
mkdirSync(showcaseTmpDir, { recursive: true });

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
    basis: basisOf(meta),
    origin: originOf(meta) ?? null,
    grounding: groundingOf(meta),
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
    basis: base ? basisOf(base.meta, preset) : (preset.basis ?? "research"),
    origin: base ? (originOf(base.meta, preset) ?? null) : null,
    // A preset's own claims first; a practical preset never inherits its base's.
    grounding: base ? groundingOf(base.meta, preset) : undefined,
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
  entry.orientation = result.sidecar?.pages[0]?.orientation ?? "portrait";
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

// --- The showcase: one real workbook per style, built and PDF'd by the CLI itself -------
// `switchback proof` turns showcase/proof.md into a real spec first, exactly as a user's agent
// would; the other four styles are hand-authored specs already in the style's own shape.
const proofSpecPath = join(showcaseTmpDir, "proof.json");
const proofResult = JSON.parse(
  execFileSync(
    process.execPath,
    [
      cliPath,
      "proof",
      join(showcaseSrcDir, "proof.md"),
      "-o",
      proofSpecPath,
      "--title",
      "Should the team meet daily?",
      "--json",
    ],
    { encoding: "utf8" },
  ),
);
if (!proofResult.ok || proofResult.specs.length !== 1) {
  throw new Error(
    `generate.mjs: expected showcase/proof.md to build to exactly one proof spec, got ${proofResult.specs?.length ?? 0}`,
  );
}

const showcaseSpecs = [
  { style: "sitting", label: "Sitting", path: join(showcaseSrcDir, "sitting.json") },
  { style: "series", label: "Series", path: join(showcaseSrcDir, "series.json") },
  { style: "incubation", label: "Incubation", path: join(showcaseSrcDir, "incubation.json") },
  { style: "ritual", label: "Ritual", path: join(showcaseSrcDir, "ritual.json") },
  { style: "proof", label: "Proof", path: proofResult.specs[0] },
];

const showcaseErrors = [];
const committedPdfsUsed = [];
const showcaseEntries = [];
for (const { style, label, path } of showcaseSpecs) {
  const spec = JSON.parse(readFileSync(path, "utf8"));

  // Validate the way a user's agent would before building, so a broken example fails loudly here
  // rather than shipping a silently-invalid workbook.
  const validation = JSON.parse(
    execFileSync(process.execPath, [cliPath, "validate", path, "--json"], { encoding: "utf8" }),
  );
  const validationErrors = (validation.diagnostics ?? []).filter((d) => d.level === "error");
  if (validationErrors.length) {
    showcaseErrors.push(`${style}: ${JSON.stringify(validationErrors)}`);
    continue;
  }

  const built = buildDocument(spec, { embedFonts: true });
  const buildErrors = built.diagnostics.filter((d) => d.level === "error");
  if (buildErrors.length || !built.html) {
    showcaseErrors.push(`${style}: ${JSON.stringify(buildErrors.length ? buildErrors : built.diagnostics)}`);
    continue;
  }

  const outHtml = join(showcaseDir, `${style}.html`);
  const freshPdf = join(showcaseDir, `${style}.pdf`);
  const committedPdf = join(showcaseSrcDir, "pdf", `${style}.pdf`);
  rmSync(freshPdf, { force: true });
  // The CLI's own `build --pdf` writes the PDF beside its own (non-embedded-fonts) HTML; that
  // HTML is then overwritten below with the embedFonts version this page actually serves.
  try {
    execFileSync(process.execPath, [cliPath, "build", path, "-o", outHtml, "--pdf", "--json"], {
      encoding: "utf8",
    });
  } catch (e) {
    // Exit 3 is W_NO_BROWSER or W_PDF_FAILED: the HTML and sidecar are written, only the PDF is not.
    if (e.status !== 3) throw e;
  }
  writeFileSync(outHtml, built.html, "utf8");
  // Keep the exact renderer head and page markup, but publish each page separately so the
  // gallery can show every sheet with plain HTML and CSS, without a browser-side script.
  // A page's class can carry more than one name (`sb-page sb-landscape`, `sb-page sb-has-attrib`).
  const pageMarkup = [...built.html.matchAll(/<section class="sb-page[^"]*"[\s\S]*?<\/section>/g)].map(
    (match) => match[0],
  );
  if (pageMarkup.length !== spec.pages.length) {
    showcaseErrors.push(`${style}: expected ${spec.pages.length} renderer pages, got ${pageMarkup.length}`);
    continue;
  }
  const pagePreviews = pageMarkup.map((markup, index) => {
    const file = `${style}-${index + 1}.html`;
    const singlePage = built.html.replace(
      /(<body[^>]*>)[\s\S]*?(<\/body>)/,
      (_, open, close) => `${open}${markup}${close}`,
    );
    writeFileSync(join(showcaseDir, file), singlePage, "utf8");
    return {
      html: `/generated/showcase/${file}`,
      id: spec.pages[index]?.id ?? `Page ${index + 1}`,
      orientation: built.sidecar.pages[index]?.orientation ?? "portrait",
    };
  });
  // A build machine without Chrome, Edge or Chromium (Cloudflare Pages' image, for one) cannot make
  // the PDF, so it ships the committed copy in showcase/pdf/. Refresh those copies with
  // SWITCHBACK_UPDATE_SHOWCASE_PDFS=1 on a machine that has a browser, then commit them.
  if (existsSync(freshPdf)) {
    if (process.env.SWITCHBACK_UPDATE_SHOWCASE_PDFS === "1") {
      mkdirSync(join(showcaseSrcDir, "pdf"), { recursive: true });
      copyFileSync(freshPdf, committedPdf);
    }
  } else if (existsSync(committedPdf)) {
    copyFileSync(committedPdf, freshPdf);
    committedPdfsUsed.push(style);
  } else {
    showcaseErrors.push(
      `${style}: no browser to make its PDF, and no committed copy at showcase/pdf/${style}.pdf`,
    );
    continue;
  }

  showcaseEntries.push({
    style,
    label,
    title: spec.title,
    subtitle: spec.subtitle ?? null,
    request: showcaseRequests[style].request,
    why: showcaseRequests[style].why,
    timebox: spec.timebox ?? (style === "proof" ? "Open" : null),
    pageCount: built.sidecar?.pages.length ?? spec.pages.length,
    pagePreviews,
    html: `/generated/showcase/${style}.html`,
    pdf: `/generated/showcase/${style}.pdf`,
  });
}
if (showcaseErrors.length) {
  throw new Error(`generate.mjs: could not build every showcase workbook:\n${showcaseErrors.join("\n")}`);
}

writeJson(join(generatedDir, "showcase.json"), showcaseEntries);

if (committedPdfsUsed.length)
  console.warn(
    `generate.mjs: no browser found; used the committed PDFs for ${committedPdfsUsed.join(", ")}.`,
  );
console.log(`generate.mjs: wrote ${showcaseEntries.length} showcase workbooks (HTML + PDF).`);
