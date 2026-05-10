/**
 * Data loading: atoms + graph + index
 */

import { readdir, readFile } from "fs/promises";
import { join, resolve, dirname } from "path";
import { parse as parseYaml } from "yaml";
import { existsSync } from "fs";

export interface Atom {
  id: string;
  type: string;
  subtype: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  module: string;
  activation: string;
  priority: number;
  severity?: string;
  related?: string[];
  // Content fields.
  // `claim` is the single authoritative field after schema migration v2
  // (PRIME-REBUILD §4.2). The legacy fields (statement / rule_of_thumb /
  // principle) are still read as fallbacks for atoms written before the
  // migration, but all writers should emit `claim`.
  claim?: string;
  statement?: string;
  rationale?: string;
  concept?: string;
  rule_of_thumb?: string;
  when_it_fails?: string;
  situation?: string;
  pattern_name?: string;
  what_it_looks_like?: string;
  consequence?: string;
  remedy?: string;
  anti_pattern?: string;
  why_tempting?: string;
  use_instead?: string;
  metric?: string;
  pass?: string;
  warn?: string;
  block?: string;
  what?: string;
  why_preferred?: string;
  principle?: string;
  attributed_to?: string;
  applies_when?: string;
  verify_by?: string;
  use_when?: string[];
  use_cases?: string[];
  anatomy?: string[];
  members?: string[];
  what_it_classifies?: string;
  composition_notes?: string;
  tradeoff?: string;
  notes?: string;
  // Persona fields
  implies?: Record<string, any>;
  css_overrides?: string;
  narrative?: { activation?: string; tired_of?: string[]; closing?: string };
  compatible_with?: string[];
  incompatible_with?: string[];
  // Constraint fields
  blacklisted?: any[];
  whitelisted?: any[];
  approved?: any[];
  families?: any[];
  exception?: string;
  // Template fields
  code?: string;
  trigger?: string[];
  variables?: Record<string, any>;
  // Provocation fields
  question?: string;
  trigger_tags?: string[];
  // Sequence fields
  steps?: any[];
  // Exemplar fields
  domain?: string;
  [key: string]: any;
}

export interface Edge {
  from: string;
  to: string;
  /** New field name (graph.json v2+). */
  relation?: string;
  /** Legacy field name, kept for backwards compat with older graph snapshots. */
  type?: string;
  inferred_by?: string;
}

/** Normalize an atom's fields to ensure type safety. */
function normalizeAtom(data: Record<string, any>, defaultModule: string): void {
  if (!Array.isArray(data.tags)) data.tags = [];
  data.name = data.name || data.id.split("/").pop() || data.id;
  data.description = data.description || "";
  data.module = data.module || defaultModule;
  data.activation = data.activation || "reference";
  data.priority = typeof data.priority === "number" ? data.priority : 3;
  // Normalize category: community/axe atoms use numeric category — coerce to string
  if (data.category !== undefined && data.category !== null) {
    data.category = String(data.category);
  } else {
    data.category = "";
  }
  // Ensure subtype is a string
  if (!data.subtype) data.subtype = "knowledge";
  if (!data.type) data.type = "knowledge";
}

interface LoadStats {
  ok: number;
  no_frontmatter: number;
  no_id: number;
  yaml_error: number;
  duplicate_id: number;
  read_error: number;
}

function emptyStats(): LoadStats {
  return { ok: 0, no_frontmatter: 0, no_id: 0, yaml_error: 0, duplicate_id: 0, read_error: 0 };
}

/** Load one atom file, updating stats. Returns true if atom was added. */
async function loadOneAtom(
  filePath: string,
  defaultModule: string,
  atomMap: Map<string, Atom>,
  stats: LoadStats,
): Promise<void> {
  let raw: string;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch (err) {
    stats.read_error++;
    console.error(`[prime-wiki] atom read failed: ${filePath}: ${err}`);
    return;
  }

  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    stats.no_frontmatter++;
    console.error(`[prime-wiki] atom missing frontmatter: ${filePath}`);
    return;
  }

  let data: Record<string, any>;
  try {
    data = parseYaml(match[1]);
  } catch (err) {
    stats.yaml_error++;
    console.error(`[prime-wiki] atom YAML parse failed: ${filePath}: ${err}`);
    return;
  }

  if (!data?.id) {
    stats.no_id++;
    console.error(`[prime-wiki] atom missing id field: ${filePath}`);
    return;
  }

  normalizeAtom(data, defaultModule);
  const notesMatch = raw.match(/## Notes\n([\s\S]*?)$/);
  if (notesMatch) data.notes = notesMatch[1].trim();

  if (atomMap.has(data.id)) {
    stats.duplicate_id++;
    console.error(`[prime-wiki] duplicate atom id "${data.id}" at ${filePath} (keeping first)`);
    return;
  }

  // Archived atoms stay on disk for traceability (derived_from chains,
  // audit history) but are excluded from runtime — they've been split or
  // superseded and their children/successors represent them.
  if (data.status === "archived") {
    return;
  }

  atomMap.set(data.id, data as Atom);
  stats.ok++;
}

