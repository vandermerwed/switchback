import { defineConfig } from "tsup";

export default defineConfig({
  entry: { cli: "src/cli/main.ts", index: "src/index.ts" },
  format: ["esm"],
  platform: "node",
  target: "node20",
  dts: { entry: { index: "src/index.ts" } },
  clean: true,
  sourcemap: true,
  splitting: true,
});
