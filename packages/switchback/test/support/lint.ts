const NAMED =
  /(?:^|[\s:;,("'])(red|blue|green|orange|purple|yellow|pink|violet|teal|cyan|magenta|brown|navy|maroon|lime|olive|gold)(?=[\s;,)"'!]|$)/gi;

function neutralHex(hex: string): boolean {
  let h = hex.slice(1);
  if (h.length === 3 || h.length === 4) h = [...h.slice(0, 3)].map((c) => c + c).join("");
  return h.slice(0, 2) === h.slice(2, 4) && h.slice(2, 4) === h.slice(4, 6);
}

/** Every piece of CSS that can colour a printed page: <style> blocks, style="" attributes, SVG fill/stroke. */
export function styleSources(html: string): string {
  const noFonts = html.replace(/url\(data:[^)]*\)/g, "url()");
  const blocks = [...noFonts.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1] ?? "");
  const inline = [...noFonts.matchAll(/\sstyle="([^"]*)"/g)].map((m) => m[1] ?? "");
  const svg = [...noFonts.matchAll(/\s(?:fill|stroke)="([^"]*)"/g)].map((m) => `x: ${m[1] ?? ""};`);
  return [...blocks, ...inline, ...svg].join("\n");
}

export function colourViolations(css: string): string[] {
  const out: string[] = [];
  for (const m of css.matchAll(/#[0-9a-f]{3,8}\b/gi)) if (!neutralHex(m[0])) out.push(m[0]);
  for (const m of css.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/gi))
    if (!(m[1] === m[2] && m[2] === m[3])) out.push(m[0]);
  for (const m of css.matchAll(/hsla?\(/gi)) out.push(m[0]);
  for (const m of css.matchAll(NAMED)) out.push(m[1] ?? "");
  return out;
}

/** dashed borders only on selectors about cutting, dotted only on selectors about folding. */
export function borderStyleViolations(css: string): string[] {
  const out: string[] = [];
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = (m[1] ?? "").trim();
    const body = m[2] ?? "";
    if (/\bdashed\b/.test(body) && !/cut/.test(selector)) out.push(`${selector} uses dashed`);
    if (/\bdotted\b/.test(body) && !/fold/.test(selector)) out.push(`${selector} uses dotted`);
  }
  return out;
}
