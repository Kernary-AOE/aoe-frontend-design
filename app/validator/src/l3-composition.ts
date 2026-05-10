import { readFileSync } from "fs";
import type { MergedContract } from "@prime-lang/composition";

export interface L3Result {
  pass: boolean;
  honored: string[];
  violated: string[];
  /** Atom checks the heuristic could not verify (no signature in id). */
  unverifiable?: string[];
}

/**
 * Map atom-id "noun part" to detection signatures we can grep in the HTML.
 *
 * The signature can be any of: a literal substring, a regex, or both. The
 * atom is honored if ANY signature matches. The atom is violated only if
 * we have at least one signature AND none matched.
 */
const ATOM_SIGNATURES: Array<{ match: RegExp; signatures: Array<string | RegExp> }> = [
  // Toast/notification patterns
  { match: /pattern-toast/i, signatures: [/role=["']?(alert|status)["']?/i, /class=["'][^"']*toast/i, /aria-live=["'](polite|assertive)["']/i] },
  // Data table patterns
  { match: /pattern-data-table/i, signatures: [/<table\b/i, /role=["']table["']/i, /class=["'][^"']*data-table/i] },
  // Log viewer / virtualized list
  { match: /pattern-log-viewer|pattern-virtual-list/i, signatures: [/font-family:[^;]*(mono|JetBrains|Menlo|Consolas|Geist Mono|IBM Plex Mono)/i, /class=["'][^"']*log/i] },
  // Kanban / drag
  { match: /pattern-kanban|pattern-drag/i, signatures: [/draggable=["']true["']/i, /class=["'][^"']*(kanban|column|board|card)/i] },
  // Modal / dialog
  { match: /pattern-modal|method-modal|pattern-dialog/i, signatures: [/role=["']dialog["']/i, /aria-modal/i, /class=["'][^"']*modal/i] },
  // Hero patterns
  { match: /pattern-hero/i, signatures: [/<section[^>]+(hero|banner)/i, /class=["'][^"']*hero/i] },
  // Pricing tiers
  { match: /pattern-pricing|pattern-tier/i, signatures: [/class=["'][^"']*(pricing|tier|plan)/i, /\$\d|\¥\d|\€\d/] },
  // Table of contents
  { match: /pattern-table-of-contents|pattern-toc/i, signatures: [/<nav[^>]+(toc|table-of-contents)/i, /aria-label=["'][^"']*(contents|toc)/i] },
  // Reading progress
  { match: /pattern-reading-progress|pattern-scroll-progress/i, signatures: [/scroll(Y|Top)|window\.scroll/i, /progress/i] },
  // Skeleton / shimmer
  { match: /pattern-skeleton|pattern-shimmer/i, signatures: [/class=["'][^"']*(skeleton|shimmer)/i, /@keyframes\s+(skeleton|shimmer)/i] },
  // Fade / scroll-reveal motion
  { match: /pattern-fade|pattern-scroll-reveal|pattern-stagger/i, signatures: [/@keyframes\s+(fadeIn|fade-in|reveal|stagger)/i, /opacity\s*:\s*0/i, /IntersectionObserver/i] },
  // Typography hierarchy
  { match: /principle-typography-hierarchy|rule-line-length/i, signatures: [/<h1\b[\s\S]*<h2\b/i, /max-width:\s*\d+(ch|rem|px)/i] },
  // Monospace usage
  { match: /fact-monospace|constraint-monospace/i, signatures: [/font-family:[^;]*(mono|JetBrains|Menlo|Consolas|Geist Mono|IBM Plex Mono)/i] },
  // Interaction states (focus/hover/active)
  { match: /pattern-interaction-states/i, signatures: [/:focus(-visible)?\s*\{/i, /:hover\s*\{/i, /:active\s*\{/i] },
];

/** Pull the noun-tail of an atom id: `@community/pattern-toast-stack` → `pattern-toast-stack`. */
function atomTail(id: string): string {
  const slash = id.lastIndexOf("/");
  return slash >= 0 ? id.slice(slash + 1) : id;
}

function checkAtomHeuristic(
  atomId: string,
  html: string,
): "honored" | "violated" | "unverifiable" {
  const tail = atomTail(atomId);
  for (const entry of ATOM_SIGNATURES) {
    if (!entry.match.test(tail)) continue;
    for (const sig of entry.signatures) {
      const ok = typeof sig === "string" ? html.toLowerCase().includes(sig.toLowerCase()) : sig.test(html);
      if (ok) return "honored";
    }
    return "violated";
  }
  // Fall back to looking for the meaningful noun in the tail.
  // Strip the kind prefix (pattern-/principle-/rule-/method-/...) then test
  // every word of length ≥ 4 against html.
  const noun = tail.replace(/^(pattern|principle|rule|method|fact|constraint|template|persona|anti-pattern|example|counter-example|check|metric|tool|step|term|value|provocation|tradeoff|category|taxonomy|voice|scope|source|feedback|type|transform)-/, "");
  const words = noun.split(/-+/).filter((w) => w.length >= 4);
  if (words.length === 0) return "unverifiable";
  const haystack = html.toLowerCase();
  const hits = words.filter((w) => haystack.includes(w.toLowerCase())).length;
  // Honored if at least half the meaningful words appear.
  if (hits >= Math.max(1, Math.ceil(words.length / 2))) return "honored";
  // We have a noun but couldn't find it — still mark unverifiable rather than violated:
  // many atoms (e.g. principles) are about *how* code is written, not what nouns appear.
  return "unverifiable";
}

/** L3 — composition contract honored?
 *  This is heuristic: must_include atoms are checked by their key signatures. */
export function checkL3Composition(
  htmlPath: string,
  contract: MergedContract
): L3Result {
  const html = readFileSync(htmlPath, "utf-8");
  const honored: string[] = [];
  const violated: string[] = [];
  const unverifiable: string[] = [];

  // typography_required
  for (const [field, value] of Object.entries(contract.typography_required ?? {})) {
    // value might be like "Söhne | SF Pro" — accept if HTML contains any
    const fonts = String(value).split("|").map(s => s.trim());
    if (fonts.some(f => f && new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(html))) {
      honored.push(`typography.${field}: ${value}`);
    } else {
      violated.push(`typography.${field}: expected "${value}", not found in HTML`);
    }
  }

  // color_required (specific hex/rgb values)
  for (const [field, value] of Object.entries(contract.color_required ?? {})) {
    const v = String(value);
    if (v && (html.includes(v) || new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(html))) {
      honored.push(`color.${field}: ${v}`);
    } else if (v && /#[0-9a-f]{3,8}/i.test(v)) {
      violated.push(`color.${field}: expected "${v}", not found`);
    }
  }

  // must_include heuristic checks
  for (const atomId of (contract as any).must_include ?? []) {
    const verdict = checkAtomHeuristic(atomId, html);
    if (verdict === "honored") honored.push(`must_include: ${atomId}`);
    else if (verdict === "violated") violated.push(`must_include: ${atomId} — signature not found in HTML`);
    else unverifiable.push(`must_include: ${atomId}`);
  }

  // must_avoid: any signature for these MUST NOT appear
  for (const atomId of (contract as any).must_avoid ?? []) {
    const verdict = checkAtomHeuristic(atomId, html);
    if (verdict === "honored") {
      // signature present → avoidance violated
      violated.push(`must_avoid: ${atomId} — signature WAS found in HTML (should be absent)`);
    } else {
      honored.push(`must_avoid: ${atomId}`);
    }
  }

  return { pass: violated.length === 0, honored, violated, unverifiable };
}
