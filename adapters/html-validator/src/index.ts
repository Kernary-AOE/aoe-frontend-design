/**
 * @module html-validator
 *
 * `HTML + intent + contract -> ValidationReport`. Plan §4.5 `adapters/html-validator/`.
 *
 * ── Why this is a rewrite and not a move ─────────────────────────────────────
 *
 * The donor is `packages/validator` (318 lines). Three of its four files import
 * something a domain adapter may not have:
 *
 *   - `index.ts:6-7`   `@aoe/intent`, `@aoe/composition` (root packages)
 *   - `l2-semantic.ts:3` `../../compiler/src/ai-client.ts` (root package src reach)
 *   - `l1/l2/l3`       `readFileSync` on an `htmlPath` argument
 *
 * The type imports are replaced by locally declared domain contracts, which is
 * what §15.4 requires: "composition contract" and "register school" are frontend
 * vocabulary, so the domain declares them and the engine never sees them. The LLM
 * import becomes the same injected port the intent classifier uses.
 *
 * The `fs` change is the one behavioural improvement, and it is deliberate. Every
 * donor check took a *path* and read it itself, three times for one report
 * (`l1-structure.ts:1`, `l2-semantic.ts:1`, `l3-composition.ts:1`), which made all
 * three untestable without a temp file and made the report non-deterministic if the
 * file changed between reads. Here the checks take the HTML *text* and the caller
 * reads the file once. `aoe_design_validate` still accepts `html_path`, so the
 * frozen tool schema is unchanged (W9-A §1).
 */

import type { DesignIntent } from "../../design-ranker/src/intent.ts";

/** The seam `l2-semantic.ts:3` filled with a direct `callAI` import. */
export interface AestheticJudgeModel {
  /** Return the judge's raw text. Return "" for a transport failure rather than throwing. */
  judge(prompt: string): Promise<string>;
}

/**
 * The composition contract the donor imported as `MergedContract` from
 * `@aoe/composition`. Only the four members `checkL3Composition` actually
 * reads are declared: the donor's type also carried `source_atoms`,
 * `motion_prescriptions` and `conflicts`, and `l3-composition.ts` never touched
 * them. Declaring fields no check reads would promise enforcement that does not
 * exist.
 *
 * `must_include`/`must_avoid` are arrays, not the donor's `Set`. The donor's own
 * MCP call site built `Set`s and then read them through `(contract as any)`
 * (`mcp-server/index.ts:962-963`, `l3-composition.ts:216,235`) — the `any` was
 * load-bearing, because a `Set` is not iterable as the declared type. An array is
 * what the code always wanted.
 */
export interface DesignContract {
  readonly typography_required: Readonly<Record<string, string>>;
  readonly color_required: Readonly<Record<string, string>>;
  readonly must_include: readonly string[];
  readonly must_avoid: readonly string[];
}

export const EMPTY_CONTRACT: DesignContract = {
  typography_required: {},
  color_required: {},
  must_include: [],
  must_avoid: [],
};

export interface StructureResult {
  readonly pass: boolean;
  readonly issues: readonly string[];
}

export interface AestheticResult {
  readonly pass: boolean;
  readonly alignment_score: number;
  readonly issues: readonly string[];
  /** True when the check could not run. `pass` is true in that case, as in the donor. */
  readonly skipped?: boolean;
}

export interface CompositionResult {
  readonly pass: boolean;
  readonly honored: readonly string[];
  readonly violated: readonly string[];
  readonly unverifiable?: readonly string[];
}

/** The donor's `ValidationReport` (`packages/validator/src/types.ts`), key for key. */
export interface ValidationReport {
  readonly pass: boolean;
  readonly l1: StructureResult;
  readonly l2: AestheticResult;
  readonly l3: CompositionResult;
  readonly feedback: string;
}

// ── L1: structure and a11y (l1-structure.ts:4-36) ───────────────────────────

/** `l1-structure.ts:8-15`, in donor order. */
const REQUIRED_MARKUP: readonly { readonly pattern: RegExp; readonly issue: string }[] = [
  { pattern: /<html[^>]*>/i, issue: "missing <html> tag" },
  { pattern: /<title>/i, issue: "missing <title>" },
  { pattern: /<meta[^>]*viewport/i, issue: "missing viewport meta" },
  { pattern: /<meta[^>]*charset/i, issue: "missing charset meta" },
  { pattern: /<h1/i, issue: "missing h1" },
];

