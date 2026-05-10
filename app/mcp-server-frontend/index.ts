#!/usr/bin/env bun
/**
 * Prime Wiki MCP Server — v4 Projection Model
 *
 * Architecture shift (PRIME.md §8, §3.2):
 *
 *   OLD: prime_compile → returns 500-2000 tok of compiled content
 *   NEW: prime_compile → returns atom PATHS + metadata; agent uses Read tool
 *
 * Two tools:
 *
 *   prime_compile(task, persona_school?, features?, budget?)
 *     → { atoms: [{id, kind, level, reason, path}], orchestration, total_tokens_if_loaded, instructions }
 *     Server returns POINTERS. Agent decides what to load.
 *
 *   prime_query(scope, query, id?, ...)
 *     → Same scopes as before (atoms / related / template / mandate / checklist / gallery / scout)
 *       but scope=atoms returns paths where applicable for the v3 backend.
 *
 * PRIME_BACKEND env var controls the data layer:
 *   (unset)     → legacy YAML flat-file atoms (primes/atoms/**)
 *   prime       → .prime-compiled MCP artifacts (packages/compiler/fixtures/compiled-mcp/)
 *   v3          → v3 atom directories (${PRIME_DIR}) — PROJECTION MODEL
 *
 * When PRIME_BACKEND=v3, prime_compile returns paths only (projection mode).
 * When running the legacy backend, prime_compile falls back to the old compiled brief.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { loadAtoms, loadGraph, buildIndex, loadScoutCatalog, type Atom, type Edge, type ScoutEntry } from "./data.ts";
import { search } from "./search.ts";
import { findRelated } from "./graph.ts";
import {
  compileAtoms,
  compileMandates,
  compileChecklist,
  compileDSL,
  compileTemplate,
} from "./compiler.ts";
// prime-system must be cloned as a sibling of prime-corpus-frontend-design.
// Resolved at runtime via PRIME_SYSTEM_ROOT env var or sibling-dir convention.
// Static imports below assume the sibling layout: ../../../prime-system/
// Override with PRIME_SYSTEM_ROOT=/absolute/path/to/prime-system if needed.
import {
  loadIndex,
  loadAtomMeta,
  resolveProjection,
  resolveCollection,
} from "../../../prime-system/packages/runtime/src/atom-loader.ts";
import {
  DomainRegistry,
  FRONTEND_DESIGN_DOMAIN,
  type DomainPlugin,
} from "../../../prime-system/packages/runtime/src/domain-plugin.ts";
import { join, dirname } from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Detect runtime mode
// ---------------------------------------------------------------------------

const PRIME_BACKEND = (globalThis as any)?.process?.env?.PRIME_BACKEND ?? "";
const IS_V3 = PRIME_BACKEND === "v3";

// PRIME_DIR: the compiled atom directory (v3 model)
// Defaults to the repo root's compiled-v3-final if it exists,
// or can be overridden with the PRIME_DIR env var.
const __dirname = dirname(fileURLToPath(import.meta.url));
// mcp-server-frontend lives at app/mcp-server-frontend/ — CORPUS_ROOT is two levels up
const CORPUS_ROOT = join(__dirname, "..", "..");
const REPO_ROOT = (globalThis as any)?.process?.env?.PRIME_REPO_ROOT ?? CORPUS_ROOT;
const PRIME_DIR_DEFAULT = join(CORPUS_ROOT, "compiled-v3-final");
const PRIME_DIR: string = (globalThis as any)?.process?.env?.PRIME_DIR ?? PRIME_DIR_DEFAULT;

// Legacy root for YAML/prime backends
const PRIME_ROOT = new URL("../primes/", import.meta.url).pathname;

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

console.error("[prime-wiki] Loading atoms...");
const atoms = await loadAtoms(PRIME_ROOT);
console.error(`[prime-wiki] ${atoms.size} atoms loaded`);

const edges = await loadGraph(PRIME_ROOT);
console.error(`[prime-wiki] ${edges.length} edges loaded`);

const tagIndex = buildIndex(atoms);
console.error(`[prime-wiki] Index built (${tagIndex.size} tags)`);

const scoutIndex = await loadScoutCatalog(atoms, PRIME_ROOT);
console.error(`[prime-wiki] scout index: ${scoutIndex.length} entries across ${new Set(scoutIndex.map(e => e.source)).size} sources`);

// Load v3 global index if in projection mode
let v3GlobalIndex: Awaited<ReturnType<typeof loadIndex>> | null = null;
if (IS_V3 && existsSync(join(PRIME_DIR, "_index.xml"))) {
  try {
    v3GlobalIndex = loadIndex(PRIME_DIR);
    console.error(`[prime-wiki] v3 _index.xml loaded (${v3GlobalIndex.total} atoms, ${v3GlobalIndex.totalTokens} total tokens)`);
  } catch (err) {
    console.error(`[prime-wiki] v3 _index.xml load failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// Domain Registry (PRIME-SPEC §11)
// ---------------------------------------------------------------------------
//
// The DomainRegistry was previously test-only; wiring it into the MCP server
// gives ranking a real "does this atom belong to my domain?" signal beyond
// keyword overlap. Built-in domains are registered at startup.

const domainRegistry = new DomainRegistry();
domainRegistry.register(FRONTEND_DESIGN_DOMAIN);

const SECURITY_DOMAIN: DomainPlugin = {
  name: "security",
  tags: Object.freeze([
    "security", "owasp", "auth", "authn", "authz", "csrf", "xss",
    "sqli", "rce", "deserialization", "ssrf", "cors", "csp", "tls",
    "encryption", "hashing", "secrets", "token", "session", "cookie",
    "rate-limit", "input-validation", "sanitize",
  ]),
  scopeCheck(ast) {
    const tags = (ast.body?.find((f: any) => f.key === "tags")?.value?.items ?? [])
      .filter((v: any) => v.type === "String")
      .map((v: any) => String(v.value).toLowerCase());
    for (const t of SECURITY_DOMAIN.tags) {
      if (tags.includes(t)) return true;
    }
    const domain = String(ast.body?.find((f: any) => f.key === "domain")?.value?.value ?? "").toLowerCase();
    return domain === "security";
  },
};
domainRegistry.register(SECURITY_DOMAIN);

const A11Y_DOMAIN: DomainPlugin = {
  name: "accessibility",
  tags: Object.freeze([
    "a11y", "accessibility", "aria", "wcag", "screen-reader",
    "keyboard", "focus", "contrast", "alt-text", "landmarks",
    "skip-link", "live-region",
  ]),
  scopeCheck(ast) {
    const tags = (ast.body?.find((f: any) => f.key === "tags")?.value?.items ?? [])
      .filter((v: any) => v.type === "String")
      .map((v: any) => String(v.value).toLowerCase());
    for (const t of A11Y_DOMAIN.tags) {
      if (tags.includes(t)) return true;
    }
    const domain = String(ast.body?.find((f: any) => f.key === "domain")?.value?.value ?? "").toLowerCase();
    return domain === "accessibility";
  },
};
domainRegistry.register(A11Y_DOMAIN);

console.error(`[prime-wiki] domain registry: ${domainRegistry.names().join(", ")}`);

/**
 * Lightweight per-atom domain match: looks at atom.id and description against
 * the tag vocabulary of every registered domain. Returns the names of domains
 * the atom matches. Used by rankV3Atoms to bias toward in-domain atoms when
 * the brief mentions a specific domain.
 */
