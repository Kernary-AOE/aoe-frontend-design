/**
 * load-index.ts
 * Reads compiled-v3-final/_index.xml and returns a flat map of AtomMeta + edge list.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AtomRef } from "./types.ts";

export interface AtomMeta extends AtomRef {
  cluster: string;
  /** ISO date when atom was deprecated. Active atoms omit this field. */
  deprecated_at?: string;
  /** Atom id that supersedes this one. */
  superseded_by?: string;
}

export interface IndexData {
  /** Active atoms only — deprecated atoms are routed to `deprecated`. */
  atoms: Map<string, AtomMeta>;
  /** Deprecated atoms (separate so retrieval never picks them but UX can surface them). */
  deprecated: Map<string, AtomMeta>;
}

/** Unescape XML entities in description text. */
function unescapeXml(str: string): string {
  return str
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

/**
 * Resolve atom level from kind.
 * persona / template → full
 * fact / rule / constraint → core
 * all others → summary
 */
function kindToLevel(kind: string): "summary" | "core" | "full" {
  if (kind === "persona" || kind === "template") return "full";
  if (kind === "fact" || kind === "rule" || kind === "constraint") return "core";
  return "summary";
}

/**
 * Parse the _index.xml file from compiled-v3-final.
 * Uses a simple line-by-line regex approach (no DOM dependency).
 */
function attrVal(attrStr: string, name: string): string | undefined {
  const re = new RegExp(`${name}=["']([^"']*)["']`);
  const m = attrStr.match(re);
  return m?.[1];
}

export function loadCompiledIndex(primeDir: string): IndexData {
  const xmlPath = join(primeDir, "compiled-v3-final", "_index.xml");
  const xml = readFileSync(xmlPath, "utf8");

  const atoms = new Map<string, AtomMeta>();
  const deprecated = new Map<string, AtomMeta>();

  // Block-form: <atom id="..." kind="..." tokens="..." [deprecated_at="..."]>...</atom>
  const atomBlockRe =
    /<atom\s+([^>]*?)>([\s\S]*?)<\/atom>/g;
  const edgeRe = /<edge\s+type="([^"]+)"\s+target="([^"]+)"\s*\/>/g;
  const clusterRe = /<cluster\s+name="([^"]+)"/;

  // Build a lightweight cluster-name lookup: atom-id → cluster
  // We do a preliminary scan of the XML to pair atom ids to their cluster.
  const clusterMap = new Map<string, string>();
  const lines = xml.split("\n");
  let currentCluster = "unknown";
  for (const line of lines) {
    const cm = line.match(clusterRe);
    if (cm) {
      currentCluster = cm[1];
      continue;
    }
    const am = line.match(/<atom\s+id="([^"]+)"/);
    if (am) {
      clusterMap.set(am[1], currentCluster);
    }
  }

  let match: RegExpExecArray | null;
  while ((match = atomBlockRe.exec(xml)) !== null) {
    const [, attrs, body] = match;
    const id = attrVal(attrs, "id") ?? "";
    const kind = attrVal(attrs, "kind") ?? "unknown";
    const tokens = parseInt(attrVal(attrs, "tokens") ?? "0", 10);
    const depAt = attrVal(attrs, "deprecated_at");
    const supBy = attrVal(attrs, "superseded_by");

    if (!id) continue;

    // Extract description: first text node inside the atom (before first <edge>)
    const descMatch = body.match(/^\s*([^\n<]+)/);
    const description = descMatch
      ? unescapeXml(descMatch[1].trim())
      : id;

    // Extract edges
    const edges: Array<{ type: string; target: string }> = [];
    let em: RegExpExecArray | null;
    const edgeSrc = new RegExp(edgeRe.source, "g");
    while ((em = edgeSrc.exec(body)) !== null) {
      edges.push({ type: em[1], target: em[2] });
    }

    const cluster = clusterMap.get(id) ?? "unknown";
    const level = kindToLevel(kind);

    const entry: AtomMeta = {
      id,
      kind,
      tokens,
      description,
      edges,
      cluster,
      level,
      ...(depAt ? { deprecated_at: depAt } : {}),
      ...(supBy ? { superseded_by: supBy } : {}),
    };

    if (depAt) {
      deprecated.set(id, entry);
    } else {
      atoms.set(id, entry);
    }
  }

  // Self-closing deprecated atoms in <deprecated_atoms> block
  const depBlockMatch = xml.match(/<deprecated_atoms[^>]*>([\s\S]*?)<\/deprecated_atoms>/);
  if (depBlockMatch) {
    const depBody = depBlockMatch[1];
    const depAtomRe = /<atom\s+([\s\S]*?)\/>/g;
    let m: RegExpExecArray | null;
    while ((m = depAtomRe.exec(depBody)) !== null) {
      const attrs = m[1];
      const id = attrVal(attrs, "id") ?? "";
      if (!id || deprecated.has(id)) continue;
      const depAt = attrVal(attrs, "deprecated_at") ?? "";
      const supBy = attrVal(attrs, "superseded_by");
      deprecated.set(id, {
        id,
        kind: attrVal(attrs, "kind") ?? "unknown",
        tokens: 0,
        description: "",
        edges: [],
        cluster: "deprecated",
        level: "summary",
        deprecated_at: depAt,
        ...(supBy ? { superseded_by: supBy } : {}),
      });
    }
  }

  return { atoms, deprecated };
}
