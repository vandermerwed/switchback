import type { Catalogue } from "../registry/catalogue";
import { missingRequirements, satisfies } from "./kit";
import type { ComponentMeta, ComponentModule, Kit, PresetMeta, Variant } from "./types";

export interface ResolvedComponent {
  base: ComponentModule;
  preset: PresetMeta | null;
  data: Record<string, unknown>;
}

export function resolveComponent(
  cat: Catalogue,
  id: string,
  pageData: Record<string, unknown> = {},
): ResolvedComponent | null {
  const direct = cat.components.get(id);
  if (direct) return { base: direct, preset: null, data: { ...pageData } };
  const preset = cat.presets.get(id);
  if (!preset) return null;
  const base = cat.components.get(preset.extends);
  if (!base) return null;
  return { base, preset, data: { ...preset.data, ...pageData } };
}

export type VariantChoice =
  | { ok: true; variant: Variant; substituted: boolean; missing: string[] }
  | { ok: false; code: "E_UNKNOWN_VARIANT" | "E_VARIANT_UNSATISFIED" | "E_NO_VARIANT"; missing: string[] };

export function chooseVariant(meta: ComponentMeta, kit: Kit, requested?: string): VariantChoice {
  const baseMissing = missingRequirements(meta.physical.requires, kit);
  if (requested) {
    const variant = meta.variants.find((v) => v.id === requested);
    if (!variant) return { ok: false, code: "E_UNKNOWN_VARIANT", missing: [] };
    const missing = [...baseMissing, ...missingRequirements(variant.requires, kit)];
    return missing.length
      ? { ok: false, code: "E_VARIANT_UNSATISFIED", missing }
      : { ok: true, variant, substituted: false, missing: [] };
  }
  if (baseMissing.length) return { ok: false, code: "E_NO_VARIANT", missing: baseMissing };
  const first = meta.variants[0]!;
  for (const variant of meta.variants) {
    if (satisfies(variant.requires, kit)) {
      const substituted = variant !== first;
      return {
        ok: true,
        variant,
        substituted,
        missing: substituted ? missingRequirements(first.requires, kit) : [],
      };
    }
  }
  return { ok: false, code: "E_NO_VARIANT", missing: missingRequirements(first.requires, kit) };
}

export function alternativesFor(cat: Catalogue, meta: ComponentMeta, kit: Kit): string[] {
  return [...cat.components.values()]
    .filter(
      (c) =>
        c.meta.id !== meta.id &&
        c.meta.listed !== false &&
        c.meta.tags.some((t) => meta.tags.includes(t)) &&
        chooseVariant(c.meta, kit).ok,
    )
    .map((c) => c.meta.id)
    .slice(0, 3);
}

/** Components merged away at research Gate 1 (roster §5): the old id, and the component and variant its move now lives in. */
export const RENAMED: Readonly<Record<string, { component: string; variant: string; note?: string }>> = {
  tracker: {
    component: "scoresheet",
    variant: "running",
    note: "`rows` is now a list of labels, plus one `steps` number",
  },
  meeple: {
    component: "perspective-swap",
    variant: "tent",
    note: "tent needs scissors in the kit; `labels` is now `roles` (max 3)",
  },
};
