// Real-terrain field for the Switchback hero: the Drakensberg escarpment at Sani Pass.
// Elevation: AWS Open Data Terrain Tiles (terrarium PNG), decoded to metres.
// Output: a relief layer (hillshade, tinted forest green, with valley mist pooled in the low
// ground), a contour SVG, spot heights, and compose.html, which layers them for capture.
//
//   node topo.mjs [lat] [lon] [zoom] [tiles-each-side] [name] [window-px] [grid-px]
//
// Zoom 13 is the deepest level with one consistent source here (zoom 14 mixes sources and
// shows tile seams), so the field is cut from zoom 13: a square window of window-px source
// pixels around the centre, resampled to grid-px for a smooth relief at print size.
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
const windowPx = Number(process.argv[7] ?? 896);
const gridPx = Number(process.argv[8] ?? 2304);
const n = 2 ** z;
const cx = Math.floor(((lon + 180) / 360) * n);
const r = (lat * Math.PI) / 180;
const cy = Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n);

const T = 256,
  cols = span * 2 + 1,
  SW = cols * T;
const source = new Float32Array(SW * SW);
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
        source[(ty * T + py) * SW + tx * T + px] = e;
      }
  }
}
// Cut the window around the centre and resample it bilinearly.
const W = gridPx,
  H = gridPx,
  x0 = (SW - windowPx) / 2,
  k = windowPx / gridPx;
const at = (x, y) => source[Math.min(SW - 1, Math.max(0, y)) * SW + Math.min(SW - 1, Math.max(0, x))];
const elev = new Float32Array(W * H);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const sx = x0 + (x + 0.5) * k - 0.5,
      sy = x0 + (y + 0.5) * k - 0.5;
    const ix = Math.floor(sx),
      iy = Math.floor(sy),
      fx = sx - ix,
      fy = sy - iy;
    elev[y * W + x] =
      at(ix, iy) * (1 - fx) * (1 - fy) +
      at(ix + 1, iy) * fx * (1 - fy) +
      at(ix, iy + 1) * (1 - fx) * fy +
      at(ix + 1, iy + 1) * fx * fy;
  }
let min = Infinity,
  max = -Infinity;
for (const e of elev) {
  if (e < min) min = e;
  if (e > max) max = e;
}
// Metres per pixel at this latitude and zoom (Web Mercator).
const cell = ((40075016.7 * Math.cos(r)) / (n * T)) * k;
console.log(
  `${name}: ${W}x${H}px at ${cell.toFixed(1)} m/px, elevation ${min.toFixed(0)} to ${max.toFixed(0)} m`,
);

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
const smooth = blur(blur(elev, W, H, 6), W, H, 4);

// Relief: a north-west sun for the form, a softer west light to open the shadowed faces.
const soft = blur(smooth, W, H, 5);
const g = (xx, yy) => soft[Math.min(H - 1, Math.max(0, yy)) * W + Math.min(W - 1, Math.max(0, xx))];
const shadeAt = (x, y, azDeg, altDeg) => {
  const az = (azDeg * Math.PI) / 180,
    alt = (altDeg * Math.PI) / 180;
  const dzdx = (g(x + 1, y) - g(x - 1, y)) / (2 * cell),
    dzdy = (g(x, y + 1) - g(x, y - 1)) / (2 * cell);
  const slope = Math.atan(Math.hypot(dzdx, dzdy)),
    aspect = Math.atan2(dzdy, -dzdx);
  const s = Math.sin(alt) * Math.cos(slope) + Math.cos(alt) * Math.sin(slope) * Math.cos(az - aspect);
  return Math.max(0, Math.min(1, s));
};
// Valley mist: a pale veil that pools in the lowest ground and thins with height.
const fogTop = min + (max - min) * 0.3;
const mix = (a, b, t) => a + (b - a) * t;
const deep = [4, 26, 26],
  lit = [100, 168, 156],
  mist = [196, 214, 204];
const flat = 0.72 * Math.sin((35 * Math.PI) / 180) + 0.28 * Math.sin((55 * Math.PI) / 180);
const hs = new PNG({ width: W, height: H });
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const s = 0.72 * shadeAt(x, y, 315, 35) + 0.28 * shadeAt(x, y, 270, 55);
    // Flat ground sits at the forest base; faces turned to the sun climb towards the lit tone.
    const t = Math.min(1, 0.21 * (s / flat) ** 2.4);
    const e = smooth[y * W + x];
    const f = e < fogTop ? (1 - (e - min) / (fogTop - min)) ** 1.6 * 0.4 : 0;
    for (let c = 0; c < 3; c++) hs.data[i + c] = Math.round(mix(mix(deep[c], lit[c], t), mist[c], f));
    hs.data[i + 3] = 255;
  }
fs.writeFileSync(`${name}-shade.png`, PNG.sync.write(hs));

// Contours every 40 m; every fifth (200 m) is an index line.
const step = 40,
  indexStep = 200;
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
const thresholds = [];
for (let v = Math.ceil(min / step) * step; v <= max; v += step) thresholds.push(v);
const gen = contours().size([W2, H2]).smooth(true).thresholds(thresholds);
const path = geoPath(geoIdentity()).digits(1);
let minor = "",
  index = "";
for (const c of gen(Array.from(half))) {
  const d = path(c);
  if (!d) continue;
  if (c.value % indexStep === 0) index += d;
  else minor += d;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W2} ${H2}" preserveAspectRatio="xMidYMid slice">
<path d="${minor}" fill="none" stroke="#c4dfd2" stroke-opacity="0.3" stroke-width="0.9" vector-effect="non-scaling-stroke"/>
<path d="${index}" fill="none" stroke="#e6f3ec" stroke-opacity="0.62" stroke-width="1.7" vector-effect="non-scaling-stroke"/>
</svg>`;
fs.writeFileSync(`${name}-contours.svg`, svg);
console.log(
  `contours: ${thresholds.length} levels every ${step} m, svg ${(svg.length / 1024).toFixed(0)} KB`,
);

// Spot heights: summits that stand clear of everything within about 650 m.
const radius = Math.round(650 / cell);
const peaks = [];
for (let y = radius; y < H - radius; y += 4)
  for (let x = radius; x < W - radius; x += 4) {
    const e = smooth[y * W + x];
    let top = true;
    for (let k = 0; k < 64 && top; k++) {
      const a = (k / 64) * Math.PI * 2;
      for (const d of [radius * 0.35, radius * 0.7, radius]) {
        if (smooth[Math.round(y + Math.sin(a) * d) * W + Math.round(x + Math.cos(a) * d)] >= e) {
          top = false;
          break;
        }
      }
    }
    if (top) peaks.push({ x: x / W, y: y / H, m: Math.round(elev[y * W + x]) });
  }
peaks.sort((a, b) => b.m - a.m);
const spots = [];
for (const p of peaks) if (spots.every((q) => Math.hypot(q.x - p.x, q.y - p.y) > 0.06)) spots.push(p);
fs.writeFileSync(`${name}-spots.json`, JSON.stringify(spots, null, 1));
console.log(`spot heights: ${spots.length}, highest ${spots[0]?.m} m`);
