/**
 * @module classify
 * Classifies a frontend task brief into a structured IntentObject.
 *
 * Strategy:
 * 1. Try DeepSeek (AI_MODELS.L2) via callAI
 * 2. Parse JSON from LLM response (handles markdown code fences)
 * 3. Validate shape; fill any missing fields with defaults
 * 4. If API unavailable or response invalid → heuristic fallback
 */

import { callAI, AI_MODELS } from "../../compiler/src/ai-client.ts";
import type { IntentObject } from "./types.ts";

// ─── Constants ────────────────────────────────────────────────────────────────

const VALID_SCHOOLS = [
  "brutalist",
  "dense-pragmatist",
  "editorial",
  "magazine-editorial",
  "notion-warm",
  "stripe-fintech",
  "swiss-modernist",
  "tokyo-minimal",
  "vercel-clean",
  "warm-institutional",
  "linear",
  "stripe",
  "apple",
  "airbnb",
  "notion",
  "vercel",
  "posthog",
  "raycast",
  "sentry",
  "mintlify",
  "spotify",
  "figma",
  "framer",
  "intercom",
  "sanity",
  "replicate",
  "superhuman",
  "warp",
  "coinbase",
  "toss",
  "supabase",
] as const;

const VALID_TASK_TYPES = [
  "marketing-landing",
  "content",
  "product-ui",
  "interaction",
  "dev-tool",
] as const;

/** Valid sub_type values — must match a yaml file in primes-v3/taxonomy/<task_type>/<sub_type>.yaml.
 *  Listing these in the prompt prevents the LLM from inventing free-form names. */
const VALID_SUB_TYPES = [
  // marketing-landing/
  "waitlist", "pricing-consumer", "pricing-b2b", "landing-saas", "landing-creative",
  "404", "coming-soon", "comparison",
  // content/
  "blog-article", "doc-page", "podcast-episode", "about-page", "changelog",
  // product-ui/
  "dashboard", "data-table", "settings", "kanban-mobile", "signup-wizard",
  "order-confirm", "log-viewer", "file-explorer",
  // interaction/
  "toast-demo", "modal", "form-wizard", "notification-center", "command-palette",
  // dev-tool/
  "llm-playground", "prompt-editor", "analytics-realtime", "api-explorer",
] as const;

const ALL_AXES = ["register", "pattern", "motion", "typography", "color", "rules"] as const;

// ─── LLM Prompt ──────────────────────────────────────────────────────────────

function buildPrompt(brief: string): string {
  return `You are a frontend design classifier. Given a brief in any language, return a JSON object matching this TypeScript interface exactly:

interface IntentObject {
  task_type: string;       // One of: ${VALID_TASK_TYPES.join(" | ")}
  sub_type: string;        // e.g. "waitlist", "pricing-b2b", "hero", "dashboard"
  register_candidates: Array<{
    school: string;        // One of the school values below
    weight: number;        // 0.0–1.0, must sum to 1.0 across candidates
    rationale: string;     // 1-sentence explanation
  }>;
  vibe: string[];          // 2–4 adjectives, e.g. ["clean", "minimal", "approachable"]
  motion_priority: "low" | "med" | "high";
  density: "tight" | "comfy" | "loose";
  domain: string;          // e.g. "consumer-saas", "fintech", "developer-tool", "media", "e-commerce"
  required_axes: string[]; // Subset of: register | pattern | motion | typography | color | rules
  ambiguity_flags: string[]; // e.g. ["register-unclear", "domain-unclear"] — empty array if clear
}

Available school values:
${VALID_SCHOOLS.join(" | ")}

Available task_type values:
${VALID_TASK_TYPES.join(" | ")}

Available sub_type values (PICK FROM THIS LIST — do NOT invent free-form names; if none fit exactly, pick the closest):
${VALID_SUB_TYPES.join(" | ")}

Rules:
- register_candidates: pick 2–3 schools that best match the brief; weights must sum to 1.0
- required_axes: include all axes needed to fulfill the brief well (usually 4–6)
- motion_priority: "high" for toast/modal/transition/animation tasks; "med" for hover-rich interfaces; "low" for static content/forms
- ambiguity_flags: if the brief is very short or unclear, flag which fields are uncertain
- Return ONLY the raw JSON object, no markdown fences, no explanation

Brief:
${brief}`;
}

// ─── JSON Parsing ─────────────────────────────────────────────────────────────

/**
 * Strip markdown code fences and extract the first JSON object from a string.
 * Handles: \`\`\`json ... \`\`\`, \`\`\` ... \`\`\`, or bare JSON.
 */
