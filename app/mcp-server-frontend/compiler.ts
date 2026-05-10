/**
 * Prime Wiki Compiler v4 — Full DSL Symbolic Language
 *
 * RESOLVE → FILTER → ROUTE → CLASSIFY → SELECT → RENDER → EMIT
 *
 * v4 changes from v3:
 *   - 30+ DSL symbols (instruction, relation, structure, quantification)
 *   - Graph edge relationships rendered with ~> >> >< :: symbols
 *   - Quantified rules (≥ ≤ ≠ ↑ ↓) instead of prose
 *   - Template references ($ref) for on-demand code loading
 *   - Compressed output targeting ~375 tokens
 *   - Relationship-aware rendering: atoms shown with their graph connections
 */

import type { Atom, Edge } from "./data.ts";
import { search } from "./search.ts";

// ────────────────────────────────────────────────────────────
// Complete DSL Symbol Table
// ────────────────────────────────────────────────────────────

// DSL vocabulary + font blacklist + a11y boilerplate live in dsl-symbols.ts
// (extracted 2026-04-17 to shrink compiler surface and enable reuse)
import {
  SYM,
  EDGE_SYM,
  FONT_BLACKLIST,
  FONT_BLACKLIST_CORE,
  FONT_BLACKLIST_PIPE,
  fontBlacklistSet,
  sanitizeFonts,
  A11Y_REQUIRED,
  type DeliveryType,
} from "./dsl-symbols.ts";

// Re-export the blacklist constant for external consumers (e.g. tests).
export { FONT_BLACKLIST_CORE };

// Helpers and persona resolution live in separate modules since 2026-04-17.
import { getAtom, getAtomsByModule, truncSym, buildEdgeIndex, getRelationSymbols } from "./atom-helpers.ts";
import {
  type CompileDSLParams,
  type PersonaConstraints,
  DEFAULT_PERSONA,
  resolve,
  resolveVoice,
} from "./persona-resolver.ts";

export type { CompileDSLParams };

export interface CompileTemplateParams {
  id: string;
  variables?: Record<string, any>;
}

// ════════════════════════════════════════════════════════════
// STEP 2: FILTER — symbolic constraint rendering
// ════════════════════════════════════════════════════════════

function filterConstraints(persona: PersonaConstraints, atoms: Map<string, Atom>)
  : { blacklistLines: string[]; whitelistLines: string[]; atomCount: number } {
  const bl: string[] = [];
  const wl: string[] = [];
  let n = 0;

  // Font blacklist — symbolic: ✕ font: Inter | Roboto | Arial
  // Persona override: if persona's font_display/body explicitly recommends a
  // blacklisted font, it is removed from the ✕ list for this skill. The
  // `exception` clause in @C01/font-blacklist encodes this rule at data level;
  // here we enforce it at render time to prevent mandate↔persona contradictions.
  const fb = getAtom(atoms, "@C01/font-blacklist");
  const fbRaw = Array.isArray(fb?.blacklisted) ? (fb!.blacklisted as unknown[]) : [];
  const globalBL = fb
    ? fbRaw.map((i) => (i && typeof i === "object" && "name" in i ? String((i as { name: unknown }).name) : String(i)))
    : [...FONT_BLACKLIST_CORE];
  const personaAllowed = new Set([...persona.font_display, ...persona.font_body].map((f) => f.toLowerCase()));
  const allBL = [...new Set([...globalBL, ...persona.font_exclude])]
    .filter((f) => !personaAllowed.has(f.toLowerCase()));
  bl.push(`${SYM.NEVER} font: ${allBL.join(` ${SYM.SEP} `)}`);
  n++;

  // Background blacklist — symbolic: ≠ bg: #fff | #f5f5f5
  const bgBL = getAtom(atoms, "@C01/color-blacklist-bg");
  if (bgBL) {
    const bgRaw = Array.isArray(bgBL.blacklisted) ? (bgBL.blacklisted as unknown[]) : [];
    const vals = bgRaw.slice(0, 3).map((i) =>
      i && typeof i === "object" && "value" in i ? String((i as { value: unknown }).value) : String(i),
    );
    bl.push(`${SYM.NEQ} bg: ${vals.join(` ${SYM.SEP} `)}`);
    n++;
  }

  // Brand blacklist — symbolic: ✕ brand: blue-500 | indigo-500
  const brBL = getAtom(atoms, "@C01/color-blacklist-brand");
  if (brBL) {
    const brRaw = Array.isArray(brBL.blacklisted) ? (brBL.blacklisted as unknown[]) : [];
    const vals = brRaw.slice(0, 3).map((i) => {
      if (i && typeof i === "object") {
        const obj = i as { name?: unknown; value?: unknown };
        return String(obj.name ?? obj.value ?? i);
      }
      return String(i);
    });
    bl.push(`${SYM.NEVER} brand: ${vals.join(` ${SYM.SEP} `)}`);
    n++;
  }

  // WCAG mandate — symbolic: ! contrast ≥ 4.5:1 body | ≥ 3:1 large
  bl.push(`${SYM.MUST} contrast ${SYM.GTE} 4.5:1 body ${SYM.SEP} ${SYM.GTE} 3:1 large`);

  // Font whitelist — symbolic with relation: ✓ display: {Font1 | Font2} ~> body: {Font3}
  const df = persona.font_display;
  const dfg = persona.font_display_google;
  const bf = persona.font_body;
  const bfg = persona.font_body_google;
  wl.push(`${SYM.OK} display: ${SYM.SET_L}${df.join(` ${SYM.SEP} `)}${SYM.SET_R}${dfg ? ` (GF: ${dfg.join(` ${SYM.SEP} `)})` : ""}`);
  wl.push(`  ${SYM.ENHANCES} body: ${SYM.SET_L}${bf.join(` ${SYM.SEP} `)}${SYM.SET_R}${bfg ? ` (GF: ${bfg.join(` ${SYM.SEP} `)})` : ""}`);

  return { blacklistLines: bl, whitelistLines: wl, atomCount: n };
}

