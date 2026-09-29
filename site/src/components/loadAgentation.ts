import { lazy } from "react";

// Kept in its own plain (non-JSX) module: a dynamic import() living in the same file as JSX
// trips the build's dynamic-import-vars analysis. See Feedback.tsx for where this is used.
export const Agentation = lazy(() => import("agentation").then((m) => ({ default: m.Agentation })));
