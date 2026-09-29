import type { Render } from "../../src/engine/types";

interface Data {
  decision?: string;
  tell?: boolean;
}

export const css = `
.sb-c-choices { display: flex; gap: 6mm; margin: 2mm 0 2mm; font: 600 12pt var(--sb-serif); }
.sb-c-choices span { border: 0.6pt solid var(--sb-box); border-radius: 1.5mm; padding: 2mm 6mm; }
`;

export const render: Render<Data> = (data, { h, spec, variant }) => {
  const decision = h.callout(`Decision: ${data.decision ?? (spec.subtitle || "the decision")}`, "▭");
  const choices = `<div class="sb-c-choices"><span>commit</span><span>hold</span><span>drop</span></div>`;
  const ask = h.stack(h.heading("Still unclear: ask the AI"), h.lines({ count: 2 }));
  const tell = data.tell ? h.stack(h.heading("Who I will tell"), h.lines({ count: 1 })) : "";
  if (variant === "policy") {
    return h.stack(
      decision,
      h.heading("The rule, for every time this comes up"),
      h.box({ height: 30 }),
      h.heading("Named exceptions"),
      h.lines({ count: 3 }),
      h.heading("This time, the rule says"),
      h.lines({ count: 2 }),
      h.heading("The plan"),
      h.ifThen({ count: 1, first: "I put this pen down" }),
      ask,
      tell,
    );
  }
  return h.stack(
    decision,
    choices,
    h.heading("Why, in one honest paragraph"),
    h.box({ height: 36 }),
    h.heading("The plan: when, then what"),
    h.ifThen({ count: 2, first: "I put this pen down" }),
    ask,
    tell,
  );
};
