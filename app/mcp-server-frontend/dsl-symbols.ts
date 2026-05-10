/**
 * DSL symbol vocabulary + font blacklist + a11y boilerplate.
 *
 * Pure constants + small helpers. No dependencies on atom data,
 * graph edges, or compiler state. Everything that a DSL emitter
 * would need to produce symbolic directives lives here.
 *
 * Extracted from compiler.ts 2026-04-17 to shrink compile surface
 * and make the vocabulary reusable by future compilers (e.g. a
 * non-design domain compiler).
 */

// ────────────────────────────────────────────────────────────
// Symbol vocabulary
// ────────────────────────────────────────────────────────────

export const SYM = {
  // A. Instruction symbols
  NEVER: "\u2715", // ✕ NEVER/forbidden
  OK: "\u2713", // ✓ recommended/allowed
  RULE: "\u25b8", // ▸ rule/constraint
  MUST: "!", // ! mandatory
  QUESTION: "?", // ? check/provocation
  WARN: "\u26a0", // ⚠ warning/caveat

  // B. Relation symbols
  ARROW: "\u2192", // → leads-to / becomes / apply
  FROM: "\u2190", // ← because / sourced-from
  IF_THEN: "\u21d2", // ⇒ if...then
  PRIORITY: ">>", // >> takes-priority-over
  ENHANCES: "~>", // ~> enhances / pairs-well-with
  CONFLICT: "><", // >< conflicts-with — reserved for EDGE_SYM(contradicts)
  SPECIAL: "::", // :: specializes / specific-case

  // C. Structure symbols
  STEP: "#", // #N→ sequence step
  REF: "@", // @id atom reference
  TREF: "$", // $id template reference
  SET_L: "{", // { option set open
  SET_R: "}", // } option set close
  COND_L: "[", // [ condition open
  COND_R: "]", // ] condition close
  SEP: "|", // | or / alternative

  // D. Quantification symbols
  GTE: "\u2265", // ≥ greater-or-equal
  LTE: "\u2264", // ≤ less-or-equal
  NEQ: "\u2260", // ≠ not-equal / not-allowed
  UP: "\u2191", // ↑ increase
  DOWN: "\u2193", // ↓ decrease
  TIMES: "\u00d7", // × multiplier
  APPROX: "~", // ~ approximately
} as const;

/**
 * Map graph edge relations to DSL symbols. Current graph.json only emits
 * `enhances`; the other keys are reserved for when the compiler starts
 * inferring richer relation types (requires / contradicts / specializes).
 */
export const EDGE_SYM: Record<string, string> = {
  enhances: SYM.ENHANCES,
  validates: SYM.PRIORITY,
  contradicts: SYM.CONFLICT,
  requires: SYM.FROM,
  specializes: SYM.SPECIAL,
  "required-by": SYM.ARROW,
};

// ────────────────────────────────────────────────────────────
// Font blacklist — single source of truth.
// ────────────────────────────────────────────────────────────

/** Human-readable canonical list of blocked default fonts. */
export const FONT_BLACKLIST_CORE = [
  "Inter",
  "Roboto",
  "Arial",
  "Space Grotesk",
  "Plus Jakarta Sans",
  "DM Sans",
] as const;

/** Case-insensitive lookup set — for runtime filter checks. */
export const FONT_BLACKLIST = new Set<string>([
  ...FONT_BLACKLIST_CORE,
  ...FONT_BLACKLIST_CORE.map((f) => f.toLowerCase()),
]);

/** Pipe-separated string for symbolic output (e.g. "Inter|Roboto|..."). */
export const FONT_BLACKLIST_PIPE = FONT_BLACKLIST_CORE.join("|");

/** Build a SEP-delimited blacklist string (e.g. using SYM.SEP). */
export function fontBlacklistSet(sep: string): string {
  return FONT_BLACKLIST_CORE.join(sep);
}

/** Strip blacklisted fonts from whitelist/recommendation lines.
 *  NB: the cleanup regexes below must require at least one whitespace char
 *  between pipes (`\s+`), otherwise they eat JS `||` operators inside code
 *  blocks embedded elsewhere in the compile output. */
export function sanitizeFonts(text: string): string {
  for (const font of FONT_BLACKLIST_CORE) {
    const escaped = font.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(`\\b${escaped}\\b\\s*\\|?\\s*`, "gi"), "");
    text = text
      .replace(/\{\s+\|/g, "{")
      .replace(/\|\s+\}/g, "}")
      .replace(/\|\s+\|/g, "|");
  }
  return text;
}

// ────────────────────────────────────────────────────────────
// Mandatory a11y snippets — injected into every compile output.
// ────────────────────────────────────────────────────────────

export const A11Y_REQUIRED = `
## A11y Required — Copy These Snippets

### Skip Link (paste into layout BEFORE <nav>)
\`\`\`html
<a href="#main-content" class="skip-link">Skip to content</a>
<!-- then on your main content wrapper: -->
<main id="main-content">
\`\`\`
\`\`\`css
.skip-link { position: absolute; top: -100%; left: 1rem; padding: 0.5rem 1rem; background: var(--accent); color: var(--accent-foreground); border-radius: 0 0 6px 6px; z-index: 9999; font-weight: 500; text-decoration: none; transition: top 150ms; }
.skip-link:focus { top: 0; }
\`\`\`

### Reduced Motion (paste into globals.css)
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
\`\`\`

### Focus Ring (paste into globals.css)
\`\`\`css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
\`\`\`

${SYM.MUST} touch targets ${SYM.GTE} 44px — use min-height/padding, not just visual size
${SYM.MUST} aria-current="page" on active nav item
${SYM.MUST} All 3 snippets above are NON-NEGOTIABLE — implement them before any other CSS`.trim();

export type DeliveryType = "constraint" | "parameter" | "inspiration" | "technique" | "strategy";
