/**
 * resolver.ts
 *
 * Resolve a frontend brief into a flat typed design spec (ResolvedDesign).
 * This is the protocol-level shift from "wiki" to "API":
 *   - prime_compile → list of atom paths (agent reads markdown, interprets CSS)
 *   - resolveDesign → typed JSON values (agent inserts directly into CSS template)
 *
 * Internal pipeline:
 *   1. classifyBrief(brief) → IntentObject
 *   2. multiAxisRetrieve(intent) → RetrievalResult (picks register persona)
 *   3. parse persona .prime source → walk AST
 *   4. extract typed values from implies.* + composition.typography-required / color-required
 *   5. merge: composition values override implies values (composition is the stricter contract)
 *   6. assemble ResolvedDesign with patterns/templates/motion atom IDs
 */

import type { IntentObject } from "@prime-lang/intent";
import type { TaskTypeDefinition } from "./types.ts";
import { readFileSync, existsSync } from "fs";

// ─── AST helpers (mirrors contract.ts pattern) ────────────────────────────────

interface ObjectNode {
  type: "Object";
  fields: FieldNode[];
}

interface ArrayNode {
  type: "Array";
  items: ValueNode[];
}

interface FieldNode {
  type: "Field";
  key: string;
  value: ValueNode;
}

type ValueNode = ObjectNode | ArrayNode | { type: string; value?: any; [k: string]: any };

// ─── Public types ─────────────────────────────────────────────────────────────

export interface ResolvedDesign {
  intent: IntentObject;
  task_yaml: TaskTypeDefinition | null;

  // Typed concrete values — NOT markdown paths
  typography: {
    display: string;
    body: string;
    monospace?: string;
    weight_signature?: number | string;
    opentype_features?: string;
    line_height?: string;
    base_size?: string;
    /** Extra fields from composition.typography-required (e.g. radius, dark-mode-first) */
    extra?: Record<string, string>;
  };
  color: {
    background: string;
    heading?: string;
    body?: string;
    accent: string;
    shadow_style?: string;
    temperature?: "warm" | "cool" | "neutral" | "warm-neutral" | "cool-neutral";
    palette_summary?: string;
    /** Extra fields from composition.color-required (e.g. system, background-light) */
    extra?: Record<string, string>;
  };
  density: {
    radius?: string;
    gap?: string;
    max_width?: string;
    row_height?: string;
    description?: string;
  };
  motion: {
    ease?: string;           // cubic-bezier value or named ease
    duration_ms?: number;
    spring_config?: string;
    stagger_ms?: number;
    notes?: string;
  };
  layout: {
    description: string;
    grid?: string;
    max_width?: string;
  };

  // Atom recommendations (useful for HTML structure decisions)
  must_include_patterns: string[];   // pattern atom IDs
  must_include_templates: string[];  // template atom IDs
  must_avoid_atoms: string[];
  recommended_motion: string[];
  rules_to_honor: string[];