function detectAtomDomains(atomId: string, description: string): Set<string> {
  const blob = (atomId + " " + description).toLowerCase();
  const matched = new Set<string>();
  for (const name of domainRegistry.names()) {
    const plugin = domainRegistry.get(name)!;
    for (const t of plugin.tags) {
      if (blob.includes(t)) {
        matched.add(name);
        break;
      }
    }
  }
  return matched;
}

/**
 * Detect domains the brief references. Used to weight ranking — atoms in a
 * matched domain get a score boost so security briefs surface security atoms
 * even if the brief didn't literally use the same words.
 */
function detectBriefDomains(brief: string, features?: string[]): Set<string> {
  const blob = (brief + " " + (features?.join(" ") ?? "")).toLowerCase();
  const matched = new Set<string>();
  for (const name of domainRegistry.names()) {
    const plugin = domainRegistry.get(name)!;
    for (const t of plugin.tags) {
      if (blob.includes(t)) {
        matched.add(name);
        break;
      }
    }
  }
  return matched;
}

// ---------------------------------------------------------------------------
// Projection-mode helpers
// ---------------------------------------------------------------------------

/**
 * Per-kind soft caps for ranked output. Without these, a generic search like
 * "blog article" can return 8 personas in the top-10, starving the agent of
 * pattern/template variety. Caps are intentionally generous; the multi-axis
 * pipeline (used when `skip_intent=false`) is the strict-budget path.
 */
const KIND_SOFT_CAPS: Record<string, number> = {
  persona: 2,
  template: 4,
  pattern: 4,
  voice: 2,
  example: 3,
  "anti-pattern": 3,
  "counter-example": 2,
  rule: 4,
  fact: 4,
  principle: 3,
  constraint: 3,
  collection: 2,
  method: 2,
};

/**
 * Score atoms by relevance to the task + features.
 * Uses a simple keyword overlap + kind-boost heuristic.
 * Returns atom IDs sorted by score (descending), capped at `maxAtoms`.
 *
 * Filters out deprecated atoms (lifecycle.deprecated_at present).
 * Applies per-kind soft caps so the result mix doesn't collapse into one kind.
 */
