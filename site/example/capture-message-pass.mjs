import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { chromium } from "../../packages/switchback/node_modules/playwright/index.mjs";

const phase = process.argv[2];
if (phase !== "before" && phase !== "after") throw new Error("Pass before or after");
const dist = resolve("site/dist");
const out = resolve(".superpowers/site-evidence/message-pass");
await mkdir(out, { recursive: true });
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
};
const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const file = resolve(join(dist, pathname.endsWith("/") ? `${pathname}index.html` : pathname));
  if (!file.startsWith(dist)) return void response.writeHead(403).end();
  try {
    response
      .writeHead(200, { "content-type": mime[extname(file)] ?? "application/octet-stream" })
      .end(await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const browser = await chromium.launch({ headless: true });
const measurements = [];
try {
  for (const [route, width, height] of [
    ["home", 1440, 900],
    ["home", 1280, 800],
    ["home", 390, 844],
    ["docs", 390, 844],
    ["docs", 768, 900],
  ]) {
    for (const theme of route === "home" ? ["light", "dark"] : ["light"]) {
      const page = await browser.newPage({ viewport: { width, height }, colorScheme: theme });
      await page.addInitScript((value) => localStorage.setItem("starlight-theme", value), theme);
      await page.goto(`http://127.0.0.1:${server.address().port}/${route === "home" ? "" : `${route}/`}`, {
        waitUntil: "networkidle",
      });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
      });
      await page.screenshot({
        path: join(out, `${phase}-${route}-${width}x${height}-${theme}.png`),
        fullPage: true,
      });
      const measure = await page.evaluate(() => {
        const bounds = (selector) => {
          const rect = document.querySelector(selector)?.getBoundingClientRect();
          return rect
            ? { top: Math.round(rect.top), height: Math.round(rect.height), width: Math.round(rect.width) }
            : null;
        };
        const h1 = document.querySelector("h1");
        const h1Style = h1 && getComputedStyle(h1);
        return {
          documentWidth: document.documentElement.scrollWidth,
          hero: bounds(".hero"),
          h1: bounds("h1"),
          h1LineHeight: h1Style ? parseFloat(h1Style.lineHeight) : null,
          nextHeading: bounds(".useful-pause h2, .worked-example h2"),
          docsHeader: bounds(".docs-header"),
          docsSearch: bounds(".docs-search"),
          featurePaper: bounds(".feature-paper"),
          featureIframe: bounds(".feature-paper iframe"),
          docsSearchVisible:
            !!document.querySelector(".docs-search button, .docs-search a") &&
            getComputedStyle(document.querySelector(".docs-search")).display !== "none",
        };
      });
      measurements.push({ phase, route, width, height, theme, ...measure });
      await page.close();
    }
  }
  for (const route of ["showcase", "privacy", "changelog"]) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`http://127.0.0.1:${server.address().port}/${route}/`, { waitUntil: "domcontentloaded" });
    const measure = await page.evaluate(() => {
      const paper = document.querySelector(".feature-paper")?.getBoundingClientRect();
      const iframe = document.querySelector(".feature-paper iframe")?.getBoundingClientRect();
      return {
        documentWidth: document.documentElement.scrollWidth,
        featurePaperWidth: paper?.width ?? null,
        featureIframeWidth: iframe?.width ?? null,
      };
    });
    measurements.push({ phase, route, width: 390, height: 844, theme: "light", ...measure });
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
await writeFile(join(out, `${phase}-measurements.json`), `${JSON.stringify(measurements, null, 2)}\n`);
console.log(JSON.stringify(measurements, null, 2));
