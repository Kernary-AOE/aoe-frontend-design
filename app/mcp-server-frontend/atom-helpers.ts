/**
 * Atom + graph helpers. Pure functions; imported by compiler, persona
 * resolver, renderers, and anything else that needs to walk the atom pool.
 */

import type { Atom, Edge } from "./data.ts";
import { SYM, EDGE_SYM } from "./dsl-symbols.ts";

export function getAtom(atoms: Map<string, Atom>, id: string): Atom | undefined {
  return atoms.get(id);
}

export function getAtomsByModule(atoms: Map<string, Atom>, mod: string): Atom[] {
  const results: Atom[] = [];
  for (const [, atom] of atoms) {
    if (atom.module === mod) results.push(atom);
  }
  return results;
}

export function truncSym(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "\u2026";
}

/** O(1) lookup: atomId → outgoing edges */
export function buildEdgeIndex(edges: Edge[]): Map<string, Edge[]> {
  const idx = new Map<string, Edge[]>();
  for (const e of edges) {
    let arr = idx.get(e.from);
    if (!arr) {
      arr = [];
      idx.set(e.from, arr);
    }
    arr.push(e);
  }
  return idx;
}

/**
 * Get at most 2 relation symbols for an atom, relative to a set of other
 * atoms currently in scope. Skips self-edges and caps at 2 to save tokens.
 */
export function getRelationSymbols(
  atomId: string,
  edgeIndex: Map<string, Edge[]>,
  selectedIds: Set<string>,
): string[] {
  const rels: string[] = [];
  const outgoing = edgeIndex.get(atomId) || [];
  for (const e of outgoing) {
    if (selectedIds.has(e.to) && e.to !== atomId) {
      // graph.json edges use `relation` (not `type`). Keep `type` as a
      // legacy fallback so we stay compatible with older graph snapshots.
      const rel = e.relation ?? (e as unknown as { type?: string }).type ?? "";
      const sym = EDGE_SYM[rel] || SYM.ARROW;
      rels.push(`${sym} ${SYM.REF}${e.to.split("/").pop()}`);
    }
  }
  return rels.slice(0, 2);
}