function rankV3Atoms(
  task: string,
  features: string[] | undefined,
  personaSchool: string | undefined,
  maxAtoms = 10,
): Array<{ id: string; kind: string; score: number; tokens: number; quality: number }> {
  if (!v3GlobalIndex) return [];

  // Topic synonyms — map task vocabulary to atom-name vocabulary so
  // "排版/typography/editorial" routes to typography atoms, not a11y.
  const TOPIC_SYNONYMS: Record<string, string[]> = {
    typography: ["typography", "type", "font", "serif", "sans", "editorial", "排版", "字体"],
    color:      ["color", "palette", "oklch", "hue", "brand", "颜色", "色彩"],
    layout:     ["layout", "grid", "spacing", "rhythm", "排版", "布局"],
    motion:     ["motion", "animation", "transition", "reduced-motion", "动效"],
    a11y:       ["a11y", "accessibility", "wcag", "focus", "contrast", "keyboard", "无障碍"],
    pricing:    ["pricing", "price", "tier", "plan", "billing", "定价", "套餐"],
    waitlist:   ["waitlist", "signup", "subscribe", "email", "订阅"],
    blog:       ["blog", "article", "post", "editorial", "writing", "博客", "文章"],
    kanban:     ["kanban", "board", "task", "card", "drag", "看板"],
    mobile:     ["mobile", "phone", "touch", "swipe", "手机", "移动"],
    dark:       ["dark", "dark-mode", "theme", "深色"],
    chart:      ["chart", "graph", "analytics", "data", "数据", "图表"],
  };

  // Build a set of canonical topics matched by the task description.
  const taskBlob = [task, ...(features ?? []), personaSchool ?? ""]
    .join(" ")
    .toLowerCase();
  const matchedTopics = new Set<string>();
  for (const [topic, syns] of Object.entries(TOPIC_SYNONYMS)) {
    for (const s of syns) {
      if (taskBlob.includes(s)) {
        matchedTopics.add(topic);
        break;
      }
    }
  }

  // Build the set of domains the brief references — used below for a +score
  // boost on every atom that belongs to one of those domains.
  const briefDomains = detectBriefDomains(task, features);

  // Tokenized needle (latin words ≥3 chars) — for direct id/description match
  const needle = taskBlob
    .split(/[^a-z0-9一-鿿]+/)
    .filter((w) => w.length >= 2);

  // Kind weights — picks design-shaping atoms (persona/template/voice/example)
  // over operational atoms (check/metric/feedback) so the agent reads design
  // language first, evidence second.
  const KIND_BOOST: Record<string, number> = {
    persona:          5,   // declares the visual voice
    template:         5,   // ready-to-use code (palettes, components)
    voice:            4,   // copy / tone
    "anti-pattern":   4,   // strong "do not" guidance
    example:          4,   // concrete reference
    "counter-example":4,
    pattern:          3,   // recurring solution
    method:           3,   // orchestration
    collection:       5,   // bundled skill
    rule:             2,
    constraint:       2,
    taxonomy:         2,
    type:             2,
    fact:             1.5,
    principle:        1.5,
    provocation:      1.5,
    tradeoff:         1.5,
    scope:            1,
    term:             1,
    metric:           1,
    check:            0.8,
    transform:        1,
    tool:             1,
    step:             1,
    source:           0.5,
    feedback:         0.3,  // post-hoc, low priority for fresh builds
    category:         1,
    value:            1,
  };

  // Boost atoms whose id/description hit any matched topic synonym set —
  // catches cases where the task says "blog article" and an atom name says
  // "editorial" without sharing literal tokens.
  const TOPIC_KIND_AFFINITY: Record<string, string[]> = {
    typography: ["persona", "voice", "taxonomy", "fact", "category", "constraint"],
    color:      ["template", "value", "rule", "anti-pattern", "counter-example"],
    layout:     ["pattern", "category", "fact"],
    motion:     ["constraint", "rule", "fact"],
    a11y:       ["rule", "check", "anti-pattern", "metric"],
    blog:       ["persona", "taxonomy", "voice"],
    pricing:    ["pattern", "example"],
    waitlist:   ["pattern", "example"],
    kanban:     ["pattern", "example"],
    mobile:     ["pattern", "constraint"],
    dark:       ["template", "rule"],
    chart:      ["pattern", "fact"],
  };

  const scored = v3GlobalIndex.atoms
    // Defensive deprecated filter: parser already routes deprecated atoms to
    // a separate bucket, but if XML format changes or atom.yaml carries the
    // field we'd rather skip than serve stale guidance.
    .filter((atom) => !(atom as { deprecated_at?: string }).deprecated_at)
    .map((atom) => {
    const hay = (atom.id + " " + atom.description + " " + atom.kind)
      .toLowerCase();
    let score = 0;

    // 1. Direct token overlap (each match = 1)
    for (const w of needle) if (hay.includes(w)) score += 1;

    // 2. Topic synonym hits — if task is "typography" and atom name has
    //    "typography" or "type" or "font", count it
    for (const topic of matchedTopics) {
      const syns = TOPIC_SYNONYMS[topic] ?? [];
      for (const s of syns) {
        if (hay.includes(s)) {
          score += 0.8;
          break;
        }
      }
    }

    // 3. Kind weight (always applied)
    const kindBoost = KIND_BOOST[atom.kind] ?? 1;
    score += kindBoost * 0.5;

    // 4. Topic-kind affinity — if task is typography, persona/voice atoms get
    //    extra credit even if their text doesn't literally say "typography"
    for (const topic of matchedTopics) {
      const affinityKinds = TOPIC_KIND_AFFINITY[topic] ?? [];
      if (affinityKinds.includes(atom.kind)) {
        score += 1.5;
        break;
      }
    }

    // 5. persona_school exact match — if user passes persona_school=editorial,
    //    @impeccable/persona-editorial gets a big boost
    if (personaSchool && atom.kind === "persona") {
      if (atom.id.toLowerCase().includes(personaSchool.toLowerCase())) {
        score += 5;
      }
    }

    // 6. Quality bonus
    score += atom.quality * 0.1;

    // 7. Domain match — atoms in any domain the brief references get a
    //    significant boost. This is the lever that lets a "secure auth" brief
    //    surface security atoms even when their literal vocabulary doesn't
    //    overlap with frontend keywords.
    if (briefDomains.size > 0) {
      const atomDomains = detectAtomDomains(atom.id, atom.description ?? "");
      for (const d of briefDomains) {
        if (atomDomains.has(d)) { score += 2.0; break; }
      }
    }

    return { id: atom.id, kind: atom.kind, score, tokens: atom.tokens, quality: atom.quality };
  });

  const sorted = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // Apply per-kind soft caps so the mix stays varied. We walk the sorted list
  // and accept atoms only while their kind hasn't exceeded its cap. Anything
  // overflow goes to a tail bucket and is appended at the end if maxAtoms
  // hasn't been hit yet (so we never *under-fill* the result).
  const kindCount: Record<string, number> = {};
  const accepted: typeof sorted = [];
  const overflow: typeof sorted = [];
  for (const s of sorted) {
    const cap = KIND_SOFT_CAPS[s.kind];
    const c = kindCount[s.kind] ?? 0;
    if (cap !== undefined && c >= cap) {
      overflow.push(s);
    } else {
      accepted.push(s);
      kindCount[s.kind] = c + 1;
    }
    if (accepted.length >= maxAtoms) break;
  }
  if (accepted.length < maxAtoms) {
    accepted.push(...overflow.slice(0, maxAtoms - accepted.length));
  }
  return accepted;
}


