/**
 * multi-axis.ts
 * Core multi-axis retrieval: given an IntentObject, produce a RetrievalResult
 * grouping atoms across 6 design axes.
 */

import { join } from "node:path";
import type { IntentObject } from "@prime-lang/intent";
import { loadCompiledIndex, type AtomMeta } from "./load-index.ts";
import { loadTaskYaml } from "./load-taxonomy.ts";
import type {
  Axis,
  AtomRef,
  AxisResult,
  RetrievalResult,
  TaskTypeDefinition,
} from "./types.ts";

// ---------------------------------------------------------------------------
// School name → persona atom id mapping.
// The atom IDs in the index follow the pattern @impeccable/persona-<slug>.
// We normalise school names to persona slugs here.
// ---------------------------------------------------------------------------
const SCHOOL_TO_PERSONA: Record<string, string> = {
  "warm-institutional": "@impeccable/persona-warm-institutional",
  "magazine-editorial": "@impeccable/persona-magazine-editorial",
  "notion-warm": "@impeccable/persona-notion-warm",
  "stripe-fintech": "@impeccable/persona-stripe-fintech",
  stripe: "@impeccable/persona-stripe-fintech",
  "vercel-clean": "@impeccable/persona-vercel-clean",
  vercel: "@impeccable/persona-vercel-clean",
  "linear-precise": "@impeccable/persona-linear-precise",
  linear: "@impeccable/persona-linear-precise",
  "swiss-modernist": "@impeccable/persona-swiss-modernist",
  "tokyo-minimal": "@impeccable/persona-tokyo-minimal",
  "dense-pragmatist": "@impeccable/persona-dense-pragmatist",
  brutalist: "@impeccable/persona-brutalist",
  editorial: "@impeccable/persona-editorial",
};

/** Convert AtomMeta to the public AtomRef shape. */
function toRef(meta: AtomMeta): AtomRef {
  return {
    id: meta.id,
    kind: meta.kind,
    level: meta.level,
    tokens: meta.tokens,
    description: meta.description,
    edges: meta.edges,
  };
}

/** Score how relevant an atom is to a set of keywords. */
function keywordScore(meta: AtomMeta, keywords: string[]): number {
  if (keywords.length === 0) return 0;
  const text = (meta.id + " " + meta.description + " " + meta.cluster).toLowerCase();
  return keywords.filter((kw) => text.includes(kw.toLowerCase())).length;
}

/** Filter atoms by one or more kind values. */
function byKind(atoms: Map<string, AtomMeta>, ...kinds: string[]): AtomMeta[] {
  const kindSet = new Set(kinds);
  return [...atoms.values()].filter((a) => kindSet.has(a.kind));
}

/** Exclude any atom whose id is in the forbidden set. */
function excludeForbidden(atoms: AtomMeta[], forbidden: Set<string>): AtomMeta[] {
  return atoms.filter((a) => !forbidden.has(a.id));
}

/** Look up per-axis atom budget from taxonomy yaml; default 3. Returns max
 *  total atoms (primary + alternates) — caller slices alternates to budget-1. */
function axisBudget(taskYaml: TaskTypeDefinition | null, axis: string): number {
  const map = (taskYaml as any)?.max_atoms_per_axis;
  if (map && typeof map === "object" && typeof map[axis] === "number") {
    return Math.max(1, map[axis]);
  }
  return 3;
}

// ---------------------------------------------------------------------------
// Per-axis retrieval helpers
// ---------------------------------------------------------------------------

function retrieveRegister(
  atoms: Map<string, AtomMeta>,
  intent: IntentObject,
  taskYaml: TaskTypeDefinition | null,
  forbidden: Set<string>,
): AxisResult {
  const personas = byKind(atoms, "persona");
  const allowed = excludeForbidden(personas, forbidden);

  // Rank candidates by matching intent.register_candidates schools
  const schoolWeights = new Map(
    intent.register_candidates.map((c) => [c.school, c.weight]),
  );

  const scored = allowed
    .map((a) => {
      let score = 0;
      for (const [school, weight] of schoolWeights) {
        const targetId = SCHOOL_TO_PERSONA[school];
        if (targetId && a.id === targetId) score += weight * 10;
        // Partial slug match fallback
        if (a.id.includes(school.replace(/[^a-z]/g, "-"))) score += weight * 5;
      }
      return { meta: a, score };
    })
    .sort((a, b) => b.score - a.score);

  const [top, ...rest] = scored;
  const primary = top?.meta ?? allowed[0];
  const budget = axisBudget(taskYaml, "register");
  const alternates = rest.slice(0, budget - 1).map((s) => s.meta);

  const topSchool = intent.register_candidates[0]?.school ?? "unknown";
  return {
    axis: "register",
    primary: toRef(primary),
    alternates: alternates.map(toRef),
    rationale: `Matched register school "${topSchool}" to persona atom.`,
  };
}

