/**
 * @module @prime-domain/frontend-design/design-standards/severity
 *
 * Reads the severity scale out of `model/retrieval/severity.yaml`.
 *
 * ## Why this is a loader and not a constant
 *
 * `index.ts` used to declare `SEVERITY_ORDER` (eight words, hand-ordered) and
 * `NON_NEGOTIABLE_SEVERITIES` (two words) as literals. Those are model semantics —
 * which words this domain accepts, how they order, which of them stop a ship — so
 * they now live in the domain's model package and this module reads them.
 *
 * **There is no fallback.** A missing or malformed model file throws
 * `SeverityModelError`. A default table here would be the hardcoded scale again,
 * reachable by deleting a file, which is worse than the literal it replaced because
 * it would be invisible.
 *
 * ## Why this module touches the filesystem when `index.ts` deliberately does not
 *
 * `index.ts` takes a `ProjectionReader` seam because the *bundle* path is the
 * host's — the adapter cannot know where `compiled-v3-final/` is. The model file is
 * the opposite case: it is this domain package's own asset at a fixed
 * package-relative path, and the package is broken without it. The established
 * precedent is `adapters/scout-catalog/src/manifest.ts`, which resolves
 * `ADAPTER_ROOT` from `import.meta.url` and reads its own `prime-plugin.yaml` the
 * same way. `parseSeverityScale` is pure, so every test can supply its own
 * document without going near the disk.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { parse } from "yaml";
import { DefinitionFileSchema } from "@aoe/model-schema";

/** This adapter's own directory, resolved from the module, never from `cwd`. */
export const SEVERITY_ADAPTER_ROOT = resolve(join(dirname(new URL(import.meta.url).pathname), ".."));

/** The declaration this adapter reads. Domain root is three levels up from `src/`. */
export const SEVERITY_MODEL_PATH = resolve(
  join(SEVERITY_ADAPTER_ROOT, "..", "..", "model", "retrieval", "severity.yaml"),
);

/** The `kind: type` definition inside that file which carries the scale. */
export const SEVERITY_TYPE_NAME = "severity";

/** Thrown when the model file cannot produce a usable scale. Never swallowed. */
export class SeverityModelError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "SeverityModelError";
  }
}

const SEVERITY_MODEL_MISSING = "SEVERITY_MODEL_MISSING";
const SEVERITY_MODEL_INVALID = "SEVERITY_MODEL_INVALID";

/** How much interpretation an alias required. `inferred` is reported to callers. */
export type AliasBasis = "spelling" | "inferred";

/** Whether a rung stops a ship. Successor of the old `NON_NEGOTIABLE_SEVERITIES`. */
export type SeverityGate = "blocking" | "advisory";

/** One rung. Its position in `SeverityScale.rungs` is its rank. */
export interface SeverityRung {
  readonly name: string;
  readonly gate: SeverityGate;
  /** Units declaring this literal word, measured when the model was written. */
  readonly observed: number;
}

/** A declared normalisation from an authored word onto a rung. */
export interface SeverityAlias {
  readonly from: string;
  readonly to: string;
  readonly basis: AliasBasis;
  readonly observed: number;
  readonly rationale?: string;
}

/**
 * The domain's severity semantics, as declared.
 *
 * Deliberately exposes no `order: string[]` for callers to re-sort by hand: rank
 * comes from `rank()` and membership from `gateOf()`, so there is one place the
 * order is read and no second copy to drift.
 */
export interface SeverityScale {
  readonly rungs: readonly SeverityRung[];
  readonly aliases: readonly SeverityAlias[];
  /** Kinds for which an undeclared severity is a defect, not an absence. */
  readonly requireDeclarationForKinds: readonly string[];
  /** Rung names with `gate: blocking`, most severe first. */
  readonly blocking: readonly string[];
  /**
   * Fold an authored word onto a rung. Lower-cases and trims, then applies
   * aliases. Returns the alias that fired so the caller can report an `inferred`
   * one; `rung` is `undefined` for a word the scale does not declare.
   */
  normalise(raw: string): {
    readonly value: string;
    readonly rung: SeverityRung | undefined;
    readonly alias: SeverityAlias | undefined;
  };
  /**
   * Rank of a severity word, aliases folded first. Undeclared words rank last,
   * not first.
   */
  rank(raw: string): number;
  gateOf(raw: string): SeverityGate | undefined;
  isBlocking(raw: string): boolean;
}

