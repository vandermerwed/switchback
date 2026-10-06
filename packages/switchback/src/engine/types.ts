export type Paper = "A4" | "Letter";
export type Orientation = "portrait" | "landscape";
/** What a template rests on: graded research claims, or common practice with a stated origin. */
export type Basis = "research" | "practice";
export type RoleId = "ask" | "stop" | "keep" | "crux" | "maybe" | "sense" | "draft" | "reason";
export type Phase = "diverge" | "converge" | "either";
export type Grade = "A" | "B" | "C" | "D" | "unrated";
export type JsonSchema = Record<string, unknown>;

export interface Pen {
  colour: string;
  role?: Exclude<RoleId, "reason">;
}

export interface Kit {
  paper: Paper;
  printer: "mono" | "colour";
  pens: Pen[];
  highlighter: boolean;
  pencil: boolean;
  scissors: boolean;
  tape: boolean;
  glue: boolean;
  index_cards: boolean;
  sticky_notes: boolean;
  coins: boolean;
  timer: boolean;
  wall_space: boolean;
  camera: boolean;
}
export type KitInput = Partial<Kit>;

export type RoleAssignment = { pen: string } | { letter: string };
export type PenMapping = Record<RoleId, RoleAssignment>;

export interface Role {
  id: RoleId;
  code: string;
  name: string;
  meaning: string;
  short: string;
  suggested: string[];
  priority: number | null;
  /** The AI's action id for a mark in this role on a proof ("go-deeper"); used in JSON. */
  proof_action: string | null;
  /** The human-facing words for that action, printed on the proof legend strip ("go deeper"). */
  proof_label: string | null;
}
export interface Mark {
  glyph: string;
  meaning: string;
  proof_action?: string;
  /** Set whenever proof_action is: the words printed on the proof legend strip. */
  proof_label?: string;
}
export interface ProofBlock {
  kind: "p" | "h" | "li" | "code";
  text: string;
  n?: number;
  cont?: boolean;
}
export interface Confidence {
  mark: string;
  level: string;
  meaning: string;
}
export interface Tag {
  id: string;
  label: string;
  description: string;
}
export type Slot = string | string[];
export interface WhyNote {
  text: string;
  claim: string;
}
export interface ForbidRule {
  id: string;
  why: string;
  claim: string;
}
export interface PhaseRule {
  section: number;
  phases: Phase[];
  why: string;
  claim: string;
  forbid?: ForbidRule[];
}
export interface Style {
  id: string;
  name: string;
  tags: string[];
  budget: number;
  opening?: Slot[];
  closing: Slot[];
  split_on?: string;
  phase_rules: PhaseRule[];
  allow?: string[] | null;
  why?: Partial<Record<"opening" | "closing" | "allow" | "split", WhyNote>>;
  grounding?: Grounding;
}
export interface Protocol {
  id: string;
  name: string;
  intent: string;
  guidance: string;
  grounding?: Grounding;
}
export interface Practice {
  id: string;
  name: string;
  intent: string;
  guidance: string;
  requires: string[];
}

export interface Source {
  cite: string;
  doi?: string;
  isbn?: string;
  url?: string;
  type?: string;
}
export interface Claim {
  id?: string;
  claim: string;
  construct: string;
  grade: Grade;
  transfer: "direct" | "adjacent" | "analogical" | null;
  effect?: "small" | "moderate" | "large" | "n/a";
  load_bearing?: boolean;
  sources: Source[];
  rationale?: string;
}
export interface Grounding {
  claims: Claim[];
  helps: string;
  backfires: string;
}

export interface Variant {
  id: string;
  requires: string[];
  label?: string;
  prompt?: string;
  readback?: string;
  orientation?: Orientation;
  grounding?: Grounding;
}
export interface ShellOptions {
  header: boolean;
  prompt: boolean;
  legend: boolean;
}

export interface ComponentMeta {
  id: string;
  kind: "page" | "piece";
  name: string;
  intent: string;
  when: string;
  tags: string[];
  phase: Phase;
  listed?: boolean;
  orientation?: Orientation;
  physical: { requires: string[]; body: string[]; surface: string; timebox: string; returns?: boolean };
  shell?: Partial<ShellOptions>;
  variants: Variant[];
  data: JsonSchema;
  prompt?: string;
  readback?: string;
  basis: Basis;
  /** Where a practical template comes from; required when basis is "practice". */
  origin?: string;
  grounding?: Grounding;
}

