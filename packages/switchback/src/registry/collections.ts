import type { Catalogue } from "./catalogue";

/** A collection's templates: its own presets first, then what it includes, each once. */
export function membersOf(cat: Catalogue, collectionId: string): string[] {
  const c = cat.collections.get(collectionId);
  if (!c) return [];
  return [...new Set([...c.presets.map((p) => p.id), ...c.meta.includes])];
}

/** The collections a template sits on, computed from the shelves, so nobody maintains both sides. */
export function collectionsOf(cat: Catalogue, templateId: string): string[] {
  return [...cat.collections.keys()].filter((id) => membersOf(cat, id).includes(templateId)).sort();
}
