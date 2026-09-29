import { ajv } from "../registry/ajv";
import { specSchema } from "../registry/schemas";
import { error } from "./diagnostics";
import type { Diagnostic, Spec } from "./types";

const validateShape = ajv.compile(specSchema);

const LEGACY_TOP: Record<string, string> = {
  stationery: 'rename it to `kit` (pens become [{ "colour": "red" }]; other items become true/false)',
  kind: 'remove it and set `style` instead, e.g. "sitting"',
  meta: "move `meta.round` to `round` and `meta.timebox` to `timebox`",
};

export function parseSpec(raw: unknown): { spec: Spec | null; diagnostics: Diagnostic[] } {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return {
      spec: null,
      diagnostics: [
        error(
          "E_SPEC_SCHEMA",
          "the spec must be a JSON object",
          "start from an example: `switchback show <id> --json`",
          { path: "/" },
        ),
      ],
    };
  }
  const obj = raw as Record<string, unknown>;
  const diagnostics: Diagnostic[] = [];

  for (const [key, fix] of Object.entries(LEGACY_TOP)) {
    if (key in obj)
      diagnostics.push(error("E_LEGACY_KEY", `\`${key}\` is a pre-v1 key`, fix, { path: `/${key}` }));
  }
  if (Array.isArray(obj.pages)) {
    obj.pages.forEach((page, i) => {
      if (page && typeof page === "object" && "archetype" in page) {
        const id = (page as { id?: unknown }).id;
        diagnostics.push(
          error("E_LEGACY_KEY", "`archetype` is a pre-v1 key", "rename it to `component`", {
            page: typeof id === "string" ? id : null,
            path: `/pages/${i}/archetype`,
          }),
        );
      }
    });
  }
  if ("longhand" in obj) {
    diagnostics.push(
      error(
        "E_LEGACY_KEY",
        "`longhand` is the old name of the format key",
        'rename "longhand" to "switchback"',
        {
          path: "/longhand",
        },
      ),
    );
  } else if (!("switchback" in obj)) {
    diagnostics.push(
      error("E_LEGACY_KEY", "the spec has no `switchback` format version", 'add "switchback": 1 at the top', {
        path: "/switchback",
      }),
    );
  }
  if (diagnostics.length) return { spec: null, diagnostics };

  if (!validateShape(obj)) {
    for (const e of validateShape.errors ?? []) {
      const path = e.instancePath || "/";
      diagnostics.push(
        error(
          "E_SPEC_SCHEMA",
          `${path} ${e.message ?? "is invalid"}`,
          "fix the field to match the spec format",
          { path },
        ),
      );
    }
    return { spec: null, diagnostics };
  }

  const spec = obj as unknown as Spec;
  const seen = new Set<string>();
  spec.pages.forEach((page, i) => {
    if (seen.has(page.id)) {
      diagnostics.push(
        error(
          "E_DUPLICATE_ID",
          `page id ${page.id} is used twice`,
          "give every page a unique id like W1-P3",
          { page: page.id, path: `/pages/${i}/id` },
        ),
      );
    }
    seen.add(page.id);
  });
  return { spec: diagnostics.length ? null : spec, diagnostics };
}
