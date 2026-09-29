import type { Diagnostic } from "./types";

type Where = { page?: string | null; path?: string | null };

function make(
  level: Diagnostic["level"],
  code: string,
  message: string,
  fix: string,
  where: Where,
): Diagnostic {
  return { level, code, page: where.page ?? null, path: where.path ?? null, message, fix };
}

export const error = (code: string, message: string, fix: string, where: Where = {}) =>
  make("error", code, message, fix, where);
export const warning = (code: string, message: string, fix: string, where: Where = {}) =>
  make("warning", code, message, fix, where);
export const hasErrors = (diagnostics: Diagnostic[]) => diagnostics.some((d) => d.level === "error");

/**
 * "an" before a vowel sound, "a" otherwise, for a name that follows an article in a message
 * ("an Incubation", "a Ritual", "an either page", "an amber pen"). A leading "uni", "use", "eu"
 * or "one" sounds like a consonant ("a unit", "a one-page Ritual").
 */
export function article(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word) && !/^(uni|use|usu|eu|one|once)/i.test(word) ? "an" : "a";
}

export function formatDiagnostic(d: Diagnostic): string {
  return `${d.level} ${d.code} ${d.page ? `${d.page}: ` : ""}${d.message}\n  fix: ${d.fix}`;
}
