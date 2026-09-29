export type MediaFormat = "jpeg" | "png" | "heic" | "webp" | "unknown";
export interface Rgba {
  width: number;
  height: number;
  data: Uint8Array;
}

const ascii = (b: Uint8Array, at: number, len: number) => String.fromCharCode(...b.subarray(at, at + len));

export function sniff(b: Uint8Array): MediaFormat {
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
  if (b.length >= 8 && b[0] === 0x89 && ascii(b, 1, 3) === "PNG") return "png";
  if (b.length >= 12 && ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP") return "webp";
  if (
    b.length >= 12 &&
    ascii(b, 4, 4) === "ftyp" &&
    /^(heic|heix|hevc|heim|heis|mif1|msf1)$/.test(ascii(b, 8, 4))
  )
    return "heic";
  return "unknown";
}

/** The EXIF Orientation tag (0x0112) of a JPEG, or 1 when absent or unreadable. */
export function exifOrientation(b: Uint8Array): number {
  let i = 2;
  while (i + 4 < b.length && b[i] === 0xff) {
    const marker = b[i + 1]!;
    const len = (b[i + 2]! << 8) | b[i + 3]!;
    if (marker === 0xe1 && ascii(b, i + 4, 4) === "Exif") {
      const t = i + 10; // TIFF header
      const le = ascii(b, t, 2) === "II";
      const u16 = (o: number) => (le ? b[o]! | (b[o + 1]! << 8) : (b[o]! << 8) | b[o + 1]!);
      const u32 = (o: number) => (le ? u16(o) + u16(o + 2) * 65536 : u16(o) * 65536 + u16(o + 2));
      const ifd = t + u32(t + 4);
      const n = u16(ifd);
      for (let k = 0; k < n; k++) {
        const e = ifd + 2 + k * 12;
        if (u16(e) === 0x0112) return u16(e + 8) || 1;
      }
      return 1;
    }
    i += 2 + len;
  }
  return 1;
}

/** Apply an EXIF orientation (1–8) so the image displays upright. */
export function orient(img: Rgba, o: number): Rgba {
  if (o <= 1 || o > 8) return img;
  const swap = o >= 5;
  const w = swap ? img.height : img.width;
  const h = swap ? img.width : img.height;
  const out = new Uint8Array(w * h * 4);
  for (let y = 0; y < img.height; y++)
    for (let x = 0; x < img.width; x++) {
      let nx: number;
      let ny: number;
      switch (o) {
        case 2:
          [nx, ny] = [img.width - 1 - x, y];
          break;
        case 3:
          [nx, ny] = [img.width - 1 - x, img.height - 1 - y];
          break;
        case 4:
          [nx, ny] = [x, img.height - 1 - y];
          break;
        case 5:
          [nx, ny] = [y, x];
          break;
        case 6:
          [nx, ny] = [img.height - 1 - y, x];
          break;
        case 7:
          [nx, ny] = [img.height - 1 - y, img.width - 1 - x];
          break;
        default:
          [nx, ny] = [y, img.width - 1 - x]; // 8
      }
      out.set(img.data.subarray((y * img.width + x) * 4, (y * img.width + x) * 4 + 4), (ny * w + nx) * 4);
    }
  return { width: w, height: h, data: out };
}

/** Area-average downscale so the long edge is at most maxEdge. Returns the input when it's already small enough. */
export function downscale(img: Rgba, maxEdge: number): Rgba {
  const scale = maxEdge / Math.max(img.width, img.height);
  if (scale >= 1) return img;
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const out = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    const y0 = Math.floor(y / scale);
    const y1 = Math.min(img.height, Math.max(y0 + 1, Math.floor((y + 1) / scale)));
    for (let x = 0; x < w; x++) {
      const x0 = Math.floor(x / scale);
      const x1 = Math.min(img.width, Math.max(x0 + 1, Math.floor((x + 1) / scale)));
      const acc = [0, 0, 0, 0];
      for (let sy = y0; sy < y1; sy++)
        for (let sx = x0; sx < x1; sx++)
          for (let c = 0; c < 4; c++) acc[c]! += img.data[(sy * img.width + sx) * 4 + c]!;
      const n = (y1 - y0) * (x1 - x0);
      for (let c = 0; c < 4; c++) out[(y * w + x) * 4 + c] = Math.round(acc[c]! / n);
    }
  }
  return { width: w, height: h, data: out };
}

export function crop(img: Rgba, x: number, y: number, w: number, h: number): Rgba {
  const out = new Uint8Array(w * h * 4);
  for (let r = 0; r < h; r++)
    out.set(img.data.subarray(((y + r) * img.width + x) * 4, ((y + r) * img.width + x + w) * 4), r * w * 4);
  return { width: w, height: h, data: out };
}

/** Four tiles (2×2) that overlap by `overlap` of the image on each inner edge. */
export function tileRects(width: number, height: number, overlap = 0.05) {
  const ow = Math.round(width * overlap);
  const oh = Math.round(height * overlap);
  const hw = Math.ceil(width / 2);
  const hh = Math.ceil(height / 2);
  const cols = [
    { x: 0, w: Math.min(width, hw + ow) },
    { x: Math.max(0, width - hw - ow), w: Math.min(width, hw + ow) },
  ];
  const rows = [
    { y: 0, h: Math.min(height, hh + oh) },
    { y: Math.max(0, height - hh - oh), h: Math.min(height, hh + oh) },
  ];
  return rows.flatMap((r) => cols.map((c) => ({ x: c.x, y: r.y, w: c.w, h: r.h })));
}