/** Detect topical hints from the task description — exposed to the agent
 *  so it can see *why* certain atoms ranked high, rather than the ranker's
 *  decision being a black box. */
function detectTopics(task: string, features?: string[], personaSchool?: string): string[] {
  const TOPIC_SYNONYMS: Record<string, string[]> = {
    typography: ["typography", "type", "font", "serif", "sans", "editorial", "排版", "字体"],
    color:      ["color", "palette", "oklch", "hue", "brand", "颜色", "色彩"],
    layout:     ["layout", "grid", "spacing", "rhythm", "排版", "布局"],
    motion:     ["motion", "animation", "transition", "reduced-motion", "动效"],
    a11y:       ["a11y", "accessibility", "wcag", "focus", "contrast", "keyboard", "无障碍"],
    pricing:    ["pricing", "price", "tier", "plan", "billing", "定价", "套餐"],
    waitlist:   ["waitlist", "signup", "subscribe", "email", "订阅"],
    blog:       ["blog", "article", "post", "editorial", "writing", "博客", "文章"],
    kanban:     ["kanban", "board", "task", "card", "drag", "看板"],
    mobile:     ["mobile", "phone", "touch", "swipe", "手机", "移动"],
    dark:       ["dark", "dark-mode", "theme", "深色"],
    chart:      ["chart", "graph", "analytics", "data", "数据", "图表"],
  };
  const blob = [task, ...(features ?? []), personaSchool ?? ""].join(" ").toLowerCase();
  const hits: string[] = [];
  for (const [topic, syns] of Object.entries(TOPIC_SYNONYMS)) {
    if (syns.some((s) => blob.includes(s))) hits.push(topic);
  }
  return hits;
}

/**
 * Choose the projection level for each atom based on its kind.
 *
 * Design-shaping kinds (persona/template/voice/example/counter-example)
 * carry their value in *structured fields* (implies, palette, prohibitions,
 * body). Those fields only land in the `full` projection — picking summary
 * for them gives the agent a 3-line stub instead of the actual design
 * language. Operational kinds (check/metric) keep their value in summary.
 */
function chooseLevel(kind: string, isPrimary: boolean): "summary" | "core" | "full" {
  // Design language → full
  if (kind === "persona" || kind === "voice" || kind === "template") return "full";
  if (kind === "example" || kind === "counter-example") return "full";
  if (kind === "anti-pattern") return "full";
  if (kind === "constraint" && isPrimary) return "full";

  // Composition / orchestration → core
  if (isPrimary) return "core";
  if (kind === "method" || kind === "pattern" || kind === "collection") return "core";
  if (kind === "rule" || kind === "taxonomy") return "core";

  return "summary";
}

// ---------------------------------------------------------------------------
// Legacy helper: scout references (unchanged)
// ---------------------------------------------------------------------------

