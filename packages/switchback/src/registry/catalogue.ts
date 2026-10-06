import type { CollectionModule, ComponentModule, PresetMeta } from "../engine/types";
import { collections, components, presets, skipped, skippedCollections } from "../generated/components";
import { loadRegistries, type Registries } from "./registries";

export interface CatalogueParts {
  components: ComponentModule[];
  presets: PresetMeta[];
  collections: CollectionModule[];
  registries: Registries;
  skipped: string[];
  /** Folders under collections/ with no collection.json. */
  skippedCollections: string[];
}

export interface Catalogue {
  components: Map<string, ComponentModule>;
  /** Core presets, then every collection's own presets, by id. */
  presets: Map<string, PresetMeta>;
  collections: Map<string, CollectionModule>;
  registries: Registries;
  skipped: string[];
}

export function catalogueParts(): CatalogueParts {
  return { components, presets, collections, registries: loadRegistries(), skipped, skippedCollections };
}

export function createCatalogue(
  parts: Partial<CatalogueParts> & { components: ComponentModule[] },
): Catalogue {
  const shelves = parts.collections ?? [];
  return {
    components: new Map(parts.components.map((c) => [c.meta.id, c])),
    presets: new Map([...(parts.presets ?? []), ...shelves.flatMap((c) => c.presets)].map((p) => [p.id, p])),
    collections: new Map(shelves.map((c) => [c.meta.id, c])),
    registries: parts.registries ?? loadRegistries(),
    skipped: parts.skipped ?? [],
  };
}

let cached: Catalogue | null = null;

export function loadCatalogue(): Catalogue {
  cached ??= createCatalogue(catalogueParts());
  return cached;
}