function fail(code: string, message: string): never {
  throw new SeverityModelError(code, `${message} (${SEVERITY_MODEL_PATH})`);
}

function record(value: unknown, what: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(SEVERITY_MODEL_INVALID, `${what} must be a mapping`);
  }
  return value as Record<string, unknown>;
}

function nonEmptyString(value: unknown, what: string): string {
  if (typeof value !== "string" || value.trim() === "") fail(SEVERITY_MODEL_INVALID, `${what} must be a non-empty string`);
  return (value as string).trim();
}

function nonNegativeInteger(value: unknown, what: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    fail(SEVERITY_MODEL_INVALID, `${what} must be a non-negative integer`);
  }
  return value as number;
}

function array(value: unknown, what: string): readonly unknown[] {
  if (!Array.isArray(value)) fail(SEVERITY_MODEL_INVALID, `${what} must be a sequence`);
  return value as readonly unknown[];
}

function gate(value: unknown, what: string): SeverityGate {
  const text = nonEmptyString(value, what);
  if (text !== "blocking" && text !== "advisory") {
    fail(SEVERITY_MODEL_INVALID, `${what} must be 'blocking' or 'advisory', got '${text}'`);
  }
  return text;
}

function basis(value: unknown, what: string): AliasBasis {
  const text = nonEmptyString(value, what);
  if (text !== "spelling" && text !== "inferred") {
    fail(SEVERITY_MODEL_INVALID, `${what} must be 'spelling' or 'inferred', got '${text}'`);
  }
  return text;
}

/**
 * Build a `SeverityScale` from an already-parsed definition file.
 *
 * Pure, and the only place the model's shape is interpreted — `loadSeverityScale`
 * is nothing but `readFileSync` plus this. Every rejection names a code so a broken
 * model file says which key is wrong instead of surfacing as an ordering bug.
 */