function buildReferencesSection(
  task: string,
  school: string | undefined,
  features: string[] | undefined,
  scout: ScoutEntry[],
  limit = 4,
): string {
  const needle = [task, school ?? "", ...(features ?? [])]
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3);
  if (needle.length === 0) return "";

  const CURATED_SOURCES = new Set([
    "Godly", "One Page Love", "Lapa Ninja", "HTMLrev", "Collect UI",
  ]);

  type Scored = { entry: ScoutEntry; score: number };
  const scored: Scored[] = [];
  for (const entry of scout) {
    if (!entry.thumbnail) continue;
    const hay = (entry.title + " " + (entry.description ?? "") + " " + entry.source_name).toLowerCase();
    let score = 0;
    for (const tok of needle) if (hay.includes(tok)) score += 1;
    if (score === 0) continue;
    if (CURATED_SOURCES.has(entry.source_name)) score += 1;
    scored.push({ entry, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const picks = scored.slice(0, limit);
  if (picks.length === 0) return "";

  const lines: string[] = [];
  lines.push("## References");
  lines.push(`Concrete visual anchors (${picks.length} picks · describe what you observe, don't verbatim-clone):`);
  for (const { entry } of picks) {
    const byline = `${entry.source_name} · ${entry.title.slice(0, 70)}`;
    lines.push(`- ![ref](${entry.thumbnail}) ${byline}${entry.url ? ` — ${entry.url}` : ""}`);
  }
  lines.push("");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "prime-wiki",
  version: IS_V3 ? "4.0.0" : "3.0.0",
});

// ─── Tool 1: prime_compile ────────────────────────────────────────────────

server.tool(
  "prime_compile",
  "Compile a frontend brief into a structured atom retrieval plan. Returns 6 axes (register/pattern/motion/typography/color/rules), each with primary + alternates. Internally: classifies brief into Intent, runs multi-axis retrieval, applies composition contract.",
  {
    brief: z.string().describe("Free-form brief describing the UI to build"),
    mode: z.enum(["browse", "push"]).optional().default("browse"),
    skip_intent: z.boolean().optional().default(false).describe(
      "If true, skip intent classification and use raw keyword search (legacy behavior). " +
      "Also accepts legacy 'task' field as alias for brief."
    ),
    // ── legacy compat fields (still accepted when skip_intent=true) ──────────
    task: z.string().optional().describe("Legacy alias for brief — used when skip_intent=true"),
    persona_school: z.enum([
      "editorial", "dense-pragmatist", "brutalist",
      "swiss-modernist", "tokyo-minimal", "warm-institutional",
      "notion", "stripe", "linear", "toss", "vercel",
    ]).optional().describe("Design school / aesthetic direction (legacy)"),
    persona_flavor: z.array(z.string()).optional().describe("Additional flavor modifiers (legacy)"),
    persona_attitude: z.enum(["opinionated", "restrained", "provocative", "academic"]).optional(),
    voice_tone: z.enum(["imperative", "gentle", "academic", "casual", "provocative"]).optional(),
    features: z.array(z.string()).optional().describe("Specific features, e.g. ['dark-mode', 'sidebar'] (legacy)"),
    hue: z.number().min(0).max(360).optional().describe("Brand hue (0-360) for OKLCH palette (legacy)"),
    chroma: z.number().min(0).max(0.4).optional().describe("Color saturation (legacy)"),
    include_references: z.boolean().optional().default(true).describe("Append References section (legacy)"),
    budget: z.number().min(100).max(5000).optional().describe("Token budget (legacy)"),
    max_atoms: z.number().min(1).max(50).optional().describe("Max index entries (legacy)"),
  },
  async ({ brief, mode, skip_intent, task, persona_school, persona_flavor, persona_attitude, voice_tone, features, hue, chroma, include_references, budget, max_atoms }) => {

    const ROOT = CORPUS_ROOT;

    // ── Legacy / skip_intent path ─────────────────────────────────────────
    if (skip_intent) {
      // Resolve effective task string: prefer explicit task field, fall back to brief
      const effectiveTask = task ?? brief;

      // ── v3 Browse Mode (wiki) ───────────────────────────────────────────
      if (IS_V3 && v3GlobalIndex && mode !== "push") {
        const cap = max_atoms ?? 24;
        const ranked = rankV3Atoms(effectiveTask, features, persona_school, cap);

        const indexEntries = ranked.map((r) => {
          const atomMeta = v3GlobalIndex!.atoms.find((a) => a.id === r.id);
          return {
            id: r.id,
            kind: r.kind,
            description: atomMeta?.description?.slice(0, 140) ?? "",
            tokens: { summary: Math.max(12, Math.round(r.tokens * 0.2)), core: Math.max(20, Math.round(r.tokens * 0.6)), full: r.tokens },
            quality: r.quality,
          };
        });

        const result = {
          mode: "browse",
          task: effectiveTask,
          topic_hints: detectTopics(effectiveTask, features, persona_school),
          index: indexEntries,
          path_template: `${PRIME_DIR}/<id>/chunks/{summary|core|full}.md`,
          instructions: [
            "1. Browse the `index` above — these are atoms whose names/descriptions match your task. You decide which to read.",
            "2. For each atom you pick, choose a projection level based on what you need:",
            "   • summary (~30 tok) — just enough to know if it's relevant",
            "   • core (~150 tok) — main fields (claim, statement, body, steps)",
            "   • full (~380 tok) — every field including kind-specific (implies, palette, prohibitions, examples)",
            "3. Use the `Read` tool on the path: " + PRIME_DIR + "/<atom-id>/chunks/<level>.md",
            "4. Need more? Call `prime_query(scope='atoms', query='...')` to search by keyword,",
            "   or `prime_query(scope='related', id='<atom-id>')` to traverse the graph.",
            "5. Don't load everything. Pick what your current step actually needs.",
          ].join("\n"),
        };

        return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
      }

      // ── v3 Push Mode (legacy, server picks for you) ─────────────────────
      if (IS_V3 && v3GlobalIndex) {
        const tokenBudget = budget ?? 1500;
        const atomCap = max_atoms ?? 8;

        const ranked = rankV3Atoms(effectiveTask, features, persona_school, atomCap * 2);

        const projections: Array<{
          id: string;
          kind: string;
          level: "summary" | "core" | "full";
          reason: string;
          path: string;
          tokens: number;
        }> = [];

        let tokensSoFar = 0;
        let isFirst = true;

        for (const candidate of ranked) {
          if (projections.length >= atomCap) break;
          const level = chooseLevel(candidate.kind, isFirst);

          let tokenCost = candidate.tokens;
          if (level === "summary") tokenCost = Math.max(12, Math.round(candidate.tokens * 0.2));
          else if (level === "core") tokenCost = Math.max(20, Math.round(candidate.tokens * 0.6));

          if (tokensSoFar + tokenCost > tokenBudget && projections.length > 0) break;
          tokensSoFar += tokenCost;

          let resolvedPath: string;
          let exactTokens = tokenCost;
          try {
            const meta = loadAtomMeta(PRIME_DIR, candidate.id);
            exactTokens = meta.tokens[level];
            resolvedPath = resolveProjection(PRIME_DIR, candidate.id, level);
          } catch {
            resolvedPath = join(PRIME_DIR, candidate.id, "chunks", `${level}.md`);
          }

          const reason = isFirst
            ? "primary orchestration / best match"
            : candidate.kind === "rule" ? "validates output"
            : candidate.kind === "fact" ? "foundational constraint"
            : "supporting context";

          projections.push({ id: candidate.id, kind: candidate.kind, level, reason, path: resolvedPath, tokens: exactTokens });
          isFirst = false;
        }

        const result = {
          mode: "push",
          atoms: projections.map(({ id, kind, level, reason, path }) => ({ id, kind, level, reason, path })),
          orchestration: projections[0]?.id ?? "",
          total_tokens_if_loaded: projections.reduce((sum, p) => sum + p.tokens, 0),
          instructions:
            "[push mode — server picked these for you] Read each path. Start with orchestration atom. " +
            "Load summary first, decide if you need core/full.",
        };

        return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
      }

      // ── Legacy Mode (YAML / prime backends) ─────────────────────────────
      const LEGACY_TASKS = [
        "admin-dashboard", "marketing-page", "content-site",
        "data-viz", "mobile-app", "form-wizard", "design-system",
      ] as const;
      type LegacyTask = typeof LEGACY_TASKS[number];

      const legacyTask: LegacyTask = LEGACY_TASKS.find(
        (t) => effectiveTask === t || effectiveTask.includes(t.replace("-", " ")) || t.includes(effectiveTask.toLowerCase().replace(/\s+/g, "-"))
      ) ?? "marketing-page";

      const compiled = compileDSL(
        { task: legacyTask, persona_school, persona_flavor, persona_attitude, voice_tone, features, hue, chroma },
        atoms,
        tagIndex,
        edges,
      );
      const refs = include_references !== false
        ? buildReferencesSection(legacyTask, persona_school, features, scoutIndex)
        : "";
      const full = refs ? `${compiled}\n\n${refs}` : compiled;
      return { content: [{ type: "text" as const, text: full }] };
    }

    // ── v2 path: intent-aware multi-axis retrieval ─────────────────────────
    const { classifyBrief } = await import("../intent/src/index.ts");
    const { multiAxisRetrieve } = await import("../retrieval/src/index.ts");

    const intent = await classifyBrief(brief);
    const result = await multiAxisRetrieve(intent, ROOT);

    // Try to load composition contracts for the picked register persona(s)
    let contract = null;
    try {
      const { extractContract } = await import("../composition/src/index.ts");
      const registerAxis = result.axes.find((a: { axis: string }) => a.axis === "register");
      if (registerAxis?.primary?.id) {
        // map @community/persona-stripe → ROOT/primes-v3/sources/@community/persona-stripe.prime
        const personaPath = registerAxis.primary.id
          .replace("@", `${ROOT}/primes-v3/sources/@`)
          .replace(/\/(\w)/, "/$1") + ".prime";
        contract = extractContract(personaPath);
      }
    } catch (_e) {
      // contract optional — composition package may not be ready
    }

    // Build the MANDATORY READ list from contract.must_include + taxonomy.required_atoms
    // (these are stronger than `related:` — agent must Read full.md of each)
    const mandatoryReads = new Set<string>();
    if (contract?.must_include) {
      for (const id of contract.must_include) mandatoryReads.add(id);
    }
    const taskYaml = result.task_yaml as any;
    if (Array.isArray(taskYaml?.required_atoms)) {
      for (const id of taskYaml.required_atoms) mandatoryReads.add(id);
    }

    // Per-task-type mandatory_reads cap. Content-heavy tasks (blog/doc/about)
    // need fewer mandatory reads — agent should produce HTML with prose, not
    // do 13 wiki turns. Motion-heavy tasks (toast/modal) get full list.
    const taskTypeBudgets: Record<string, number> = {
      "content": 3,                 // blog / doc / podcast / about — keep agent fast
      "marketing-landing": 5,
      "product-ui": 7,
      "interaction": 12,            // toast / modal — must read all motion templates
      "dev-tool": 7,
    };
    const cap = taskTypeBudgets[intent.task_type] ?? 8;
    const mandatoryPaths = [...mandatoryReads].slice(0, cap).map((id) => {
      const fullPath = `${ROOT}/compiled-v3-final/${id}/chunks/full.md`;
      return { id, path: fullPath };
    });

    // Per-task-type turn budget hint (helps agent self-pace on long-form tasks)
    const turnHints: Record<string, string> = {
      "content": "HARD BUDGET: ≤6 turns total. After reading the mandatory atoms in Step 2, START WRITING HTML IMMEDIATELY. Do NOT call prime_query for additional research. Content tasks are 95% prose synthesis — extra atoms do NOT improve output.",
      "marketing-landing": "Aim for ≤8 turns — focused atom retrieval is enough.",
      "product-ui": "Aim for ≤10 turns — UI components benefit from depth but don't over-research.",
      "interaction": "Up to 12 turns OK — motion craft requires reading multiple templates.",
      "dev-tool": "Aim for ≤10 turns.",
    };
    const turnHint = turnHints[intent.task_type] ?? "Aim for ≤8 turns.";

    const output = {
      mode,
      brief,
      intent,
      axes: result.axes,
      task_yaml: result.task_yaml,
      composition_contract: contract,
      total_atoms: result.total_atoms,
      mandatory_reads: mandatoryPaths,
      mandatory_reads_cap: cap,
      turn_budget_hint: turnHint,
      instructions: [
        "Step 1: Read the picked persona's full.md (axis=register).",
        `Step 2: **MANDATORY** — Read the full.md of EACH atom in mandatory_reads (capped at ${cap} for ${intent.task_type} tasks). Do NOT exceed this — read these and stop researching.`,
        ...mandatoryPaths.map((m) => `   - Read ${m.path}`),
        `Step 3: ${turnHint} Do NOT call prime_query for additional atoms unless absolutely necessary.`,
        "Step 4: Honor composition_contract.quality_thresholds (e.g. min-keyframes, requires-cubic-bezier, requires-reduced-motion-fallback).",
        "Step 5: Honor task_yaml.quality_checks — every check must be observable in the output HTML.",
        "Step 6: Avoid composition_contract.must_avoid + task_yaml.forbidden_atoms.",
        "Step 7: Synthesize HTML now using the prescribed typography (typography_required) / color (color_required) / motion (motion_prescriptions). Stop researching — start writing.",
      ],
    };

    return { content: [{ type: "text" as const, text: JSON.stringify(output, null, 2) }] };
  }
);

// ─── Tool 2: prime_query ──────────────────────────────────────────────────

server.tool(
  "prime_query",
  "Follow-up queries after prime_compile. scope picks what you want: 'atoms' (keyword search), 'related' (graph traversal from an atom id), 'template' (fetch a template atom), 'mandate' (all hard mandates), 'checklist' (pre-ship checklist for a task), 'gallery' (reference screenshots for a section), 'scout' (search 57k external design references).",
  {
    scope: z.enum([
      "atoms", "related", "template", "mandate", "checklist", "gallery", "scout",
    ]).describe("Which sub-query to run"),
    query: z.string().optional().describe("Keywords (for atoms/scout/gallery)"),
    id: z.string().optional().describe("Atom id (for related/template)"),
    depth: z.number().min(1).max(3).optional().describe("Graph-traversal depth for scope=related (default 1)"),
    task: z.string().optional().describe("Task type for scope=checklist"),
    section: z.enum([
      "hero", "pricing", "cta", "features", "footer", "testimonial", "full-landing", "all",
    ]).optional().describe("Section type for scope=gallery"),
    limit: z.number().min(1).max(50).optional().describe("Max results (default 10 for atoms/scout, 20 for gallery)"),
    variables: z.record(z.any()).optional().describe("Variable substitutions for scope=template"),
  },
  async ({ scope, query, id, depth, task, section, limit, variables }) => {
    switch (scope) {
      case "atoms": {
        if (!query) throw new Error("scope=atoms requires query");

        // v3: return paths instead of content where atoms have a v3 directory
        if (IS_V3 && v3GlobalIndex) {
          const needle = query.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 3);
          const hits = v3GlobalIndex.atoms
            .filter((atom) => !(atom as { deprecated_at?: string }).deprecated_at)
            .filter((atom) => {
              const hay = (atom.id + " " + atom.description + " " + atom.kind).toLowerCase();
              return needle.some((w) => hay.includes(w));
            })
            .slice(0, limit ?? 10);

          const results = hits.map((atom) => {
            let corePath: string;
            try {
              corePath = resolveProjection(PRIME_DIR, atom.id, "core");
            } catch {
              corePath = join(PRIME_DIR, atom.id, "chunks", "core.md");
            }
            return {
              id: atom.id,
              kind: atom.kind,
              tokens: atom.tokens,
              quality: atom.quality,
              description: atom.description,
              path: corePath,
            };
          });

          return {
            content: [{
              type: "text" as const,
              text: JSON.stringify({ query, count: results.length, atoms: results }, null, 2),
            }],
          };
        }

        // Legacy path
        const results = search(query, undefined, atoms, tagIndex, edges, limit ?? 10);
        return { content: [{ type: "text" as const, text: compileAtoms(results, query) }] };
      }

      case "related": {
        if (!id) throw new Error("scope=related requires id");
        const results = findRelated(id, depth ?? 1, atoms, edges);
        return { content: [{ type: "text" as const, text: compileAtoms(results, `Related to ${id}`) }] };
      }

      case "template": {
        if (!id) throw new Error("scope=template requires id");
        return { content: [{ type: "text" as const, text: compileTemplate({ id, variables }, atoms) }] };
      }

      case "mandate": {
        return { content: [{ type: "text" as const, text: compileMandates(atoms) }] };
      }

      case "checklist": {
        if (!task) throw new Error("scope=checklist requires task");
        // For legacy checklist, task must be a known enum value
        const LEGACY_TASKS = [
          "admin-dashboard", "marketing-page", "content-site",
          "data-viz", "mobile-app", "form-wizard", "design-system",
        ] as const;
        type LegacyTask = typeof LEGACY_TASKS[number];
        const legacyTask: LegacyTask = LEGACY_TASKS.find((t) => t === task) ?? "marketing-page";
        return { content: [{ type: "text" as const, text: compileChecklist(legacyTask, atoms, tagIndex, edges) }] };
      }

      case "gallery": {
        const sec = section ?? "all";
        const cap = limit ?? 20;
        const galleryAtoms = [...atoms.values()].filter((a) => a.subtype === "reference-gallery");
        const sectionAtoms = sec === "all"
          ? galleryAtoms
          : galleryAtoms.filter((a) => {
              const hay = (a.id + " " + (a.tags || []).join(" ") + " " + (a.name || "")).toLowerCase();
              return hay.includes(sec);
            });
        type GalleryItem = { file?: string; path?: string; pattern?: string; persona_lean?: string | string[]; [k: string]: any };
        const items: GalleryItem[] = [];
        for (const atom of sectionAtoms) {
          const g = (atom as unknown as { gallery?: { items?: unknown[]; base_path?: string } }).gallery;
          const nested = g && Array.isArray(g.items) ? (g.items as GalleryItem[]) : [];
          const flat = Array.isArray(atom.items) ? (atom.items as GalleryItem[]) : [];
          const basePath = g?.base_path;
          for (const item of (nested.length > 0 ? nested : flat)) {
            items.push({ ...item, _source_atom: atom.id, _base_path: basePath });
          }
        }
        const payload = items.slice(0, cap);
        return { content: [{ type: "text" as const, text: JSON.stringify({ count: payload.length, items: payload }, null, 2) }] };
      }

      case "scout": {
        if (!query) throw new Error("scope=scout requires query");
        const cap = limit ?? 10;
        const needle = query.toLowerCase();
        const hits = scoutIndex.filter((e) => {
          const hay = (e.title + " " + (e.description ?? "") + " " + e.source_name).toLowerCase();
          return hay.includes(needle);
        }).slice(0, cap);
        return { content: [{ type: "text" as const, text: JSON.stringify({ count: hits.length, items: hits }, null, 2) }] };
      }
    }
  }
);

