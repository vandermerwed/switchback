import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, posix } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));

function walkHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkHtmlFiles(full));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function extractLinks(html) {
  const attrPattern = /\s(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  return [...html.matchAll(attrPattern)].map((match) => match[1] ?? match[2]).filter(Boolean);
}

function isExternal(link) {
  return /^[a-z][a-z0-9+.-]*:/i.test(link) && !link.startsWith("file:");
}

function isWellFormedUrl(link) {
  try {
    new URL(link);
    return true;
  } catch {
    return false;
  }
}

// Resolve a same-origin link against dist's directory-URL static output (every route is
// `<path>/index.html`; a path with a file extension is served as that exact file).
function resolveInternal(link, fromFile) {
  const withoutHashOrQuery = link.split("#")[0].split("?")[0];
  if (!withoutHashOrQuery) return null; // pure "#anchor" or "?query" on the current page
  const isRootRelative = withoutHashOrQuery.startsWith("/");
  const basePosixDir = posix.dirname(
    `/${posix.relative(distDir.replace(/\\/g, "/"), fromFile.replace(/\\/g, "/"))}`,
  );
  const resolved = isRootRelative
    ? posix.normalize(withoutHashOrQuery)
    : posix.normalize(posix.join(basePosixDir, withoutHashOrQuery));
  const hasExtension = /\.[a-z0-9]+$/i.test(posix.basename(resolved));
  const candidate = hasExtension ? resolved : posix.join(resolved, "index.html");
  return join(distDir, candidate);
}

test("dist has been built", () => {
  assert.ok(existsSync(distDir), "site/dist must exist (run pnpm site:build first)");
});

const htmlFiles = existsSync(distDir) ? walkHtmlFiles(distDir) : [];

test("every internal link and asset reference in the built site resolves", () => {
  const broken = [];
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    for (const link of extractLinks(html)) {
      if (link.startsWith("#") || link.startsWith("mailto:") || link.startsWith("tel:")) continue;
      if (isExternal(link)) {
        if (!isWellFormedUrl(link)) broken.push(`${file}: malformed external link ${link}`);
        continue;
      }
      const resolved = resolveInternal(link, file);
      if (resolved && !existsSync(resolved)) {
        broken.push(`${file}: broken link ${link} (expected ${resolved})`);
      }
    }
  }
  assert.deepEqual(broken, [], `broken links:\n${broken.join("\n")}`);
});
