import type { Basis, ComponentMeta, Grounding, PresetMeta } from "../engine/types";

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
