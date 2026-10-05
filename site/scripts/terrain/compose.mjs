// Layer the relief, contours and spot heights, capture each hero size, and encode WebP.
//   node compose.mjs <name> <out-dir> <playwright-module-path> <inter-font-path>
import fs from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [name = "sani", outDir = "out", pw, interFont] = process.argv.slice(2);
const { chromium } = await import(pathToFileURL(pw).href);
const spots = JSON.parse(fs.readFileSync(`${name}-spots.json`, "utf8"));
fs.mkdirSync(outDir, { recursive: true });

// Each output: a CSS viewport, a device scale, where the square field sits (focus: 0 = top
// band, 0.5 = middle, 1 = bottom), and the regions the page covers (the navigation, the copy,
// the printed page and the chat column), so no spot height is baked under them. The band is
// contours alone on a transparent ground, from the top of the field, for a section below the
// hero; only spot heights at its very edges survive.
const heroKeepOut = [
  [0, 0, 1, 0.12],
  [0, 0.1, 0.4, 0.84],
  [0.36, 0.12, 0.6, 0.25],
  [0.39, 0.3, 0.8, 1],
  [0.8, 0.3, 1, 0.8],
  [0, 0.9, 0.36, 1],
];
const outputs = [
  { file: "terrain-sani-2880.webp", w: 1440, h: 900, dpr: 2, focus: 0.5, keepOut: heroKeepOut },
  { file: "terrain-sani-1440.webp", w: 1440, h: 900, dpr: 1, focus: 0.5, keepOut: heroKeepOut },
  {
    file: "terrain-sani-mobile-780.webp",
    w: 390,
    h: 844,
    dpr: 2,
    focus: 0.5,
    // The stacked phone hero is much taller than this frame and rescales it, so no labels.
    keepOut: [[0, 0, 1, 1]],
  },
  {
    file: "terrain-sani-band.webp",
    w: 1600,
    h: 1000,
    dpr: 1,
    focus: 0.04,
    contoursOnly: true,
    keepOut: [[0.03, 0.08, 0.97, 0.92]],
  },
];
const fontFace = interFont
  ? `@font-face{font-family:Inter;src:url(${pathToFileURL(resolve(interFont)).href}) format("woff2");font-weight:600}`
  : "";
// Every spot height is a summit, so each carries a summit triangle.
const triangle = `<svg viewBox="0 0 12 10" width="11" height="9" aria-hidden="true"><path d="M6 1 L11 9 H1 Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;

const browser = await chromium.launch({ headless: true });
try {
  for (const o of outputs) {
    const side = Math.max(o.w, o.h);
    const top = (o.h - side) * o.focus;
    const left = (o.w - side) / 2;
    const toView = (s) => ({ x: (left + s.x * side) / o.w, y: (top + s.y * side) / o.h });
    const visible = spots.filter((s) => {
      const v = toView(s);
      if (v.x < 0.03 || v.x > 0.97 || v.y < 0.03 || v.y > 0.97) return false;
      return !o.keepOut.some(([x0, y0, x1, y1]) => v.x >= x0 && v.x <= x1 && v.y >= y0 && v.y <= y1);
    });
    const labels = visible
      .map(
        (s) =>
          `<span class="spot" style="left:${(s.x * 100).toFixed(2)}%;top:${(s.y * 100).toFixed(2)}%">${triangle}<b>${s.m}</b></span>`,
      )
      .join("");
    const html = `<!doctype html><meta charset=utf-8><style>${fontFace}
html,body{margin:0;background:${o.contoursOnly ? "transparent" : "#0b2422"};overflow:hidden}
.field{position:absolute;left:${left}px;top:${top}px;width:${side}px;height:${side}px}
.field img{position:absolute;inset:0;width:100%;height:100%}
.spot{position:absolute;display:flex;align-items:center;gap:5px;transform:translate(-5px,-50%);color:rgba(232,242,236,.62);font:600 10px/1 Inter,system-ui,sans-serif;letter-spacing:.08em}
.spot svg{flex:none}
</style><div class=field>${o.contoursOnly ? "" : `<img src="${name}-shade.png">`}<img src="${name}-contours.svg">${labels}</div>`;
    fs.writeFileSync(`${name}-compose.html`, html);
    const page = await browser.newPage({ viewport: { width: o.w, height: o.h }, deviceScaleFactor: o.dpr });
    await page.goto(pathToFileURL(resolve(`${name}-compose.html`)).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: "png", omitBackground: Boolean(o.contoursOnly) });
    fs.writeFileSync(resolve(outDir, o.file.replace(".webp", ".png")), png);
    const webp = await page.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      return c.toDataURL("image/webp", 0.72).split(",")[1];
    }, png.toString("base64"));
    fs.writeFileSync(resolve(outDir, o.file), Buffer.from(webp, "base64"));
    console.log(
      `${o.file}: ${o.w * o.dpr}x${o.h * o.dpr}, ${visible.length} spot heights, ${(Buffer.from(webp, "base64").length / 1024).toFixed(0)} KB`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
