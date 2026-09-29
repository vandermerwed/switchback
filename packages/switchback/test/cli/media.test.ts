import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { captureIo, processIo } from "../../src/cli/io";
import { run } from "../../src/cli/run";
import { packageRoot } from "../../src/shell/fonts";

const fx = (f: string) => join(packageRoot(), "test/fixtures/photos", f);

describe("switchback media", () => {
  it("normalises every readable file and reports the rest per file", async () => {
    const out = mkdtempSync(join(tmpdir(), "sb-media-"));
    const io = captureIo();
    const code = await run(
      [
        "media",
        fx("heic-named.png"),
        fx("rotated-6.jpg"),
        fx("empty.jpg"),
        fx("pattern.webp"),
        "-o",
        out,
        "--json",
      ],
      io,
      { SWITCHBACK_CONFIG_DIR: out },
    );
    const res = JSON.parse(io.stdout.join("\n"));
    expect(code).toBe(1); // some files failed
    expect(res.media).toHaveLength(2);
    expect(res.media[0]).toMatchObject({ format: "heic", width: 64, height: 48 });
    expect(res.media[1]).toMatchObject({ format: "jpeg", width: 48, height: 64 });
    for (const p of res.media) expect(existsSync(p.out)).toBe(true);
    const failed = res.diagnostics.map((d: { code: string }) => d.code);
    expect(failed).toContain("E_MEDIA_READ"); // empty.jpg: zero bytes
    expect(failed).toContain("E_MEDIA_FORMAT"); // webp
  });

  it("keeps --json stdout valid JSON when a HEIC fails to decode", async () => {
    // libheif-js calls console.log on a parse error, which would land in the middle of stdout.
    const out = mkdtempSync(join(tmpdir(), "sb-media-"));
    const stdout: string[] = [];
    const stderr: string[] = [];
    const write = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      stdout.push(String(chunk));
      return true;
    });
    const writeErr = vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
      stderr.push(String(chunk));
      return true;
    });
    const log = vi.spyOn(console, "log").mockImplementation((...args) => {
      stdout.push(`${args.join(" ")}\n`);
    });
    const info = vi.spyOn(console, "info").mockImplementation((...args) => {
      stdout.push(`${args.join(" ")}\n`);
    });
    let code: number;
    try {
      code = await run(["media", fx("truncated.heic"), fx("plain.png"), "-o", out, "--json"], processIo, {
        SWITCHBACK_CONFIG_DIR: out,
      });
    } finally {
      write.mockRestore();
      writeErr.mockRestore();
      log.mockRestore();
      info.mockRestore();
    }
    expect(code).toBe(1);
    const res = JSON.parse(stdout.join(""));
    expect(res.media).toHaveLength(1);
    expect(res.media[0]).toMatchObject({ format: "png" });
    expect(res.diagnostics).toHaveLength(1);
    expect(res.diagnostics[0]).toMatchObject({ code: "E_MEDIA_DECODE" });
    expect(res.diagnostics[0].fix).toContain("sips"); // HEIC keeps the conversion advice
    expect(stderr.join("")).toContain("Could not parse HEIF");
  });

  it.each([
    ["plain.png", 0.6],
    ["rotated-6.jpg", 0.4],
  ])("says a damaged %s looks damaged, not that it needs converting", async (name, keep) => {
    const out = mkdtempSync(join(tmpdir(), "sb-media-"));
    const buf = readFileSync(fx(name));
    const damaged = join(out, `damaged-${name}`);
    writeFileSync(damaged, buf.subarray(0, Math.floor(buf.length * keep)));
    const io = captureIo();
    expect(await run(["media", damaged, "-o", out, "--json"], io, { SWITCHBACK_CONFIG_DIR: out })).toBe(1);
    const [d] = JSON.parse(io.stdout.join("\n")).diagnostics;
    expect(d.code).toBe("E_MEDIA_DECODE");
    expect(d.fix).toBe("the file looks damaged; re-export or re-take the photo");
  });

  it("keeps the conversion advice for WebP", async () => {
    const out = mkdtempSync(join(tmpdir(), "sb-media-"));
    const io = captureIo();
    expect(
      await run(["media", fx("pattern.webp"), "-o", out, "--json"], io, { SWITCHBACK_CONFIG_DIR: out }),
    ).toBe(1);
    const [d] = JSON.parse(io.stdout.join("\n")).diagnostics;
    expect(d.code).toBe("E_MEDIA_FORMAT");
    expect(d.fix).toContain("convert it to JPEG first");
  });

  it("is listed as media in the usage, and photos is no longer a command", async () => {
    const io = captureIo();
    expect(await run(["photos", "x.jpg"], io)).toBe(2);
    const help = captureIo();
    await run(["--help"], help);
    expect(help.stdout.join("\n")).toMatch(/^\s+media\s+make phone photos readable/m);
  });

  it("uses media as the default output folder", async () => {
    const dir = mkdtempSync(join(tmpdir(), "sb-media-default-"));
    const file = fx("plain.png");
    const cwd = vi.spyOn(process, "cwd").mockReturnValue(dir);
    try {
      const io = captureIo();
      expect(await run(["media", file, "--json"], io)).toBe(0);
      expect(JSON.parse(io.stdout.join("\n")).media[0].out).toBe(join(dir, "media", "01-plain.jpg"));
    } finally {
      cwd.mockRestore();
    }
  });
});
