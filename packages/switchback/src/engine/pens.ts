import type { Kit, PenMapping, Role, RoleAssignment } from "./types";

const CIRCLED: Record<string, string> = { Q: "Ⓠ", R: "Ⓡ", G: "Ⓖ", X: "Ⓧ", O: "Ⓞ", P: "Ⓟ", D: "Ⓓ", B: "Ⓑ" };

export function orderByPriority(roles: Role[]): Role[] {
  return [...roles].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}

export function assignPens(kit: Kit, roles: Role[]): { mapping: PenMapping; unassigned: string[] } {
  const mapping = {} as PenMapping;
  const used = new Set<number>();
  const colourAt = (i: number) => kit.pens[i]!.colour.toLowerCase();

  kit.pens.forEach((_pen, i) => {
    if (colourAt(i) === "black") used.add(i);
  });
  const conflicted = new Set<number>();
  kit.pens.forEach((pen, i) => {
    if (!pen.role) return;
    // Mark it used either way, so a pen whose requested role is already taken is
    // never silently reassigned to some other role by suggested-colour matching.
    used.add(i);
    if (pen.role in mapping) conflicted.add(i);
    else mapping[pen.role] = { pen: pen.colour };
  });

  for (const role of orderByPriority(roles)) {
    if (role.priority === null || role.id in mapping) continue;
    const match = kit.pens.findIndex((_, i) => !used.has(i) && role.suggested.includes(colourAt(i)));
    let assignment: RoleAssignment;
    if (match >= 0) {
      used.add(match);
      assignment = { pen: kit.pens[match]!.colour };
    } else if (role.id === "crux" && kit.highlighter) {
      assignment = { pen: "highlighter" };
    } else if (role.id === "draft" && kit.pencil) {
      assignment = { pen: "pencil" };
    } else {
      assignment = { letter: role.code };
    }
    mapping[role.id] = assignment;
  }
  mapping.reason = { pen: "black" };

  const unassigned = kit.pens.filter((_, i) => !used.has(i) || conflicted.has(i)).map((p) => p.colour);
  return { mapping, unassigned };
}

export function describeAssignment(a: RoleAssignment): string {
  return "pen" in a ? a.pen : `no pen — write ${a.letter} in a circle`;
}

export function formatPens(mapping: PenMapping, roles: Role[]): string {
  return orderByPriority(roles)
    .map((r) => {
      const a = mapping[r.id];
      return `${r.code} ${r.short}=${"pen" in a ? a.pen : (CIRCLED[a.letter] ?? a.letter)}`;
    })
    .join(" · ");
}
