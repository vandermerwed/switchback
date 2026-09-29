import type { Render } from "../../src/engine/types";

interface Data {
  faces?: string[];
}

const FACES = [
  "who else is affected?",
  "reverse it",
  "remove the constraint",
  "make it 10x",
  "make it 0.1x",
  "steal from another field",
];
const NET: Array<[number, number]> = [
  [2, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [2, 3],
  [2, 4],
];
const key = (c: number, r: number) => `${c},${r}`;

export const css = `
.sb-c-net { position: relative; display: grid; grid-template-columns: repeat(3, 34mm); grid-template-rows: repeat(4, 34mm); width: 102mm; margin: 6mm auto 4mm; }
.sb-c-fold-face { border: 0.7pt solid var(--sb-cut); display: flex; align-items: center; justify-content: center; text-align: center; padding: 3mm; font-size: 9.5pt; overflow-wrap: anywhere; }
`;

export const render: Render<Data> = (data, { h, variant }) => {
  const faces = [...(data.faces?.length ? data.faces : FACES)].slice(0, 6);
  while (faces.length < 6) faces.push("");
  if (variant === "table") {
    return h.stack(
      h.note(
        "Roll any six-sided die, or use the last digit of the clock's seconds (on 7, 8, 9 or 0, go again).",
      ),
      h.table({ head: ["Roll", "Prompt"], rows: faces.map((f, i) => [String(i + 1), f]) }),
      h.heading("What the roll made me think"),
      h.lines({ count: 6, fill: true }),
    );
  }
  const cells = new Set(NET.map(([c, r]) => key(c, r)));
  const has = (c: number, r: number) => cells.has(key(c, r));
  const tiles = NET.map(([c, r], i) => {
    // Top and left edges are drawn by this face: dotted (fold) if a neighbour shares it, dashed (cut) if outer.
    // Right and bottom are drawn only when outer (a neighbour draws the shared edge as its top/left).
    const top = has(c, r - 1) ? "dotted" : "dashed";
    const right = has(c + 1, r) ? "none" : "dashed";
    const bottom = has(c, r + 1) ? "none" : "dashed";
    const left = has(c - 1, r) ? "dotted" : "dashed";
    return `<div class="sb-c-fold-face" style="grid-column:${c};grid-row:${r};border-style:${top} ${right} ${bottom} ${left}">${h.esc(faces[i] ?? "")}</div>`;
  }).join("");
  return h.stack(
    `<div class="sb-c-net"><span class="sb-scissors" aria-hidden="true">✂︎</span>${tiles}</div>`,
    h.note(
      "Cut along the dashed outline, fold along the dotted lines, and tape the edges. Roll it when you are stuck.",
    ),
  );
};