/** Load atoms from a flat directory (community, axe, etc.). */
async function loadFlatAtomDir(
  atomsDir: string,
  defaultModule: string,
  atomMap: Map<string, Atom>,
  stats: LoadStats,
): Promise<void> {
  if (!existsSync(atomsDir)) return;
  const files = await readdir(atomsDir);
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    await loadOneAtom(join(atomsDir, file), defaultModule, atomMap, stats);
  }
}

export async function loadAtoms(primeRoot: string): Promise<Map<string, Atom>> {
  // Backend switch:
  //   PRIME_BACKEND=prime   → .prime-compiled MCP artifacts (compiled-mcp/*.md)
  //   PRIME_BACKEND=v3      → v3 atom directories (${PRIME_DIR}) — projection model
  //                           Reads atom.yaml metadata only; chunks are lazy-loaded
  //                           by the agent via the Read tool.
  const backend = (globalThis as any)?.process?.env?.PRIME_BACKEND;
  if (backend === "prime") {
    return loadPrimeBackendAtoms(primeRoot);
  }
  if (backend === "v3") {
    return loadV3BackendAtoms(primeRoot);
  }

  const atomMap = new Map<string, Atom>();
  const stats = emptyStats();
  const modulesDir = join(primeRoot, "modules");

  if (existsSync(modulesDir)) {
    const dirs = await readdir(modulesDir);
    // Valid module prefixes: M01-M16, P01, V01, C01, S01, E01, Q01, T01, T02
    const MODULE_PREFIXES = ["M", "P", "V", "C", "S", "E", "Q", "T"];
    for (const dir of dirs) {
      if (!MODULE_PREFIXES.some(p => dir.startsWith(p))) continue;
      const atomsDir = join(modulesDir, dir, "atoms");
      if (!existsSync(atomsDir)) continue;

      const files = await readdir(atomsDir);
      const mod = dir.split("-")[0];
      for (const file of files) {
        if (!file.endsWith(".md")) continue;
        await loadOneAtom(join(atomsDir, file), mod, atomMap, stats);
      }
    }
  }

  await loadFlatAtomDir(join(primeRoot, "atoms", "community"), "community", atomMap, stats);
  await loadFlatAtomDir(join(primeRoot, "atoms", "axe"), "axe", atomMap, stats);

  const failed = stats.no_frontmatter + stats.no_id + stats.yaml_error + stats.duplicate_id + stats.read_error;
  if (failed > 0) {
    console.error(
      `[prime-wiki] atom load summary: ${stats.ok} ok, ${failed} failed ` +
      `(no_frontmatter=${stats.no_frontmatter}, no_id=${stats.no_id}, ` +
      `yaml_error=${stats.yaml_error}, duplicate_id=${stats.duplicate_id}, read_error=${stats.read_error})`,
    );
  } else {
    console.error(`[prime-wiki] atom load summary: ${stats.ok} ok, 0 failed`);
  }

  return atomMap;
}

/**
 * Alternate atom loader — reads from the .prime-compiled MCP artifacts
 * (packages/compiler/fixtures/compiled-mcp/*.md) when PRIME_BACKEND=prime.
 *
 * Default path resolves relative to primeRoot's parent (the repo root).
 * Override with PRIME_BACKEND_DIR if the artifacts live elsewhere.
 */
