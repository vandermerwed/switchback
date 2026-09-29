import { existsSync } from "node:fs";
import { posix, win32 } from "node:path";

export const MANUAL_PRINT = "Open the HTML in a browser → Print → Margins: None → Background graphics: on.";

export function browserCandidates(
  platform: NodeJS.Platform = process.platform,
  env: NodeJS.ProcessEnv = process.env,
): string[] {
  const list: string[] = [];
  if (env.SWITCHBACK_CHROME) list.push(env.SWITCHBACK_CHROME);
  if (platform === "win32") {
    const roots = [
      env.PROGRAMFILES ?? "C:\\Program Files",
      env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)",
      env.LOCALAPPDATA,
    ].filter((r): r is string => Boolean(r));
    for (const root of roots) {
      list.push(
        win32.join(root, "Google\\Chrome\\Application\\chrome.exe"),
        win32.join(root, "Microsoft\\Edge\\Application\\msedge.exe"),
      );
    }
  } else if (platform === "darwin") {
    list.push(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    );
  } else {
    for (const dir of (env.PATH ?? "").split(":").filter(Boolean)) {
      for (const name of [
        "google-chrome",
        "google-chrome-stable",
        "chromium",
        "chromium-browser",
        "microsoft-edge",
      ]) {
        list.push(posix.join(dir, name));
      }
    }
  }
  return list;
}

export function findBrowser(
  exists: (p: string) => boolean = existsSync,
  platform: NodeJS.Platform = process.platform,
  env: NodeJS.ProcessEnv = process.env,
): string | null {
  return browserCandidates(platform, env).find((p) => exists(p)) ?? null;
}

export async function toPdf(html: string, outPath: string, browserPath: string): Promise<void> {
  const { default: puppeteer } = await import("puppeteer-core");
  const args = process.platform === "linux" ? ["--no-sandbox", "--disable-gpu"] : ["--disable-gpu"];
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args,
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: outPath,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  } finally {
    await browser.close();
  }
}