// ════════════════════════════════════════════════════════════
// STEP 3: ROUTE — symbolic sequence
// ════════════════════════════════════════════════════════════

function route(params: CompileDSLParams, persona: PersonaConstraints, atoms: Map<string, Atom>)
  : { lines: string[]; atomCount: number } {
  const lines: string[] = [];
  const seq = getAtom(atoms, `@S01/seq-${params.task}`);
  if (seq?.steps) {
    for (const s of seq.steps as any[]) {
      const gate = s.gate ? ` ${SYM.COND_L}${truncSym(s.gate, 25)}${SYM.COND_R}` : "";
      lines.push(`${SYM.STEP}${s.step || 1}${SYM.ARROW} ${truncSym(s.action || "", 50)}${gate}`);
    }
    return { lines, atomCount: 1 };
  }
  // Fallback: generated sequence with symbolic quantification
  const hue = params.hue ?? 240;
  lines.push(`${SYM.STEP}1${SYM.ARROW} direction: ${SYM.SET_L}${persona.school}${SYM.SET_R} ${SYM.COND_L}${SYM.MUST} commit one${SYM.COND_R}`);
  lines.push(`${SYM.STEP}2${SYM.ARROW} font: display ${SYM.ENHANCES} body ${SYM.COND_L}${SYM.NEVER} blacklist${SYM.COND_R}`);
  lines.push(`${SYM.STEP}3${SYM.ARROW} color: OKLCH(H=${hue}, C=${persona.color_chroma_accent}) ${SYM.COND_L}${SYM.NEQ} raw hex${SYM.COND_R}`);
  lines.push(`${SYM.STEP}4${SYM.ARROW} spacing: ${persona.space_base}px base ${SYM.SEP} scale: ${persona.type_scale_ratio}${SYM.TIMES}`);
  lines.push(`${SYM.STEP}5${SYM.ARROW} density${SYM.SPECIAL}${persona.density} ${SYM.IF_THEN} row:${persona.density === "dense" ? "32" : "48"}px`);
  lines.push(`${SYM.STEP}6${SYM.ARROW} components ${SYM.COND_L}ARIA roles required${SYM.COND_R}`);
  lines.push(`${SYM.STEP}7${SYM.ARROW} verify: a11y ${SYM.PRIORITY} aesthetics ${SYM.COND_L}memorable signature, not verbatim clone${SYM.COND_R}`);
  return { lines, atomCount: 0 };
}

// ════════════════════════════════════════════════════════════
// STEP 4: CLASSIFY — assign delivery type (unchanged from v3)
// ════════════════════════════════════════════════════════════

function classifyAtom(a: Atom): DeliveryType {
  if (a.code) {
    if (a.type === "template") return "parameter";
    return "technique";
  }
  if (a.type === "constraint") return "constraint";
  if (a.subtype === "prohibition" || a.subtype === "mandate") return "constraint";
  if (a.subtype === "blacklist" || a.subtype === "whitelist") return "constraint";
  if (a.priority === 1 && a.severity === "block") return "constraint";

  if (a.subtype === "technique" || a.subtype === "component") return "technique";
  if (a.subtype === "pattern" && (a.use_when || a.anatomy)) return "technique";
  if (a.subtype === "anti-pattern") return "technique";

  if (a.subtype === "heuristic" && (a.situation || a.when_it_fails)) return "strategy";
  if (a.subtype === "taxonomy" || a.subtype === "concept") return "strategy";

  if (a.activation === "mindset") return "inspiration";
  if (a.subtype === "principle") return "inspiration";

  if (a.subtype === "heuristic") return "strategy";
  return "strategy";
}

// ════════════════════════════════════════════════════════════
// STEP 5: SELECT — quota-based per delivery type
// ════════════════════════════════════════════════════════════

interface ClassifiedSelection {
  inspiration: Atom[];
  constraint: Atom[];
  strategy: Atom[];
  technique: Atom[];
  antiPatterns: Atom[];
  atomCount: number;
}

// Atoms injected into every compile output, regardless of task/persona.
// Keep this list minimal — each entry is ~30-80 tokens that cannot be
// context-specialized. Anything task- or persona-specific goes into
// CONTEXTUAL_INCLUDES below.
//
// The @prime/impeccable-* block below was added 2026-04-22 after a live
// A/B comparison showed skill-based output (direct DO/DON'T imperatives
// from impeccable/SKILL.md) was visually tighter than Prime's
// persona-compiled briefs. Every impeccable directive was already
// decomposed into atoms in W13, but the quota selector wasn't surfacing
// them — forcing them into the always-include list injects skill-grade
// imperatives into every brief.
const CORE_ALWAYS_IDS: readonly string[] = [
  "@M14/frontend-design-ai-slop-antipattern",   // universal anti-pattern guard
  "@M10/unforgettable-test",                    // universal quality test
  "@M10/aesthetic-direction-menu",              // required by Entry Ritual Q1
  "@M10/creative-confidence-activation",        // persona-agnostic activation
  "@M14/frontend-design-distinctive-font-choice",  // reinforces font mandate
  "@M14/frontend-design-match-complexity-to-vision", // applies to any task
  // Skill-decomposed atoms — direct DO/DON'T imperatives
  "@prime/impeccable-color-do-use-modern-css-color-functions-oklch-e953a08",
  "@prime/impeccable-color-do-tint-your-neutrals-toward-your-brand-4e715d6",
  "@prime/impeccable-color-avoid-use-the-ai-color-palette-cyan-on--42fd415",
  "@prime/impeccable-color-avoid-use-pure-black-000-or-pure-white--f95a610",
  "@prime/impeccable-typography-avoid-use-overused-fonts-inter-rob-888839e",
  "@prime/impeccable-layout-avoid-wrap-everything-in-cards-not-eve-aaba649",
  "@prime/impeccable-layout-avoid-nest-cards-inside-cards-visual-n-bf29dea",
  "@prime/impeccable-visual-details-avoid-use-glassmorphism-everyw-43f6e52",
  "@prime/impeccable-visual-details-avoid-use-rounded-rectangles-w-27fc665",
  "@prime/impeccable-motion-avoid-animate-layout-properties-width--f50f9b3",
  "@prime/impeccable-motion-do-use-exponential-easing-ease-out-qua-e44097c",
  "@prime/impeccable-interaction-avoid-make-every-button-primary-u-4411462",
] as const;

