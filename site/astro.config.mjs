import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// Agentation (a development feedback toolbar, licensed for internal use) loads only in
// `astro dev` or a preview build made with PUBLIC_FEEDBACK=1; production never includes it.
const feedback = process.env.NODE_ENV !== "production" || process.env.PUBLIC_FEEDBACK === "1";

export default defineConfig({
  site: "https://switchback.page",
  integrations: [
    starlight({
      title: "Switchback",
      logo: { src: "./src/assets/switchback-mark.svg" },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/vandermerwed/switchback" }],
      sidebar: [{ label: "Start here", items: ["docs"] }],
    }),
    ...(feedback ? [react()] : []),
  ],
});