function extractJson(raw: string): string {
  // Remove code fences
  const stripped = raw
    .replace(/^```(?:json|typescript|ts)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();

  // Find first { and last } for safety
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return stripped;
  return stripped.slice(start, end + 1);
}

function isValidIntentObject(obj: unknown): obj is IntentObject {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.task_type === "string" &&
    typeof o.sub_type === "string" &&
    Array.isArray(o.register_candidates) &&
    Array.isArray(o.vibe) &&
    (o.motion_priority === "low" || o.motion_priority === "med" || o.motion_priority === "high") &&
    (o.density === "tight" || o.density === "comfy" || o.density === "loose") &&
    typeof o.domain === "string" &&
    Array.isArray(o.required_axes) &&
    Array.isArray(o.ambiguity_flags)
  );
}

/**
 * Attempt to repair a partially valid object by filling in missing fields with safe defaults.
 */
function repairPartial(obj: Record<string, unknown>, brief: string): IntentObject {
  const fallback = heuristicFallback(brief);
  return {
    task_type: typeof obj.task_type === "string" ? obj.task_type : fallback.task_type,
    sub_type: typeof obj.sub_type === "string" ? obj.sub_type : fallback.sub_type,
    register_candidates:
      Array.isArray(obj.register_candidates) && obj.register_candidates.length > 0
        ? (obj.register_candidates as IntentObject["register_candidates"])
        : fallback.register_candidates,
    vibe: Array.isArray(obj.vibe) && obj.vibe.length > 0 ? (obj.vibe as string[]) : fallback.vibe,
    motion_priority:
      obj.motion_priority === "low" || obj.motion_priority === "med" || obj.motion_priority === "high"
        ? obj.motion_priority
        : fallback.motion_priority,
    density:
      obj.density === "tight" || obj.density === "comfy" || obj.density === "loose"
        ? obj.density
        : fallback.density,
    domain: typeof obj.domain === "string" ? obj.domain : fallback.domain,
    required_axes:
      Array.isArray(obj.required_axes) && obj.required_axes.length > 0
        ? (obj.required_axes as string[])
        : fallback.required_axes,
    ambiguity_flags: Array.isArray(obj.ambiguity_flags)
      ? (obj.ambiguity_flags as string[])
      : fallback.ambiguity_flags,
  };
}

// ─── Heuristic Fallback ──────────────────────────────────────────────────────

/**
 * Keyword-based heuristic classification.
 * Used when API is unavailable or returns invalid JSON.
 */
function heuristicFallback(brief: string): IntentObject {
  const text = brief.toLowerCase();

  // task_type detection
  let task_type: string = "marketing-landing";
  let sub_type = "landing";

  if (/waitlist|等待|邮件订阅|subscribe|sign.?up|early.?access|early.?adopter/.test(text)) {
    task_type = "marketing-landing";
    sub_type = "waitlist";
  } else if (/pricing|定价|价格|plan|tier|subscription|付费/.test(text)) {
    task_type = "marketing-landing";
    sub_type = "pricing";
  } else if (/blog|article|post|文章|内容|editorial/.test(text)) {
    task_type = "content";
    sub_type = "article";
  } else if (/dashboard|看板|管理|admin|analytics|数据/.test(text)) {
    task_type = "product-ui";
    sub_type = "dashboard";
  } else if (/kanban|task|todo|project|项目/.test(text)) {
    task_type = "product-ui";
    sub_type = "kanban";
  } else if (/cli|terminal|dev.?tool|developer|开发者|sdk|api/.test(text)) {
    task_type = "dev-tool";
    sub_type = "cli";
  } else if (/animation|motion|交互|interaction|gesture/.test(text)) {
    task_type = "interaction";
    sub_type = "animation";
  }

  // density detection
  let density: IntentObject["density"] = "comfy";
  if (/简单|simple|minimal|clean|轻量|light/.test(text)) density = "loose";
  else if (/dense|compact|tight|紧凑|信息量大|data.?heavy/.test(text)) density = "tight";

  // motion detection
  let motion_priority: IntentObject["motion_priority"] = "low";
  if (/animation|motion|animated|动画|过渡|transition/.test(text)) motion_priority = "med";
  if (/heavy.?animation|rich.?motion|复杂动画|微交互/.test(text)) motion_priority = "high";

  // vibe detection
  const vibe: string[] = [];
  if (/简单|simple|minimal|clean/.test(text)) vibe.push("minimal", "clean");
  if (/warm|温暖|friendly|approachable/.test(text)) vibe.push("warm", "approachable");
  if (/professional|专业|enterprise/.test(text)) vibe.push("professional");
  if (/modern|现代|sleek/.test(text)) vibe.push("modern");
  if (vibe.length === 0) vibe.push("clean", "minimal");

  // domain detection
  let domain = "consumer-saas";
  if (/fintech|finance|payment|金融|支付/.test(text)) domain = "fintech";
  else if (/developer|dev.?tool|sdk|api|cli/.test(text)) domain = "developer-tool";
  else if (/media|blog|editorial|content|媒体/.test(text)) domain = "media";
  else if (/e.?commerce|shop|store|电商|购物/.test(text)) domain = "e-commerce";
  else if (/enterprise|b2b|企业/.test(text)) domain = "enterprise";

  // register_candidates based on sub_type + vibe
  let register_candidates: IntentObject["register_candidates"];
  if (sub_type === "waitlist") {
    register_candidates = [
      { school: "warm-institutional", weight: 0.5, rationale: "Warm, approachable feel suits email signup pages" },
      { school: "vercel-clean", weight: 0.3, rationale: "Clean minimal layout keeps focus on CTA" },
      { school: "notion-warm", weight: 0.2, rationale: "Friendly tone works for early-access audiences" },
    ];
  } else if (sub_type === "pricing") {
    register_candidates = [
      { school: "stripe-fintech", weight: 0.5, rationale: "Trust-first layout ideal for pricing pages" },
      { school: "vercel-clean", weight: 0.3, rationale: "Clear information hierarchy for plan comparison" },
      { school: "linear", weight: 0.2, rationale: "Modern SaaS aesthetic fits B2B pricing" },
    ];
  } else if (sub_type === "dashboard") {
    register_candidates = [
      { school: "dense-pragmatist", weight: 0.5, rationale: "Information-dense layouts optimized for data" },
      { school: "linear", weight: 0.3, rationale: "Clean sidebar + content structure" },
      { school: "posthog", weight: 0.2, rationale: "Analytics-focused component patterns" },
    ];
  } else if (task_type === "dev-tool") {
    register_candidates = [
      { school: "warp", weight: 0.5, rationale: "Terminal-inspired aesthetics for developer tools" },
      { school: "raycast", weight: 0.3, rationale: "Keyboard-first, minimal chrome" },
      { school: "vercel-clean", weight: 0.2, rationale: "Clean docs and landing for dev tools" },
    ];
  } else {
    register_candidates = [
      { school: "vercel-clean", weight: 0.5, rationale: "Versatile clean layout suitable for most contexts" },
      { school: "warm-institutional", weight: 0.3, rationale: "Approachable tone for general audiences" },
      { school: "swiss-modernist", weight: 0.2, rationale: "Strong typographic structure" },
    ];
  }

  // required_axes: always include core axes; add motion if relevant
  const required_axes: string[] = ["register", "pattern", "typography", "color", "rules"];
  if (motion_priority !== "low") required_axes.push("motion");

  // ambiguity_flags: flag if brief is very short or vague
  const ambiguity_flags: string[] = [];
  if (brief.trim().length < 15) ambiguity_flags.push("brief-too-short");
  if (task_type === "marketing-landing" && sub_type === "landing") ambiguity_flags.push("sub-type-unclear");

  return {
    task_type,
    sub_type,
    register_candidates,
    vibe,
    motion_priority,
    density,
    domain,
    required_axes,
    ambiguity_flags,
  };
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * Classify a frontend task brief into a structured IntentObject.
 *
 * Uses DeepSeek (AI_MODELS.L2) when available; falls back to keyword heuristics
 * if the API key is missing, the call fails, or the response cannot be parsed.
 *
 * @param brief - Frontend task description in any language
 * @returns Structured IntentObject
 */
export async function classifyBrief(brief: string): Promise<IntentObject> {
  // Pick the best available model. AI_MODELS.L2 defaults to claude-haiku
  // which requires ANTHROPIC_API_KEY. If that's not set but DEEPSEEK_API_KEY
  // is, use deepseek-chat directly (provider auto-detected from prefix).
  const env = (globalThis as any)?.process?.env ?? {};
  const haveAnthropic = !!env.ANTHROPIC_API_KEY;
  const haveDeepseek = !!env.DEEPSEEK_API_KEY;
  const preferredModel = env.PRIME_INTENT_MODEL
    || (haveAnthropic ? AI_MODELS.L2 : haveDeepseek ? "deepseek-chat" : AI_MODELS.L2);

  // Attempt LLM classification
  let raw: string;
  try {
    raw = await callAI(buildPrompt(brief), {
      model: preferredModel,
    });
  } catch {
    // callAI is designed to never throw, but guard defensively
    raw = "";
  }

  if (raw && raw.trim().length > 0) {
    try {
      const jsonStr = extractJson(raw);
      const parsed = JSON.parse(jsonStr);

      if (isValidIntentObject(parsed)) {
        return parsed;
      }

      // Partially valid — try to repair
      if (parsed && typeof parsed === "object") {
        console.warn("[prime-intent] LLM returned partial object, repairing with heuristics");
        return repairPartial(parsed as Record<string, unknown>, brief);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[prime-intent] Failed to parse LLM response as JSON: ${msg}`);
    }
  }

  // Full heuristic fallback
  return heuristicFallback(brief);
}