async function loadPrimeBackendAtoms(primeRoot: string): Promise<Map<string, Atom>> {
  const atomMap = new Map<string, Atom>();
  const stats = emptyStats();
  const overrideDir = (globalThis as any)?.process?.env?.PRIME_BACKEND_DIR;
  const defaultDir = join(dirname(primeRoot), "packages/compiler/fixtures/compiled-mcp");
  const dir = overrideDir ?? defaultDir;

  if (!existsSync(dir)) {
    console.error(
      `[prime-wiki] PRIME_BACKEND=prime but ${dir} does not exist. ` +
      `Run: bun run scripts/yaml-to-prime.ts --apply && ` +
      `bun run scripts/compile-corpus.ts --format yaml-atom --out ${defaultDir}`
    );
    return atomMap;
  }

  await loadFlatAtomDir(dir, "prime", atomMap, stats);
  const failed = stats.no_frontmatter + stats.no_id + stats.yaml_error + stats.duplicate_id + stats.read_error;
  console.error(
    `[prime-wiki] prime-backend load: ${stats.ok} ok, ${failed} failed from ${dir}`
  );
  return atomMap;
}

export async function loadGraph(primeRoot: string): Promise<Edge[]> {
  // Backend switch (matches loadAtoms): PRIME_BACKEND=prime builds the graph
  // from the new .prime corpus instead of reading compiled/graph.json. The
  // old graph references YAML atom ids (@community/..., @MXX/...) while the
  // new prime corpus uses @prime/... — mixing them creates id mismatches,
  // so the two paths are exclusive.
  const backend = (globalThis as any)?.process?.env?.PRIME_BACKEND;
  if (backend === "v3") {
    return loadV3BackendGraph(primeRoot);
  }
  if (backend === "prime") {
    return loadPrimeBackendGraph(primeRoot);
  }

  // Priority 1: compiled graph (includes inferred edges from compile-all.ts
  // heuristics — tag-cooccurrence, anti-pattern-pair, use-instead-ref, etc.)
  const compiledPath = join(primeRoot, "compiled/graph.json");
  if (existsSync(compiledPath)) {
    try {
      const raw = await readFile(compiledPath, "utf-8");
      const parsed = JSON.parse(raw) as { edges?: Edge[] } | Edge[];
      const edges = Array.isArray(parsed) ? parsed : parsed.edges;
      if (Array.isArray(edges)) return edges;
    } catch (err) {
      console.error(`[prime-wiki] failed to parse compiled graph.json: ${err} — falling back`);
    }
  }

  // Priority 2: legacy flat edges.json (pre-inference format).
  const legacyPath = join(primeRoot, "graph/edges.json");
  if (existsSync(legacyPath)) {
    try {
      const raw = await readFile(legacyPath, "utf-8");
      return JSON.parse(raw) as Edge[];
    } catch (err) {
      console.error(`[prime-wiki] failed to parse legacy edges.json: ${err}`);
    }
  }

  console.error("[prime-wiki] no graph file found — running without edges");
  return [];
}

/**
 * Build the edge list by scanning every compiled prime .md file in the
 * new stack's output directory. Each MCP-compat .md carries the linked-to
 * ids in its YAML frontmatter (`specializes`, `enhances`, `requires`,
 * `contradicts`, etc). Reading frontmatter is ~50× faster than re-parsing
 * the .prime sources, so even with 3000+ atoms this completes in <0.5s.
 */
async function loadPrimeBackendGraph(primeRoot: string): Promise<Edge[]> {
  const overrideDir = (globalThis as any)?.process?.env?.PRIME_BACKEND_DIR;
  const defaultDir = join(dirname(primeRoot), "packages/compiler/fixtures/compiled-mcp");
  const dir = overrideDir ?? defaultDir;

  if (!existsSync(dir)) {
    console.error(
      `[prime-wiki] PRIME_BACKEND=prime loadGraph: ${dir} missing. Run compile-corpus.ts --format yaml-atom first.`
    );
    return [];
  }

  const LINK_FIELDS = [
    "specializes",
    "enhances",
    "requires",
    "validates_with",
    "supplies_to",
    "contradicts",
  ] as const;

  // Two-pass: first collect every atom's (id, name) to build a name→id map
  // so we can resolve bare link targets (e.g. "m06-pdf-embedded-fonts")
  // back to their full namespaced id (e.g. "@M06/pdf-embedded-fonts").
  // Without this, edges and atoms live in different id spaces and
  // findRelated/search return 0 graph neighbours.
  type Frontmatter = { id?: string; name?: string; [k: string]: unknown };
  const parsed: Frontmatter[] = [];
  const files = (await readdir(dir)).filter((f) => f.endsWith(".md"));
  for (const f of files) {
    const raw = await readFile(join(dir, f), "utf-8");
    const m = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!m) continue;
    try {
      parsed.push(parseYaml(m[1]) as Frontmatter);
    } catch {
      // skip unparseable
    }
  }

  const nameToId = new Map<string, string>();
  for (const data of parsed) {
    if (!data?.id) continue;
    if (typeof data.name === "string") nameToId.set(data.name, data.id);
    // Also register the id's own slug-after-namespace so bare slugs
    // ("m06-pdf-embedded-fonts") resolve too.
    const slug = data.id.replace(/^@[^/]+\//, "");
    if (slug && !nameToId.has(slug)) nameToId.set(slug, data.id);
  }

  function resolveTarget(t: string): string {
    return nameToId.get(t) ?? t;
  }

  const edges: Edge[] = [];
  for (const data of parsed) {
    const fromId = data?.id;
    if (!fromId) continue;
    for (const verb of LINK_FIELDS) {
      const v = data[verb];
      if (!v) continue;
      const targets = Array.isArray(v) ? v : typeof v === "string" ? [v] : [];
      for (const t of targets) {
        if (typeof t !== "string" || !t) continue;
        edges.push({ from: fromId, to: resolveTarget(t), relation: verb, type: verb });
      }
    }
  }

  console.error(
    `[prime-wiki] prime-backend loadGraph: ${edges.length} edges from ${files.length} .md files in ${dir}`
  );
  return edges;
}

