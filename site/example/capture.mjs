import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "../../packages/switchback/node_modules/playwright/index.mjs";

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(resolve("site/example/generated-page.html")).href);
  await page.locator("#W1-P1").screenshot({ path: "site/public/example/cover-page.png" });
  await page.locator("#W1-P2").screenshot({ path: "site/public/example/generated-page.png" });
  await page.goto(pathToFileURL(resolve("site/example/next-page.html")).href);
  await page.locator("#W2-P1").screenshot({ path: "site/public/example/next-page.png" });
} finally {
  await browser.close();
}
