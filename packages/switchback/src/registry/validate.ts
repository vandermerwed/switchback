import { renderComponent } from "../engine/build";
import { error } from "../engine/diagnostics";
import { isKnownToken } from "../engine/kit";
import type { Claim, Diagnostic, Grounding } from "../engine/types";
import { ajv } from "./ajv";
import { basisOf } from "./basis";
import { type CatalogueParts, createCatalogue } from "./catalogue";
import { componentSchema, groundingSchema, presetSchema, styleSchema } from "./schemas";

const validateComponent = ajv.compile(componentSchema);
const validatePreset = ajv.compile(presetSchema);
const validateGrounding = ajv.compile(groundingSchema);
const validateStyle = ajv.compile(styleSchema);

function strictClaims(id: string, claims: Claim[], path: string): Diagnostic[] {
  const out: Diagnostic[] = [];
  claims.forEach((c, i) => {
    const where = { path: `${path}#claims/${i}` };
    if (c.grade === "unrated") {
      out.push(
        error(
          "E_STRICT_UNRATED",
          `${id}: claim "${c.claim}" is not graded`,
          "grade it A–D through the research process",
          where,
        ),
      );
    } else if (c.grade === "D") {
      if (!c.sources.some((s) => s.doi || s.isbn || s.url)) {
        out.push(
          error(
            "E_STRICT_NO_SOURCE",
            `${id}: D-grade claim "${c.claim}" has no DOI, ISBN, or URL`,
            "cite the practice or theory source",
            where,
          ),
        );
      }
    } else if (!c.sources.some((s) => s.doi)) {
      out.push(
        error(
          "E_STRICT_NO_SOURCE",
          `${id}: ${c.grade}-grade claim "${c.claim}" has no DOI`,
          "cite at least one verified DOI",
          where,
        ),
      );
    }
  });
  return out;
}

function strictGrounding(id: string, g: Grounding | undefined, path: string): Diagnostic[] {
  if (!g)
    return [
      error(
        "E_STRICT_NO_CLAIMS",
        `${id} has no grounding claims`,
        "grade it through research/grading (see docs/errors.md, Grounding a new item)",
        {
          path,
        },
      ),
    ];
  const out: Diagnostic[] = [];
  if (!g.claims.length)
    out.push(
      error(
        "E_STRICT_NO_CLAIMS",
        `${id} has no grounding claims`,
        "grade it through research/grading (see docs/errors.md, Grounding a new item)",
        { path },
      ),
    );
  if (!g.helps || !g.backfires)
    out.push(
      error(
        "E_STRICT_HELPS",
        `${id} is missing helps or backfires`,
        "write helps and backfires through research/grading (see docs/errors.md, Grounding a new item)",
        { path },
      ),
    );
  return [...out, ...strictClaims(id, g.claims, path)];
}

function checkGroundingShape(id: string, g: unknown, path: string): Diagnostic[] {
  if (g === undefined || validateGrounding(g)) return [];
  // One diagnostic per invalid grounding block (not one per Ajv error, since a single
  // missing-property block can report several), joining every violation into the message.
  const detail = (validateGrounding.errors ?? [])
    .map((e) => {
      const extra = e.keyword === "additionalProperties" ? ` (${e.params.additionalProperty})` : "";
      return `grounding${e.instancePath} ${e.message ?? "is invalid"}${extra}`;
    })
    .join("; ");
  return [
    error(
      "E_GROUNDING_SCHEMA",
      `${id}: ${detail}`,
      "fix the grounding block in research/grounding.json and re-run `pnpm apply-grounding` (a style or component with no entry is left as is, so fix it in place)",
      {
        path,
      },
    ),
  ];
}

