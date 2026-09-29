import type { Render } from "../../src/engine/types";

interface Data {
  segments?: string[];
  minutes?: string | number;
}

const polar = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
};
const f = (n: number) => n.toFixed(1);

export const css = `.sb-c-dial { width: 132mm; height: 132mm; } .sb-c-dial text { font-family: var(--sb-sans); }`;

export const render: Render<Data> = (data, { h, spec }) => {
  const segments = data.segments?.length
    ? data.segments
    : ["warm up", "the hard part", "decide", "send back"];
  const minutes = String(data.minutes ?? (spec.timebox || "40 min"));
  const n = segments.length;
  const cx = 80;
  const cy = 80;
  const outer = 68;
  const inner = 44;
  const parts: string[] = [];
  segments.forEach((label, i) => {
    const start = -90 + (i * 360) / n;
    const end = -90 + ((i + 1) * 360) / n;
    const large = end - start > 180 ? 1 : 0;
    const [x1, y1] = polar(cx, cy, outer, start);
    const [x2, y2] = polar(cx, cy, outer, end);
    const [x3, y3] = polar(cx, cy, inner, end);
    const [x4, y4] = polar(cx, cy, inner, start);
    parts.push(
      `<path d="M ${f(x1)} ${f(y1)} A ${outer} ${outer} 0 ${large} 1 ${f(x2)} ${f(y2)} L ${f(x3)} ${f(y3)} A ${inner} ${inner} 0 ${large} 0 ${f(x4)} ${f(y4)} Z" fill="#ffffff" stroke="#888888" stroke-width="0.6"/>`,
    );
    const [tx, ty] = polar(cx, cy, (outer + inner) / 2, -90 + ((i + 0.5) * 360) / n);
    parts.push(
      `<text x="${f(tx)}" y="${f(ty)}" text-anchor="middle" dominant-baseline="middle" font-size="6.5" fill="#333333">${h.esc(label)}</text>`,
    );
  });
  parts.push(
    `<text x="${cx}" y="${cy - 3}" text-anchor="middle" font-size="11" font-weight="700" fill="#111111">${h.esc(minutes)}</text>`,
    `<text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="5.5" fill="#777777">marker starts at the top</text>`,
  );
  return h.stack(
    h.svg(parts.join(""), { viewBox: "0 0 160 160", className: "sb-c-dial" }),
    h.note("Clip a paperclip, or place a coin, at the top. Move it to the next segment as each phase ends."),
  );
};