  // Source attribution
  source_persona: string;
  source_atoms: string[];
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Resolve a brief into a flat typed design spec.
 *
 * @param brief    Free-form brief in any language
 * @param primeRoot Absolute path to the prime project root (contains primes-v3/)
 */
export async function resolveDesign(
  brief: string,
  primeRoot: string
): Promise<ResolvedDesign> {
  // 1. Classify brief → IntentObject
  const { classifyBrief } = await import("@prime-lang/intent");
  const intent = await classifyBrief(brief);

  // 2. Multi-axis retrieve → pick primary persona
  const { multiAxisRetrieve } = await import("./multi-axis.ts");
  const result = await multiAxisRetrieve(intent, primeRoot);

  // 3. Find persona's .prime source file
  const registerAxis = result.axes.find(a => a.axis === "register");
  const personaId = registerAxis?.primary?.id ?? "@impeccable/persona-vercel-clean";

  // Convert "@scope/name" → "<primeRoot>/primes-v3/sources/@scope/name.prime"
  const personaPath = buildPersonaPath(personaId, primeRoot);

  // 4. Parse persona source → AST
  // Use relative path to avoid workspace symlink resolution issues with plain Node.
  const personaSrc = existsSync(personaPath) ? readFileSync(personaPath, "utf-8") : "";
  const { parse } = await import("../../parser/src/index.ts");
  const { ast } = personaSrc ? parse(personaSrc, personaPath) : { ast: null };

  // 5. Extract typed values from implies.* (base layer)
  const impliesNode = findField(ast?.body ?? [], "implies");
  const impliesObj = impliesNode?.type === "Object" ? (impliesNode as ObjectNode) : null;

  const fontNode = impliesObj ? findField(impliesObj.fields, "font") : null;
  const fontObj = fontNode?.type === "Object" ? (fontNode as ObjectNode) : null;

  const colorImpliesNode = impliesObj ? findField(impliesObj.fields, "color") : null;
  const colorImpliesObj = colorImpliesNode?.type === "Object" ? (colorImpliesNode as ObjectNode) : null;

  const densityRaw = impliesObj ? fieldToString(findField(impliesObj.fields, "density")) : null;
  const layoutRaw = impliesObj ? fieldToString(findField(impliesObj.fields, "layout")) : null;
  const motionRaw = impliesObj ? fieldToString(findField(impliesObj.fields, "motion")) : null;

  // Base typography from implies.font.*
  const typographyBase = {
    display:   fieldToString(fontObj ? findField(fontObj.fields, "display") : null) ?? "system-ui",
    body:      fieldToString(fontObj ? findField(fontObj.fields, "body") : null) ?? "system-ui",
    monospace: fieldToString(fontObj ? findField(fontObj.fields, "monospace") : null) ?? undefined,
  };

  // Base color from implies.color.*
  const colorBase = {
    background:      fieldToString(colorImpliesObj ? findField(colorImpliesObj.fields, "background") : null) ?? "#ffffff",
    palette_summary: fieldToString(colorImpliesObj ? findField(colorImpliesObj.fields, "palette") : null) ?? undefined,
    temperature:     fieldToString(colorImpliesObj ? findField(colorImpliesObj.fields, "temperature") : null) as ResolvedDesign["color"]["temperature"] ?? undefined,
    accent:          extractAccentFromPalette(
      fieldToString(colorImpliesObj ? findField(colorImpliesObj.fields, "palette") : null) ?? ""
    ),
  };

  // 6. Extract composition block → override base values
  const compositionNode = findField(ast?.body ?? [], "composition");
  const compositionObj = compositionNode?.type === "Object" ? (compositionNode as ObjectNode) : null;

  // composition.typography-required
  const typoRequiredNode = compositionObj ? findField(compositionObj.fields, "typography-required") : null;
  const typoRequiredObj = typoRequiredNode?.type === "Object" ? (typoRequiredNode as ObjectNode) : null;
  const typoRequired = typoRequiredObj ? extractStringRecord(typoRequiredObj) : {};

  // composition.color-required
  const colorRequiredNode = compositionObj ? findField(compositionObj.fields, "color-required") : null;
  const colorRequiredObj = colorRequiredNode?.type === "Object" ? (colorRequiredNode as ObjectNode) : null;
  const colorRequired = colorRequiredObj ? extractStringRecord(colorRequiredObj) : {};

  // composition.must-include / must-avoid
  const mustIncludeRaw = compositionObj ? extractStringArray(compositionObj, "must-include") : [];
  const mustAvoid = compositionObj ? extractStringArray(compositionObj, "must-avoid") : [];

  // 7. Also pull from composition contract package (for quality_thresholds, etc.)
  // Use relative path to avoid workspace symlink resolution issues with plain Node.
  let contractMustInclude: string[] = [];
  let contractMustAvoid: string[] = [];
  try {
    const { extractContract } = await import("../../composition/src/index.ts");
    const contract = existsSync(personaPath) ? extractContract(personaPath) : null;
    contractMustInclude = contract?.must_include ?? [];
    contractMustAvoid = contract?.must_avoid ?? [];
  } catch {
    // composition package optional — fall back to AST-parsed values
    contractMustInclude = mustIncludeRaw;
    contractMustAvoid = mustAvoid;
  }

  // 8. Motion axis atom IDs
  const motionAxis = result.axes.find(a => a.axis === "motion");

  // 9. Assemble merged typed values
  const typography = mergeTypography(typographyBase, typoRequired);
  const color = mergeColor(colorBase, colorRequired);
  const density = parseDensity(densityRaw ?? "");
  const motion = parseMotion(motionRaw ?? "");
  const layout = parseLayout(layoutRaw ?? "");

  // All atom IDs across axes for source attribution
  const sourceAtoms = result.axes.flatMap(a => [a.primary.id, ...a.alternates.map(x => x.id)]);

  return {
    intent,
    task_yaml: result.task_yaml,
    typography,
    color,
    density,
    motion,
    layout,
    must_include_patterns: contractMustInclude.filter(id => id.includes("pattern-")),
    must_include_templates: contractMustInclude.filter(id => id.includes("template-")),
    must_avoid_atoms: contractMustAvoid,
    recommended_motion: motionAxis
      ? [motionAxis.primary.id, ...motionAxis.alternates.map(a => a.id)]
      : [],
    rules_to_honor: result.task_yaml?.quality_checks ?? [],
    source_persona: personaId,
    source_atoms: sourceAtoms,
  };
}

// ─── Path builder ─────────────────────────────────────────────────────────────

/**
 * Convert "@scope/name" atom ID to the .prime source file path.
 * Example: "@community/persona-stripe" →
 *   "<root>/primes-v3/sources/@community/persona-stripe.prime"
 */
function buildPersonaPath(personaId: string, primeRoot: string): string {
  // personaId format: "@scope/name"
  // Strip leading "@" then split on first "/"
  const withoutAt = personaId.startsWith("@") ? personaId.slice(1) : personaId;
  const slashIdx = withoutAt.indexOf("/");
  if (slashIdx === -1) {
    return `${primeRoot}/primes-v3/sources/@${withoutAt}.prime`;
  }
  const scope = withoutAt.slice(0, slashIdx);
  const name = withoutAt.slice(slashIdx + 1);
  return `${primeRoot}/primes-v3/sources/@${scope}/${name}.prime`;
}

// ─── AST walker helpers ───────────────────────────────────────────────────────

/** Find a field by key in a FieldNode[]. Returns the field's value node, or null. */
function findField(fields: any[], key: string): ValueNode | null {
  if (!Array.isArray(fields)) return null;
  const field = fields.find((f: any) => f.key === key);
  return field?.value ?? null;
}

/** Coerce a ValueNode to string, or return null. */
function valueToString(node: ValueNode | null | undefined): string | null {
  if (!node) return null;
  switch (node.type) {
    case "String":
    case "Ident":
    case "EnumValue":
      return (node as any).value as string;
    case "Number":
      return String((node as any).value);
    case "Boolean":
      return String((node as any).value);
    default:
      return null;
  }
}

/** Get string value from a field-lookup result (the value node). */
function fieldToString(node: ValueNode | null | undefined): string | null {
  return valueToString(node);
}

/** Extract all string items from a named array field inside an ObjectNode. */
function extractStringArray(obj: ObjectNode, key: string): string[] {
  const val = findField(obj.fields, key);
  if (!val || val.type !== "Array") return [];
  const results: string[] = [];
  for (const item of (val as ArrayNode).items) {
    const s = valueToString(item as ValueNode);
    if (s !== null) results.push(s);
  }
  return results;
}

/** Extract Record<string, string> from an ObjectNode's fields (all scalar values). */
function extractStringRecord(obj: ObjectNode): Record<string, string> {
  const record: Record<string, string> = {};
  for (const field of obj.fields) {
    const s = valueToString(field.value as ValueNode);
    if (s !== null) {
      record[field.key] = s;
    }
  }
  return record;
}

// ─── Merge helpers ─────────────────────────────────────────────────────────────

/**
 * Merge implies.font.* (base) with composition.typography-required (override).
 *
 * composition.typography-required keys map to ResolvedDesign.typography fields:
 *   display           → typography.display
 *   weight-signature  → typography.weight_signature
 *   opentype-features → typography.opentype_features
 *   line-height       → typography.line_height
 *   base-size         → typography.base_size
 *   (any other key)   → typography.extra[key]
 */
function mergeTypography(
  base: { display: string; body: string; monospace?: string },
  required: Record<string, string>
): ResolvedDesign["typography"] {
  const result: ResolvedDesign["typography"] = {
    display: base.display,
    body: base.body,
    monospace: base.monospace,
  };

  const extra: Record<string, string> = {};

  for (const [key, val] of Object.entries(required)) {
    switch (key) {
      case "display":
        result.display = val;
        break;
      case "body":
        result.body = val;
        break;
      case "monospace":
        result.monospace = val;
        break;
      case "weight-signature":
        result.weight_signature = isNaN(Number(val)) ? val : Number(val);
        break;
      case "opentype-features":
        result.opentype_features = val;
        break;
      case "line-height":
        result.line_height = val;
        break;
      case "base-size":
        result.base_size = val;
        break;
      default:
        extra[key] = val;
    }
  }

  if (Object.keys(extra).length > 0) {
    result.extra = extra;
  }

  return result;
}

/**
 * Merge implies.color.* (base) with composition.color-required (override).
 *
 * composition.color-required keys map to ResolvedDesign.color fields:
 *   background   → color.background
 *   heading      → color.heading
 *   body         → color.body
 *   accent       → color.accent
 *   shadow-style → color.shadow_style
 *   (any other)  → color.extra[key]
 */
function mergeColor(
  base: {
    background: string;
    palette_summary?: string;
    temperature?: ResolvedDesign["color"]["temperature"];
    accent: string;
  },
  required: Record<string, string>
): ResolvedDesign["color"] {
  const result: ResolvedDesign["color"] = {
    background: base.background,
    accent: base.accent,
    palette_summary: base.palette_summary,
    temperature: base.temperature,
  };

  const extra: Record<string, string> = {};

  for (const [key, val] of Object.entries(required)) {
    switch (key) {
      case "background":
        result.background = val;
        break;
      case "heading":
        result.heading = val;
        break;
      case "body":
        result.body = val;
        break;
      case "accent":
        result.accent = val;
        break;
      case "shadow-style":
        result.shadow_style = val;
        break;
      default:
        extra[key] = val;
    }
  }

  if (Object.keys(extra).length > 0) {
    result.extra = extra;
  }

  return result;
}

// ─── Parse helpers for free-text implies fields ───────────────────────────────

/**
 * Parse a density string like:
 *   "compact — 4–8px radius only, 8px base spacing ..., 1080px max-width"
 * into structured fields.
 */
function parseDensity(raw: string): ResolvedDesign["density"] {
  const result: ResolvedDesign["density"] = { description: raw || undefined };

  if (!raw) return result;

  // Extract radius (e.g. "4–8px radius", "6-8px radius", "4px radius")
  const radiusMatch = raw.match(/(\d+(?:[–-]\d+)?px)\s*radius/i);
  if (radiusMatch) result.radius = radiusMatch[1];

  // Extract max-width (e.g. "1080px max-width", "1280px max-width")
  const maxWidthMatch = raw.match(/(\d+px)\s*max-width/i);
  if (maxWidthMatch) result.max_width = maxWidthMatch[1];

  // Extract row height (e.g. "40-44px row height", "40px row")
  const rowHeightMatch = raw.match(/(\d+(?:[–-]\d+)?px)\s*row\s*height/i);
  if (rowHeightMatch) result.row_height = rowHeightMatch[1];

  // Extract gap / base spacing (e.g. "8px base spacing", "16px gap")
  const gapMatch = raw.match(/(\d+px)\s*(?:base\s*spacing|gap)/i);
  if (gapMatch) result.gap = gapMatch[1];

  return result;
}

/**
 * Parse a motion string like:
 *   "restrained — blue-tinted multi-layer shadows do the heavy lifting; interactive states via opacity and color shift"
 * or:
 *   "subtle — 200-300ms ease-out, fade-in-up on scroll, gradient hue rotation, no bouncy springs"
 * into structured fields.
 */
function parseMotion(raw: string): ResolvedDesign["motion"] {
  const result: ResolvedDesign["motion"] = { notes: raw || undefined };

  if (!raw) return result;

  // Extract duration (e.g. "200-300ms", "300-400ms", "200ms")
  const durationMatch = raw.match(/(\d+)(?:[–-]\d+)?ms/i);
  if (durationMatch) result.duration_ms = Number(durationMatch[1]);

  // Extract ease type (e.g. "ease-out", "ease-in-out", "cubic-bezier(…)")
  const cubicMatch = raw.match(/cubic-bezier\([^)]+\)/i);
  if (cubicMatch) {
    result.ease = cubicMatch[0];
  } else {
    const easeMatch = raw.match(/\b(ease-out|ease-in-out|ease-in|linear|ease)\b/i);
    if (easeMatch) result.ease = easeMatch[1];
  }