// Task- and persona-conditional inclusions. Each entry: atom id ->
// predicate over (task, persona_school). Only matching entries are injected.
const CONTEXTUAL_INCLUDES: ReadonlyArray<{
  id: string;
  when: (task: string, school: string | undefined) => boolean;
}> = [
  {
    // Full-page orchestration — marketing/landing/content, not narrow forms/dashboards
    id: "@M14/frontend-design-one-page-load-orchestration",
    when: (t) => ["marketing-page", "content-site", "design-system"].includes(t),
  },
  {
    // Atmosphere/backgrounds — visual storytelling, not dense data interfaces
    id: "@M14/frontend-design-backgrounds-atmosphere",
    when: (t) => ["marketing-page", "content-site", "mobile-app"].includes(t),
  },
  {
    // Unexpected layouts — expressive schools or marketing/content
    id: "@M14/frontend-design-unexpected-layouts",
    when: (t, s) =>
      ["marketing-page", "content-site"].includes(t) ||
      ["brutalist", "editorial", "tokyo-minimal"].includes(s || ""),
  },
  {
    // Bold aesthetic — expressive schools only; dilutes restrained ones
    id: "@M14/frontend-design-bold-aesthetic",
    when: (_t, s) => ["brutalist", "editorial"].includes(s || ""),
  },
  {
    // Dominant accent color — any task that has a hero/CTA surface
    id: "@M14/frontend-design-dominant-accent-color",
    when: (t) => ["marketing-page", "content-site", "mobile-app", "design-system"].includes(t),
  },
  {
    // Easing curves — only where motion matters
    id: "@M05/easing-curve-taxonomy",
    when: (t) => ["marketing-page", "mobile-app", "design-system"].includes(t),
  },
];

function resolveAlwaysIncludeIds(task: string, school: string | undefined): string[] {
  const ids = [...CORE_ALWAYS_IDS];
  for (const entry of CONTEXTUAL_INCLUDES) {
    if (entry.when(task, school)) ids.push(entry.id);
  }
  return ids;
}

function selectByQuota(
  params: CompileDSLParams,
  persona: PersonaConstraints,
  atoms: Map<string, Atom>,
  tagIndex: Map<string, Set<string>>,
  edges: Edge[],
): ClassifiedSelection {
  const query = [params.task, ...(params.features || [])].join(" ");
  const searchResults = search(query, undefined, atoms, tagIndex, edges, 25);

  const candidateMap = new Map<string, Atom>();
  for (const a of searchResults) candidateMap.set(a.id, a);
  const alwaysIds = resolveAlwaysIncludeIds(params.task, params.persona_school);
  for (const id of alwaysIds) {
    const a = atoms.get(id);
    if (a) candidateMap.set(a.id, a);
  }

  const buckets: Record<DeliveryType, Atom[]> = {
    constraint: [], parameter: [], inspiration: [], technique: [], strategy: [],
  };
  const antiPatterns: Atom[] = [];

  for (const [, a] of candidateMap) {
    if (!a.module) continue;
    if (["M13", "M16"].includes(a.module)) continue;
    const text = (a.claim || a.statement || a.description || a.name || "").toLowerCase();
    if (/\b(pdf|word|slide|email|powerpoint|visionos|watchos)\b/.test(text)) continue;

    if (a.subtype === "anti-pattern") {
      antiPatterns.push(a);
    } else {
      buckets[classifyAtom(a)].push(a);
    }
  }

  // Sort: atoms from CORE_ALWAYS_IDS (impeccable imperatives etc.) sort first,
  // then behavioral > reference, then by priority. This keeps the
  // curated skill-grade imperatives at the top of every bucket so they
  // aren't crowded out by search-rank peers that happened to match the query.
  const alwaysIdSet = new Set<string>(alwaysIds);
  const sortFn = (a: Atom, b: Atom) => {
    const aCore = alwaysIdSet.has(a.id) ? 0 : 1;
    const bCore = alwaysIdSet.has(b.id) ? 0 : 1;
    if (aCore !== bCore) return aCore - bCore;
    const aB = a.activation === "behavioral" ? 0 : 1;
    const bB = b.activation === "behavioral" ? 0 : 1;
    if (aB !== bB) return aB - bB;
    return (a.priority || 3) - (b.priority || 3);
  };
  for (const key of Object.keys(buckets) as DeliveryType[]) buckets[key].sort(sortFn);
  antiPatterns.sort(sortFn);

  // Caps raised 2026-04-22 after A/B finding that skill-based output
  // beat prime-compiled output on visual distinctiveness. The bottleneck
  // was not the atom corpus (3070 atoms with impeccable DO/DON'Ts) but
  // the 3-slot antiPattern cap crowding out the skill-grade imperatives.
  const sel: ClassifiedSelection = {
    inspiration: buckets.inspiration.slice(0, 4),
    constraint: buckets.constraint.slice(0, 5),
    strategy: buckets.strategy.slice(0, 6),     // was 4
    technique: buckets.technique.slice(0, 6),   // was 5
    antiPatterns: antiPatterns.slice(0, 7),     // was 3
    atomCount: 0,
  };
  sel.atomCount = sel.inspiration.length + sel.constraint.length + sel.strategy.length
    + sel.technique.length + sel.antiPatterns.length;

  return sel;
}

