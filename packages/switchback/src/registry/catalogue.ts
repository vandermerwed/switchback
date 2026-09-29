import type { ComponentModule, PresetMeta } from "../engine/types";
import { components, presets, skipped } from "../generated/components";
import { loadRegistries, type Registries } from "./registries";

export interface CatalogueParts {
  components: ComponentModule[];
  presets: PresetMeta[];
  registries: Registries;
  skipped: string[];
}

export interface Catalogue {
  components: Map<string, ComponentModule>;
  presets: Map<string, PresetMeta>;
  registries: Registries;
  skipped: string[];
}

export function catalogueParts(): CatalogueParts {
  return { components, presets, registries: loadRegistries(), skipped };
}

export function createCatalogue(
  parts: Partial<CatalogueParts> & { components: ComponentModule[] },
): Catalogue {
  return {
    components: new Map(parts.components.map((c) => [c.meta.id, c])),
    presets: new Map((parts.presets ?? []).map((p) => [p.id, p])),
    registries: parts.registries ?? loadRegistries(),
    skipped: parts.skipped ?? [],
  };
}

let cached: Catalogue | null = null;

export function loadCatalogue(): Catalogue {
  cached ??= createCatalogue(catalogueParts());
  return cached;
}
