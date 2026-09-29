import type { Render } from "../../src/engine/types";

interface Block {
  type: "heading" | "para" | "lines" | "box" | "checklist" | "callout" | "table";
  text?: string;
  count?: number;
  label?: string;
  height?: number;
  items?: string[];
  tone?: "info" | "warn" | "ask";
  headings?: string[];
  rows?: string[][];
}
interface Data {
  blocks?: Block[];
}

const TONE_GLYPH = { info: "i", warn: "!", ask: "Q" } as const;

export const css = `.sb-c-para { margin: 0 0 2.5mm; font-size: 10pt; }`;

export const render: Render<Data> = (data, { h }) =>
  (data.blocks ?? [])
    .map((b) => {
      switch (b.type) {
        case "heading":
          return h.heading(b.text ?? "");
        case "para":
          return `<p class="sb-c-para">${h.esc(b.text ?? "")}</p>`;
        case "lines":
          return h.lines({ count: b.count ?? 6 });
        case "box":
          return h.box({ label: b.label, height: b.height ?? 60 });
        case "checklist":
          return h.check(b.items ?? []);
        case "callout":
          return h.callout(b.text ?? "", TONE_GLYPH[b.tone ?? "info"]);
        case "table":
          return h.table({ head: b.headings ?? [], rows: b.rows ?? [] });
        default:
          return "";
      }
    })
    .join("");