export interface PresetMeta {
  id: string;
  kind: "preset";
  extends: string;
  name: string;
  tags: string[];
  data: Record<string, unknown>;
  attribution: string;
  licence: string;
  footer?: string;
  orientation?: Orientation;
  /** Overrides the base component's basis; a practical preset's attribution is its origin. */
  basis?: Basis;
  grounding?: Grounding;
}

/** A themed shelf of templates. Membership is by reference: `includes` names templates that live elsewhere. */
export interface CollectionMeta {
  id: string;
  name: string;
  description: string;
  includes: string[];
  /** Collection-level claims, strict-checked when present and never inherited by its members. */
  grounding?: Grounding;
}

export interface CollectionModule {
  /** The folder under collections/, which the id must match. */
  dir: string;
  meta: CollectionMeta;
  /** The collection's own templates: presets that live in its folder. */
  presets: PresetMeta[];
}

/** The catalogue-wide claims that underpin every writing page (claims.md §10 ruling 1). */
export interface CatalogueClaims {
  grounding?: Grounding;
}

export interface SpecPage {
  id: string;
  component: string;
  variant?: string;
  title?: string;
  prompt?: string;
  notes?: string;
  data?: Record<string, unknown>;
  orientation?: Orientation;
}
export interface Spec {
  switchback: 1;
  style?: string;
  title?: string;
  subtitle?: string;
  paper?: Paper;
  round?: number;
  timebox?: string;
  kit?: KitInput;
  legend_strip?: boolean;
  pages: SpecPage[];
}

export interface Example {
  title?: string;
  variant?: string;
  data?: Record<string, unknown>;
  kit?: KitInput;
}

export interface Helpers {
  esc(value: unknown): string;
  stack(...parts: string[]): string;
  note(text: string): string;
  heading(text: string): string;
  lines(opts?: { count?: number; fill?: boolean }): string;
  box(opts?: { label?: string; height?: number; fill?: boolean }): string;
  cols(parts: string[], opts?: { fill?: boolean }): string;
  cutGrid(opts: { cells: string[]; columns: number; minHeight: number }): string;
  zones(opts: { labels: string[]; direction?: "row" | "column"; minHeight?: number; fill?: boolean }): string;
  table(opts: { head: string[]; rows: string[][]; fill?: boolean; className?: string }): string;
  check(items: string[]): string;
  ifThen(opts?: { count?: number; first?: string }): string;
  callout(text: string, glyph?: string): string;
  letter(code: string): string;
  legendTable(roles: Role[], pens: PenMapping): string;
  svg(inner: string, opts: { viewBox: string; className?: string }): string;
}

export interface RenderContext {
  paper: Paper;
  orientation: Orientation;
  variant: string;
  kit: Kit;
  pens: PenMapping;
  roles: Role[];
  page: { id: string; title: string };
  spec: {
    title: string;
    subtitle: string;
    style: string;
    round: number;
    timebox: string;
    pages: SpecPage[];
    returns: string[];
  };
  h: Helpers;
}

// biome-ignore lint/suspicious/noExplicitAny: each component narrows its own data type
export type Render<D = any> = (data: D, ctx: RenderContext) => string;

// biome-ignore lint/suspicious/noExplicitAny: each component narrows its own data type
export type Checks<D = any> = (
  data: D,
  ctx: { variant: string; paper: Paper; orientation: Orientation; pageId: string },
) => Diagnostic[];

// biome-ignore lint/suspicious/noExplicitAny: each component narrows its own data type
export type OrientationRule<D = any> = (data: D, variant: string) => Orientation | undefined;

export interface ComponentModule {
  meta: ComponentMeta;
  render: Render;
  css?: string;
  checks?: Checks;
  /** Decide the page orientation from the page's data and variant; undefined means "no opinion". */
  orientation?: OrientationRule;
  examples: Record<string, Example>;
}

export interface Diagnostic {
  level: "error" | "warning";
  code: string;
  page: string | null;
  path: string | null;
  message: string;
  fix: string;
}

export interface Substitution {
  page: string;
  component: string;
  wanted: string;
  used: string;
  missing: string[];
}

export interface SidecarPage {
  id: string;
  component: string;
  preset: string | null;
  variant: string;
  orientation: Orientation;
  title: string;
  prompt: string;
  readback: string;
  data: Record<string, unknown>;
  returns: boolean;
}

export interface Sidecar {
  switchback: 1;
  cli: string;
  built_at: string;
  spec: string | null;
  title: string;
  style: string;
  round: number;
  paper: Paper;
  kit_source: string[];
  pens: PenMapping;
  pages: SidecarPage[];
  substitutions: Substitution[];
  warnings: Diagnostic[];
}
