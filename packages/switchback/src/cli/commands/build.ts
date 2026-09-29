import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildDocument } from "../../engine/build";
import { formatDiagnostic, warning } from "../../engine/diagnostics";
import { findBrowser, MANUAL_PRINT, toPdf } from "../../engine/pdf";
import { formatPens } from "../../engine/pens";
import { loadCatalogue } from "../../registry/catalogue";
import { parseCommand, readProfileOrReport, readSpecOrReport, report } from "../args";
import type { Io } from "../io";
import { openInBrowser } from "../open";

const USAGE =
  "usage: switchback build <spec.json> [-o out.html] [--paper A4|Letter] [--pdf] [--open] [--json]";

export interface BuildDeps {
  findBrowser: () => string | null;
  toPdf: (html: string, outPath: string, browserPath: string) => Promise<void>;
  open: (path: string) => void;
}
const defaultDeps: BuildDeps = { findBrowser: () => findBrowser(), toPdf, open: openInBrowser };

const stem = (path: string) => path.replace(/\.(json|html?)$/i, "");

export async function buildCommand(
  argv: string[],
  io: Io,
  env: NodeJS.ProcessEnv,
  deps: BuildDeps = defaultDeps,
): Promise<number> {
  const { values, positionals } = parseCommand(
    argv,
    {
      out: { type: "string", short: "o" },
      paper: { type: "string" },
      pdf: { type: "boolean" },
      open: { type: "boolean" },
      json: { type: "boolean" },
    },
    USAGE,
  );
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  const json = values.json === true;
  const specPath = positionals[0];
  if (!specPath) {
    io.err(USAGE);
    return 2;
  }
  const out = resolve((values.out as string | undefined) ?? `${stem(specPath)}.html`);
  if (out === resolve(specPath)) {
    io.err(`-o would overwrite the input spec (${specPath}); choose a different output path\n\n${USAGE}`);
    return 2;
  }

  const specResult = readSpecOrReport(specPath, io, json);
  if (!specResult.ok) return 1;
  const raw = specResult.raw;
  const paper = values.paper as string | undefined;
  if (paper !== undefined) {
    if (!["A4", "Letter"].includes(paper)) {
      io.err(`A5 is not supported yet; use A4 or Letter\n\n${USAGE}`);
      return 2;
    }
    if (raw && typeof raw === "object") (raw as Record<string, unknown>).paper = paper;
  }

  const profile = readProfileOrReport(env, io, json);
  if (!profile.ok) return 1;
  const result = buildDocument(raw, { profileKit: profile.profile?.kit, specPath });
  if (!result.html || !result.sidecar) {
    report(result.diagnostics, io, json);
    return 1;
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, result.html, "utf8");
  const sidecarPath = `${stem(out)}.switchback.json`;
  writeFileSync(sidecarPath, `${JSON.stringify(result.sidecar, null, 2)}\n`, "utf8");

  let exit = 0;
  let pdfPath: string | null = null;
  if (values.pdf) {
    const browser = deps.findBrowser();
    if (!browser) {
      result.diagnostics.push(
        warning(
          "W_NO_BROWSER",
          "no Chrome, Edge, or Chromium was found for PDF output",
          `${MANUAL_PRINT} Or set SWITCHBACK_CHROME to a browser.`,
        ),
      );
      exit = 3;
    } else {
      pdfPath = `${stem(out)}.pdf`;
      rmSync(pdfPath, { force: true });
      try {
        await deps.toPdf(result.html, pdfPath, browser);
      } catch (e) {
        result.diagnostics.push(
          warning(
            "W_PDF_FAILED",
            `PDF output failed: ${(e as Error).message}`,
            `${MANUAL_PRINT} Or set SWITCHBACK_CHROME to a working browser.`,
          ),
        );
        exit = 3;
        pdfPath = null;
      }
    }
  }
  if (values.open) deps.open(out);

  const { sidecar } = result;
  if (json) {
    report(result.diagnostics, io, true, {
      html: out,
      sidecar: sidecarPath,
      pdf: pdfPath,
      pages: sidecar.pages.length,
      paper: sidecar.paper,
      pens: sidecar.pens,
      substitutions: sidecar.substitutions,
    });
  } else {
    const n = sidecar.pages.length;
    io.out(`wrote ${out} (${n} page${n === 1 ? "" : "s"}, ${sidecar.paper})`);
    io.out(`wrote ${sidecarPath}`);
    if (pdfPath) io.out(`wrote ${pdfPath}`);
    io.out(`pens: ${formatPens(sidecar.pens, loadCatalogue().registries.roles)}`);
    for (const s of sidecar.substitutions)
      io.out(
        `substituted ${s.page} ${s.component}: ${s.used} instead of ${s.wanted} (missing ${s.missing.join(", ")})`,
      );
    for (const d of result.diagnostics) io.err(formatDiagnostic(d));
  }
  return exit;
}