// ════════════════════════════════════════════════════════════
// STEP 6: RENDER — DSL symbolic renderers
// ════════════════════════════════════════════════════════════

function renderInspiration(a: Atom): string {
  // Full text, NEVER truncated — this is the soul
  return a.claim || a.statement || a.rule_of_thumb || a.principle || a.description || a.name;
}

function renderConstraint(a: Atom, rels: string[]): string {
  const sym = a.subtype === "prohibition" ? SYM.NEVER
    : a.subtype === "mandate" ? SYM.MUST
    : SYM.RULE;
  // Extract quantifiable values and use symbols
  let text = a.claim || a.statement || a.name;
  // Compress common patterns to symbols
  text = text
    .replace(/\bat least\b/gi, `${SYM.GTE}`)
    .replace(/\bno more than\b/gi, `${SYM.LTE}`)
    .replace(/\bmust not be\b/gi, `${SYM.NEQ}`)
    .replace(/\bnever use\b/gi, `${SYM.NEVER}`)
    .replace(/\bincreases?\b/gi, `${SYM.UP}`)
    .replace(/\bdecreases?\b/gi, `${SYM.DOWN}`);
  let line = `${sym} ${text}`;
  // Append relation symbols
  if (rels.length > 0) line += `  ${rels.join(" ")}`;
  return line;
}

function renderTechnique(a: Atom, rels: string[]): string {
  const name = a.pattern_name || a.name;
  const code = a.code as string | undefined;
  // Prefer applies_when (post-migration); fall back to use_when for legacy atoms.
  const whenField = a.applies_when ?? a.use_when;
  const when = whenField ? (Array.isArray(whenField) ? whenField.join("; ") : String(whenField)) : "";
  const relStr = rels.length > 0 ? `  ${rels.join(" ")}` : "";

  if (code) {
    return `${SYM.COND_L}${name}${SYM.COND_R}${when ? ` ${SYM.IF_THEN} ${when}` : ""}${relStr}\n${code.trim()}`;
  }

  const detail = a.what_it_looks_like || a.concept || a.remedy || a.claim || a.statement || a.description || "";
  return `${SYM.COND_L}${name}${SYM.COND_R}${when ? ` ${SYM.IF_THEN} ${when}` : ""}\n  ${truncSym(detail, 80)}${relStr}`;
}

function renderAntiPattern(a: Atom): string {
  // Prefer the claim (the actual DO/DON'T imperative text) over the name
  // (which may be a kebab-case slug for migrated atoms like impeccable-*).
  // Fall back through specific fields before the slug.
  const body = a.anti_pattern || a.pattern_name || a.claim || a.statement || a.description || a.name;
  const fix = a.remedy || a.use_instead || "";
  return `${SYM.NEVER} ${truncSym(body, 120)}${fix ? ` ${SYM.ARROW} instead: ${truncSym(fix, 50)}` : ""}`;
}

function renderStrategy(a: Atom, rels: string[]): string {
  // Compress to symbolic form: statement + ⇒ when + ⚠ watch
  let statement = a.claim || a.rule_of_thumb || a.statement || a.principle || a.concept || a.description || a.name;
  // Symbolic compression of common prose
  statement = statement
    .replace(/\bat least\b/gi, `${SYM.GTE}`)
    .replace(/\bno more than\b/gi, `${SYM.LTE}`)
    .replace(/\bshould always\b/gi, `${SYM.MUST}`)
    .replace(/\bnever\b/gi, `${SYM.NEVER}`)
    .replace(/\bleads to\b/gi, `${SYM.ARROW}`)
    .replace(/\bresults in\b/gi, `${SYM.ARROW}`);

  const situation = a.situation || a.applies_when || "";
  const tradeoff = a.tradeoff || a.when_it_fails || "";
  const relStr = rels.length > 0 ? `  ${rels.join(" ")}` : "";

  let out = `${SYM.RULE} ${statement}`;
  if (situation) out += `\n  ${SYM.IF_THEN} ${situation}`;
  if (tradeoff) out += `\n  ${SYM.WARN} ${tradeoff}`;
  if (relStr) out += `\n ${relStr}`;
  return out;
}

