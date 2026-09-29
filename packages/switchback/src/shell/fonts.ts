import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const FONT_FILES = [
  { family: "Fraunces", weight: 600, style: "normal", file: "fraunces-latin-600-normal.woff2" },
  { family: "Fraunces", weight: 400, style: "italic", file: "fraunces-latin-400-italic.woff2" },
  { family: "Inter", weight: 400, style: "normal", file: "inter-latin-400-normal.woff2" },
  { family: "Inter", weight: 600, style: "normal", file: "inter-latin-600-normal.woff2" },
  { family: "JetBrains Mono", weight: 400, style: "normal", file: "jetbrains-mono-latin-400-normal.woff2" },
  { family: "JetBrains Mono", weight: 700, style: "normal", file: "jetbrains-mono-latin-700-normal.woff2" },
] as const;

export function packageRoot(from: string = fileURLToPath(import.meta.url)): string {
  let dir = dirname(from);
  for (;;) {
    const manifest = join(dir, "package.json");
    if (
      existsSync(manifest) &&
      JSON.parse(readFileSync(manifest, "utf8")).name === "@vandermerwed/switchback"
    )
      return dir;
    const parent = dirname(dir);
    if (parent === dir) throw new Error("could not locate the @vandermerwed/switchback package root");
    dir = parent;
  }
}

let cached: string | null = null;

export function fontFaceCss(): string {
  if (cached !== null) return cached;
  const dir = join(packageRoot(), "assets", "fonts");
  cached = FONT_FILES.map((f) => {
    const data = readFileSync(join(dir, f.file)).toString("base64");
    return `@font-face{font-family:"${f.family}";font-style:${f.style};font-weight:${f.weight};font-display:block;src:url(data:font/woff2;base64,${data}) format("woff2")}`;
  }).join("\n");
  return cached;
}
