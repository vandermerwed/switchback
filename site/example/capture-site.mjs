import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { chromium } from "../../packages/switchback/node_modules/playwright/index.mjs";

const dist = resolve("site/dist");
const out = resolve(".superpowers/site-evidence");
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".json": "application/json",
};
const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const file = resolve(join(dist, pathname.endsWith("/") ? `${pathname}index.html` : pathname));
  if (!file.startsWith(dist)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const data = await readFile(file);
    response.writeHead(200, { "content-type": mime[extname(file)] ?? "application/octet-stream" }).end(data);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
const browser = await chromium.launch({ headless: true });
try {
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
    });
    await page.screenshot({ path: join(out, `home-${width}x${height}.png`), fullPage: true });
    const measures = await page.evaluate(() => ({
      viewport: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      paperWidth: Math.round(document.querySelector(".example-paper").getBoundingClientRect().width),
      heroPaperWidth: Math.round(document.querySelector(".hero-paper").getBoundingClientRect().width),
      fontsReady: document.fonts.status,
    }));
    await page.keyboard.press("Tab");
    const focus = await page.evaluate(
      () => document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.textContent?.trim(),
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    const reducedMotion = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
    process.stdout.write(
      `${width}x${height} ${JSON.stringify({ ...measures, firstFocus: focus, reducedMotion })}\n`,
    );
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
