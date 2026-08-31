/**
 * @module intent-classifier
 *
 * `brief -> DesignIntent`. Plan §4.5 `adapters/intent-classifier/`.
 *
 * ── Why this is a rewrite and not a move ─────────────────────────────────────
 *
 * The donor is `packages/intent/src/classify.ts` (372 lines with its types) in
 * the parent repo. Its first import is
 * `../../compiler/src/ai-client.ts` — a *reach into another root package's src
 * directory*, not even through its package name. Under plan §15.4
 * (`任何 domain/model/corpus → engine/sdk`, and nothing else) a domain adapter may
 * not import a root `packages/` unit at all, and the engine has no LLM client to
 * import instead — deliberately: an LLM call is an out-of-process effect, which
 * plan §11/§12 route through a declared provider, not through a library the
 * classifier links against.
 *
 * So the LLM is inverted into a port. `BriefCompletionModel` is supplied by the
 * caller (the MCP layer, a test, or eventually a `plugin-host` executor). When no
 * model is supplied the classifier is fully deterministic. That is not a
 * degradation of the donor's behaviour — the donor did exactly this whenever
 * `ANTHROPIC_API_KEY`/`DEEPSEEK_API_KEY` were unset, which W9-A §1 measured to be
 * the production configuration. What changes is that the fallback is now a
 * declared seam instead of a caught exception around a hard link.
 *
 * ── What is data and what is mechanism ──────────────────────────────────────
 *
 * The vocabularies and keyword rules below are transcribed from the donor with
 * per-block provenance (`classify.ts:<line>`). They are *data* and belong in the
 * Model Package, next to `model/retrieval/six-axis.yaml`. They are still here
 * because `model-schema` has no definition kind that can hold a vocabulary: the
 * only schema-validated home would be a `type` definition's `extensions`, which
 * would make the classifier's rule table a side-car of an unrelated type. That is
 * a real gap and it is reported rather than papered over — see the lane report.
 */

import type { DesignIntent, RegisterCandidate } from "../../design-ranker/src/intent.ts";

/** The seam the donor filled with a direct `callAI` import. */
export interface BriefCompletionModel {
  /** Return the model's raw text. Implementations must not throw for a transport failure; return "" instead. */
  complete(prompt: string): Promise<string>;
}

export interface ClassifyOptions {
  readonly model?: BriefCompletionModel;
  /** Surface why a model answer was discarded. Defaults to dropping the note. */
  readonly report?: (code: string, message: string) => void;
}

// ── Vocabulary (classify.ts:16-66) ──────────────────────────────────────────

/** `classify.ts:16-49` VALID_SCHOOLS, in donor order. */
export const DESIGN_SCHOOLS = [
  "brutalist", "dense-pragmatist", "editorial", "magazine-editorial", "notion-warm",
  "stripe-fintech", "swiss-modernist", "tokyo-minimal", "vercel-clean", "warm-institutional",
  "linear", "stripe", "apple", "airbnb", "notion", "vercel", "posthog", "raycast", "sentry",
  "mintlify", "spotify", "figma", "framer", "intercom", "sanity", "replicate", "superhuman",
  "warp", "coinbase", "toss", "supabase",
] as const;

/** `classify.ts:51-57` VALID_TASK_TYPES. */
export const DESIGN_TASK_TYPES = [
  "marketing-landing", "content", "product-ui", "interaction", "dev-tool",
] as const;

/** `classify.ts:61-66` VALID_SUB_TYPES. */
export const DESIGN_SUB_TYPES = [
  "waitlist", "pricing-consumer", "pricing-b2b", "landing-saas", "landing-creative",
  "404", "coming-soon", "comparison",
  "blog-article", "doc-page", "podcast-episode", "about-page", "changelog",
  "dashboard", "data-table", "settings", "kanban-mobile", "signup-wizard",
  "order-confirm", "log-viewer", "file-explorer",
  "toast-demo", "modal", "form-wizard", "notification-center", "command-palette",
  "llm-playground", "prompt-editor", "analytics-realtime", "api-explorer",
] as const;

export const MOTION_PRIORITIES = ["low", "med", "high"] as const;
export type MotionPriority = (typeof MOTION_PRIORITIES)[number];
export const DENSITIES = ["tight", "comfy", "loose"] as const;

// ── Heuristic rule tables (classify.ts:196-303) ─────────────────────────────

interface TaskRule {
  readonly pattern: RegExp;
  readonly task_type: string;
  readonly sub_type: string;
}

