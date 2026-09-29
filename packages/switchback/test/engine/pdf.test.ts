import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderComponent } from "../../src/engine/build";
import { browserCandidates, findBrowser, toPdf } from "../../src/engine/pdf";

describe("browserCandidates", () => {
  it("puts SWITCHBACK_CHROME first", () => {
    expect(browserCandidates("linux", { SWITCHBACK_CHROME: "/opt/chrome", PATH: "/usr/bin" })[0]).toBe(
      "/opt/chrome",
    );
  });

  it("knows the Windows install locations", () => {
    const list = browserCandidates("win32", {
      PROGRAMFILES: "C:\\Program Files",
      LOCALAPPDATA: "C:\\Users\\me\\AppData\\Local",
    });
    expect(list).toContain("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe");
    expect(list).toContain("C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe");
  });

  it("searches PATH on Linux", () => {
    expect(browserCandidates("linux", { PATH: "/usr/bin" })).toContain("/usr/bin/google-chrome");
  });
});

describe("findBrowser", () => {
  it("returns the first candidate that exists, or null", () => {
    expect(findBrowser((p) => p === "/usr/bin/chromium", "linux", { PATH: "/usr/bin" })).toBe(
      "/usr/bin/chromium",
    );
    expect(findBrowser(() => false, "linux", { PATH: "/usr/bin" })).toBeNull();
  });
});

const browser = findBrowser();
describe.skipIf(!browser)("toPdf (needs a local Chrome/Edge)", () => {
  it("writes a PDF", async () => {
    const out = join(mkdtempSync(join(tmpdir(), "switchback-pdf-")), "page.pdf");
    await toPdf(renderComponent("pre-mortem").html!, out, browser!);
    expect(existsSync(out)).toBe(true);
    expect(readFileSync(out).subarray(0, 5).toString()).toBe("%PDF-");
  });
});