export function parseSeverityScale(document: unknown): SeverityScale {
  const file = DefinitionFileSchema.safeParse(document);
  if (!file.success) {
    fail(SEVERITY_MODEL_INVALID, `not a valid model definition file: ${file.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
  }
  const definition = file.data.definitions.find(
    entry => entry.kind === "type" && entry.name === SEVERITY_TYPE_NAME,
  );
  if (definition === undefined) {
    fail(SEVERITY_MODEL_INVALID, `declares no 'kind: type' definition named '${SEVERITY_TYPE_NAME}'`);
  }
  const block = record(
    record(definition.extensions ?? {}, "extensions")["severity"],
    "extensions.severity",
  );

  const rungs: SeverityRung[] = [];
  const seen = new Set<string>();
  for (const [index, raw] of array(block["scale"], "extensions.severity.scale").entries()) {
    const entry = record(raw, `extensions.severity.scale[${index}]`);
    const name = nonEmptyString(entry["name"], `extensions.severity.scale[${index}].name`).toLowerCase();
    if (seen.has(name)) fail(SEVERITY_MODEL_INVALID, `extensions.severity.scale declares '${name}' twice`);
    seen.add(name);
    rungs.push({
      name,
      gate: gate(entry["gate"], `extensions.severity.scale[${index}].gate`),
      observed: nonNegativeInteger(entry["observed"], `extensions.severity.scale[${index}].observed`),
    });
  }
  if (rungs.length === 0) fail(SEVERITY_MODEL_INVALID, "extensions.severity.scale is empty");

  const aliases: SeverityAlias[] = [];
  const byFrom = new Map<string, SeverityAlias>();
  for (const [index, raw] of array(block["aliases"] ?? [], "extensions.severity.aliases").entries()) {
    const entry = record(raw, `extensions.severity.aliases[${index}]`);
    const from = nonEmptyString(entry["from"], `extensions.severity.aliases[${index}].from`).toLowerCase();
    const to = nonEmptyString(entry["to"], `extensions.severity.aliases[${index}].to`).toLowerCase();
    // An alias onto a word that is not a rung would produce a value that ranks
    // last while looking normalised — the exact failure the literal table had.
    if (!seen.has(to)) fail(SEVERITY_MODEL_INVALID, `extensions.severity.aliases[${index}].to '${to}' is not a scale rung`);
    if (seen.has(from)) fail(SEVERITY_MODEL_INVALID, `extensions.severity.aliases[${index}].from '${from}' is itself a scale rung`);
    if (byFrom.has(from)) fail(SEVERITY_MODEL_INVALID, `extensions.severity.aliases declares '${from}' twice`);
    const rationale = entry["rationale"];
    const alias: SeverityAlias = {
      from,
      to,
      basis: basis(entry["basis"], `extensions.severity.aliases[${index}].basis`),
      observed: nonNegativeInteger(entry["observed"], `extensions.severity.aliases[${index}].observed`),
      ...(typeof rationale === "string" && rationale.trim() !== "" ? { rationale: rationale.trim() } : {}),
    };
    aliases.push(alias);
    byFrom.set(from, alias);
  }

  const kinds: string[] = [];
  for (const [index, raw] of array(
    block["requireDeclarationForKinds"] ?? [],
    "extensions.severity.requireDeclarationForKinds",
  ).entries()) {
    kinds.push(nonEmptyString(raw, `extensions.severity.requireDeclarationForKinds[${index}]`));
  }

  const rankOf = new Map(rungs.map((rung, index) => [rung.name, index] as const));
  const gates = new Map(rungs.map(rung => [rung.name, rung.gate] as const));

  // One folding function behind every accessor. `rank`, `gateOf` and `isBlocking`
  // must not each decide whether to apply aliases: an API where `rank("warn")` and
  // `rank("warning")` disagree is two vocabularies again, which is the whole defect
  // this file exists to remove.
  const fold = (raw: string): string => {
    const lowered = raw.trim().toLowerCase();
    return byFrom.get(lowered)?.to ?? lowered;
  };

  return {
    rungs,
    aliases,
    requireDeclarationForKinds: kinds,
    blocking: rungs.filter(rung => rung.gate === "blocking").map(rung => rung.name),
    normalise(raw: string) {
      const lowered = raw.trim().toLowerCase();
      const alias = byFrom.get(lowered);
      const value = alias === undefined ? lowered : alias.to;
      const index = rankOf.get(value);
      return {
        value,
        rung: index === undefined ? undefined : rungs[index]!,
        alias,
      };
    },
    // Undeclared words sort AFTER every rung rather than at 0. An unrecognised
    // word must never outrank `block` just because the scale never heard of it.
    rank(raw: string) {
      return rankOf.get(fold(raw)) ?? rungs.length;
    },
    gateOf(raw: string) {
      return gates.get(fold(raw));
    },
    isBlocking(raw: string) {
      return gates.get(fold(raw)) === "blocking";
    },
  };
}

let cached: SeverityScale | undefined;

/**
 * The declared scale, read from `SEVERITY_MODEL_PATH` once per process.
 *
 * Memoized because both `selectMandates` and `buildChecklist` rank with it and
 * re-reading would let two calls in one process disagree about the order.
 */
export function loadSeverityScale(): SeverityScale {
  if (cached !== undefined) return cached;
  let source: string;
  try {
    source = readFileSync(SEVERITY_MODEL_PATH, "utf8");
  } catch (error) {
    fail(
      SEVERITY_MODEL_MISSING,
      `severity scale declaration is unreadable: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  let document: unknown;
  try {
    document = parse(source);
  } catch (error) {
    fail(SEVERITY_MODEL_INVALID, `YAML parse failed: ${error instanceof Error ? error.message : String(error)}`);
  }
  cached = parseSeverityScale(document);
  return cached;
}