  // Extract stagger (e.g. "50ms stagger", "stagger 30ms")
  const staggerMatch = raw.match(/(?:stagger[^\d]*)(\d+)ms|(\d+)ms\s*stagger/i);
  if (staggerMatch) result.stagger_ms = Number(staggerMatch[1] ?? staggerMatch[2]);

  // Detect spring config hints
  if (/spring/i.test(raw)) {
    result.spring_config = raw.match(/spring[^,;.]+/i)?.[0] ?? "spring";
  }

  return result;
}

/**
 * Parse a layout string like:
 *   "white canvas with alternating #1c1e54 dark immersive sections, centered 1080px, conservative grid"
 * into structured fields.
 */
function parseLayout(raw: string): ResolvedDesign["layout"] {
  const result: ResolvedDesign["layout"] = { description: raw };

  if (!raw) return result;

  // Extract max-width from layout string (e.g. "1280px max-width", "centered 1080px")
  const maxWidthMatch = raw.match(/(?:centered\s+)?(\d+)px(?:\s+max-width)?/i);
  if (maxWidthMatch) result.max_width = `${maxWidthMatch[1]}px`;

  // Extract grid type (e.g. "12-col grid", "conservative grid", "2x2 or 3-up cards")
  const gridMatch = raw.match(/(\d+-col\s+grid|[a-z]+-\w+\s+grid)/i);
  if (gridMatch) result.grid = gridMatch[1];

  return result;
}

