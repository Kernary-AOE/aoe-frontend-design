/**
 * Graph traversal: find related atoms by following edges
 */

import type { Atom, Edge } from "./data.ts";

export function findRelated(
  atomId: string,
  depth: number,
  atoms: Map<string, Atom>,
  edges: Edge[]
): Atom[] {
  const visited = new Set<string>([atomId]);
  const results: Atom[] = [];

  let frontier = [atomId];

  for (let d = 0; d < depth; d++) {
    const nextFrontier: string[] = [];

    for (const currentId of frontier) {
      for (const edge of edges) {
        // Outgoing edges
        if (edge.from === currentId && !visited.has(edge.to)) {
          visited.add(edge.to);
          const target = atoms.get(edge.to);
          if (target) {
            (target as any)._edgeType = edge.type;
            (target as any)._edgeFrom = currentId;
            results.push(target);
            nextFrontier.push(edge.to);
          }
        }
        // Incoming edges (for requires: if B requires A, and we're at A, show B)
        if (edge.to === currentId && !visited.has(edge.from) && edge.type === "requires") {
          visited.add(edge.from);
          const source = atoms.get(edge.from);
          if (source) {
            (source as any)._edgeType = `required-by`;
            (source as any)._edgeFrom = currentId;
            results.push(source);
            nextFrontier.push(edge.from);
          }
        }
      }
    }

    frontier = nextFrontier;
  }

  // Sort: requires first, then enhances, then validates, then contradicts
  const typeOrder: Record<string, number> = {
    requires: 0, "required-by": 1, enhances: 2, validates: 3, contradicts: 4, specializes: 5
  };
  results.sort((a, b) => {
    const aType = (a as any)._edgeType || "enhances";
    const bType = (b as any)._edgeType || "enhances";
    return (typeOrder[aType] || 9) - (typeOrder[bType] || 9);
  });

  return results.slice(0, 20); // Cap at 20 related atoms
}
