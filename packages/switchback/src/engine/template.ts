const PLACEHOLDER = /\{([a-z_]+)(?:\|([^}]*))?\}/g;

export function resolvePrompt(
  template: string,
  data: Record<string, unknown>,
  spec: { subtitle?: string },
): string {
  const ctx: Record<string, unknown> = {
    ...data,
    subject: data.subject || spec.subtitle || "this",
    horizon: data.horizon || "six months",
    constraint: data.constraint || "the main constraint",
  };
  return template.replace(PLACEHOLDER, (_match, key: string, fallback?: string) => {
    const value = ctx[key];
    return value === undefined || value === null || value === "" ? (fallback ?? "") : String(value);
  });
}
