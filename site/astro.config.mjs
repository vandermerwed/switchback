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
      logo: { src: "./src/assets/switchback-mark.svg", replacesTitle: false },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/vandermerwed/switchback" }],
      customCss: ["./src/styles/starlight.css"],
      // Head.astro is the only place that references Feedback.tsx (and, through it,
      // `agentation`). Wiring it in only when `feedback` is true keeps a production build from
      // ever discovering that component, rather than relying on a runtime check inside it.
      components: {
        Header: "./src/components/DocsHeader.astro",
        ...(feedback ? { Head: "./src/components/Head.astro" } : {}),
      },
      sidebar: [
        { label: "Start here", items: ["docs", "docs/loop"] },
        {
          label: "Modes",
          items: ["docs/modes/workbook", "docs/modes/proof", "docs/modes/read", "docs/modes/desk"],
        },
        {
          label: "Reference",
          items: [
            "docs/styles",
            "docs/ink",
            { label: "Components", link: "/docs/components/" },
            { label: "CLI", link: "/docs/cli/" },
            "docs/evidence",
            "docs/troubleshooting",
          ],
        },
      ],
    }),
    ...(feedback ? [react()] : []),
  ],
});
