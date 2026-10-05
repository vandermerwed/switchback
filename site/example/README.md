# Worked example provenance

This is a fictional, non-sensitive Sitting: planning a 20-minute talk for a team day. The workbook spec is `workbook.json`; `generated-page.html` and `generated-page.switchback.json` are direct output from the Switchback 0.1.0 CLI. The home page shows page `W1-P2`, “What should stick”, with the prompt “What should they remember a week later?”, and the cover, `W1-P1`. The spec and the sidecar carry the same prompt.

Generation used a temporary, isolated `SWITCHBACK_CONFIG_DIR` with blue Ask, red Stop, and highlighter Crux. From the repository root:

```sh
node packages/switchback/dist/cli.js profile --set pens=blue,red,highlighter --set role.ask=blue --set role.stop=red --set role.crux=highlighter
node packages/switchback/dist/cli.js build site/example/workbook.json -o site/example/generated-page.html --json
node packages/switchback/dist/cli.js build site/example/next-page.json -o site/example/next-page.html --json
node site/example/capture.mjs
```

The first command used `SWITCHBACK_CONFIG_DIR` set to a fresh temporary directory, not a personal profile. `capture.mjs` screenshots the real renderer's `#W1-P1`, `#W1-P2` and `#W2-P1` pages with Playwright at 2× resolution. The images are unmarked. The second round's page is a blank write-in card sort that names the stories from W1-P2 as its source and leaves the sort to the person. No printed text was invented for any screenshot.

The handwriting is authored. `readback.json` holds every line of it (black notes, the struck-out line, and the Ask, Stop and Crux marks, each with the ruled line it sits on), the request, the agent's confirmation and its reply. The site sets the handwriting as live text over the unmarked image, in Kalam, so it stays readable and selectable. `MarkedPage.astro` places it using the sheet's rule positions, measured from the renderer's A4 layout. The reply is an **illustrative example**, written to match the authored marks. It is not an automated transcription or a claim about photo recognition: the Ask is answered first, the Stop stays open, the Crux shapes the answer, and the struck-out line stays out. The site labels the marks as illustrative wherever they appear.

No third-party imagery is shipped.