/**
 * Heuristically extract an accent color from a palette summary string.
 * Looks for named CTAs, brand colors, or first hex/oklch color that isn't
 * the background-typical white/black.
 *
 * Examples:
 *   "purple #533afd brand CTA, ..." → "#533afd"
 *   "OKLCH neutral ramp plus one neon accent — cyan oklch(85% 0.18 200)" → "oklch(85% 0.18 200)"
 */
function extractAccentFromPalette(palette: string): string {
  if (!palette) return "currentColor";

  // Priority 1: CTA / brand color nearby a hex value
  const ctaMatch = palette.match(/#([0-9a-fA-F]{6})\s+(?:brand|cta)/i)
    ?? palette.match(/(?:brand|cta)[^#]*#([0-9a-fA-F]{6})/i);
  if (ctaMatch) return `#${ctaMatch[1]}`;

  // Priority 2: first oklch() value
  const oklchMatch = palette.match(/oklch\([^)]+\)/i);
  if (oklchMatch) return oklchMatch[0];

  // Priority 3: first hex that isn't pure white/black
  const hexMatches = palette.match(/#[0-9a-fA-F]{6}/g) ?? [];
  for (const hex of hexMatches) {
    const norm = hex.toLowerCase();
    if (norm !== "#ffffff" && norm !== "#000000" && norm !== "#fff" && norm !== "#000") {
      return hex;
    }
  }

  // Fallback
  return palette.split(/[,;]/)[0]?.trim() ?? "currentColor";
}