// ---------------------------------------------------------------------------
// Scout index types and loader
// ---------------------------------------------------------------------------

export interface ScoutEntry {
  id: string;          // "{source}:{index}"
  title: string;       // unified title field
  url: string;         // unified URL field
  category?: string;   // optional category
  description?: string;// optional description / excerpt
  thumbnail?: string;  // optional thumbnail URL
  source: string;      // catalog atom id
  source_name: string; // human-readable source name
  raw: Record<string, any>; // original record
}

interface CatalogFields {
  title?: string | null;
  url?: string | null;
  category?: string | null;
  thumbnail?: string | null;
  description?: string | null;
}

/**
 * Load all scout-catalog atoms and flatten their JSON data files into a
 * single in-memory ScoutEntry[] array.
 *
 * primeRoot: path to the primes/ directory (used to resolve data_file paths)
 * repoRoot: path to the project root (parent of primes/) — data_file paths
 *           in catalog atoms are relative to the repo root.
 */
export async function loadScoutCatalog(
  atoms: Map<string, Atom>,
  primeRoot: string,
): Promise<ScoutEntry[]> {
  // repo root is one level up from primes/
  const repoRoot = resolve(primeRoot, "..");
  const catalogAtoms = [...atoms.values()].filter(
    (a) => a.subtype === "scout-catalog",
  );

  const all: ScoutEntry[] = [];

  for (const atom of catalogAtoms) {
    const catalog = atom.catalog as Record<string, any> | undefined;
    if (!catalog) {
      console.error(`[prime-wiki] scout: atom ${atom.id} has no catalog field — skipping`);
      continue;
    }

    const dataFile: string = catalog.data_file;
    if (!dataFile) {
      console.error(`[prime-wiki] scout: atom ${atom.id} has no catalog.data_file — skipping`);
      continue;
    }

    const absPath = join(repoRoot, dataFile);
    if (!existsSync(absPath)) {
      console.error(`[prime-wiki] scout: data file not found: ${absPath} (from atom ${atom.id}) — skipping`);
      continue;
    }

    let raw: any;
    try {
      const text = await readFile(absPath, "utf-8");
      raw = JSON.parse(text);
    } catch (err) {
      console.error(`[prime-wiki] scout: failed to parse ${absPath}: ${err} — skipping`);
      continue;
    }

    // Flatten: some files are arrays, some are objects with arrays as values
    const records: Record<string, any>[] = Array.isArray(raw)
      ? raw
      : Object.values(raw).flatMap((v) => (Array.isArray(v) ? v : []));

    const fields: CatalogFields = catalog.fields || {};
    const sourceName: string = catalog.source_name || atom.id;

    // Short slug for the source (last segment of atom id after @community/)
    const sourceSlug = atom.id.replace("@community/scout-catalog-", "");

    let count = 0;
    for (const record of records) {
      if (!record || typeof record !== "object") continue;

      const title = fields.title ? (record[fields.title] ?? "") : "";
      const url = fields.url ? (record[fields.url] ?? "") : "";
      // skip if both are empty
      if (!title && !url) continue;

      const category = fields.category
        ? Array.isArray(record[fields.category])
          ? (record[fields.category] as string[]).join(", ")
          : (record[fields.category] ?? undefined)
        : undefined;

      const thumbnail = fields.thumbnail
        ? (record[fields.thumbnail] ?? undefined)
        : undefined;

      const description = fields.description
        ? (record[fields.description] ?? undefined)
        : (record["description"] ?? record["excerpt"] ?? undefined);

      all.push({
        id: `${sourceSlug}:${count}`,
        title: String(title),
        url: String(url),
        category: category !== undefined ? String(category) : undefined,
        description: description !== undefined ? String(description) : undefined,
        thumbnail: thumbnail !== undefined ? String(thumbnail) : undefined,
        source: sourceSlug,
        source_name: sourceName,
        raw: record,
      });
      count++;
    }
    console.error(`[prime-wiki] scout: loaded ${count} entries from ${sourceSlug}`);
  }

  return all;
}

