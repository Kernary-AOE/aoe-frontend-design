import type { CompositionContract, MergedContract } from "./types.ts";

/**
 * Merge multiple CompositionContracts (e.g. when a retrieval step selects
 * several personas simultaneously) into a single MergedContract.
 *
 * Conflict detection:
 *   An atom is a conflict when it appears in the `must_include` of one
 *   contract AND in the `must_avoid` of another.  Both directions are checked
 *   so the conflict is reported only once (keyed on the atom id).
 *
 * Typography / color merging:
 *   Keys from later contracts overwrite earlier ones when they conflict.
 *   This matches a "last persona wins" priority model — callers that want
 *   stricter merge semantics should resolve before calling this function.
 */
export function mergeContracts(contracts: CompositionContract[]): MergedContract {
  const must_include  = new Set<string>();
  const must_avoid    = new Set<string>();
  const motion_prescriptions = new Set<string>();
  const typography_required: Record<string, string> = {};
  const color_required: Record<string, string> = {};

  // Build the union of all sets / records first.
  for (const c of contracts) {
    for (const id of c.must_include)        must_include.add(id);
    for (const id of c.must_avoid)          must_avoid.add(id);
    for (const id of c.motion_prescriptions) motion_prescriptions.add(id);

    Object.assign(typography_required, c.typography_required);
    Object.assign(color_required, c.color_required);
  }

  // Detect conflicts: atom appears in must_include AND must_avoid.
  // We track which contracts contribute each id so the reason message is
  // actionable (tells the caller which personas are clashing).
  const includeSource = new Map<string, string[]>();
  const avoidSource   = new Map<string, string[]>();

  for (const c of contracts) {
    for (const id of c.must_include) {
      if (!includeSource.has(id)) includeSource.set(id, []);
      includeSource.get(id)!.push(c.source_atom);
    }
    for (const id of c.must_avoid) {
      if (!avoidSource.has(id)) avoidSource.set(id, []);
      avoidSource.get(id)!.push(c.source_atom);
    }
  }

  const conflictIds = new Set<string>();
  const conflicts: MergedContract["conflicts"] = [];

  // Check every must_include atom to see if it is also in must_avoid.
  for (const [atom, includers] of includeSource) {
    if (avoidSource.has(atom) && !conflictIds.has(atom)) {
      conflictIds.add(atom);
      const avoiders = avoidSource.get(atom)!;
      conflicts.push({
        atom,
        reason:
          `"${atom}" is required by [${includers.join(", ")}] ` +
          `but avoided by [${avoiders.join(", ")}]`,
      });
    }
  }

  return {
    source_atoms: contracts.map((c) => c.source_atom),
    must_include,
    must_avoid,
    typography_required,
    color_required,
    motion_prescriptions,
    conflicts,
  };
}
