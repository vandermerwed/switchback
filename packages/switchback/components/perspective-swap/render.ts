import type { Render } from "../../src/engine/types";

interface Data {
  roles?: string[];
}

const FIGURE =
  '<circle cx="20" cy="9" r="6" fill="none" stroke="#555555" stroke-width="1.2"/><path d="M8 18 L14 14 L20 18 L26 14 L32 18 L28 25 L28 40 L12 40 L12 25 Z" fill="none" stroke="#555555" stroke-width="1.2"/>';

export const css = `
.sb-c-tent { width: 100%; display: flex; flex-direction: column; }
.sb-c-tent-half { min-height: 26mm; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1mm; }
.sb-c-tent-back { transform: rotate(180deg); }
.sb-c-tent-label { font: 600 10pt var(--sb-serif); overflow-wrap: anywhere; }
.sb-c-figure { width: 12mm; height: 14mm; margin: 0 auto; }
.sb-c-said { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }
`;

const DEFAULT_ROLES = ["Me", "Them", "Someone not in the room"];

export const render: Render<Data> = (data, { h, variant }) => {
  const roles = data.roles?.length ? data.roles : DEFAULT_ROLES;
  const close = h.stack(
    h.heading("What would you ask them? Write one question to put to the real person."),
    h.lines({ count: 2 }),
  );
  if (variant === "tent") {
    const figure = h.svg(FIGURE, { viewBox: "0 0 40 46", className: "sb-c-figure" });
    const tents = roles.map(
      (r) =>
        `<div class="sb-c-tent"><div class="sb-c-tent-half">${figure}<span class="sb-c-tent-label">${h.esc(r)}</span></div><div class="sb-fold-line"></div><div class="sb-c-tent-half sb-c-tent-back"><span class="sb-c-tent-label">${h.esc(r)}</span></div></div>`,
    );
    return h.stack(
      h.note(
        "Cut out each figure, fold on the dotted line and stand it up. Move a coin to the one you are speaking as, and write what it says in its column.",
      ),
      h.cutGrid({ cells: tents, columns: roles.length, minHeight: 54 }),
      h.cols(
        roles.map(
          (r) =>
            `<div class="sb-c-said">${h.stack(h.heading(`${r} says`), h.lines({ count: 5, fill: true }))}</div>`,
        ),
        { fill: true },
      ),
      close,
    );
  }
  return h.stack(
    h.cols(
      roles.map((role) =>
        h.stack(
          h.heading(role),
          h.note("sees"),
          h.lines({ count: 3 }),
          h.note("needs"),
          h.lines({ count: 3 }),
          h.note("fears"),
          h.lines({ count: 3, fill: true }),
        ),
      ),
      { fill: true },
    ),
    close,
  );
};