function renderTokens(params: CompileDSLParams, persona: PersonaConstraints): string {
  const hue = params.hue ?? 240;
  const chroma = params.chroma ?? persona.color_chroma_accent;
  const ratio = persona.type_scale_ratio;
  const base = persona.space_base;
  const bgL = persona.bg_tone === "dark" ? 0.10 : 0.97;
  const surfL = persona.bg_tone === "dark" ? 0.15 : 0.99;
  const textL = persona.bg_tone === "dark" ? 0.95 : 0.15;

  const isSerif = (f: string) => /Serif|Fraunces|Canela|Recoleta|Freight|Newsreader|Tiempos|GT Sectra|Cormorant|Lora|Playfair/i.test(f);
  const isMono = (f: string) => /Mono|mono/i.test(f);
  const fontCat = (f: string) => isMono(f) ? "monospace" : isSerif(f) ? "serif" : "sans-serif";

  const fs = (n: number) => (Math.round(n * 1000) / 1000).toFixed(3);

  // Workspace-tool schools (notion/stripe/linear/...) ship literal brand
  // colors. When present, honor them verbatim — the whole point of these
  // personas is "reproduce that company's visual language." For classical
  // schools, generate OKLCH from hue+persona parameters.
  const useBrand = Boolean(persona.brand_bg || persona.brand_accent);
  const bg = persona.brand_bg ?? `oklch(${bgL} ${persona.color_chroma_bg} ${hue})`;
  const surface = persona.brand_surface ?? (useBrand && persona.brand_bg ? persona.brand_bg : `oklch(${surfL} ${persona.color_chroma_bg} ${hue})`);
  const ink = persona.brand_ink ?? `oklch(${textL} 0 ${hue})`;
  const accent = persona.brand_accent ?? `oklch(0.65 ${chroma} ${hue})`;

  // Compact token block with symbolic comments
  const lines = [":root {"];
  lines.push(`  --hue: ${hue}; --chroma: ${chroma};`);
  lines.push(`  --bg: ${bg}; /* ${SYM.NEQ} pure #fff — see mandate */`);
  lines.push(`  --surface: ${surface};`);
  lines.push(`  --text: ${ink}; --text-2: oklch(${persona.bg_tone === "dark" ? 0.65 : 0.45} 0.02 ${hue});`);
  lines.push(`  --accent: ${accent}; --accent-h: oklch(0.58 ${(chroma + 0.03).toFixed(2)} ${hue});`);
  lines.push(`  --border: oklch(${persona.bg_tone === "dark" ? 0.25 : 0.82} 0.01 ${hue});`);
  lines.push(`  --radius: ${persona.radius}px; --border-w: ${persona.border};`);
  lines.push(`  --fw-d: ${persona.fw_display}; --fw-b: ${persona.fw_body}; --ls-d: ${persona.letter_spacing_display};`);
  lines.push(`  --font-d: '${persona.font_display[0]}', ${fontCat(persona.font_display[0])};`);
  lines.push(`  --font-b: '${persona.font_body[0]}', sans-serif;`);
  lines.push(`  --fs-sm: ${fs(1 / ratio)}rem; --fs-base: 1rem; --fs-lg: ${fs(ratio)}rem; --fs-xl: ${fs(ratio ** 2)}rem; --fs-2xl: ${fs(ratio ** 3)}rem; --fs-3xl: ${fs(ratio ** 4)}rem;`);
  lines.push(`  --sp-1: ${base}px; --sp-2: ${base * 2}px; --sp-3: ${base * 3}px; --sp-4: ${base * 4}px; --sp-6: ${base * 6}px; --sp-8: ${base * 8}px;`);
  lines.push("}");
  return lines.join("\n");
}

// Collect template references from T01/T02 that match the task
function collectTemplateRefs(params: CompileDSLParams, atoms: Map<string, Atom>): string[] {
  const refs: string[] = [];
  const task = params.task.toLowerCase();
  const features = (params.features || []).map(f => f.toLowerCase());
  const keywords = [task, ...features];

  for (const [, a] of atoms) {
    if (a.module !== "T01" && a.module !== "T02") continue;
    if (!a.code) continue;
    // Match template to task by tags or name
    const tags = (a.tags || []).map((t: string) => t.toLowerCase());
    const name = (a.name || "").toLowerCase();
    const matched = keywords.some(k => tags.some(t => t.includes(k) || k.includes(t)) || name.includes(k));
    if (matched || a.priority === 1) {
      const desc = truncSym(a.description || a.name, 35);
      refs.push(`${SYM.TREF}${a.id} ${SYM.ARROW} ${desc}`);
    }
  }
  return refs.slice(0, 5); // max 5 template refs
}

// ════════════════════════════════════════════════════════════
// STEP 7: EMIT — DSL compressed 6-layer output
// ════════════════════════════════════════════════════════════

