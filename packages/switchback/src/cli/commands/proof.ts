import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { error } from "../../engine/diagnostics";
import { parseDocument, proofSpecs } from "../../engine/proof";
import type { Paper } from "../../engine/types";
import { parseCommand, report } from "../args";
import type { Io } from "../io";

const USAGE =
  "usage: switchback proof <doc.md|-> [-o spec.json] [--title T] [--paper A4|Letter] [--max-pages N] [--json]";

export interface ProofDeps {
  readStdin: () => string;
}
const defaultDeps: ProofDeps = { readStdin: () => readFileSync(0, "utf8") };

export async function proofCommand(
  argv: string[],
  io: Io,
  _env: NodeJS.ProcessEnv,
  deps: ProofDeps = defaultDeps,
): Promise<number> {
  const { values, positionals } = parseCommand(
    argv,
    {
      out: { type: "string", short: "o" },
      title: { type: "string" },
      paper: { type: "string" },
      "max-pages": { type: "string" },
      json: { type: "boolean" },
    },
    USAGE,
  );
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  const json = values.json === true;
  const doc = positionals[0];
  if (!doc) {
    io.err(USAGE);
    return 2;
  }
  if (doc === "-" && !values.out) {
    io.err(`reading from stdin needs -o spec.json\n\n${USAGE}`);
    return 2;
  }
  const paper = (values.paper as string | undefined) ?? "A4";
  if (!["A4", "Letter"].includes(paper)) {
    io.err(`--paper must be A4 or Letter\n\n${USAGE}`);
    return 2;
  }
  const maxPages = Number((values["max-pages"] as string | undefined) ?? 10);
  if (!Number.isInteger(maxPages) || maxPages < 1 || maxPages > 10) {
    io.err(`--max-pages must be a whole number from 1 to 10\n\n${USAGE}`);
    return 2;
  }
  let text: string;
  try {
    text = doc === "-" ? deps.readStdin() : readFileSync(doc, "utf8");
  } catch (e) {
    report(
      [
        error(
          "E_PROOF_READ",
          `could not read ${doc}: ${(e as Error).message}`,
          "check the path and try again",
        ),
      ],
      io,
      json,
    );
    return 1;
  }
  const blocks = parseDocument(text);
  if (!blocks.length) {
    report(
      [
        error(
          "E_PROOF_EMPTY",
          `${doc} has no text to proof`,
          "give it a document with at least one paragraph",
        ),
      ],
      io,
      json,
    );
    return 1;
  }
  const stem = doc === "-" ? "stdin" : basename(doc).replace(/\.(md|markdown|txt)$/i, "");
  const firstHeading = blocks.find((b) => b.kind === "h")?.text;
  const title = (values.title as string | undefined) ?? firstHeading ?? stem;
  const specs = proofSpecs(blocks, {
    title,
    paper: paper as Paper,
    maxPages,
    source: doc === "-" ? undefined : basename(doc),
  });
  const base = resolve(
    (values.out as string | undefined) ?? `${doc.replace(/\.(md|markdown|txt)$/i, "")}.proof.json`,
  );
  // "-o out" (no .json) still gets one distinct .json file per part: out-part1.json, out-part2.json…
  const isJson = /\.json$/i.test(base);
  const stemOf = base.replace(/\.json$/i, "");
  const paths = specs.map((_, i) =>
    specs.length > 1 ? `${stemOf}-part${i + 1}.json` : isJson ? base : `${base}.json`,
  );
  mkdirSync(dirname(base), { recursive: true });
  for (const [i, s] of specs.entries()) writeFileSync(paths[i]!, `${JSON.stringify(s, null, 2)}\n`, "utf8");
  const pages = specs.reduce((n, s) => n + s.pages.length, 0);
  if (json) report([], io, true, { specs: paths, pages, blocks: blocks.length });
  else {
    for (const p of paths) io.out(`wrote ${p}`);
    io.out(
      `${blocks.length} blocks on ${pages} page${pages === 1 ? "" : "s"}${specs.length > 1 ? `, split into ${specs.length} proofs` : ""}`,
    );
    io.out("next: switchback build <spec> --pdf");
  }
  return 0;
}