function retrievePattern(
  atoms: Map<string, AtomMeta>,
  intent: IntentObject,
  taskYaml: TaskTypeDefinition | null,
  forbidden: Set<string>,
): AxisResult {
  const patterns = byKind(atoms, "pattern", "template");
  const allowed = excludeForbidden(patterns, forbidden);

  // 1. Required atoms from taxonomy YAML take priority
  const requiredIds = new Set((taskYaml?.required_atoms ?? []).filter((id) =>
    id.includes("pattern"),
  ));

  const required = allowed.filter((a) => requiredIds.has(a.id));
  const rest = allowed.filter((a) => !requiredIds.has(a.id));

  // 2. Score remaining by task brief keywords
  const keywords = [
    intent.task_type,
    intent.sub_type,
    intent.domain,
    ...intent.vibe,
  ].filter(Boolean);

  const scored = rest
    .map((a) => ({ meta: a, score: keywordScore(a, keywords) }))
    .sort((a, b) => b.score - a.score);

  const candidates = [...required, ...scored.map((s) => s.meta)];
  const [primary, ...alternates] = candidates;
  const budget = axisBudget(taskYaml, "pattern");

  return {
    axis: "pattern",
    primary: toRef(primary ?? allowed[0]),
    alternates: alternates.slice(0, budget - 1).map(toRef),
    rationale: `${required.length} required atoms from taxonomy; ${scored.length} additional by keyword match.`,
  };
}

function retrieveMotion(
  atoms: Map<string, AtomMeta>,
  intent: IntentObject,
  taskYaml: TaskTypeDefinition | null,
  forbidden: Set<string>,
): AxisResult {
  const motionPatterns = [...atoms.values()].filter((a) =>
    a.cluster === "motion" || a.id.includes("motion") || a.id.includes("animation") ||
    a.id.includes("fade") || a.id.includes("spring") || a.id.includes("easing") ||
    a.id.includes("scroll-reveal") || a.id.includes("stagger")
  );
  const allowed = excludeForbidden(motionPatterns, forbidden);

  // Recommended motion from taxonomy YAML
  const recommendedIds = new Set(taskYaml?.recommended_motion ?? []);
  const recommended = allowed.filter((a) => recommendedIds.has(a.id));
  const rest = allowed.filter((a) => !recommendedIds.has(a.id));

  // If motion_priority=high, include all motion patterns/templates
  let extra: AtomMeta[] = [];
  if (intent.motion_priority === "high") {
    extra = byKind(atoms, "pattern", "template").filter(
      (a) =>
        (a.id.includes("motion") || a.id.includes("animation") ||
          a.cluster === "motion") &&
        !forbidden.has(a.id),
    );
  }

  const all = [...recommended, ...extra, ...rest];
  const seen = new Set<string>();
  const deduped = all.filter((a) => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });

  const [primary, ...alternates] = deduped;

  // Fallback: pick a generic motion template
  const fallback = atoms.get("@impeccable/template-easing-curves");
  const budget = axisBudget(taskYaml, "motion");
  return {
    axis: "motion",
    primary: toRef(primary ?? fallback ?? allowed[0] ?? [...atoms.values()][0]),
    alternates: alternates.slice(0, budget - 1).map(toRef),
    rationale: `motion_priority="${intent.motion_priority}"; ${recommended.length} recommended from taxonomy.`,
  };
}

function retrieveTypography(
  atoms: Map<string, AtomMeta>,
  _intent: IntentObject,
  taskYaml: TaskTypeDefinition | null,
  forbidden: Set<string>,
): AxisResult {
  const typoKinds = new Set(["principle", "rule", "fact", "check"]);
  const typoAtoms = [...atoms.values()].filter((a) => {
    if (!typoKinds.has(a.kind)) return false;
    const text = (a.id + " " + a.description + " " + a.cluster).toLowerCase();
    return (
      text.includes("typograph") ||
      text.includes("font") ||
      text.includes("line-length") ||
      text.includes("readab") ||
      text.includes("letter-spacing") ||
      text.includes("body-text") ||
      text.includes("heading") ||
      a.cluster === "typography"
    );
  });
  const allowed = excludeForbidden(typoAtoms, forbidden);

  // Prefer principles first, then rules, then facts
  const order = ["principle", "rule", "fact", "check"];
  const sorted = allowed.sort(
    (a, b) => order.indexOf(a.kind) - order.indexOf(b.kind),
  );

  const [primary, ...alternates] = sorted;
  const fallback = atoms.get("@community/principle-typography-hierarchy");
  const budget = axisBudget(taskYaml, "typography");

  return {
    axis: "typography",
    primary: toRef(primary ?? fallback ?? allowed[0]),
    alternates: alternates.slice(0, budget - 1).map(toRef),
    rationale: `${allowed.length} typography-tagged atoms; ordered principle > rule > fact.`,
  };
}