function emit(
  params: CompileDSLParams,
  persona: PersonaConstraints,
  voice: { tone: string; markers: string[]; pattern: string },
  filtered: { blacklistLines: string[]; whitelistLines: string[]; atomCount: number },
  sequence: { lines: string[]; atomCount: number },
  selection: ClassifiedSelection,
  tokens: string,
  provocations: { lines: string[]; atomCount: number },
  templateRefs: string[],
  edgeIndex: Map<string, Edge[]>,
): string {
  const parts: string[] = [];
  const taskLabel = params.task.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const totalAtoms = filtered.atomCount + sequence.atomCount + selection.atomCount + provocations.atomCount;

  // Build selected atom ID set for relationship rendering
  const selectedIds = new Set<string>();
  for (const a of [...selection.inspiration, ...selection.constraint, ...selection.strategy, ...selection.technique, ...selection.antiPatterns]) {
    selectedIds.add(a.id);
  }

  // ═══ HEADER ═══
  parts.push(`# ${taskLabel} Skill`);
  parts.push(`> persona: ${persona.school} ${SYM.SEP} atoms: ${totalAtoms} ${SYM.SEP} ${SYM.APPROX}375 tok`);
  parts.push("");

  // ═══ LAYER 1: PERSONA + INSPIRATION (narrative — never compressed) ═══
  parts.push(persona.narrative_activation.trim());
  if (persona.narrative_tired_of.length > 0) {
    parts.push(`Tired of: ${persona.narrative_tired_of.join(", ")}.`);
  }
  parts.push("");

  // Creative brief — full prose, never truncated
  for (const a of selection.inspiration) {
    parts.push(renderInspiration(a));
  }
  parts.push(`Voice: ${voice.tone} ${SYM.ARROW} ${voice.pattern}.`);
  parts.push("");

  // ═══ LAYER 2: MANDATES (symbolic constraint checklist) ═══
  parts.push("## Mandates");
  for (const line of filtered.blacklistLines) parts.push(line);
  parts.push("");

  // Fonts — with relationship symbols showing pairing
  parts.push("## Fonts");
  for (const line of filtered.whitelistLines) parts.push(line);
  parts.push("");

  // Additional constraints with graph relations
  if (selection.constraint.length > 0) {
    for (const a of selection.constraint) {
      const rels = getRelationSymbols(a.id, edgeIndex, selectedIds);
      parts.push(renderConstraint(a, rels));
    }
    parts.push("");
  }

  // ═══ LAYER 3: SEQUENCE + STRATEGY ═══
  if (sequence.lines.length > 0) {
    parts.push("## Sequence");
    for (const line of sequence.lines) parts.push(line);
    parts.push("");
  }

  if (selection.strategy.length > 0) {
    parts.push("## Strategy");
    for (const a of selection.strategy) {
      const rels = getRelationSymbols(a.id, edgeIndex, selectedIds);
      parts.push(renderStrategy(a, rels));
    }
    parts.push("");
  }

  // ═══ LAYER 4: TECHNIQUES + ANTI-PATTERNS (with code & relations) ═══
  if (selection.technique.length > 0 || selection.antiPatterns.length > 0) {
    parts.push("## Techniques");
    for (const a of selection.technique) {
      const rels = getRelationSymbols(a.id, edgeIndex, selectedIds);
      parts.push(renderTechnique(a, rels));
    }
    if (selection.antiPatterns.length > 0) {
      parts.push("");
      for (const a of selection.antiPatterns) {
        parts.push(renderAntiPattern(a));
      }
    }
    parts.push("");
  }

  // ═══ LAYER 5: TOKENS (executable CSS) ═══
  parts.push("## Tokens");
  parts.push(tokens);
  parts.push("");

  // ═══ LAYER 5.5: TEMPLATE REFERENCES (on-demand code) ═══
  if (templateRefs.length > 0) {
    parts.push("## Templates");
    parts.push(`Call prime_template(id) for code:`);
    for (const ref of templateRefs) parts.push(ref);
    parts.push("");
  }

  // ═══ LAYER 5.7: A11Y REQUIRED (always injected) ═══
  parts.push(A11Y_REQUIRED);
  parts.push("");

  // ═══ LAYER 6: CHECK (provocations) ═══
  if (provocations.lines.length > 0) {
    parts.push("## Check");
    for (const line of provocations.lines) parts.push(line);
    // Add standard symbolic checks — expanded with DM Sans and Plus Jakarta Sans
    parts.push(`${SYM.QUESTION} font ${SYM.NEQ} ${SYM.SET_L}${fontBlacklistSet(SYM.SEP)}${SYM.SET_R} ${SYM.ARROW} pass`);
    parts.push(`${SYM.QUESTION} bg ${SYM.NEQ} #fff ${SYM.ARROW} pass`);
    parts.push(`${SYM.QUESTION} skip-link present ${SYM.ARROW} pass`);
    parts.push(`${SYM.QUESTION} prefers-reduced-motion handled ${SYM.ARROW} pass`);
    parts.push(`${SYM.QUESTION} :focus-visible on all interactives ${SYM.ARROW} pass`);
    parts.push(`${SYM.QUESTION} memorable signature present, not verbatim clone ${SYM.ARROW} pass`);
    parts.push("");
  }

  // ═══ CLOSING ═══
  parts.push(persona.narrative_closing.trim());

  // No post-emit sanitization: persona-aware blacklist filtering already
  // happens in filterConstraints(). Applying sanitizeFonts() over the whole
  // output erases blacklisted font names even when an atom quotes them as
  // a *counter-example* (e.g. "Avoid generic fonts (Arial, Inter)" → "( , )").
  return parts.join("\n");
}

// ════════════════════════════════════════════════════════════
// Provocations (unchanged)
// ════════════════════════════════════════════════════════════

function selectProvocations(
  params: CompileDSLParams, persona: PersonaConstraints, atoms: Map<string, Atom>,
): { lines: string[]; atomCount: number } {
  const lines: string[] = [];
  const q01 = getAtomsByModule(atoms, "Q01");
  if (q01.length === 0) {
    lines.push(`${SYM.QUESTION} If you remove the boldest decision, what's left worth remembering?`);
    lines.push(`${SYM.QUESTION} Could someone identify the ${persona.school} school from this output?`);
    return { lines, atomCount: 0 };
  }

  const scored: { atom: Atom; score: number }[] = [];
  for (const a of q01) {
    let score = 0;
    const pm = (a.applies_to_persona || []) as string[];
    const tm = (a.applies_to_task || []) as string[];
    if (pm.includes(persona.school)) score += 3;
    else if (pm.includes("all") || pm.length === 0) score += 1;
    if (tm.includes(params.task)) score += 3;
    else if (tm.includes("all") || tm.length === 0) score += 1;
    if (score > 0) scored.push({ atom: a, score });
  }
  scored.sort((a, b) => b.score - a.score);
  for (const { atom } of scored.slice(0, 3)) {
    lines.push(`${SYM.QUESTION} ${atom.question || atom.claim || atom.statement || atom.name}`);
  }
  return { lines, atomCount: Math.min(scored.length, 3) };
}

// ════════════════════════════════════════════════════════════
// compileDSL — main entry (7-step pipeline v4)
// ════════════════════════════════════════════════════════════

export function compileDSL(
  params: CompileDSLParams,
  atoms: Map<string, Atom>,
  tagIndex: Map<string, Set<string>>,
  edges: Edge[],
): string {
  const persona = resolve(params, atoms);
  const voice = resolveVoice(params, persona, atoms);
  const filtered = filterConstraints(persona, atoms);
  const sequence = route(params, persona, atoms);
  const selection = selectByQuota(params, persona, atoms, tagIndex, edges);
  const tokens = renderTokens(params, persona);
  const provocations = selectProvocations(params, persona, atoms);
  const templateRefs = collectTemplateRefs(params, atoms);
  const edgeIndex = buildEdgeIndex(edges);
  return emit(params, persona, voice, filtered, sequence, selection, tokens, provocations, templateRefs, edgeIndex);
}

