/**
 * Search engine: query → scored atoms → top results + graph expansion
 *
 * Synonyms live in ./synonyms.json — edit that file to extend query coverage
 * without touching this code. The JSON is loaded once at module-init time.
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import type { Atom, Edge } from "./data.ts";

function loadSynonyms(): Record<string, string[]> {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const raw = readFileSync(join(here, "synonyms.json"), "utf-8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, string[]> = {};
    for (const [key, val] of Object.entries(parsed)) {
      if (key.startsWith("_")) continue; // skip _meta, _notes, etc.
      if (Array.isArray(val)) out[key] = val.filter((v): v is string => typeof v === "string");
    }
    return out;
  } catch (err) {
    console.error(`[prime-wiki] failed to load synonyms.json: ${err} — search will run without expansion`);
    return {};
  }
}

const SYNONYMS: Record<string, string[]> = loadSynonyms();

export function search(
  query: string,
  context: string | undefined,
  atoms: Map<string, Atom>,
  tagIndex: Map<string, Set<string>>,
  edges: Edge[],
  maxResults = 10
): Atom[] {
  const fullQuery = (query + " " + (context || "")).toLowerCase();
  const terms = tokenize(fullQuery);

  // Expand with synonyms
  const expandedTerms = new Set(terms);
  for (const term of terms) {
    const syns = SYNONYMS[term];
    if (syns) syns.forEach(s => expandedTerms.add(s));
  }

  // Determine if query is platform-specific
  const platformTerms = new Set(["ios", "android", "macos", "watchos", "visionos", "tvos", "ipados", "material", "fluent", "swiftui", "compose"]);
  const isPlatformQuery = [...terms].some(t => platformTerms.has(t));

  // An atom is "platform-specific" if any of:
  //  - it lives in M13/M14/M16 (platforms / AI-prompts / skill-infra)
  //  - its id slug starts with a platform prefix (ios-*, android-*, ...)
  //  - any of its tags match a platform term
  // Needed because many @community/* atoms are iOS/Android-flavored but have
  // module="community", so a pure module check misses them.
  function isPlatformAtom(atom: Atom): boolean {
    if (atom.module === "M13" || atom.module === "M14" || atom.module === "M16") return true;
    const slug = atom.id.split("/").pop() ?? "";
    for (const p of platformTerms) {
      if (slug.startsWith(`${p}-`) || slug === p) return true;
    }
    if (Array.isArray(atom.tags)) {
      for (const t of atom.tags) {
        if (typeof t !== "string") continue;
        if (platformTerms.has(t.toLowerCase())) return true;
      }
    }
    return false;
  }

  // Score each atom
  const scores = new Map<string, number>();

  for (const term of expandedTerms) {
    // Tag index lookup
    const tagged = tagIndex.get(term);
    if (tagged) {
      for (const id of tagged) {
        scores.set(id, (scores.get(id) || 0) + 3);
      }
    }
    // Fuzzy name/description match — only search relevant fields
    for (const [id, atom] of atoms) {
      const text = (atom.name + " " + atom.description + " " + (atom.claim || atom.statement || "") + " " + (atom.concept || "")).toLowerCase();
      if (text.includes(term)) {
        scores.set(id, (scores.get(id) || 0) + 1);
      }
    }
  }

  // Penalize platform-specific atoms when query isn't about platforms
  if (!isPlatformQuery) {
    for (const [id, score] of scores) {
      const atom = atoms.get(id)!;
      if (isPlatformAtom(atom)) {
        scores.set(id, score * 0.1); // heavy penalty for off-topic modules
      }
    }
  }

  // Apply priority/activation boosts
  for (const [id, baseScore] of scores) {
    const atom = atoms.get(id)!;
    let score = baseScore;

    // Priority boost
    if (atom.priority === 1) score *= 3;
    else if (atom.priority === 2) score *= 1.5;

    // Activation boost
    if (atom.activation === "mindset") score *= 4;
    else if (atom.activation === "behavioral") score *= 2;

    // Subtype boost — community atoms default to activation=reference and need
    // their subtype to carry weight. Without this, community mandate/pattern/
    // reference-gallery/template-excerpt atoms get buried under M01-M12 behavioral atoms.
    if (atom.subtype === "mandate") score *= 2.5;
    else if (atom.subtype === "reference-gallery") score *= 2.2;
    else if (atom.subtype === "template-excerpt") score *= 2.2;
    else if (atom.subtype === "pattern") score *= 1.8;
    else if (atom.subtype === "anti-pattern") score *= 1.8;
    else if (atom.subtype === "checklist") score *= 1.6;

    // Severity boost
    if (atom.severity === "block") score *= 1.5;

    scores.set(id, score);
  }

  // Sort and take top N
  const ranked = [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxResults);

  const resultIds = new Set(ranked.map(r => r[0]));
  const results: Atom[] = ranked.map(r => atoms.get(r[0])!);

  // Graph expansion: add 1 level of requires/enhances that aren't already in results
  const expanded: Atom[] = [];
  for (const atom of results) {
    for (const edge of edges) {
      if (edge.from === atom.id && !resultIds.has(edge.to)) {
        if (edge.type === "requires" || edge.type === "enhances") {
          const related = atoms.get(edge.to);
          if (related && related.priority <= 2) {
            expanded.push(related);
            resultIds.add(edge.to);
          }
        }
      }
    }
    // Also check explicit related: field
    if (atom.related) {
      for (const relId of atom.related) {
        if (!resultIds.has(relId)) {
          const related = atoms.get(relId);
          if (related) {
            expanded.push(related);
            resultIds.add(relId);
          }
        }
      }
    }
  }

  // Inject relevant mandates that aren't already in results
  const mandates = findRelevantMandates(terms, atoms, resultIds, isPlatformQuery);

  return [...mandates, ...results, ...expanded.slice(0, 5)];
}

function findRelevantMandates(
  terms: Set<string>,
  atoms: Map<string, Atom>,
  alreadyIncluded: Set<string>,
  isPlatformQuery = false
): Atom[] {
  const mandates: Atom[] = [];
  const SKIP_MODULES = isPlatformQuery ? new Set<string>() : new Set(["M13", "M14", "M16"]);

  for (const [id, atom] of atoms) {
    if (alreadyIncluded.has(id)) continue;
    if (atom.priority !== 1 || atom.severity !== "block") continue;
    if (SKIP_MODULES.has(atom.module)) continue;

    // Check if mandate is relevant to query terms
    const atomText = [...atom.tags, atom.name, atom.description].join(" ").toLowerCase();
    let relevant = false;
    for (const term of terms) {
      if (atomText.includes(term)) { relevant = true; break; }
    }
    if (relevant) {
      mandates.push(atom);
      alreadyIncluded.add(id);
    }
  }

  return mandates.slice(0, 3);
}

function tokenize(text: string): Set<string> {
  return new Set(
    text.split(/[\s,\-_/+.()'"]+/)
      .map(w => w.toLowerCase().trim())
      .filter(w => w.length > 2)
  );
}
