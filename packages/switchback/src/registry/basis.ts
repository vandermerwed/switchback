import type { Basis, ComponentMeta, Grounding, PresetMeta, Variant } from "../engine/types";

/** A preset inherits its component's basis unless it declares its own. */
export function basisOf(meta: ComponentMeta, preset?: PresetMeta | null): Basis {
  return preset?.basis ?? meta.basis;
}

/** The claims a template stands on. A practical template has none, never its base's. */
export function groundingOf(meta: ComponentMeta, preset?: PresetMeta | null): Grounding | undefined {
  if (basisOf(meta, preset) === "practice") return undefined;
  return preset?.grounding ?? meta.grounding;
}

/** Where a practical template comes from: a preset's attribution, or a component's origin. */
export function originOf(meta: ComponentMeta, preset?: PresetMeta | null): string | undefined {
  if (basisOf(meta, preset) !== "practice") return undefined;
  return preset ? preset.attribution : meta.origin;
}

/** A template's variants. A practical template's carry no claims, so none of its base's leak through. */
export function variantsOf(meta: ComponentMeta, preset?: PresetMeta | null): Variant[] {
  if (basisOf(meta, preset) !== "practice") return meta.variants;
  return meta.variants.map(({ grounding: _grounding, ...v }) => v);
}
