import jpeg from "jpeg-js";
import { PNG } from "pngjs";
import type { MediaFormat, Rgba } from "./media";

/**
 * libheif-js reports parse errors with console.log, which would corrupt `media --json` stdout.
 * While `fn` runs, console.log and console.info write to stderr instead; both are restored after.
 */
async function logsToStderr<T>(fn: () => Promise<T>): Promise<T> {
  const { log, info } = console;
  const toStderr = (...args: unknown[]) => {
    process.stderr.write(`${args.map(String).join(" ")}\n`);
  };
  console.log = toStderr;
  console.info = toStderr;
  try {
    return await fn();
  } finally {
    console.log = log;
    console.info = info;
  }
}

export async function decode(buf: Uint8Array, format: MediaFormat): Promise<Rgba> {
  if (format === "jpeg") {
    const r = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true, maxMemoryUsageInMB: 1024 });
    return { width: r.width, height: r.height, data: r.data };
  }
  if (format === "png") {
    const r = PNG.sync.read(Buffer.from(buf));
    return { width: r.width, height: r.height, data: new Uint8Array(r.data) };
  }
  if (format === "heic") {
    // Loaded here, not at the top: its wasm bundle is large, and only a HEIC needs it. The import
    // is inside the redirect too, in case anything in it binds console.log as it loads.
    const r = await logsToStderr(async () => {
      const { default: decodeHeic } = await import("heic-decode");
      return decodeHeic({ buffer: Buffer.from(buf) });
    });
    return { width: r.width, height: r.height, data: new Uint8Array(r.data) };
  }
  throw new Error(`cannot decode ${format}`);
}

export function encodeJpeg(img: Rgba, quality = 85): Uint8Array {
  return new Uint8Array(
    jpeg.encode({ width: img.width, height: img.height, data: Buffer.from(img.data) }, quality).data,
  );
}
