export const TOKENS_CSS = `
:root {
  --sb-ink: #111111; --sb-text: #1a1a1a; --sb-muted: #555555; --sb-faint: #777777;
  --sb-rule: #b8b8b8; --sb-line: #9a9a9a; --sb-box: #a8a8a8; --sb-cut: #8a8a8a; --sb-screen: #e6e6e6;
  --sb-serif: "Fraunces", Georgia, "Times New Roman", serif;
  --sb-sans: "Inter", "Segoe UI", Arial, sans-serif;
  --sb-mono: "JetBrains Mono", Consolas, "Courier New", monospace;
  --sb-symbol: "Segoe UI Symbol", "DejaVu Sans", "Noto Sans Symbols 2", sans-serif;
  --sb-pitch: 10mm;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { background: var(--sb-screen); color: var(--sb-text); font: 400 10pt/1.4 var(--sb-sans), var(--sb-symbol); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.sb-page { position: relative; width: var(--sb-w); height: var(--sb-h); margin: 9mm auto; padding: 14mm 15mm 16mm 15mm; background: #ffffff; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.16); display: flex; flex-direction: column; overflow: hidden; overflow-wrap: anywhere; break-after: page; }
.sb-page:last-child { break-after: auto; }
/* A page with an attribution gets a two-line footer credit (the licence line plus the upstream
   credit line). \`.sb-pfoot\` is absolutely positioned and outside the flex flow, so \`.sb-pbody\`
   doesn't know to leave it room: give the page extra bottom padding. \`.sb-page\`'s base bottom
   padding above is 16mm, sized for a one-line footer. A two-line attribution footer needs a few mm
   more to clear \`.sb-pbody\`; measured with real fonts on both papers, 20mm leaves ~1.5mm of
   clearance. */
.sb-page.sb-has-attrib { padding-bottom: 20mm; }
@media print { body { background: #ffffff; } .sb-page { margin: 0; box-shadow: none; } }
.sb-reg { position: absolute; width: 5mm; height: 5mm; border: 0 solid var(--sb-line); }
.sb-reg.sb-tl { top: 5mm; left: 5mm; border-top-width: 0.5pt; border-left-width: 0.5pt; }
.sb-reg.sb-tr { top: 5mm; right: 5mm; border-top-width: 0.5pt; border-right-width: 0.5pt; }
.sb-reg.sb-bl { bottom: 5mm; left: 5mm; border-bottom-width: 0.5pt; border-left-width: 0.5pt; }
.sb-reg.sb-br { bottom: 5mm; right: 5mm; border-bottom-width: 0.5pt; border-right-width: 0.5pt; }
.sb-ph { display: flex; align-items: baseline; gap: 3mm; border-bottom: 0.5pt solid var(--sb-ink); padding-bottom: 2mm; margin-bottom: 4mm; }
.sb-pid { font: 700 9pt var(--sb-mono); letter-spacing: 0.4pt; }
.sb-ptitle { font: 600 14pt/1.2 var(--sb-serif); }
.sb-ptag { margin-left: auto; font: 400 7pt var(--sb-mono); text-transform: uppercase; letter-spacing: 0.8pt; color: var(--sb-faint); }
.sb-prompt { font: italic 400 13pt/1.3 var(--sb-serif); margin: 0 0 3mm; }
.sb-note { font-size: 9pt; color: var(--sb-muted); margin: 0 0 3mm; }
.sb-h { font: 600 10.5pt var(--sb-sans); margin: 5mm 0 2mm; }
.sb-pbody { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }
.sb-fill { flex: 1 1 auto; min-height: 0; }
.sb-lines { display: flex; flex-direction: column; }
.sb-lines .sb-rule { height: var(--sb-pitch); flex: 0 0 auto; border-bottom: 0.4pt solid var(--sb-rule); }
.sb-lines.sb-fill .sb-rule { flex: 1 1 0; height: auto; min-height: var(--sb-pitch); }
.sb-box { position: relative; border: 0.6pt solid var(--sb-box); border-radius: 1.5mm; min-height: 20mm; }
.sb-box.sb-fill { min-height: 34mm; }
.sb-label { position: absolute; top: 1.5mm; left: 3mm; font: 400 7pt var(--sb-mono); text-transform: uppercase; letter-spacing: 0.6pt; color: var(--sb-faint); }
.sb-cols { display: flex; gap: 6mm; }
.sb-col { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; }
.sb-cut { position: relative; display: grid; margin: 4mm 0 2mm; border-right: 0.7pt dashed var(--sb-cut); border-bottom: 0.7pt dashed var(--sb-cut); }
.sb-cut-cell { display: flex; align-items: center; justify-content: center; text-align: center; padding: 2mm; font-size: 9.5pt; overflow-wrap: anywhere; border-top: 0.7pt dashed var(--sb-cut); border-left: 0.7pt dashed var(--sb-cut); }
.sb-scissors { position: absolute; top: -3.4mm; left: -1mm; font: 10pt var(--sb-symbol); color: var(--sb-faint); }
.sb-fold-line { border-top: 0.7pt dotted var(--sb-cut); }
.sb-zones { display: flex; gap: 4mm; }
.sb-zones-column { flex-direction: column; }
.sb-zone { position: relative; flex: 1 1 0; border: 0.6pt solid var(--sb-box); border-radius: 1.5mm; padding: 7mm 3mm 3mm; }
.sb-table-wrap { display: flex; flex-direction: column; }
.sb-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.sb-table-wrap.sb-fill .sb-table { height: 100%; }
.sb-table-wrap.sb-fill .sb-table tr:first-child { height: 1px; }
.sb-table th, .sb-table td { border: 0.5pt solid var(--sb-line); padding: 1.5mm 2mm; font-size: 9pt; text-align: left; vertical-align: top; overflow-wrap: anywhere; }
.sb-table th { font-weight: 600; }
.sb-check { list-style: none; margin: 0; padding: 0; }
.sb-check li { display: flex; gap: 2.5mm; align-items: flex-start; margin-bottom: 3mm; font-size: 10pt; }
.sb-cbox { flex: 0 0 auto; width: 4.5mm; height: 4.5mm; margin-top: 0.4mm; border: 0.7pt solid var(--sb-line); border-radius: 0.8mm; }
.sb-callout { display: flex; gap: 2.5mm; margin: 3mm 0; padding: 3mm; font-size: 9.5pt; border: 0.6pt solid var(--sb-box); border-left: 1.2mm solid var(--sb-ink); border-radius: 1.5mm; }
.sb-glyph { font: 700 9pt var(--sb-mono), var(--sb-symbol); }
.sb-num { font: 700 9pt var(--sb-mono); }
.sb-letter { display: inline-flex; align-items: center; justify-content: center; width: 4mm; height: 4mm; border: 0.6pt solid var(--sb-ink); border-radius: 50%; font: 700 6pt var(--sb-mono); vertical-align: middle; }
.sb-pfoot { position: absolute; left: 15mm; right: 15mm; bottom: 6mm; padding-top: 1.5mm; border-top: 0.4pt solid #cccccc; }
.sb-attrib { margin: 0 0 1mm; font: 400 6.5pt var(--sb-mono); color: var(--sb-faint); }
.sb-legend { display: flex; flex-wrap: wrap; align-items: center; gap: 1mm 3.5mm; font: 400 6.5pt var(--sb-mono); color: var(--sb-faint); }
.sb-legend .sb-letter { width: 3.2mm; height: 3.2mm; font-size: 5pt; border-color: var(--sb-faint); }
.sb-legend-id { margin-left: auto; font-weight: 700; color: var(--sb-ink); }
.sb-legend-table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
.sb-legend-table th { text-align: left; padding: 0 2mm 1mm; font: 400 7pt var(--sb-mono); text-transform: uppercase; letter-spacing: 0.6pt; color: var(--sb-faint); border-bottom: 0.4pt solid #dddddd; }
.sb-legend-table td { padding: 1.6mm 2mm; vertical-align: middle; border-bottom: 0.4pt solid #e2e2e2; }
.sb-swatch span { display: block; width: 8mm; height: 6mm; border: 0.7pt solid var(--sb-line); border-radius: 1mm; }
.sb-code { width: 8mm; font: 700 9pt var(--sb-mono); }
.sb-legend-table th, .sb-legend-table .sb-code { white-space: nowrap; }
.sb-role { width: 22mm; font-weight: 600; }
.sb-meaning { color: var(--sb-muted); }
.sb-pen { font: 400 8pt var(--sb-mono); color: var(--sb-faint); white-space: nowrap; }
.sb-svg { display: block; margin: 2mm auto; }
.sb-ifthen { display: flex; flex-direction: column; margin-bottom: 2mm; }
.sb-ifthen-row { display: flex; align-items: flex-end; gap: 2mm; min-height: var(--sb-pitch); }
.sb-ifthen-w { flex: 0 0 auto; font: italic 400 11pt var(--sb-serif); padding-bottom: 0.6mm; }
.sb-ifthen-blank { flex: 1 1 0; min-width: 0; border-bottom: 0.4pt solid var(--sb-rule); padding: 0 1mm 0.6mm; font-size: 10pt; }
`;