// ────────────────────────────────────────────────────────────
// compileTemplate (unchanged)
// ────────────────────────────────────────────────────────────

export function compileTemplate(params: CompileTemplateParams, atoms: Map<string, Atom>): string {
  const atom = getAtom(atoms, params.id);
  if (!atom) {
    const available = getAtomsByModule(atoms, "T01").concat(getAtomsByModule(atoms, "T02")).map(a => a.id);
    return `Template "${params.id}" not found.\nAvailable: ${available.join(", ") || "(none)"}`;
  }
  const lines: string[] = [`# Template: ${atom.name}`, `> ${atom.id}`, ""];
  let code = atom.code as string | undefined;
  if (code) {
    if (params.variables) { for (const [k, v] of Object.entries(params.variables)) code = code.replace(new RegExp(`<${k}>|\\$\\{${k}\\}|\\{\\{${k}\\}\\}`, "gi"), String(v)); }
    lines.push(code);
  } else {
    let c = atom.claim || atom.statement || atom.concept || atom.description || "";
    if (params.variables) { for (const [k, v] of Object.entries(params.variables)) c = c.replace(new RegExp(`<${k}>|\\$\\{${k}\\}|\\{\\{${k}\\}\\}`, "gi"), String(v)); }
    lines.push(c);
  }
  return lines.join("\n");
}

// ────────────────────────────────────────────────────────────
// Legacy compilers (preserved for search/mandate/checklist)
// ────────────────────────────────────────────────────────────

export function compileOne(atom: Atom): string {
  const lines: string[] = [];
  switch (atom.subtype) {
    case "mandate": case "convention":
      lines.push(`${SYM.MUST} **${atom.claim || atom.statement || atom.name}**`);
      if (atom.rationale) lines.push(`   ${SYM.FROM} ${atom.rationale}`);
      break;
    case "prohibition":
      lines.push(`${SYM.NEVER} **${atom.anti_pattern || atom.name}**`);
      if (atom.use_instead) lines.push(`   ${SYM.ARROW} instead: ${atom.use_instead}`);
      break;
    case "threshold":
      lines.push(`${SYM.RULE} **${atom.name}**`);
      break;
    case "principle":
      lines.push(`${SYM.RULE} **${atom.claim || atom.statement || atom.principle || atom.name}**`);
      if (atom.rationale) lines.push(`   ${SYM.FROM} ${atom.rationale}`);
      break;
    case "heuristic":
      lines.push(`${SYM.RULE} **${atom.rule_of_thumb || atom.name}**`);
      if (atom.situation) lines.push(`   ${SYM.IF_THEN} ${atom.situation}`);
      break;
    case "anti-pattern":
      lines.push(`${SYM.NEVER} **${atom.pattern_name || atom.name}**`);
      if (atom.remedy) lines.push(`   ${SYM.ARROW} fix: ${atom.remedy}`);
      break;
    default:
      lines.push(`**${atom.name}**`);
      const body = atom.claim || atom.statement;
      if (body) lines.push(`   ${body}`);
  }
  lines.push(`   ${SYM.REF}${atom.id}`);
  return lines.join("\n");
}

export function compileAtoms(atoms: Atom[], title: string): string {
  if (!atoms.length) return `No results for: "${title}"`;
  const parts = [`## ${title}\n`];
  for (const a of atoms) parts.push(compileOne(a));
  parts.push("---", `${atoms.length} atoms.`);
  return parts.join("\n");
}

export function compileMandates(atoms: Map<string, Atom>): string {
  const parts = [`${SYM.MUST} Hard Mandates\n`, "**Non-negotiable. Violating one = task failure.**\n"];
  const IDS = ["@M10/anti-generic-ai-aesthetics-mandate", "@M10/unforgettable-test", "@M10/creative-confidence-activation",
    "@M10/commit-to-bold-aesthetic-direction", "@M10/no-convergence-across-generations", "@M01/font-blacklist-ai-slop",
    "@M02/no-pure-white-background", "@M10/aesthetic-direction-menu"];
  let i = 1;
  for (const id of IDS) { const a = atoms.get(id); if (a) { parts.push(`${i}. ${SYM.MUST} ${a.claim || a.statement || a.name}`); i++; } }
  parts.push("");
  parts.push(`## Before coding:`);
  parts.push(`${SYM.MUST} Aesthetic direction? Pick ONE extreme.`);
  parts.push(`${SYM.MUST} Display font? ${SYM.NEQ} ${SYM.SET_L}${fontBlacklistSet(SYM.SEP)}${SYM.SET_R}`);
  parts.push(`${SYM.QUESTION} 30-second memory hook?`);
  parts.push(`${SYM.QUESTION} Memorable signature, not verbatim clone?`);
  parts.push("", "Don't hold back.");
  return parts.join("\n");
}