/** `classify.ts:201-224`, in donor order — the donor used an if/else-if chain, so order is semantic. */
const TASK_RULES: readonly TaskRule[] = [
  { pattern: /waitlist|等待|邮件订阅|subscribe|sign.?up|early.?access|early.?adopter/, task_type: "marketing-landing", sub_type: "waitlist" },
  { pattern: /pricing|定价|价格|plan|tier|subscription|付费/, task_type: "marketing-landing", sub_type: "pricing" },
  { pattern: /blog|article|post|文章|内容|editorial/, task_type: "content", sub_type: "article" },
  { pattern: /dashboard|看板|管理|admin|analytics|数据/, task_type: "product-ui", sub_type: "dashboard" },
  { pattern: /kanban|task|todo|project|项目/, task_type: "product-ui", sub_type: "kanban" },
  { pattern: /cli|terminal|dev.?tool|developer|开发者|sdk|api/, task_type: "dev-tool", sub_type: "cli" },
  { pattern: /animation|motion|交互|interaction|gesture/, task_type: "interaction", sub_type: "animation" },
];

/** `classify.ts:228-230`. `comfy` is the default. */
const DENSITY_RULES: readonly { readonly pattern: RegExp; readonly density: DesignIntent["density"] }[] = [
  { pattern: /简单|simple|minimal|clean|轻量|light/, density: "loose" },
  { pattern: /dense|compact|tight|紧凑|信息量大|data.?heavy/, density: "tight" },
];

/** `classify.ts:233-235`. Both are tested and the later match wins, so this is ordered low -> high. */
const MOTION_RULES: readonly { readonly pattern: RegExp; readonly motion: MotionPriority }[] = [
  { pattern: /animation|motion|animated|动画|过渡|transition/, motion: "med" },
  { pattern: /heavy.?animation|rich.?motion|复杂动画|微交互/, motion: "high" },
];

/** `classify.ts:238-243`. Every match contributes, so this is additive, not first-wins. */
const VIBE_RULES: readonly { readonly pattern: RegExp; readonly vibe: readonly string[] }[] = [
  { pattern: /简单|simple|minimal|clean/, vibe: ["minimal", "clean"] },
  { pattern: /warm|温暖|friendly|approachable/, vibe: ["warm", "approachable"] },
  { pattern: /professional|专业|enterprise/, vibe: ["professional"] },
  { pattern: /modern|现代|sleek/, vibe: ["modern"] },
];
/** `classify.ts:244`. */
const VIBE_DEFAULT = ["clean", "minimal"] as const;

/** `classify.ts:247-252`, first-wins chain with `consumer-saas` as the default. */
const DOMAIN_RULES: readonly { readonly pattern: RegExp; readonly domain: string }[] = [
  { pattern: /fintech|finance|payment|金融|支付/, domain: "fintech" },
  { pattern: /developer|dev.?tool|sdk|api|cli/, domain: "developer-tool" },
  { pattern: /media|blog|editorial|content|媒体/, domain: "media" },
  { pattern: /e.?commerce|shop|store|电商|购物/, domain: "e-commerce" },
  { pattern: /enterprise|b2b|企业/, domain: "enterprise" },
];

/**
 * `classify.ts:255-289` register presets. The donor keyed three of them on
 * `sub_type` and one on `task_type`; both keys are carried so the dispatch stays a
 * table lookup instead of an if/else chain over literals.
 */
const REGISTER_PRESETS: readonly {
  readonly on: "sub_type" | "task_type";
  readonly value: string;
  readonly candidates: readonly RegisterCandidate[];
}[] = [
  { on: "sub_type", value: "waitlist", candidates: [
    { school: "warm-institutional", weight: 0.5, rationale: "Warm, approachable feel suits email signup pages" },
    { school: "vercel-clean", weight: 0.3, rationale: "Clean minimal layout keeps focus on CTA" },
    { school: "notion-warm", weight: 0.2, rationale: "Friendly tone works for early-access audiences" },
  ] },
  { on: "sub_type", value: "pricing", candidates: [
    { school: "stripe-fintech", weight: 0.5, rationale: "Trust-first layout ideal for pricing pages" },
    { school: "vercel-clean", weight: 0.3, rationale: "Clear information hierarchy for plan comparison" },
    { school: "linear", weight: 0.2, rationale: "Modern SaaS aesthetic fits B2B pricing" },
  ] },
  { on: "sub_type", value: "dashboard", candidates: [
    { school: "dense-pragmatist", weight: 0.5, rationale: "Information-dense layouts optimized for data" },
    { school: "linear", weight: 0.3, rationale: "Clean sidebar + content structure" },
    { school: "posthog", weight: 0.2, rationale: "Analytics-focused component patterns" },
  ] },
  { on: "task_type", value: "dev-tool", candidates: [
    { school: "warp", weight: 0.5, rationale: "Terminal-inspired aesthetics for developer tools" },
    { school: "raycast", weight: 0.3, rationale: "Keyboard-first, minimal chrome" },
    { school: "vercel-clean", weight: 0.2, rationale: "Clean docs and landing for dev tools" },
  ] },
];

