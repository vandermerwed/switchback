// Prototype: real-terrain contour field for the Switchback hero.
// Elevation: AWS Open Data Terrain Tiles (terrarium PNG), decoded to metres.
// Output: hillshade PNG (tinted forest green) + contour SVG, and a combined preview HTML.
import fs from "node:fs";
import { contours } from "d3-contour";
import { geoIdentity, geoPath } from "d3-geo";
import { PNG } from "pngjs";

const [lat, lon, z, span] = [
  Number(process.argv[2] ?? -29.595), // Sani Pass, Drakensberg
  Number(process.argv[3] ?? 29.31),
  Number(process.argv[4] ?? 13),
  Number(process.argv[5] ?? 2), // tiles each side of centre
];
const name = process.argv[6] ?? "sani";
const n = 2 ** z;
const cx = Math.floor(((lon + 180) / 360) * n);
const r = (lat * Math.PI) / 180;
const cy = Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n);

const T = 256,
  cols = span * 2 + 1,
  W = cols * T,
  H = cols * T;
const elev = new Float32Array(W * H);
for (let ty = 0; ty < cols; ty++) {
  for (let tx = 0; tx < cols; tx++) {
    const x = cx - span + tx,
      y = cy - span + ty;
    const cache = `tiles/${z}-${x}-${y}.png`;
    if (!fs.existsSync(cache)) {
      fs.mkdirSync("tiles", { recursive: true });
      const res = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`);
      if (!res.ok) throw new Error(`tile ${z}/${x}/${y}: ${res.status}`);
      fs.writeFileSync(cache, Buffer.from(await res.arrayBuffer()));
    }
    const png = PNG.sync.read(fs.readFileSync(cache));
    for (let py = 0; py < T; py++)
      for (let px = 0; px < T; px++) {
        const i = (py * T + px) * 4;
        const e = png.data[i] * 256 + png.data[i + 1] + png.data[i + 2] / 256 - 32768;
        elev[(ty * T + py) * W + tx * T + px] = e;
      }
  }
}
let min = Infinity,
  max = -Infinity;
for (const e of elev) {
  if (e < min) min = e;
  if (e > max) max = e;
}
console.log(`${name}: ${W}x${H}px, elevation ${min.toFixed(0)} to ${max.toFixed(0)} m`);

// Light smoothing so 20 m contours read as terrain, not pixel noise.
function blur(src, w, h, rad) {
  const out = new Float32Array(src.length),
    tmp = new Float32Array(src.length);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let s = 0,
        c = 0;
      for (let k = -rad; k <= rad; k++) {
        const xx = x + k;
        if (xx >= 0 && xx < w) {
          s += src[y * w + xx];
          c++;
        }
      }
      tmp[y * w + x] = s / c;
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let s = 0,
        c = 0;
      for (let k = -rad; k <= rad; k++) {
        const yy = y + k;
        if (yy >= 0 && yy < h) {
          s += tmp[yy * w + x];
          c++;
        }
      }
      out[y * w + x] = s / c;
    }
  return out;
}
const smooth = blur(blur(elev, W, H, 3), W, H, 2);
// Contour on a half-resolution grid: same shapes, a quarter of the points.
const W2 = W / 2,
  H2 = H / 2,
  half = new Float32Array(W2 * H2);
for (let y = 0; y < H2; y++)
  for (let x = 0; x < W2; x++)
    half[y * W2 + x] =
      (smooth[2 * y * W + 2 * x] +
        smooth[2 * y * W + 2 * x + 1] +
        smooth[(2 * y + 1) * W + 2 * x] +
        smooth[(2 * y + 1) * W + 2 * x + 1]) /
      4;

// Hillshade (sun from the north-west), tinted into the forest-green field.
const hs = new PNG({ width: W, height: H });
const az = (315 * Math.PI) / 180,
  alt = (40 * Math.PI) / 180,
  cell = 17;
const soft = blur(smooth, W, H, 6);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const g = (xx, yy) => soft[Math.min(H - 1, Math.max(0, yy)) * W + Math.min(W - 1, Math.max(0, xx))];
    const dzdx = (g(x + 1, y) - g(x - 1, y)) / (2 * cell),
      dzdy = (g(x, y + 1) - g(x, y - 1)) / (2 * cell);
    const slope = Math.atan(Math.hypot(dzdx, dzdy)),
      aspect = Math.atan2(dzdy, -dzdx);
    let shade = Math.sin(alt) * Math.cos(slope) + Math.cos(alt) * Math.sin(slope) * Math.cos(az - aspect);
    shade = Math.max(0, Math.min(1, shade));
    const t = shade ** 1.3; // a faint glow, not a relief photo
    const base = [13, 38, 36],
      light = [44, 88, 80];
    const i = (y * W + x) * 4;
    for (let c = 0; c < 3; c++) hs.data[i + c] = Math.round(base[c] + (light[c] - base[c]) * t);
    hs.data[i + 3] = 255;
  }
fs.writeFileSync(`${name}-shade.png`, PNG.sync.write(hs));

// Contours every 20 m; every fifth (100 m) is an index line.
const step = 25;
const thresholds = [];
for (let v = Math.ceil(min / step) * step; v <= max; v += step) thresholds.push(v);
const gen = contours().size([W2, H2]).smooth(true).thresholds(thresholds);
const path = geoPath(geoIdentity()).digits(1);
let minor = "",
  index = "";
for (const c of gen(Array.from(half))) {
  const d = path(c);
  if (!d) continue;
  if (c.value % 125 === 0) index += d;
  else minor += d;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W2} ${H2}" preserveAspectRatio="xMidYMid slice">
<path d="${minor}" fill="none" stroke="#a9cbbd" stroke-opacity="0.26" stroke-width="0.7" vector-effect="non-scaling-stroke"/>
<path d="${index}" fill="none" stroke="#c9e2d6" stroke-opacity="0.44" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
</svg>`;
fs.writeFileSync(`${name}-contours.svg`, svg);
console.log(`contours: ${thresholds.length} levels, svg ${(svg.length / 1024).toFixed(0)} KB`);

fs.writeFileSync(
  `${name}.html`,
  `<!doctype html><meta charset=utf-8><style>
html,body{margin:0;background:#0f2826}
.f{position:relative;width:100vw;height:100vh;overflow:hidden;background:#0f2826 url(${name}-shade.png?v=${Date.now()}) center/cover}
.f img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
</style><div class=f><img src="${name}-contours.svg?v=${Date.now()}" alt=""></div>`,
);
