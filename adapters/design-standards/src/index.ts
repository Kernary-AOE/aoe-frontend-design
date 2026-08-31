/**
 * @module @prime-domain/frontend-design/design-standards
 *
 * `mandate` and `checklist` re-derived from the corpus, replacing two frozen
 * literal tables in the legacy server.
 *
 * ## What the legacy scopes actually were (read before judging the replacement)
 *
 * **`mandate`** — `mcp-server/compiler.ts:747 compileMandates(atoms)`. Eight
 * hardcoded atom ids (`@M10/anti-generic-ai-aesthetics-mandate`,
 * `@M10/unforgettable-test`, `@M10/creative-confidence-activation`,
 * `@M10/commit-to-bold-aesthetic-direction`,
 * `@M10/no-convergence-across-generations`, `@M01/font-blacklist-ai-slop`,
 * `@M02/no-pure-white-background`, `@M10/aesthetic-direction-menu`) looked up with
 * `atoms.get(id)`, followed by six lines of literal prose. Measured against
 * `compiled-v3-final/`: **0 of the 8 ids exist** — the whole list is legacy
 * `@M01`/`@M02`/`@M10` namespaces the bundle does not carry. So `mandate` cannot
 * be ported; the id list is the tool.
 *
 * **`checklist`** — `mcp-server/compiler.ts:873 compileChecklist(taskType, atoms,
 * tagIndex, edges)` is `return CHECKLISTS[taskType] || …` over a
 * `Record<string, string>` of eight hand-written markdown blobs. Its `atoms`,
 * `tagIndex` and `edges` parameters are **never read**. It touched no corpus at
 * all.
 *
 * ## What replaces them, and why this is not a second frozen table
 *
 * The compiled projections declare severity. Measured over
 * `compiled-v3-final/*​/*​/chunks/core.md`: **231 of 899 units carry a
 * `## Severity` section**, with values `warning` 66, `high` 59, `medium` 41,
 * `critical` 32, `block` 27, `warn` 3, `low` 2, `error` 1. That is the corpus's own
 * statement of what is non-negotiable, and it is the signal both scopes are rebuilt
 * on:
 *
 *  - **mandate** = every unit whose projection declares `critical` or `block`
 *    (59 units). "Non-negotiable, violating one = task failure" was the legacy
 *    tool's own framing; `block` and `critical` are the corpus's two words for it.
 *  - **checklist** = the `kind: check` units (36 in the bundle), non-negotiables
 *    first, then ranked against the caller's `task` string by token coverage.
 *
 * `task` is deliberately **not** an enum. The legacy enum
 * (`admin-dashboard|marketing-page|…`) existed only to index the literal table,
 * and re-declaring it here would mean writing a second task->unit mapping table by
 * hand — the exact thing that made the legacy version unmaintainable. A free-text
 * task ranked over declared unit text needs no such table, and it degrades to "all
 * the non-negotiables" rather than to `No checklist for "x"`.
 *
 * The severity vocabulary is **no longer a constant here**. It used to be: a
 * `SEVERITY_ORDER` array of eight hand-ordered words plus a second
 * `NON_NEGOTIABLE_SEVERITIES` array of two. Those are model semantics — which words
 * this domain accepts, how they rank, and which of them stop a ship — and an
 * adapter that decides them owns the domain's meaning. They are now declared in
 * `model/retrieval/severity.yaml` and read by `./severity.ts`, which also declares
 * the normalisation the corpus lacks (`warn`->`warning`, `error`->`high`) as data
 * rather than as a branch in this file. There is no fallback table: a missing model
 * file throws.
 *
 * Two consequences are visible in the diagnostics rather than silent:
 *
 *  - an alias whose `basis` is `inferred` emits `SEVERITY_ALIAS_INFERRED`, so a
 *    reader can tell that this domain, not the corpus, decided that rung;
 *  - a unit whose `kind` is in `requireDeclarationForKinds` but which declares no
 *    `## Severity` emits `SEVERITY_REQUIRED_UNDECLARED` and is listed by id. That is
 *    the 3 of 36 `kind: check` units with no severity
 *    (`@community/check-ios-{increase-contrast,bold-text-support,hig-compliance}`).
 *    They used to be `continue`d in silence, which meant a check that cannot say
 *    whether it blocks was quietly dropped from the gate rather than reported.
 *
 * Dependency direction (§15.4): imports `@skill-wiki/ir`,
 * `@skill-wiki/query-engine` and `@skill-wiki/model-schema`; imports nothing from
 * the repository-root `packages/` tree. The *bundle* path is still a caller-supplied
 * seam (`ProjectionReader`) because only the host knows it; the severity model is
 * this package's own asset at a fixed package-relative path — see the note in
 * `./severity.ts` and the same pattern in `scout-catalog/src/manifest.ts`.
 */