// ─── Tool 3: prime_intent ─────────────────────────────────────────────────

server.tool(
  "prime_intent",
  "Classify a frontend task brief into structured Intent — register candidates, vibe, motion priority, density, domain. Use this BEFORE prime_compile to get smart atom retrieval.",
  {
    brief: z.string().describe("Free-form brief in any language. Example: '邮件订阅, 简单就行' or 'B2B SaaS pricing page'"),
  },
  async ({ brief }) => {
    const { classifyBrief } = await import("../intent/src/index.ts");
    const intent = await classifyBrief(brief);
    return {
      content: [{ type: "text" as const, text: JSON.stringify(intent, null, 2) }],
    };
  }
);

// ─── Tool 4: prime_validate ───────────────────────────────────────────────

server.tool(
  "prime_validate",
  "Validate a generated index.html against the design intent + composition contract. Returns pass/fail with structured feedback. Call this AFTER writing your HTML to verify it meets the spec; if it fails, fix the issues and re-validate.",
  {
    html_path: z.string().describe("Absolute path to the index.html to validate"),
    brief: z.string().describe("Original brief — used to re-classify intent for L2 semantic check"),
  },
  async ({ html_path, brief }) => {
    const ROOT = CORPUS_ROOT;
    const { classifyBrief } = await import("../intent/src/index.ts");
    const { validate } = await import("../validator/src/index.ts");
    const { extractContract, mergeContracts } = await import("../composition/src/index.ts");
    const { multiAxisRetrieve } = await import("../retrieval/src/index.ts");

    const intent = await classifyBrief(brief);
    const result = await multiAxisRetrieve(intent, ROOT);
    const registerAxis = result.axes.find((a: any) => a.axis === "register");
    let contract = null;
    try {
      if (registerAxis?.primary?.id) {
        const personaPath = registerAxis.primary.id.replace("@", `${ROOT}/primes-v3/sources/@`).replace(/\/(\w)/, "/$1") + ".prime";
        contract = extractContract(personaPath);
      }
    } catch (_e) { /* contract optional */ }

    // Build a MergedContract shape (validator expects MergedContract)
    const mergedContract = contract
      ? {
          source_atoms: [contract.source_atom],
          must_include: new Set(contract.must_include),
          must_avoid: new Set(contract.must_avoid),
          typography_required: contract.typography_required,
          color_required: contract.color_required,
          motion_prescriptions: new Set(contract.motion_prescriptions),
          conflicts: [],
        }
      : {
          source_atoms: [],
          must_include: new Set<string>(),
          must_avoid: new Set<string>(),
          typography_required: {},
          color_required: {},
          motion_prescriptions: new Set<string>(),
          conflicts: [],
        };

    const report = await validate(html_path, intent, mergedContract);

    return { content: [{ type: "text" as const, text: JSON.stringify(report, null, 2) }] };
  }
);

// ─── Tool 5: prime_resolve ────────────────────────────────────────────────

server.tool(
  "prime_resolve",
  "Resolve a frontend brief into a typed design spec — concrete font names, hex colors, durations, sizes — ready to insert into CSS. Use this INSTEAD OF prime_compile when you want JSON values, not markdown paths.",
  {
    brief: z.string().describe("Free-form brief describing the UI to build"),
  },
  async ({ brief }) => {
    const ROOT = CORPUS_ROOT;
    const { resolveDesign } = await import("../retrieval/src/index.ts");
    const resolved = await resolveDesign(brief, ROOT);
    return { content: [{ type: "text" as const, text: JSON.stringify(resolved, null, 2) }] };
  }
);

// ─── boot ─────────────────────────────────────────────────────────────────

await server.connect(new StdioServerTransport());
console.error(
  `[prime-wiki] MCP server ready · 5 tools: prime_compile, prime_query, prime_intent, prime_validate, prime_resolve · ` +
  `backend=${PRIME_BACKEND || "yaml"} · mode=${IS_V3 ? "projection (v3)" : "legacy brief"}`
);
