import { createElement, Suspense } from "react";
import { Agentation } from "./loadAgentation";

// Agentation (a development feedback toolbar, licensed for internal use) is lazy-loaded via
// loadAgentation.ts so it never ends up in a production bundle: this module is only imported by
// Head.astro when import.meta.env.DEV or PUBLIC_FEEDBACK is set, and even then the chunk itself
// loads on demand. Written with createElement, not JSX: a literal JSX return in this file trips
// the build's dynamic-import-vars analysis (see loadAgentation.ts) into a parse error.
export default function Feedback() {
  return createElement(Suspense, { fallback: null }, createElement(Agentation, { appName: "Switchback" }));
}