import type { DiagnosticIR, GraphIR, UnitIR } from "@skill-wiki/ir";
import { quantize } from "@skill-wiki/query-engine";
import { loadSeverityScale, type SeverityScale } from "./severity.ts";

export {
  SEVERITY_MODEL_PATH,
  SeverityModelError,
  loadSeverityScale,
  parseSeverityScale,
  type SeverityAlias,
  type SeverityGate,
  type SeverityRung,
  type SeverityScale,
} from "./severity.ts";

/**
 * Reads one unit's rendered projection. Supplied by the host, which owns the
 * bundle path — the same seam shape `html-validator` uses for `readFile`.
 * `undefined` means "that projection is not available", which is a diagnostic and
 * not a throw.
 */
export type ProjectionReader = (unitId: string, level: string) => string | undefined;

/** The projection level severity is read from. `core` renders every section. */
export const STANDARDS_PROJECTION_LEVEL = "core";

/**
 * The declared severity scale for this domain.
 *
 * Read once from `model/retrieval/severity.yaml`, eagerly: this module cannot rank
 * anything without it, so deferring the read would only move the same failure to
 * the first call while adding a nullable to every call site.
 */
export const SEVERITY_SCALE: SeverityScale = loadSeverityScale();

/**
 * The severity words this domain treats as non-negotiable.
 *
 * Derived from `SEVERITY_SCALE` (`gate: blocking`), not written here. Ordered
 * most-severe-first, so the emitted list is grouped without a comparator table.
 */
export const NON_NEGOTIABLE_SEVERITIES: readonly string[] = SEVERITY_SCALE.blocking;

/** `kind` of a unit that is a shippable check. 36 in the bundle. */
export const CHECK_KIND = "check";

export const CHECKLIST_LIMIT_DEFAULT = 20;
export const MANDATE_LIMIT_DEFAULT = 20;
/** Legacy `prime_query`'s `limit` ceiling: `z.number().min(1).max(50)`. */
export const STANDARDS_LIMIT_MAX = 50;
/** `mcp-server/index.ts:487` tokenisation floor, reused for the task query. */
export const MIN_TOKEN_LENGTH = 3;

export const PROJECTION_UNREADABLE = "PROJECTION_UNREADABLE";
export const SEVERITY_UNDECLARED = "SEVERITY_UNDECLARED";
export const SEVERITY_UNKNOWN_VALUE = "SEVERITY_UNKNOWN_VALUE";
/** An `inferred` alias fired: the domain, not the corpus, decided that rung. */
export const SEVERITY_ALIAS_INFERRED = "SEVERITY_ALIAS_INFERRED";
/** A kind the model says must declare severity did not. Names the units. */
export const SEVERITY_REQUIRED_UNDECLARED = "SEVERITY_REQUIRED_UNDECLARED";
export const STANDARDS_TRUNCATED = "STANDARDS_TRUNCATED";
export const CHECKLIST_TASK_UNMATCHED = "CHECKLIST_TASK_UNMATCHED";