export function buildIndex(atoms: Map<string, Atom>): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();

  for (const [id, atom] of atoms) {
    // Index by tags
    for (const tag of atom.tags) {
      const key = tag.toLowerCase();
      if (!index.has(key)) index.set(key, new Set());
      index.get(key)!.add(id);
    }
    // Index by module
    if (atom.module) {
      const key = atom.module.toLowerCase();
      if (!index.has(key)) index.set(key, new Set());
      index.get(key)!.add(id);
    }
    // Index by subtype
    if (atom.subtype) {
      const key = atom.subtype.toLowerCase();
      if (!index.has(key)) index.set(key, new Set());
      index.get(key)!.add(id);
    }
    // Index by category (always a string after normalization)
    if (atom.category && typeof atom.category === "string") {
      const key = atom.category.toLowerCase();
      if (!index.has(key)) index.set(key, new Set());
      index.get(key)!.add(id);
    }
    // Index by words in name
    if (!atom.name) continue;
    const words = atom.name.toLowerCase().split(/[\s\-_/]+/).filter(w => w.length > 2);
    for (const w of words) {
      if (!index.has(w)) index.set(w, new Set());
      index.get(w)!.add(id);
    }
  }

  return index;
}

// ---------------------------------------------------------------------------
// v3 backend: reads atom directories from ${PRIME_DIR}
// ---------------------------------------------------------------------------
//
// PRIME_BACKEND=v3 reads atom.yaml metadata from compiled-v3/ atom directories.
// This is the projection model: atom content (chunks/*.md) is NEVER read here.
// The MCP server in projection mode returns paths, not content.
//
// The Atom map is populated with metadata only — content fields (claim,
// statement, etc.) are intentionally empty. The agent uses resolveProjection()
// paths and the Read tool to load chunk content lazily.

/**
 * Load atom-to-atom edges from the v3 compiled corpus.
 *
 * Reads `compiled-v3-final/@*\/<atom>/graph.yaml` files; each file lists the
 * relations declared in the source `.prime` (compatible / conflicts / related /
 * derived-from / extends / see-also / requires / etc.).
 *
 * Without this loader, scope=related queries against v3 atoms returned []
 * because loadGraph silently fell through to the legacy graph.json path
 * (which has no v3 ids).
 */
async function loadV3BackendGraph(primeRoot: string): Promise<Edge[]> {
  const overrideDir = (globalThis as any)?.process?.env?.PRIME_DIR;
  const candidates = [
    overrideDir,
    join(dirname(primeRoot), "primes-v3", "compiled"),
    join(dirname(primeRoot), "compiled-v3-final"),
    join(primeRoot, "..", "compiled-v3-final"),
    join(primeRoot, "..", "primes-v3", "compiled"),
  ].filter(Boolean) as string[];

  let primeDir: string | null = null;
  for (const c of candidates) {
    if (existsSync(c)) { primeDir = c; break; }
  }

  if (!primeDir) {
    console.error(
      `[prime-wiki] PRIME_BACKEND=v3 loadGraph: no compiled-v3 directory found. ` +
      `Tried: ${candidates.join(", ")}`
    );
    return [];
  }

  const edges: Edge[] = [];
  let atomCount = 0;

  try {
    const scopes = await readdir(primeDir);
    for (const scope of scopes) {
      if (!scope.startsWith("@")) continue;
      const scopePath = join(primeDir, scope);
      let atomSlugs: string[];
      try { atomSlugs = await readdir(scopePath); } catch { continue; }

      for (const slug of atomSlugs) {
        const graphPath = join(scopePath, slug, "graph.yaml");
        if (!existsSync(graphPath)) continue;

        try {
          const raw = await readFile(graphPath, "utf-8");
          const data = parseYaml(raw) as { atom?: string; relations?: Array<{ type: string; target: string }> };
          if (!data?.atom || !Array.isArray(data.relations)) continue;
          atomCount++;
          for (const rel of data.relations) {
            if (!rel?.target || !rel?.type) continue;
            edges.push({
              from: data.atom,
              to: rel.target,
              // Set BOTH fields: `relation` is the v2+ name; `type` is the
              // legacy name still read by findRelated/search. Keep both in
              // sync so traversal works regardless of which name a consumer
              // uses.
              relation: rel.type,
              type: rel.type,
              inferred_by: "v3-graph-yaml",
            });
          }
        } catch (err) {
          console.error(`[prime-wiki] v3 graph parse failed: ${graphPath}: ${err}`);
        }
      }
    }
  } catch (err) {
    console.error(`[prime-wiki] v3 graph readdir failed: ${err}`);
  }

  console.error(
    `[prime-wiki] v3-backend loadGraph: ${edges.length} edges from ${atomCount} atoms in ${primeDir}`
  );
  return edges;
}

