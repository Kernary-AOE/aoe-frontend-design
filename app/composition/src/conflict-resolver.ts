import type { CompositionContract, MergedContract } from "./types.ts";
import type { IntentObject } from "@prime-lang/intent";

export interface ResolverInput {
  contracts: Array<{
    contract: CompositionContract;
    weight: number;                    // from intent.register_candidates[].weight
    school: string;
  }>;
  intent: IntentObject;
}

export interface ResolverOutput {
  resolved: MergedContract;
  conflicts: Array<{
    atom: string;
    must_include_by: string[];         // schools that want it
    must_avoid_by: string[];           // schools that ban it
    winner: "include" | "avoid";       // based on cumulative weight
    rationale: string;
  }>;
}

export function resolveConflicts(input: ResolverInput): ResolverOutput {
  const { contracts } = input;

  // Collect all atoms referenced in any must_include or must_avoid
  const allAtoms = new Set<string>();
  for (const { contract } of contracts) {
    for (const a of contract.must_include) allAtoms.add(a);
    for (const a of contract.must_avoid) allAtoms.add(a);
  }

  // For each atom, sum weights per side
  const resolved_must_include = new Set<string>();
  const resolved_must_avoid = new Set<string>();
  const conflicts: ResolverOutput["conflicts"] = [];

  for (const atom of allAtoms) {
    const include_schools: string[] = [];
    const avoid_schools: string[] = [];
    let include_weight = 0;
    let avoid_weight = 0;

    for (const { contract, weight, school } of contracts) {
      if (contract.must_include.includes(atom)) {
        include_schools.push(school);
        include_weight += weight;
      }
      if (contract.must_avoid.includes(atom)) {
        avoid_schools.push(school);
        avoid_weight += weight;
      }
    }

    const is_conflict = include_schools.length > 0 && avoid_schools.length > 0;
    const winner: "include" | "avoid" = include_weight >= avoid_weight ? "include" : "avoid";

    if (winner === "include") {
      resolved_must_include.add(atom);
    } else {
      resolved_must_avoid.add(atom);
    }

    if (is_conflict) {
      const rationale = winner === "include"
        ? `include wins (${include_weight.toFixed(2)} vs ${avoid_weight.toFixed(2)}): ${include_schools.join(", ")} outweigh ${avoid_schools.join(", ")}`
        : `avoid wins (${avoid_weight.toFixed(2)} vs ${include_weight.toFixed(2)}): ${avoid_schools.join(", ")} outweigh ${include_schools.join(", ")}`;

      conflicts.push({
        atom,
        must_include_by: include_schools,
        must_avoid_by: avoid_schools,
        winner,
        rationale,
      });
    }
  }

  // Determine highest-weight contract for scalar fields
  const sorted = [...contracts].sort((a, b) => b.weight - a.weight);
  const primary = sorted[0]?.contract;

  // Union of all motion_prescriptions
  const motion_prescriptions = new Set<string>();
  for (const { contract } of contracts) {
    for (const m of contract.motion_prescriptions) {
      motion_prescriptions.add(m);
    }
  }

  // source_atoms list
  const source_atoms = contracts.map(({ contract }) => contract.source_atom);

  // Build conflicts list for MergedContract (simple atom+reason form)
  const mergedConflicts: MergedContract["conflicts"] = conflicts.map((c) => ({
    atom: c.atom,
    reason: c.rationale,
  }));

  const resolved: MergedContract = {
    source_atoms,
    must_include: resolved_must_include,
    must_avoid: resolved_must_avoid,
    typography_required: primary?.typography_required ?? {},
    color_required: primary?.color_required ?? {},
    motion_prescriptions,
    conflicts: mergedConflicts,
  };

  return { resolved, conflicts };
}