function diagnostic(
  code: string,
  message: string,
  severity: DiagnosticIR["severity"],
  path?: readonly string[],
): DiagnosticIR {
  return path === undefined ? { code, message, severity } : { code, message, severity, path };
}

function compareStrings(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

// ── Projection section parsing ──────────────────────────────────────────────

/**
 * Split a rendered projection into its `## Heading` sections.
 *
 * The emitter writes one `## <Title>` per declared field group with the body on
 * the following lines (see any `chunks/core.md`). Parsing is done here rather than
 * regex-per-caller so `## Severity` and `## Failure Message` are read by one
 * implementation; a second reader is how the donor ended up with two contract
 * derivations that disagreed.
 */
export function parseProjectionSections(markdown: string): Readonly<Record<string, readonly string[]>> {
  const sections: Record<string, string[]> = {};
  let current: string[] | undefined;
  for (const raw of markdown.split("\n")) {
    const heading = /^##\s+(.+?)\s*$/.exec(raw);
    if (heading !== null) {
      current = [];
      sections[heading[1]!] = current;
      continue;
    }
    if (current !== undefined) current.push(raw);
  }
  const out: Record<string, readonly string[]> = {};
  for (const [title, lines] of Object.entries(sections)) {
    // Trailing blank lines are emitter padding between sections, not content.
    let end = lines.length;
    while (end > 0 && lines[end - 1]!.trim() === "") end -= 1;
    out[title] = lines.slice(0, end);
  }
  return out;
}

/** First non-blank line of a section, trimmed. `undefined` when absent or empty. */
export function sectionValue(
  sections: Readonly<Record<string, readonly string[]>>,
  title: string,
): string | undefined {
  for (const line of sections[title] ?? []) {
    const trimmed = line.trim();
    if (trimmed !== "") return trimmed;
  }
  return undefined;
}

/** Whole section body, blank lines collapsed. */
export function sectionLines(
  sections: Readonly<Record<string, readonly string[]>>,
  title: string,
): readonly string[] {
  return (sections[title] ?? []).map(line => line.trim()).filter(line => line !== "");
}

// ── Unit records ────────────────────────────────────────────────────────────

function describe(unit: UnitIR): string {
  const value = unit.fields["description"];
  if (value === undefined) return "";
  const scalar = (value as { readonly value?: unknown }).value;
  return typeof scalar === "string" ? scalar : "";
}

function domainOf(unit: UnitIR): string {
  const value = unit.fields["domain"];
  if (value === undefined) return "";
  const scalar = (value as { readonly value?: unknown }).value;
  return typeof scalar === "string" ? scalar : "";
}

/** A unit plus the severity-bearing parts of its projection. */
export interface StandardRecord {
  readonly id: string;
  readonly kind: string;
  readonly domain: string;
  readonly severity: string;
  readonly statement: string;
  /** `## Failure Message` / `## Failure Message Template`, when the unit has one. */
  readonly failureMessage?: string;
  /** `## Enforcement` or `## Evaluation Method`, whichever the unit declares. */
  readonly enforcement?: string;
  /** `## Exceptions` / `## Exemptions`, verbatim. A mandate without its carve-outs
   *  is a mandate that will be violated on purpose. */
  readonly exceptions: readonly string[];
}

function toRecord(unit: UnitIR, severity: string, sections: Readonly<Record<string, readonly string[]>>): StandardRecord {
  const failureMessage =
    sectionValue(sections, "Failure Message") ?? sectionValue(sections, "Failure Message Template");
  const enforcement = sectionValue(sections, "Enforcement") ?? sectionValue(sections, "Evaluation Method");
  const exceptions = [...sectionLines(sections, "Exceptions"), ...sectionLines(sections, "Exemptions")];
  return {
    id: unit.identity.id,
    kind: unit.typeRef,
    domain: domainOf(unit),
    severity,
    statement: describe(unit),
    ...(failureMessage === undefined ? {} : { failureMessage }),
    ...(enforcement === undefined ? {} : { enforcement }),
    exceptions,
  };
}

interface Read {
  readonly unit: UnitIR;
  readonly severity: string;
  readonly sections: Readonly<Record<string, readonly string[]>>;
}

/**
 * Read every unit's projection once and keep the ones that declare a severity.
 *
 * Both scopes need this pass, so it is shared: doing it twice over 899 units would
 * also mean two different answers whenever a projection is unreadable.
 *
 * Every severity word is folded through `SEVERITY_SCALE.normalise` here and nowhere
 * else, so `warn` and `warning` cannot reach two different comparisons. Three things
 * that used to be invisible are now diagnostics: an unreadable projection (already
 * was), an `inferred` alias firing, and a kind the model requires a severity from
 * that declares none.
 *
 * `ungated` is returned rather than only reported so a caller cannot miss it by not
 * reading diagnostics — a `check` that cannot say whether it blocks is the one case
 * where dropping the unit silently turns a gate into a suggestion.
 */
function readSeverityBearing(
  units: readonly UnitIR[],
  read: ProjectionReader,
  diagnostics: DiagnosticIR[],
  restrictToKind?: string,
): { readonly reads: readonly Read[]; readonly ungated: readonly string[] } {
  const out: Read[] = [];
  const ungated: string[] = [];
  const unknownValues = new Set<string>();
  const inferred = new Map<string, number>();
  let unreadable = 0;
  const required = new Set(SEVERITY_SCALE.requireDeclarationForKinds);
  for (const unit of units) {
    if (restrictToKind !== undefined && unit.typeRef !== restrictToKind) continue;
    const markdown = read(unit.identity.id, STANDARDS_PROJECTION_LEVEL);
    if (markdown === undefined) {
      unreadable += 1;
      continue;
    }
    const sections = parseProjectionSections(markdown);
    const declared = sectionValue(sections, "Severity");
    if (declared === undefined) {
      if (required.has(unit.typeRef)) ungated.push(unit.identity.id);
      continue;
    }
    const { value, rung, alias } = SEVERITY_SCALE.normalise(declared);
    if (rung === undefined) unknownValues.add(value);
    if (alias !== undefined && alias.basis === "inferred") {
      inferred.set(alias.from, (inferred.get(alias.from) ?? 0) + 1);
    }
    out.push({ unit, severity: value, sections });
  }
  if (unreadable > 0) {
    diagnostics.push(
      diagnostic(
        PROJECTION_UNREADABLE,
        `${unreadable} unit(s) have no readable '${STANDARDS_PROJECTION_LEVEL}' projection, so their severity could not be read`,
        "warning",
      ),
    );
  }
  if (unknownValues.size > 0) {
    diagnostics.push(
      diagnostic(
        SEVERITY_UNKNOWN_VALUE,
        `Severity value(s) [${[...unknownValues].sort(compareStrings).join(", ")}] are neither a rung nor an alias in this domain's declared scale [${SEVERITY_SCALE.rungs.map(rung => rung.name).join(", ")}]; they were kept but rank last`,
        "warning",
      ),
    );
  }
  for (const [from, count] of [...inferred.entries()].sort((a, b) => compareStrings(a[0], b[0]))) {
    const alias = SEVERITY_SCALE.aliases.find(entry => entry.from === from)!;
    diagnostics.push(
      diagnostic(
        SEVERITY_ALIAS_INFERRED,
        `${count} unit(s) declare severity '${from}', which the corpus does not order; this domain's model maps it to '${alias.to}' by inference${alias.rationale === undefined ? "" : ` — ${alias.rationale}`}. Fix belongs upstream in the unit's source 'severity:' field.`,
        "warning",
      ),
    );
  }
  if (ungated.length > 0) {
    diagnostics.push(
      diagnostic(
        SEVERITY_REQUIRED_UNDECLARED,
        `${ungated.length} unit(s) of kind [${[...required].sort(compareStrings).join(", ")}] declare no '## Severity', so they cannot be used as a gate and were excluded: ${[...ungated].sort(compareStrings).join(", ")}`,
        "error",
      ),
    );
  }
  return { reads: out, ungated };
}

function severityRank(severity: string): number {
  return SEVERITY_SCALE.rank(severity);
}

function clampLimit(requested: number | undefined, fallback: number): number {
  const value = requested ?? fallback;
  if (!Number.isFinite(value)) return fallback;
  return Math.max(1, Math.min(Math.trunc(value), STANDARDS_LIMIT_MAX));
}

// ── mandate ─────────────────────────────────────────────────────────────────

export interface MandateRequest {
  readonly graph: GraphIR;
  readonly readProjection: ProjectionReader;
  /** Defaults to `NON_NEGOTIABLE_SEVERITIES`. Any declared severity word works. */
  readonly severities?: readonly string[];
  readonly limit?: number;
}

export interface MandateResult {
  readonly severities: readonly string[];
  readonly count: number;
  readonly mandates: readonly StandardRecord[];
  readonly diagnostics: readonly DiagnosticIR[];
}

/**
 * Every unit the corpus itself marks non-negotiable.
 *
 * Ordered by (severity rank, id) — both total, so the same snapshot serialises
 * identically. The legacy version's order was the order of its literal id array,
 * which is why re-ordering that array changed the tool's output.
 */
export function selectMandates(request: MandateRequest): MandateResult {
  const diagnostics: DiagnosticIR[] = [];
  // Normalised through the model too: asking for `warn` must select the same units
  // as asking for `warning`, or the request vocabulary and the corpus vocabulary
  // are two scales again.
  const wanted = (request.severities ?? NON_NEGOTIABLE_SEVERITIES).map(
    value => SEVERITY_SCALE.normalise(value).value,
  );
  const wantedSet = new Set(wanted);

  const { reads } = readSeverityBearing(request.graph.units, request.readProjection, diagnostics);
  const matched = reads
    .filter(read => wantedSet.has(read.severity))
    .map(read => toRecord(read.unit, read.severity, read.sections))
    .sort(
      (a, b) => severityRank(a.severity) - severityRank(b.severity) || compareStrings(a.id, b.id),
    );

  if (matched.length === 0) {
    diagnostics.push(
      diagnostic(
        SEVERITY_UNDECLARED,
        `No unit declares a severity in [${[...wantedSet].sort(compareStrings).join(", ")}]; observed [${[...new Set(reads.map(read => read.severity))].sort(compareStrings).join(", ") || "none"}]`,
        "warning",
        ["severities"],
      ),
    );
  }

  const limit = clampLimit(request.limit, MANDATE_LIMIT_DEFAULT);
  if (matched.length > limit) {
    diagnostics.push(
      diagnostic(
        STANDARDS_TRUNCATED,
        `${matched.length} mandate(s) matched; returning the first ${limit}`,
        "info",
        ["limit"],
      ),
    );
  }
  return {
    severities: [...wantedSet].sort(compareStrings),
    count: matched.length,
    mandates: matched.slice(0, limit),
    diagnostics,
  };
}

// ── checklist ───────────────────────────────────────────────────────────────

/** Tokenise a free-text task the same way scout tokenises a query. */
export function tokenizeTask(task: string): readonly string[] {
  const seen = new Set<string>();
  for (const token of task.toLowerCase().split(/[^a-z0-9]+/)) {
    if (token.length >= MIN_TOKEN_LENGTH) seen.add(token);
  }
  return [...seen].sort(compareStrings);
}

function coverage(tokens: readonly string[], haystack: string): number {
  if (tokens.length === 0) return 0;
  const lowered = haystack.toLowerCase();
  let hits = 0;
  for (const token of tokens) if (lowered.includes(token)) hits += 1;
  return hits / tokens.length;
}

export interface ChecklistItem extends StandardRecord {
  /** `1` when the corpus marks this non-negotiable. Legacy's `MUST` marker. */
  readonly nonNegotiable: boolean;
  /** Token coverage of the task over this check's own text, quantized. */
  readonly taskRelevance: number;
  readonly selectedBecause: readonly string[];
}

export interface ChecklistRequest {
  readonly graph: GraphIR;
  readonly readProjection: ProjectionReader;
  /** Free-form task description. Legacy took an enum; see the module header. */
  readonly task: string;
  readonly limit?: number;
}

export interface ChecklistResult {
  readonly task: string;
  readonly count: number;
  readonly items: readonly ChecklistItem[];
  /**
   * `check` units excluded because they declare no severity, by id.
   *
   * Surfaced as data and not only as a diagnostic: these are checks that cannot say
   * whether they block, so a caller building a gate needs to see them even if it
   * ignores `diagnostics`. Measured on the current bundle: 3 of 36.
   */
  readonly ungated: readonly string[];
  readonly diagnostics: readonly DiagnosticIR[];
}

/**
 * The pre-ship checklist for a task, out of the corpus's own `check` units.
 *
 * Ordering is (non-negotiable first, then relevance, then severity, then id) —
 * every key total. Non-negotiables sort ahead of relevance on purpose: a `block`
 * check the task text does not mention is still a check that blocks the ship, and
 * burying it under a better-worded `medium` one is how a checklist stops being a
 * gate.
 */
export function buildChecklist(request: ChecklistRequest): ChecklistResult {
  const diagnostics: DiagnosticIR[] = [];
  const tokens = tokenizeTask(request.task);
  const { reads, ungated } = readSeverityBearing(
    request.graph.units,
    request.readProjection,
    diagnostics,
    CHECK_KIND,
  );

  const items: ChecklistItem[] = reads.map(read => {
    const record = toRecord(read.unit, read.severity, read.sections);
    const relevance = quantize(
      coverage(tokens, `${record.id} ${record.domain} ${record.statement}`),
    );
    const nonNegotiable = SEVERITY_SCALE.isBlocking(read.severity);
    const selectedBecause: string[] = [];
    if (nonNegotiable) selectedBecause.push(`corpus declares severity '${read.severity}' — non-negotiable`);
    if (relevance > 0) {
      selectedBecause.push(`task covers ${Math.round(relevance * tokens.length)}/${tokens.length} token(s) of this check`);
    }
    if (selectedBecause.length === 0) selectedBecause.push(`severity '${read.severity}' check for domain '${record.domain}'`);
    return { ...record, nonNegotiable, taskRelevance: relevance, selectedBecause };
  });

  if (items.every(item => item.taskRelevance === 0)) {
    diagnostics.push(
      diagnostic(
        CHECKLIST_TASK_UNMATCHED,
        `Task '${request.task}' matches no check unit's text; the list is ordered by declared severity alone`,
        "warning",
        ["task"],
      ),
    );
  }

  items.sort(
    (a, b) =>
      Number(b.nonNegotiable) - Number(a.nonNegotiable) ||
      b.taskRelevance - a.taskRelevance ||
      severityRank(a.severity) - severityRank(b.severity) ||
      compareStrings(a.id, b.id),
  );

  const limit = clampLimit(request.limit, CHECKLIST_LIMIT_DEFAULT);
  if (items.length > limit) {
    diagnostics.push(
      diagnostic(
        STANDARDS_TRUNCATED,
        `${items.length} check(s) available; returning the first ${limit}`,
        "info",
        ["limit"],
      ),
    );
  }
  return { task: request.task, count: items.length, items: items.slice(0, limit), ungated, diagnostics };
}
