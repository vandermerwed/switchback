import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { chromium } from "../../packages/switchback/node_modules/playwright/index.mjs";

const dist = resolve("site/dist");
const out = resolve(".superpowers/site-evidence/polish");
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
const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const file = resolve(join(dist, pathname.endsWith("/") ? `${pathname}index.html` : pathname));
  if (!file.startsWith(dist)) {
    res.writeHead(403).end();
    return;
  }
  try {
    res
      .writeHead(200, { "content-type": mime[extname(file)] ?? "application/octet-stream" })
      .end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const browser = await chromium.launch({ headless: true });
const metrics = [];
try {
  for (const [name, route] of [
    ["home", "/"],
    ["docs", "/docs/"],
    ["card-sort", "/docs/components/card-sort/"],
    ["showcase", "/showcase/"],
    ["changelog", "/changelog/"],
  ]) {
    const sizes =
      name === "home"
        ? [
            [1440, 900],
            [1280, 800],
            [1024, 768],
            [390, 844],
          ]
        : [
            [1440, 900],
            [1280, 800],
            [390, 844],
          ];
    for (const [width, height] of sizes) {
      for (const theme of ["light", "dark"]) {
        const context = await browser.newContext({ viewport: { width, height }, colorScheme: theme });
        await context.addInitScript((value) => localStorage.setItem("starlight-theme", value), theme);
        const page = await context.newPage();
        await page.goto(`http://127.0.0.1:${server.address().port}${route}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        const file = `${name}-${width}x${height}-${theme}.png`;
        await page.screenshot({ path: join(out, file) });
        if (name === "home" && width === 390) {
          await page.locator("#install").screenshot({ path: join(out, `install-390-${theme}.png`) });
        }
        await page.keyboard.press("Tab");
        const measure = await page.evaluate(() => {
          const focused = document.activeElement;
          const body = getComputedStyle(document.body);
          const p = document.querySelector("main p");
          const resources = performance.getEntriesByType("resource");
          const navigation = performance.getEntriesByType("navigation");
          return {
            theme: document.documentElement.dataset.theme,
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: innerWidth,
            bodyColor: body.color,
            bodyBackground: body.backgroundColor,
            paragraphColor: p ? getComputedStyle(p).color : null,
            focus: focused?.getAttribute("aria-label") ?? focused?.textContent?.trim().slice(0, 50),
            focusOutline: focused ? getComputedStyle(focused).outlineStyle : null,
            transferBytes: [...navigation, ...resources].reduce((sum, entry) => sum + entry.transferSize, 0),
          };
        });
        metrics.push({ file, route, ...measure });
        console.log(`${file} overflow=${measure.documentWidth - width} theme=${measure.theme}`);
        await context.close();
      }
    }
  }
  await writeFile(join(out, "metrics.json"), JSON.stringify(metrics, null, 2));
  const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(`http://127.0.0.1:${server.address().port}/`);
  const panelsVisible = await noJsPage.locator(".install-panel:visible").count();
  await noJsPage.locator("#install").screenshot({ path: join(out, "install-390-nojs.png") });
  await writeFile(join(out, "install-nojs.json"), JSON.stringify({ panelsVisible, expected: 3 }, null, 2));
  await noJs.close();
} finally {
  await browser.close();
  server.close();
}
