import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { decode, encodeJpeg } from "../../engine/codecs";
import { error } from "../../engine/diagnostics";
import { crop, downscale, exifOrientation, orient, sniff, tileRects } from "../../engine/media";
import type { Diagnostic } from "../../engine/types";
import { parseCommand, report } from "../args";
import type { Io } from "../io";

const USAGE = "usage: switchback media <files…> [-o dir] [--max 1800] [--tiles auto|off] [--json]";
/** For formats photos can't read (WebP, unknown) or a HEIC that libheif can't decode. */
const ADVICE =
  "convert it to JPEG first (macOS: `sips -s format jpeg in.heic --out out.jpg`; anywhere with Python: `pip install pillow-heif`), then pass the JPEG";
/** A JPEG or PNG is already a readable format, so a decode failure means the file itself is bad. */
const DAMAGED = "the file looks damaged; re-export or re-take the photo";

export async function mediaCommand(argv: string[], io: Io): Promise<number> {
  const { values, positionals } = parseCommand(
    argv,
    {
      out: { type: "string", short: "o" },
      max: { type: "string" },
      tiles: { type: "string" },
      json: { type: "boolean" },
    },
    USAGE,
  );
  if (values.help) {
    io.out(USAGE);
    return 0;
  }
  if (!positionals.length) {
    io.err(USAGE);
    return 2;
  }
  const max = Number((values.max as string | undefined) ?? 1800);
  const tiles = (values.tiles as string | undefined) ?? "auto";
  if (!Number.isInteger(max) || max < 200 || !["auto", "off"].includes(tiles)) {
    io.err(USAGE);
    return 2;
  }
  const outDir = resolve((values.out as string | undefined) ?? "media");
  mkdirSync(outDir, { recursive: true });
  const media: Array<Record<string, unknown>> = [];
  const diagnostics: Diagnostic[] = [];
  let index = 0;
  for (const file of positionals) {
    let buf: Uint8Array;
    try {
      buf = new Uint8Array(readFileSync(file));
      if (!buf.length) throw new Error("the file is empty");
    } catch (e) {
      diagnostics.push(
        error("E_MEDIA_READ", `${file}: ${(e as Error).message}`, "check the path, or re-export the photo"),
      );
      continue;
    }
    const format = sniff(buf);
    if (format === "webp" || format === "unknown") {
      diagnostics.push(
        error(
          "E_MEDIA_FORMAT",
          `${file}: ${format === "webp" ? "WebP" : "an unrecognised format"} is not supported`,
          ADVICE,
        ),
      );
      continue;
    }
    let img: Awaited<ReturnType<typeof decode>>;
    try {
      img = await decode(buf, format);
      if (format === "jpeg") img = orient(img, exifOrientation(buf));
    } catch (e) {
      diagnostics.push(
        error(
          "E_MEDIA_DECODE",
          `${file}: could not decode ${format}: ${(e as Error).message}`,
          format === "jpeg" || format === "png" ? DAMAGED : ADVICE,
        ),
      );
      continue;
    }
    index++;
    const stem = `${String(index).padStart(2, "0")}-${basename(file).replace(/\.[^.]+$/, "")}`;
    const out = join(outDir, `${stem}.jpg`);
    const small = downscale(img, max);
    writeFileSync(out, encodeJpeg(small));
    const tilePaths: string[] = [];
    if (tiles === "auto" && Math.max(img.width, img.height) > 3000)
      tileRects(img.width, img.height).forEach((t, k) => {
        const p = join(outDir, `${stem}-tile${k + 1}.jpg`);
        writeFileSync(p, encodeJpeg(crop(img, t.x, t.y, t.w, t.h)));
        tilePaths.push(p);
      });
    media.push({ source: file, format, out, width: small.width, height: small.height, tiles: tilePaths });
  }
  const code = diagnostics.length ? 1 : 0;
  if (values.json) report(diagnostics, io, true, { media });
  else {
    for (const p of media)
      io.out(
        `wrote ${p.out} (${p.width}×${p.height}${(p.tiles as string[]).length ? `, ${(p.tiles as string[]).length} tiles` : ""})`,
      );
    report(diagnostics, io, false);
  }
  return code;
}
