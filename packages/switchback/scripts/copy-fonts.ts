import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { FONT_FILES } from "../src/shell/fonts";

const root = resolve(import.meta.dirname, "..");
const out = join(root, "assets", "fonts");
const PACKAGES: Record<string, string> = {
  Fraunces: "@fontsource/fraunces",
  Inter: "@fontsource/inter",
  "JetBrains Mono": "@fontsource/jetbrains-mono",
};

mkdirSync(out, { recursive: true });
for (const [family, pkg] of Object.entries(PACKAGES)) {
  const dir = join(root, "node_modules", pkg);
  for (const font of FONT_FILES.filter((f) => f.family === family)) {
    const src = join(dir, "files", font.file);
    if (!existsSync(src)) throw new Error(`missing font file ${src}`);
    copyFileSync(src, join(out, font.file));
  }
  const licence = ["LICENSE", "LICENSE.md", "OFL.txt", "LICENSE.txt"]
    .map((n) => join(dir, n))
    .find((p) => existsSync(p));
  if (!licence) throw new Error(`no licence file found in ${dir}`);
  copyFileSync(licence, join(out, `${pkg.split("/")[1]}-LICENSE.txt`));
}
console.log(`copied ${FONT_FILES.length} fonts and 3 licences to ${out}`);