export function validateRegistry(parts: CatalogueParts, opts: { strict?: boolean } = {}): Diagnostic[] {
  const out: Diagnostic[] = [];
  const cat = createCatalogue(parts);
  const tags = new Set(parts.registries.tags.map((t) => t.id));
  const seen = new Set<string>();
  const unique = (id: string, path: string) => {
    if (seen.has(id))
      out.push(error("E_DUPLICATE_ID", `${id} is defined more than once`, "rename one of them", { path }));
    seen.add(id);
  };
  const checkTags = (id: string, list: string[], path: string) => {
    for (const t of list) {
      if (!tags.has(t))
        out.push(
          error(
            "E_UNKNOWN_TAG",
            `${id} uses unknown tag "${t}"`,
            `use one of ${[...tags].join(", ")}, or add it to registry/tags.json`,
            { path },
          ),
        );
    }
  };

  for (const id of parts.skipped) {
    out.push(
      error(
        "E_NO_RENDERER",
        `components/${id} has no render.ts`,
        `add components/${id}/render.ts, then run \`pnpm gen\``,
        { path: `components/${id}` },
      ),
    );
  }

  for (const c of parts.components) {
    const m = c.meta;
    const path = `components/${m.id}`;
    unique(m.id, path);
    if (!validateComponent(m as unknown)) {
      for (const e of validateComponent.errors ?? []) {
        out.push(
          error(
            "E_COMPONENT_SCHEMA",
            `${m.id}${e.instancePath} ${e.message ?? "is invalid"}`,
            "fix component.json to match the component schema",
            { path },
          ),
        );
      }
    }
    checkTags(m.id, m.tags ?? [], path);
    const requires = [...(m.physical?.requires ?? []), ...(m.variants ?? []).flatMap((v) => v.requires)];
    for (const token of requires.flatMap((r) => r.split("|").map((s) => s.trim()))) {
      if (!isKnownToken(token))
        out.push(
          error(
            "E_UNKNOWN_TOKEN",
            `${m.id} requires unknown stationery "${token}"`,
            "use a key of the kit shape",
            { path },
          ),
        );
    }
    try {
      ajv.compile(m.data);
    } catch (e) {
      out.push(
        error(
          "E_DATA_SCHEMA_INVALID",
          `${m.id}: the data schema does not compile: ${(e as Error).message}`,
          "fix the JSON Schema in `data`",
          { path },
        ),
      );
    }
    const examples = Object.keys(c.examples);
    if (!examples.length)
      out.push(
        error("E_NO_EXAMPLE", `${m.id} has no examples`, `add ${path}/examples/default.json`, { path }),
      );
    for (const name of examples) {
      const r = renderComponent(m.id, { example: name, embedFonts: false, catalogue: cat });
      for (const d of r.diagnostics.filter((x) => x.level === "error")) {
        out.push(
          error("E_EXAMPLE", `${m.id} example "${name}": ${d.message}`, d.fix, {
            path: `${path}/examples/${name}.json`,
          }),
        );
      }
    }
    // A research template carries its claims, as it always has, in strict mode or not.
    if (m.basis === "research" && !m.grounding)
      out.push(
        error(
          "E_COMPONENT_SCHEMA",
          `${m.id} is research-backed but has no grounding`,
          'grade it through research/grading (see docs/errors.md, Grounding a new item), or set "basis": "practice" with an "origin"',
          { path },
        ),
      );
    // A practical template makes no research claim and says where it comes from instead.
    if (m.basis === "practice") {
      if (m.grounding)
        out.push(
          error(
            "E_BASIS_CLAIMS",
            `${m.id} is a practical template but carries research claims`,
            'remove grounding, or set "basis": "research" and grade it through research/grading',
            { path },
          ),
        );
      for (const v of m.variants ?? [])
        if (v.grounding)
          out.push(
            error(
              "E_BASIS_CLAIMS",
              `${m.id}/${v.id} carries research claims on a practical template`,
              'remove the variant\'s grounding, or set "basis": "research"',
              { path: `${path}#variants/${v.id}` },
            ),
          );
      if (!m.origin)
        out.push(
          error(
            "E_BASIS_ORIGIN",
            `${m.id} is a practical template with no origin`,
            'add "origin": one line on where the format comes from',
            { path },
          ),
        );
    }
    if (opts.strict && m.basis === "research") {
      out.push(...strictGrounding(m.id, m.grounding, path));
      for (const v of m.variants ?? [])
        if (v.grounding)
          out.push(...strictGrounding(`${m.id}/${v.id}`, v.grounding, `${path}#variants/${v.id}`));
    }
  }

  for (const p of parts.presets) {
    const path = `presets/${p.id}.json`;
    unique(p.id, path);
    if (!validatePreset(p as unknown)) {
      for (const e of validatePreset.errors ?? []) {
        out.push(
          error(
            "E_PRESET_SCHEMA",
            `${p.id}${e.instancePath} ${e.message ?? "is invalid"}`,
            "fix the preset to match the preset schema",
            { path },
          ),
        );
      }
    }
    checkTags(p.id, p.tags ?? [], path);
    if (!cat.components.has(p.extends)) {
      out.push(
        error(
          "E_UNKNOWN_BASE",
          `${p.id} extends unknown component "${p.extends}"`,
          "point `extends` at a component id",
          { path },
        ),
      );
      continue;
    }
    const r = renderComponent(p.id, { embedFonts: false, catalogue: cat });
    for (const d of r.diagnostics.filter((x) => x.level === "error")) {
      out.push(error("E_EXAMPLE", `preset ${p.id}: ${d.message}`, d.fix, { path }));
    }
    const presetBasis = basisOf(cat.components.get(p.extends)!.meta, p);
    if (presetBasis === "practice" && p.grounding)
      out.push(
        error(
          "E_BASIS_CLAIMS",
          `${p.id} is a practical template but carries research claims`,
          'remove grounding, or drop "basis": "practice"',
          { path },
        ),
      );
    if (opts.strict && presetBasis === "research") out.push(...strictGrounding(p.id, p.grounding, path));
  }

  for (const s of parts.registries.styles) {
    const path = "registry/styles.json";
    if (!validateStyle(s as unknown)) {
      for (const e of validateStyle.errors ?? []) {
        const extra = e.keyword === "additionalProperties" ? ` (${e.params.additionalProperty})` : "";
        out.push(
          error(
            "E_STYLE_SCHEMA",
            `style ${s.id}${e.instancePath} ${e.message ?? "is invalid"}${extra}`,
            "fix registry/styles.json to match the style schema",
            { path },
          ),
        );
      }
      continue;
    }
    const slotIds = (slots: (string | string[])[] | undefined) =>
      (slots ?? []).flatMap((slot) => (Array.isArray(slot) ? slot : [slot]));
    const referenced = [
      ...slotIds(s.opening).map((id) => ({ id, where: "opens with" })),
      ...slotIds(s.closing).map((id) => ({ id, where: "closes with" })),
      ...(s.split_on ? [{ id: s.split_on, where: "splits on" }] : []),
      ...(s.allow ?? []).map((id) => ({ id, where: "allows" })),
      ...s.phase_rules.flatMap((r) => (r.forbid ?? []).map((f) => ({ id: f.id, where: "forbids" }))),
    ];
    for (const { id, where } of referenced)
      if (!cat.components.has(id))
        out.push(
          error(
            "E_UNKNOWN_COMPONENT",
            `style ${s.id} ${where} unknown component "${id}"`,
            "fix registry/styles.json",
            { path },
          ),
        );
    if (s.grounding && Array.isArray(s.grounding.claims)) {
      const claimIds = new Set(s.grounding.claims.map((c) => c.id));
      const cited = [
        ...s.phase_rules.flatMap((r) => [r.claim, ...(r.forbid ?? []).map((f) => f.claim)]),
        ...Object.values(s.why ?? {}).map((w) => w!.claim),
      ];
      for (const claim of cited)
        if (!claimIds.has(claim))
          out.push(
            error(
              "E_STYLE_CLAIM",
              `style ${s.id} cites "${claim}", which is not one of its grounding claims`,
              "cite a claim id from the style's grounding (see research/grounding.json)",
              { path },
            ),
          );
    }
    out.push(...checkGroundingShape(`style ${s.id}`, s.grounding, path));
    if (opts.strict) out.push(...strictGrounding(`style ${s.id}`, s.grounding, path));
  }

  for (const p of parts.registries.protocols) {
    out.push(...checkGroundingShape(`protocol ${p.id}`, p.grounding, "registry/protocols.json"));
    if (opts.strict && p.grounding)
      out.push(...strictGrounding(`protocol ${p.id}`, p.grounding, "registry/protocols.json"));
  }
  const claims = parts.registries.catalogueClaims;
  out.push(...checkGroundingShape("the catalogue", claims.grounding, "registry/catalogue.json"));
  if (opts.strict && claims.grounding)
    out.push(...strictGrounding("the catalogue", claims.grounding, "registry/catalogue.json"));
  return out;
}