function retrieveColor(
  atoms: Map<string, AtomMeta>,
  _intent: IntentObject,
  taskYaml: TaskTypeDefinition | null,
  forbidden: Set<string>,
): AxisResult {
  const colorKinds = new Set(["principle", "template", "check", "rule", "fact"]);
  const colorAtoms = [...atoms.values()].filter((a) => {
    if (!colorKinds.has(a.kind)) return false;
    const text = (a.id + " " + a.description + " " + a.cluster).toLowerCase();
    return (
      text.includes("color") ||
      text.includes("colour") ||
      text.includes("palette") ||
      text.includes("contrast") ||
      text.includes("hue") ||
      text.includes("theme") ||
      text.includes("dark-mode") ||
      text.includes("accent")
    );
  });
  const allowed = excludeForbidden(colorAtoms, forbidden);

  // Prefer templates (concrete), then principles, then checks
  const order = ["template", "principle", "rule", "check", "fact"];
  const sorted = allowed.sort(
    (a, b) => order.indexOf(a.kind) - order.indexOf(b.kind),
  );

  const [primary, ...alternates] = sorted;
  const fallback = atoms.get("@community/principle-color-system-foundation");
  const budget = axisBudget(taskYaml, "color");

  return {
    axis: "color",
    primary: toRef(primary ?? fallback ?? allowed[0]),
    alternates: alternates.slice(0, budget - 1).map(toRef),
    rationale: `${allowed.length} color-tagged atoms; ordered template > principle > rule > check.`,
  };
}

function retrieveRules(
  atoms: Map<string, AtomMeta>,
  intent: IntentObject,
  taskYaml: TaskTypeDefinition | null,
  forbidden: Set<string>,
): AxisResult {
  const ruleKinds = new Set(["rule", "constraint", "check"]);

  // Required atoms from taxonomy that are rules/checks
  const requiredIds = new Set(
    (taskYaml?.required_atoms ?? []).filter((id) =>
      id.includes("rule") || id.includes("check") || id.includes("constraint"),
    ),
  );

  const ruleAtoms = excludeForbidden(
    byKind(atoms, "rule", "constraint", "check"),
    forbidden,
  );

  const required = ruleAtoms.filter((a) => requiredIds.has(a.id));
  const rest = ruleAtoms.filter((a) => !requiredIds.has(a.id));

  // Score rest by required_axes keywords
  const keywords = intent.required_axes.flatMap((ax) => [ax, intent.task_type]);

  const scored = rest
    .map((a) => ({ meta: a, score: keywordScore(a, keywords) }))
    .sort((a, b) => b.score - a.score);

  const candidates = [...required, ...scored.map((s) => s.meta)];
  const [primary, ...alternates] = candidates;
  const budget = axisBudget(taskYaml, "rules");

  return {
    axis: "rules",
    primary: toRef(primary ?? ruleAtoms[0]),
    alternates: alternates.slice(0, budget - 1).map(toRef),
    rationale: `${required.length} required rule atoms from taxonomy; ${scored.length} additional by axis keyword.`,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Multi-axis retrieval.
 *
 * @param intent   Structured intent object from @prime-lang/intent
 * @param primeDir Absolute path to the prime project root (contains compiled-v3-final/ and primes-v3/)
 */
export async function multiAxisRetrieve(
  intent: IntentObject,
  primeDir: string,
): Promise<RetrievalResult> {
  // Load the compiled index
  const { atoms } = loadCompiledIndex(primeDir);

  // Load task taxonomy YAML
  const taxonomyDir = join(primeDir, "primes-v3", "taxonomy");
  const taskYaml = loadTaskYaml(taxonomyDir, intent.task_type, intent.sub_type);

  // Build forbidden set
  const forbidden = new Set<string>(taskYaml?.forbidden_atoms ?? []);

  // Retrieve all 6 axes
  const allAxes: Axis[] = ["register", "pattern", "motion", "typography", "color", "rules"];
  const axisResults: AxisResult[] = [];

  for (const axis of allAxes) {
    // Skip axes not in required_axes if list is explicitly non-empty and doesn't include "*"
    const shouldInclude =
      intent.required_axes.length === 0 ||
      intent.required_axes.includes(axis) ||
      intent.required_axes.includes("*");

    if (!shouldInclude) continue;

    let result: AxisResult;
    switch (axis) {
      case "register":
        result = retrieveRegister(atoms, intent, taskYaml, forbidden);
        break;
      case "pattern":
        result = retrievePattern(atoms, intent, taskYaml, forbidden);
        break;
      case "motion":
        result = retrieveMotion(atoms, intent, taskYaml, forbidden);
        break;
      case "typography":
        result = retrieveTypography(atoms, intent, taskYaml, forbidden);
        break;
      case "color":
        result = retrieveColor(atoms, intent, taskYaml, forbidden);
        break;
      case "rules":
        result = retrieveRules(atoms, intent, taskYaml, forbidden);
        break;
    }
    axisResults.push(result);
  }

  // Aggregate totals
  const allAtomIds = new Set<string>();
  for (const ax of axisResults) {
    allAtomIds.add(ax.primary.id);
    for (const alt of ax.alternates) allAtomIds.add(alt.id);
  }

  const totalTokensEstimate = [...allAtomIds].reduce((sum, id) => {
    const meta = atoms.get(id);
    return sum + (meta?.tokens ?? 0);
  }, 0);

  return {
    intent,
    axes: axisResults,
    task_yaml: taskYaml,
    total_atoms: allAtomIds.size,
    total_tokens_estimate: totalTokensEstimate,
  };
}
