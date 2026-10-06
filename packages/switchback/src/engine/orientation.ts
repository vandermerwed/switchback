import type { Orientation } from "./types";

export interface OrientationSources {
  page?: Orientation;
  preset?: Orientation;
  variant?: Orientation;
  rule?: Orientation;
  component?: Orientation;
}

/** The first declared orientation wins: spec page, preset, variant, data rule, component, then portrait. */
export function resolveOrientation(o: OrientationSources): Orientation {
  return o.page ?? o.preset ?? o.variant ?? o.rule ?? o.component ?? "portrait";
}
