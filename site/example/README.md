# Worked example provenance

This is a fictional, non-sensitive Sitting about “What is the decision we are avoiding?” The workbook spec is `workbook.json`; `generated-page.html` and `generated-page.switchback.json` are direct output from the Switchback 0.1.0 CLI. The displayed sheet is page `W1-P2`, with the same prompt in the spec and sidecar.

Generation used a temporary, isolated `SWITCHBACK_CONFIG_DIR` with blue Ask, red Stop, and highlighter Crux. From the repository root:

```sh
node packages/switchback/dist/cli.js profile --set pens=blue,red,highlighter --set role.ask=blue --set role.stop=red --set role.crux=highlighter
node packages/switchback/dist/cli.js build site/example/workbook.json -o site/example/generated-page.html --json
node site/example/capture.mjs
```

The first command used `SWITCHBACK_CONFIG_DIR` set to a fresh temporary directory, not a personal profile. `capture.mjs` screenshots the real renderer's `#W1-P2` page with Playwright at 2× resolution, producing `site/public/example/generated-page.png`. The image is an unmarked page; the website layers the example's authored marks as HTML on top. No printed text was invented for the screenshot.

`readback.json` is an **Illustrative example**, written to match the authored marks. It is not an automated transcription or a claim about photo recognition. Ask Q1 is answered first, Stop remains unresolved, and Crux frames the possible v1 direction. The site copy identifies the demonstration as illustrative wherever the marks or readback appear.

The workbook, marks, and readback were authored for this site. The page image was generated from this repository's Switchback renderer and its bundled fonts. No third-party imagery is shipped.