/** `classify.ts:283-288` — the preset used when no rule above matches. */
const REGISTER_DEFAULT: readonly RegisterCandidate[] = [
  { school: "vercel-clean", weight: 0.5, rationale: "Versatile clean layout suitable for most contexts" },
  { school: "warm-institutional", weight: 0.3, rationale: "Approachable tone for general audiences" },
  { school: "swiss-modernist", weight: 0.2, rationale: "Strong typographic structure" },
];

/** `classify.ts:292-293`. */
const CORE_AXES = ["register", "pattern", "typography", "color", "rules"] as const;
const MOTION_AXIS = "motion";
/** `classify.ts:297-298`. */
const SHORT_BRIEF_CHARS = 15;

// ── Deterministic classifier ────────────────────────────────────────────────

/**
 * The donor's `heuristicFallback` (`classify.ts:196-311`), preserved value for
 * value including the two ambiguity flags and the `landing`/`marketing-landing`
 * default pair.
 */
export function classifyDesignBriefHeuristically(brief: string): DesignIntent {
  const text = brief.toLowerCase();

  const task = TASK_RULES.find(rule => rule.pattern.test(text));
  const task_type = task?.task_type ?? "marketing-landing";
  const sub_type = task?.sub_type ?? "landing";

  const density = DENSITY_RULES.find(rule => rule.pattern.test(text))?.density ?? "comfy";

  let motion_priority: MotionPriority = "low";
  for (const rule of MOTION_RULES) if (rule.pattern.test(text)) motion_priority = rule.motion;

  const vibe = VIBE_RULES.filter(rule => rule.pattern.test(text)).flatMap(rule => [...rule.vibe]);
  const domain = DOMAIN_RULES.find(rule => rule.pattern.test(text))?.domain ?? "consumer-saas";

  const preset = REGISTER_PRESETS.find(entry =>
    entry.on === "sub_type" ? entry.value === sub_type : entry.value === task_type,
  );

  const required_axes = motion_priority === "low" ? [...CORE_AXES] : [...CORE_AXES, MOTION_AXIS];

  const ambiguity_flags: string[] = [];
  if (brief.trim().length < SHORT_BRIEF_CHARS) ambiguity_flags.push("brief-too-short");
  if (task_type === "marketing-landing" && sub_type === "landing") ambiguity_flags.push("sub-type-unclear");

  return {
    task_type,
    sub_type,
    register_candidates: preset?.candidates ?? REGISTER_DEFAULT,
    vibe: vibe.length > 0 ? vibe : [...VIBE_DEFAULT],
    motion_priority,
    density,
    domain,
    required_axes,
    ambiguity_flags,
  };
}

// ── Model-backed classifier ─────────────────────────────────────────────────

/** The donor's prompt (`classify.ts:70-118`), with the vocabulary interpolated from the tables above. */
export function buildClassifierPrompt(brief: string): string {
  return `You are a frontend design classifier. Given a brief in any language, return a JSON object matching this TypeScript interface exactly:

interface IntentObject {
  task_type: string;       // One of: ${DESIGN_TASK_TYPES.join(" | ")}
  sub_type: string;        // e.g. "waitlist", "pricing-b2b", "hero", "dashboard"
  register_candidates: Array<{
    school: string;        // One of the school values below
    weight: number;        // 0.0-1.0, must sum to 1.0 across candidates
    rationale: string;     // 1-sentence explanation
  }>;
  vibe: string[];          // 2-4 adjectives, e.g. ["clean", "minimal", "approachable"]
  motion_priority: ${MOTION_PRIORITIES.map(value => `"${value}"`).join(" | ")};
  density: ${DENSITIES.map(value => `"${value}"`).join(" | ")};
  domain: string;          // e.g. "consumer-saas", "fintech", "developer-tool", "media", "e-commerce"
  required_axes: string[]; // Subset of: register | pattern | motion | typography | color | rules
  ambiguity_flags: string[]; // e.g. ["register-unclear", "domain-unclear"] - empty array if clear
}

Available school values:
${DESIGN_SCHOOLS.join(" | ")}

Available task_type values:
${DESIGN_TASK_TYPES.join(" | ")}

Available sub_type values (PICK FROM THIS LIST - do NOT invent free-form names; if none fit exactly, pick the closest):
${DESIGN_SUB_TYPES.join(" | ")}

Rules:
- register_candidates: pick 2-3 schools that best match the brief; weights must sum to 1.0
- required_axes: include all axes needed to fulfill the brief well (usually 4-6)
- motion_priority: "high" for toast/modal/transition/animation tasks; "med" for hover-rich interfaces; "low" for static content/forms
- ambiguity_flags: if the brief is very short or unclear, flag which fields are uncertain
- Return ONLY the raw JSON object, no markdown fences, no explanation

Brief:
${brief}`;
}