async function loadV3BackendAtoms(primeRoot: string): Promise<Map<string, Atom>> {
  const atomMap = new Map<string, Atom>();

  // Resolve the v3 directory: PRIME_DIR env var, or primeRoot parent + "primes-v3/compiled"
  // Falls back to a sibling "compiled-v3" directory relative to primeRoot.
  const overrideDir = (globalThis as any)?.process?.env?.PRIME_DIR;
  const repoRoot = join(dirname(primeRoot), "..");
  const candidates = [
    overrideDir,
    join(dirname(primeRoot), "primes-v3", "compiled"),
    join(primeRoot, "..", "primes-v3", "compiled"),
  ].filter(Boolean) as string[];

  let primeDir: string | null = null;
  for (const c of candidates) {
    if (existsSync(c)) { primeDir = c; break; }
  }

  if (!primeDir) {
    console.error(
      `[prime-wiki] PRIME_BACKEND=v3: no compiled-v3 directory found. ` +
      `Set PRIME_DIR to your compiled atom directory, or run the v3 compiler first. ` +
      `Tried: ${candidates.join(", ")}`
    );
    return atomMap;
  }

  // Walk the directory looking for @scope/name/atom.yaml patterns
  let count = 0;
  let failed = 0;

  try {
    const entries = await readdir(primeDir);
    for (const scopeOrFile of entries) {
      if (scopeOrFile === "_index.xml" || scopeOrFile === "collections") continue;
      const scopePath = join(primeDir, scopeOrFile);

      // Scope directory like "@community"
      if (scopeOrFile.startsWith("@")) {
        let scopeEntries: string[];
        try { scopeEntries = await readdir(scopePath); } catch { continue; }

        for (const atomSlug of scopeEntries) {
          const atomPath = join(scopePath, atomSlug);
          const yamlPath = join(atomPath, "atom.yaml");
          if (!existsSync(yamlPath)) continue;

          try {
            const raw = await readFile(yamlPath, "utf-8");
            const data = parseYaml(raw) as Record<string, any>;
            if (!data?.id) { failed++; continue; }

            const atom: Atom = {
              id: data.id,
              type: data.kind ?? "knowledge",
              subtype: data.kind ?? "knowledge",
              name: data.id.split("/").pop() ?? data.id,
              description: data.description ?? "",
              tags: Array.isArray(data.tags) ? data.tags : [],
              category: "",
              module: (data.id.split("/")[0] ?? "").replace("@", ""),
              activation: "reference",
              priority: 3,
              // v3 atoms carry no content in the map — content is lazy-loaded
              // via resolveProjection() → Read tool path
              _v3_atom_dir: atomPath,
              _v3_tokens: data.tokens ?? {},
              _v3_projection: data.projection ?? {},
            };
            atomMap.set(atom.id, atom);
            count++;
          } catch (err) {
            failed++;
            console.error(`[prime-wiki] v3 load failed: ${yamlPath}: ${err}`);
          }
        }
      }
    }
  } catch (err) {
    console.error(`[prime-wiki] v3 readdir failed: ${err}`);
  }

  console.error(
    `[prime-wiki] v3-backend load: ${count} atoms loaded, ${failed} failed from ${primeDir}`
  );
  return atomMap;
}
