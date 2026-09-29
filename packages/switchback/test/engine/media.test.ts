import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { decode } from "../../src/engine/codecs";
import { crop, downscale, exifOrientation, orient, sniff, tileRects } from "../../src/engine/media";
import { packageRoot } from "../../src/shell/fonts";

const fx = (f: string) => new Uint8Array(readFileSync(join(packageRoot(), "test/fixtures/photos", f)));
const px = (img: { width: number; data: Uint8Array }, x: number, y: number) =>
  img.data[(y * img.width + x) * 4]!;

describe("photo helpers", () => {
  it("sniffs formats from bytes, not names", () => {
    expect(sniff(fx("pattern.heic"))).toBe("heic");
    expect(sniff(fx("heic-named.png"))).toBe("heic");
    expect(sniff(fx("plain.png"))).toBe("png");
    expect(sniff(fx("rotated-6.jpg"))).toBe("jpeg");
    expect(sniff(fx("pattern.webp"))).toBe("webp");
    expect(sniff(new Uint8Array())).toBe("unknown");
  });
  it("reads the EXIF orientation and turns the image upright", async () => {
    const jpg = fx("rotated-6.jpg");
    expect(exifOrientation(jpg)).toBe(6);
    const upright = orient(await decode(jpg, "jpeg"), 6);
    expect([upright.width, upright.height]).toEqual([48, 64]);
    expect(px(upright, 40, 5)).toBeLessThan(60); // the black quadrant is now top-right
    expect(px(upright, 5, 5)).toBeGreaterThan(200);
  });
  it("decodes HEIC", async () => {
    const img = await decode(fx("pattern.heic"), "heic");
    expect([img.width, img.height]).toEqual([64, 48]);
    expect(px(img, 5, 5)).toBeLessThan(60);
  });
  it("downscales to the long edge and crops", () => {
    const img = { width: 400, height: 200, data: new Uint8Array(400 * 200 * 4).fill(255) };
    const small = downscale(img, 100);
    expect([small.width, small.height]).toEqual([100, 50]);
    expect(downscale(img, 1000)).toBe(img);
    expect([crop(img, 10, 10, 50, 20).width, crop(img, 10, 10, 50, 20).height]).toEqual([50, 20]);
  });
  it("makes four overlapping tiles that cover the image", () => {
    const t = tileRects(4000, 3000);
    expect(t).toHaveLength(4);
    expect(t[0]).toMatchObject({ x: 0, y: 0 });
    expect(t[3]!.x + t[3]!.w).toBe(4000);
    expect(t[3]!.y + t[3]!.h).toBe(3000);
    expect(t[0]!.w).toBeGreaterThan(2000);
  });
});