const CHECKLISTS: Record<string, string> = {
  "admin-dashboard": `# Admin Dashboard Checklist
## Design
${SYM.MUST} aesthetic direction committed
${SYM.MUST} display font named ${SYM.COND_L}${SYM.NEVER} ${FONT_BLACKLIST_PIPE}${SYM.COND_R}
${SYM.MUST} body font named ${SYM.COND_L}${SYM.NEVER} blacklist${SYM.COND_R}
${SYM.MUST} brand color ${SYM.NEQ} Tailwind default
${SYM.NEQ} bg #ffffff
${SYM.RULE} modular scale ratio set (1.25${SYM.SEP}1.333${SYM.SEP}1.5)
${SYM.RULE} OKLCH palette generated from hue parameter
${SYM.RULE} border-radius intentional (persona-driven, not rounded-2xl default)
${SYM.RULE} stagger animation on page load
${SYM.RULE} background depth (gradient${SYM.SEP}texture${SYM.SEP}grain)
## A11y
${SYM.MUST} skip-link present
${SYM.MUST} prefers-reduced-motion handled
${SYM.MUST} :focus-visible on all interactives
${SYM.MUST} WCAG AA contrast ${SYM.GTE} 4.5:1
${SYM.MUST} aria-current="page" on active nav
## Engineering
${SYM.MUST} all nav links route to real pages
${SYM.MUST} data tables: sortable OR filterable OR searchable
${SYM.MUST} dark mode: complete token switch + localStorage + system pref
${SYM.MUST} dark mode: flash prevention (inline script in <head>)
${SYM.RULE} charts: interactive tooltip + time range toggle
${SYM.RULE} forms: client-side validation + submit feedback
${SYM.QUESTION} 30-second memory hook named?`,

  "marketing-page": `# Marketing Page Checklist
## Design
${SYM.MUST} hero concept = unforgettable
${SYM.MUST} display font = dramatic ${SYM.COND_L}${SYM.NEVER} ${FONT_BLACKLIST_PIPE}${SYM.COND_R}
${SYM.NEQ} bg #ffffff
${SYM.RULE} single CTA above fold
${SYM.RULE} scroll-triggered reveals (IntersectionObserver)
${SYM.RULE} background atmosphere (gradient${SYM.SEP}texture${SYM.SEP}grain)
## A11y
${SYM.MUST} skip-link present
${SYM.MUST} prefers-reduced-motion handled
${SYM.MUST} :focus-visible on all interactives
${SYM.MUST} WCAG AA contrast ${SYM.GTE} 4.5:1
## Engineering
${SYM.MUST} mobile hamburger: ESC close + click-outside + aria-expanded
${SYM.MUST} all sections present (hero${SYM.SEP}features${SYM.SEP}pricing${SYM.SEP}testimonials${SYM.SEP}footer)
${SYM.RULE} pricing toggle: monthly/annual with animated transition
${SYM.RULE} interactive demo in hero (not just static image)
${SYM.RULE} newsletter form with submit feedback
${SYM.QUESTION} 30-second memory hook?`,

  "content-site": `# Content Site Checklist
${SYM.RULE} reading-optimized font pairing
${SYM.RULE} line-length: 55${SYM.ARROW}65ch
${SYM.RULE} body line-height: 1.5${SYM.ARROW}1.65
${SYM.NEQ} bg #ffffff
${SYM.MUST} WCAG AA contrast ${SYM.GTE} 4.5:1`,

  "data-viz": `# Data Viz Checklist
${SYM.RULE} categorical palette ${SYM.LTE} 8 hues
${SYM.MUST} color-blind safe
${SYM.RULE} tabular-nums
${SYM.RULE} every chart has title
${SYM.MUST} WCAG AA contrast ${SYM.GTE} 4.5:1`,

  "mobile-app": `# Mobile App Checklist
## Design
${SYM.MUST} aesthetic direction committed (${SYM.NEVER} generic fitness/finance template)
${SYM.MUST} display font ${SYM.COND_L}${SYM.NEVER} ${FONT_BLACKLIST_PIPE}${SYM.COND_R}
${SYM.RULE} OKLCH palette from hue parameter
${SYM.RULE} border-radius persona-driven
## A11y
${SYM.MUST} skip-link present
${SYM.MUST} prefers-reduced-motion handled
${SYM.MUST} :focus-visible on all interactives
${SYM.RULE} touch targets ${SYM.GTE} 44px (padding or min-height)
${SYM.MUST} VoiceOver${SYM.SEP}TalkBack: aria-label on all controls
## Engineering
${SYM.MUST} bottom nav actually switches pages (real routing, not component toggle)
${SYM.MUST} safe-area-inset: env() on header + bottom nav
${SYM.MUST} viewport: width=device-width, initial-scale=1, viewport-fit=cover
${SYM.RULE} SVG ring/chart animations: IntersectionObserver triggered
${SYM.RULE} pull-to-refresh hint or gesture support
${SYM.NEVER} emoji as icons (use Lucide${SYM.SEP}Phosphor${SYM.SEP}Heroicons)`,

  "form-wizard": `# Form Checklist
${SYM.RULE} labels above inputs
${SYM.RULE} inline validation on blur
${SYM.RULE} progress indicator
${SYM.MUST} aria-required on mandatory fields`,

  "design-system": `# Design System Checklist
${SYM.RULE} three-layer tokens (primitive ${SYM.ARROW} semantic ${SYM.ARROW} component)
${SYM.RULE} dark mode via remapping ${SYM.COND_L}${SYM.NEVER} invert${SYM.COND_R}
${SYM.RULE} all states per component
${SYM.MUST} keyboard + ARIA for interactives`,

  "community-site": `# Community Site Checklist
${SYM.MUST} aesthetic direction committed
${SYM.MUST} display font ${SYM.NEQ} ${SYM.SET_L}${fontBlacklistSet(SYM.SEP)}${SYM.SET_R}
${SYM.NEQ} bg #ffffff
${SYM.RULE} user card component
${SYM.RULE} discussion${SYM.SEP}forum layout
${SYM.RULE} notification system
${SYM.RULE} search with filters
${SYM.RULE} stagger animation on feed load
${SYM.RULE} background depth (gradient${SYM.SEP}texture)
${SYM.MUST} WCAG AA contrast ${SYM.GTE} 4.5:1
${SYM.QUESTION} 30-second memory hook?`,
};

export function compileChecklist(taskType: string, atoms: Map<string, Atom>, tagIndex: Map<string, Set<string>>, edges: Edge[]): string {
  return CHECKLISTS[taskType] || `No checklist for "${taskType}". Available: ${Object.keys(CHECKLISTS).join(", ")}`;
}
