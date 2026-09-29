import type { Render } from "../../src/engine/types";

interface Data {
  shots?: string[];
}

export const render: Render<Data> = (data, { h, spec }) => {
  const shots = data.shots?.length ? data.shots : spec.returns;
  return h.stack(
    h.check([
      ...shots.map((s) => `Photograph ${s} flat, page ID visible`),
      "Check the colour marks are readable in the photo",
      "Check no page is missing",
      "Write your Ask questions before you send",
    ]),
    h.callout(
      "Fill the frame, avoid your own shadow, and keep the corner marks visible so the page can be straightened.",
      "i",
    ),
  );
};