export function checkStructure(html: string): StructureResult {
  const issues: string[] = [];
  for (const entry of REQUIRED_MARKUP) if (!entry.pattern.test(html)) issues.push(entry.issue);

  // `l1-structure.ts:19-23` — the count is `n/total`, so both are needed.
  let images = 0;
  let missingAlt = 0;
  for (const match of html.matchAll(/<img[^>]*>/gi)) {
    images += 1;
    if (!/alt\s*=/i.test(match[0])) missingAlt += 1;
  }
  if (missingAlt > 0) issues.push(`${missingAlt}/${images} <img> missing alt`);

  // `l1-structure.ts:29-35` — one issue for the whole document, not one per input.
  for (const match of html.matchAll(/<input[^>]*>/gi)) {
    if (!/aria-label\s*=/i.test(match[0]) && !/<label[^>]*for/i.test(html)) {
      issues.push("input may lack label/aria-label");
      break;
    }
  }

  return { pass: issues.length === 0, issues };
}

// ── L3: composition contract (l3-composition.ts:22-142) ─────────────────────

/**
 * `l3-composition.ts:22-52` ATOM_SIGNATURES, in donor order — the first entry
 * whose `match` hits decides the verdict, so order is semantic.
 */
const ATOM_SIGNATURES: readonly { readonly match: RegExp; readonly signatures: readonly RegExp[] }[] = [
  { match: /pattern-toast/i, signatures: [/role=["']?(alert|status)["']?/i, /class=["'][^"']*toast/i, /aria-live=["'](polite|assertive)["']/i] },
  { match: /pattern-data-table/i, signatures: [/<table\b/i, /role=["']table["']/i, /class=["'][^"']*data-table/i] },
  { match: /pattern-log-viewer|pattern-virtual-list/i, signatures: [/font-family:[^;]*(mono|JetBrains|Menlo|Consolas|Geist Mono|IBM Plex Mono)/i, /class=["'][^"']*log/i] },
  { match: /pattern-kanban|pattern-drag/i, signatures: [/draggable=["']true["']/i, /class=["'][^"']*(kanban|column|board|card)/i] },
  { match: /pattern-modal|method-modal|pattern-dialog/i, signatures: [/role=["']dialog["']/i, /aria-modal/i, /class=["'][^"']*modal/i] },
  { match: /pattern-hero/i, signatures: [/<section[^>]+(hero|banner)/i, /class=["'][^"']*hero/i] },
  { match: /pattern-pricing|pattern-tier/i, signatures: [/class=["'][^"']*(pricing|tier|plan)/i, /\$\d|\¥\d|\€\d/] },
  { match: /pattern-table-of-contents|pattern-toc/i, signatures: [/<nav[^>]+(toc|table-of-contents)/i, /aria-label=["'][^"']*(contents|toc)/i] },
  { match: /pattern-reading-progress|pattern-scroll-progress/i, signatures: [/scroll(Y|Top)|window\.scroll/i, /progress/i] },
  { match: /pattern-skeleton|pattern-shimmer/i, signatures: [/class=["'][^"']*(skeleton|shimmer)/i, /@keyframes\s+(skeleton|shimmer)/i] },
  { match: /pattern-fade|pattern-scroll-reveal|pattern-stagger/i, signatures: [/@keyframes\s+(fadeIn|fade-in|reveal|stagger)/i, /opacity\s*:\s*0/i, /IntersectionObserver/i] },
  { match: /principle-typography-hierarchy|rule-line-length/i, signatures: [/<h1\b[\s\S]*<h2\b/i, /max-width:\s*\d+(ch|rem|px)/i] },
  { match: /fact-monospace|constraint-monospace/i, signatures: [/font-family:[^;]*(mono|JetBrains|Menlo|Consolas|Geist Mono|IBM Plex Mono)/i] },
  { match: /pattern-interaction-states/i, signatures: [/:focus(-visible)?\s*\{/i, /:hover\s*\{/i, /:active\s*\{/i] },
];

/** `l3-composition.ts:114` the kind prefixes stripped before noun matching. */
const KIND_PREFIX =
  /^(pattern|principle|rule|method|fact|constraint|template|persona|anti-pattern|example|counter-example|check|metric|tool|step|term|value|provocation|tradeoff|category|taxonomy|voice|scope|source|feedback|type|transform)-/;

/** `l3-composition.ts:56-59` — `@community/pattern-toast-stack` -> `pattern-toast-stack`. */
export function atomTail(id: string): string {
  const slash = id.lastIndexOf("/");
  return slash >= 0 ? id.slice(slash + 1) : id;
}

export type AtomVerdict = "honored" | "violated" | "unverifiable";

/** `l3-composition.ts:61-125` unchanged in behaviour. */
export function checkAtomSignature(atomId: string, html: string): AtomVerdict {
  const tail = atomTail(atomId);
  for (const entry of ATOM_SIGNATURES) {
    if (!entry.match.test(tail)) continue;
    return entry.signatures.some(signature => signature.test(html)) ? "honored" : "violated";
  }
  const words = tail.replace(KIND_PREFIX, "").split(/-+/).filter(word => word.length >= 4);
  if (words.length === 0) return "unverifiable";
  const haystack = html.toLowerCase();
  const hits = words.filter(word => haystack.includes(word.toLowerCase())).length;
  if (hits >= Math.max(1, Math.ceil(words.length / 2))) return "honored";
  // Deliberately not `violated`: a principle is about how code is written, not
  // which nouns appear (`l3-composition.ts:122-124`).
  return "unverifiable";
}

function literalRegExp(value: string): RegExp {
  return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

export function checkComposition(html: string, contract: DesignContract): CompositionResult {
  const honored: string[] = [];
  const violated: string[] = [];
  const unverifiable: string[] = [];

  // `l3-composition.ts:135-144` — a `|`-separated stack is honored if ANY font matches.
  for (const [field, value] of Object.entries(contract.typography_required)) {
    const fonts = String(value).split("|").map(part => part.trim()).filter(part => part.length > 0);
    if (fonts.some(font => literalRegExp(font).test(html))) honored.push(`typography.${field}: ${value}`);
    else violated.push(`typography.${field}: expected "${value}", not found in HTML`);
  }

  // `l3-composition.ts:147-155` — a non-hex colour that is absent is neither
  // honored nor violated in the donor, and that asymmetry is preserved: a value
  // like "warm neutral ramp" is prose, and failing HTML for not containing it
  // would be a false negative.
  for (const [field, value] of Object.entries(contract.color_required)) {
    const raw = String(value);
    if (raw.length === 0) continue;
    if (html.includes(raw) || literalRegExp(raw).test(html)) honored.push(`color.${field}: ${raw}`);
    else if (/#[0-9a-f]{3,8}/i.test(raw)) violated.push(`color.${field}: expected "${raw}", not found`);
  }

  for (const atomId of contract.must_include) {
    const verdict = checkAtomSignature(atomId, html);
    if (verdict === "honored") honored.push(`must_include: ${atomId}`);
    else if (verdict === "violated") violated.push(`must_include: ${atomId} — signature not found in HTML`);
    else unverifiable.push(`must_include: ${atomId}`);
  }

  // `l3-composition.ts:230-238` — for must_avoid a found signature is the violation.
  for (const atomId of contract.must_avoid) {
    if (checkAtomSignature(atomId, html) === "honored") {
      violated.push(`must_avoid: ${atomId} — signature WAS found in HTML (should be absent)`);
    } else {
      honored.push(`must_avoid: ${atomId}`);
    }
  }

  return { pass: violated.length === 0, honored, violated, unverifiable };
}

// ── L2: aesthetic alignment (l2-semantic.ts:29-107) ─────────────────────────

/** `l2-semantic.ts:44` — the prompt cap. */
export const AESTHETIC_HTML_CAP = 20000;
/** `l2-semantic.ts:63` — the pass threshold. */
export const AESTHETIC_PASS_SCORE = 0.7;

export function buildAestheticPrompt(html: string, intent: DesignIntent): string {
  const sample = html.length > AESTHETIC_HTML_CAP ? `${html.slice(0, AESTHETIC_HTML_CAP)}\n...[truncated]` : html;
  const targetSchool = intent.register_candidates[0]?.school ?? "unknown";
  return `You are a frontend design judge. Look at this HTML output:

\`\`\`html
${sample}
\`\`\`

Target aesthetic: ${targetSchool} school
Vibe descriptors: ${intent.vibe.join(", ")}
Motion priority: ${intent.motion_priority}
Density: ${intent.density}

Score 0.0-1.0 how well the HTML matches the target aesthetic. Reply ONLY in this JSON format:
{"alignment_score": 0.85, "issues": ["specific issue 1", "specific issue 2"]}

If alignment_score >= ${AESTHETIC_PASS_SCORE}, the design is acceptable for the target. Below ${AESTHETIC_PASS_SCORE} is failure.`;
}

const SKIPPED: AestheticResult = { pass: true, alignment_score: 1.0, issues: [], skipped: true };

/**
 * With no judge this returns the donor's no-key result exactly
 * (`l2-semantic.ts:35-42`): pass, score 1.0, `skipped: true`. The donor's comment
 * is the reason, and it still holds — a check that cannot run must not fail the
 * report, or the agent loop retries forever against a check that will never pass.
 */
export async function checkAesthetic(
  html: string,
  intent: DesignIntent,
  options: { readonly model?: AestheticJudgeModel } = {},
): Promise<AestheticResult> {
  const { model } = options;
  if (model === undefined) return SKIPPED;

  let response = "";
  try {
    response = await model.judge(buildAestheticPrompt(html, intent));
  } catch (error) {
    return { ...SKIPPED, issues: [`L2 judge threw — skipped: ${error instanceof Error ? error.message : String(error)}`] };
  }
  if (response.trim().length === 0) {
    return { ...SKIPPED, issues: ["L2 LLM call returned empty (network/quota?) — skipped"] };
  }

  let parsed: unknown;
  try {
    const match = response.match(/\{[\s\S]*\}/);
    if (match === null) return { ...SKIPPED, issues: [`L2 response not JSON — skipped: ${response.slice(0, 200)}`] };
    parsed = JSON.parse(match[0]);
  } catch {
    return { ...SKIPPED, issues: [`L2 response not JSON — skipped: ${response.slice(0, 200)}`] };
  }

  const record = (parsed !== null && typeof parsed === "object" ? parsed : {}) as Record<string, unknown>;
  // `l2-semantic.ts:104` used `Number(x) || 0`, so a NaN or an absent score is 0.
  const score = Number(record.alignment_score);
  const alignment_score = Number.isFinite(score) ? score : 0;
  const issues = Array.isArray(record.issues) ? record.issues.filter((item): item is string => typeof item === "string") : [];
  return { pass: alignment_score >= AESTHETIC_PASS_SCORE, alignment_score, issues };
}

// ── Feedback (feedback-builder.ts:3-19) ─────────────────────────────────────

export function buildRetryPrompt(report: Omit<ValidationReport, "feedback">): string {
  const lines = ["Your HTML did not pass validation. Please fix:"];
  if (!report.l1.pass) {
    lines.push("\n## Structure / a11y issues:");
    for (const issue of report.l1.issues) lines.push(`- ${issue}`);
  }
  if (!report.l2.pass) {
    lines.push(`\n## Aesthetic alignment (score ${report.l2.alignment_score.toFixed(2)} / ${AESTHETIC_PASS_SCORE.toFixed(2)} required):`);
    for (const issue of report.l2.issues) lines.push(`- ${issue}`);
  }
  if (!report.l3.pass) {
    lines.push("\n## Composition contract violations:");
    for (const violation of report.l3.violated) lines.push(`- ${violation}`);
  }
  lines.push("\n\nRewrite index.html addressing the above. Keep what works.");
  return lines.join("\n");
}

export interface ValidateHtmlRequest {
  readonly html: string;
  readonly intent: DesignIntent;
  readonly contract?: DesignContract;
  readonly model?: AestheticJudgeModel;
}

/** The donor's `validate()` (`packages/validator/src/index.ts:13-23`), same report shape. */
export async function validateHtml(request: ValidateHtmlRequest): Promise<ValidationReport> {
  const { html, intent, contract = EMPTY_CONTRACT, model } = request;
  const l1 = checkStructure(html);
  const l2 = await checkAesthetic(html, intent, model === undefined ? {} : { model });
  const l3 = checkComposition(html, contract);
  const pass = l1.pass && l2.pass && l3.pass;
  return { pass, l1, l2, l3, feedback: pass ? "OK" : buildRetryPrompt({ pass, l1, l2, l3 }) };
}
