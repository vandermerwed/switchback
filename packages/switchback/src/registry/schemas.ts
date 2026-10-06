const bool = { type: "boolean" } as const;
const orientation = { enum: ["portrait", "landscape"] } as const;
const basis = { enum: ["research", "practice"] } as const;

export const kitSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    paper: { enum: ["A4", "Letter"] },
    printer: { enum: ["mono", "colour"] },
    pens: {
      type: "array",
      items: {
        type: "object",
        required: ["colour"],
        additionalProperties: false,
        properties: {
          colour: { type: "string", minLength: 1 },
          role: { enum: ["ask", "stop", "keep", "crux", "maybe", "sense", "draft"] },
        },
      },
    },
    highlighter: bool,
    pencil: bool,
    scissors: bool,
    tape: bool,
    glue: bool,
    index_cards: bool,
    sticky_notes: bool,
    coins: bool,
    timer: bool,
    wall_space: bool,
    camera: bool,
  },
} as const;

/** A whole saved profile, as `profile --import` accepts it (the file `switchback profile --json` shows). */
export const profileSchema = {
  type: "object",
  additionalProperties: false,
  required: ["version", "kit"],
  properties: {
    version: { const: 1 },
    kit: kitSchema,
    defaults: {
      type: "object",
      additionalProperties: false,
      properties: { style: { type: "string" }, sitting: { type: "string" } },
    },
  },
} as const;

export const specSchema = {
  type: "object",
  required: ["switchback", "pages"],
  additionalProperties: false,
  properties: {
    switchback: { const: 1 },
    style: { type: "string" },
    title: { type: "string" },
    subtitle: { type: "string" },
    paper: { enum: ["A4", "Letter"] },
    round: { type: "integer", minimum: 1 },
    timebox: { type: "string" },
    kit: kitSchema,
    legend_strip: { type: "boolean" },
    pages: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["id", "component"],
        additionalProperties: false,
        properties: {
          id: { type: "string", pattern: "^W\\d+-P\\d+$" },
          component: { type: "string", minLength: 1 },
          variant: { type: "string" },
          title: { type: "string" },
          prompt: { type: "string" },
          notes: { type: "string" },
          data: { type: "object" },
          orientation,
        },
      },
    },
  },
} as const;

const sourceSchema = {
  type: "object",
  required: ["cite"],
  additionalProperties: false,
  properties: {
    cite: { type: "string", minLength: 1 },
    doi: { type: "string", pattern: "^10\\.\\d{4,9}/\\S+$" },
    isbn: { type: "string" },
    url: { type: "string" },
    type: { type: "string" },
  },
} as const;

export const claimSchema = {
  type: "object",
  required: ["claim", "construct", "grade", "transfer", "sources"],
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    claim: { type: "string", minLength: 1 },
    construct: { type: "string" },
    grade: { enum: ["A", "B", "C", "D", "unrated"] },
    transfer: { enum: ["direct", "adjacent", "analogical", null] },
    effect: { enum: ["small", "moderate", "large", "n/a"] },
    load_bearing: { type: "boolean" },
    sources: { type: "array", items: sourceSchema },
    rationale: { type: "string" },
  },
} as const;

export const groundingSchema = {
  type: "object",
  required: ["claims", "helps", "backfires"],
  additionalProperties: false,
  properties: {
    claims: { type: "array", items: claimSchema },
    helps: { type: "string" },
    backfires: { type: "string" },
  },
} as const;

const stringList = { type: "array", items: { type: "string" } } as const;

export const componentSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "id",
    "kind",
    "name",
    "intent",
    "when",
    "tags",
    "phase",
    "physical",
    "variants",
    "data",
    "basis",
  ],
  properties: {
    id: { type: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" },
    kind: { enum: ["page", "piece"] },
    name: { type: "string", minLength: 1 },
    intent: { type: "string", minLength: 1 },
    when: { type: "string" },
    tags: { ...stringList, minItems: 1 },
    phase: { enum: ["diverge", "converge", "either"] },
    listed: { type: "boolean" },
    orientation,
    physical: {
      type: "object",
      required: ["requires", "body", "surface", "timebox"],
      additionalProperties: false,
      properties: {
        requires: stringList,
        body: stringList,
        surface: { type: "string" },
        timebox: { type: "string" },
        returns: { type: "boolean" },
      },
    },
    shell: {
      type: "object",
      additionalProperties: false,
      properties: { header: { type: "boolean" }, prompt: { type: "boolean" }, legend: { type: "boolean" } },
    },
    variants: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["id", "requires"],
        additionalProperties: false,
        properties: {
          id: { type: "string" },
          requires: stringList,
          label: { type: "string" },
          prompt: { type: "string" },
          readback: { type: "string" },
          grounding: groundingSchema,
          orientation,
        },
      },
    },
    data: { type: "object" },
    prompt: { type: "string" },
    readback: { type: "string" },
    basis,
    origin: { type: "string", minLength: 1, maxLength: 160 },
    grounding: groundingSchema,
  },
} as const;

export const presetSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "kind", "extends", "name", "tags", "data", "attribution", "licence"],
  properties: {
    id: { type: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" },
    kind: { const: "preset" },
    extends: { type: "string" },
    name: { type: "string", minLength: 1 },
    tags: { ...stringList, minItems: 1 },
    data: { type: "object" },
    attribution: { type: "string", minLength: 1 },
    licence: { type: "string", minLength: 1 },
    footer: { type: "string", minLength: 1, maxLength: 240 },
    orientation,
    basis,
    grounding: groundingSchema,
  },
} as const;

export const collectionSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "name", "description", "includes"],
  properties: {
    id: { type: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" },
    name: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1, maxLength: 160 },
    includes: { type: "array", items: { type: "string", minLength: 1 }, uniqueItems: true },
    grounding: groundingSchema,
  },
} as const;

const slot = {
  anyOf: [
    { type: "string", minLength: 1 },
    { type: "array", minItems: 1, items: { type: "string", minLength: 1 } },
  ],
} as const;
const whyNote = {
  type: "object",
  required: ["text", "claim"],
  additionalProperties: false,
  properties: { text: { type: "string", minLength: 1 }, claim: { type: "string", minLength: 1 } },
} as const;

export const styleSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "name", "tags", "budget", "closing", "phase_rules"],
  properties: {
    id: { type: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" },
    name: { type: "string", minLength: 1 },
    tags: { ...stringList, minItems: 1 },
    budget: { type: "integer", minimum: 1 },
    opening: { type: "array", items: slot },
    closing: { type: "array", items: slot },
    split_on: { type: "string", minLength: 1 },
    phase_rules: {
      type: "array",
      items: {
        type: "object",
        required: ["section", "phases", "why", "claim"],
        additionalProperties: false,
        properties: {
          section: { type: "integer", minimum: 0 },
          phases: { type: "array", minItems: 1, items: { enum: ["diverge", "converge", "either"] } },
          why: { type: "string", minLength: 1 },
          claim: { type: "string", minLength: 1 },
          forbid: {
            type: "array",
            items: {
              type: "object",
              required: ["id", "why", "claim"],
              additionalProperties: false,
              properties: {
                id: { type: "string", minLength: 1 },
                why: { type: "string", minLength: 1 },
                claim: { type: "string", minLength: 1 },
              },
            },
          },
        },
      },
    },
    allow: { anyOf: [{ type: "null" }, { ...stringList, minItems: 1 }] },
    why: {
      type: "object",
      additionalProperties: false,
      properties: { opening: whyNote, closing: whyNote, allow: whyNote, split: whyNote },
    },
    grounding: { type: "object" },
  },
} as const;