/** `classify.ts:126-138` — fence stripping plus outermost-brace extraction. */
export function extractJsonObject(raw: string): string {
  const stripped = raw
    .replace(/^```(?:json|typescript|ts)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return stripped;
  return stripped.slice(start, end + 1);
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

function readCandidates(value: unknown): readonly RegisterCandidate[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  const out: RegisterCandidate[] = [];
  for (const entry of value) {
    if (entry === null || typeof entry !== "object") return undefined;
    const record = entry as Record<string, unknown>;
    if (typeof record.school !== "string" || typeof record.weight !== "number") return undefined;
    out.push(
      typeof record.rationale === "string"
        ? { school: record.school, weight: record.weight, rationale: record.rationale }
        : { school: record.school, weight: record.weight },
    );
  }
  return out;
}

/**
 * `classify.ts:159-190` `repairPartial`, tightened in one place: the donor cast
 * `register_candidates` and `vibe` straight out of the parsed JSON, so a model
 * that returned `vibe: [1, 2]` produced a `DesignIntent` whose `vibe` was numbers
 * while its type said strings. Here a malformed field falls back to the heuristic
 * value instead. A wrong shape that type-checks is worse than a missing field,
 * because the six-axis scorers read `vibe` as text.
 */
export function repairIntent(parsed: Record<string, unknown>, brief: string): DesignIntent {
  const fallback = classifyDesignBriefHeuristically(brief);
  const motion = parsed.motion_priority;
  const density = parsed.density;
  return {
    task_type: typeof parsed.task_type === "string" ? parsed.task_type : fallback.task_type,
    sub_type: typeof parsed.sub_type === "string" ? parsed.sub_type : fallback.sub_type,
    register_candidates: readCandidates(parsed.register_candidates) ?? fallback.register_candidates,
    vibe: isStringArray(parsed.vibe) && parsed.vibe.length > 0 ? parsed.vibe : fallback.vibe,
    motion_priority: MOTION_PRIORITIES.includes(motion as MotionPriority)
      ? (motion as MotionPriority)
      : fallback.motion_priority,
    density: DENSITIES.includes(density as DesignIntent["density"])
      ? (density as DesignIntent["density"])
      : fallback.density,
    domain: typeof parsed.domain === "string" ? parsed.domain : fallback.domain,
    required_axes:
      isStringArray(parsed.required_axes) && parsed.required_axes.length > 0
        ? parsed.required_axes
        : fallback.required_axes,
    ambiguity_flags: isStringArray(parsed.ambiguity_flags) ? parsed.ambiguity_flags : fallback.ambiguity_flags,
  };
}

/**
 * Classify a brief.
 *
 * With no `model` this is pure and deterministic. With a `model` the answer is
 * repaired field by field against the deterministic result, so a model that
 * returns nothing usable cannot produce a worse intent than no model at all.
 */
export async function classifyDesignBrief(brief: string, options: ClassifyOptions = {}): Promise<DesignIntent> {
  const { model, report } = options;
  if (model === undefined) return classifyDesignBriefHeuristically(brief);

  let raw = "";
  try {
    raw = await model.complete(buildClassifierPrompt(brief));
  } catch (error) {
    report?.("CLASSIFIER_MODEL_THREW", error instanceof Error ? error.message : String(error));
    return classifyDesignBriefHeuristically(brief);
  }

  if (raw.trim().length === 0) {
    report?.("CLASSIFIER_MODEL_EMPTY", "Model returned no text; using the deterministic classifier");
    return classifyDesignBriefHeuristically(brief);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonObject(raw));
  } catch (error) {
    report?.("CLASSIFIER_MODEL_NOT_JSON", error instanceof Error ? error.message : String(error));
    return classifyDesignBriefHeuristically(brief);
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    report?.("CLASSIFIER_MODEL_NOT_OBJECT", "Model returned JSON that is not an object");
    return classifyDesignBriefHeuristically(brief);
  }

  return repairIntent(parsed as Record<string, unknown>, brief);
}
