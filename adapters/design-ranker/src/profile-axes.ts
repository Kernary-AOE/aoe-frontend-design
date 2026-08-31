/**
 * @module profile-axes
 *
 * Reads the axis descriptors out of `RetrievalProfile.extensions`.
 *
 * Why they live in `extensions` and not in a second file: `RetrievalProfileSchema`
 * is `.strict()`, so a sibling top-level key would be rejected, and
 * `candidateGenerators` carries only `{name, weight}` — it has no way to express
 * "this axis's candidates are units whose kind is one of these and whose text
 * matches one of those". The predicate parameters are therefore model data
 * hanging off the profile, read here and nowhere in the engine.
 *
 * Every reader fails closed. A profile that is missing an axis or that types a
 * field wrongly is a model bug, and the alternative — defaulting a weight or an
 * empty kind list — silently degrades recall to zero, which is exactly the
 * failure mode §9.7 rejects for evaluators.
 */

export class ProfileAxesError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(`${code}: ${message}`);
    this.name = "ProfileAxesError";
  }
}

function fail(code: string, message: string): never {
  throw new ProfileAxesError(code, message);
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRecord(parent: Readonly<Record<string, unknown>>, key: string, where: string): Readonly<Record<string, unknown>> {
  const value = parent[key];
  if (!isRecord(value)) fail("AXIS_FIELD_NOT_OBJECT", `${where}.${key} must be an object`);
  return value;
}

function readStringArray(parent: Readonly<Record<string, unknown>>, key: string, where: string): readonly string[] {
  const value = parent[key];
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some(item => typeof item !== "string")) {
    fail("AXIS_FIELD_NOT_STRING_ARRAY", `${where}.${key} must be an array of strings`);
  }
  return value as readonly string[];
}

function readNumberMap(parent: Readonly<Record<string, unknown>>, key: string, where: string): Readonly<Record<string, number>> {
  const value = parent[key];
  if (value === undefined) return {};
  if (!isRecord(value)) fail("AXIS_FIELD_NOT_OBJECT", `${where}.${key} must be an object`);
  for (const [name, weight] of Object.entries(value)) {
    if (typeof weight !== "number" || !Number.isFinite(weight)) {
      fail("AXIS_WEIGHT_NOT_FINITE", `${where}.${key}.${name} must be a finite number`);
    }
  }
  return value as Readonly<Record<string, number>>;
}

function readStringMap(parent: Readonly<Record<string, unknown>>, key: string, where: string): Readonly<Record<string, string>> {
  const value = parent[key];
  if (value === undefined) return {};
  if (!isRecord(value)) fail("AXIS_FIELD_NOT_OBJECT", `${where}.${key} must be an object`);
  for (const [name, target] of Object.entries(value)) {
    if (typeof target !== "string") fail("AXIS_FIELD_NOT_STRING", `${where}.${key}.${name} must be a string`);
  }
  return value as Readonly<Record<string, string>>;
}

function readOptionalString(parent: Readonly<Record<string, unknown>>, key: string, where: string): string | undefined {
  const value = parent[key];
  if (value === undefined) return undefined;
  if (typeof value !== "string") fail("AXIS_FIELD_NOT_STRING", `${where}.${key} must be a string`);
  return value;
}

function readPositiveInt(parent: Readonly<Record<string, unknown>>, key: string, where: string): number {
  const value = parent[key];
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    fail("AXIS_BUDGET_INVALID", `${where}.${key} must be a positive integer`);
  }
  return value;
}

function readUnitScore(parent: Readonly<Record<string, unknown>>, key: string, where: string): number {
  const value = parent[key];
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) {
    fail("AXIS_SCORE_OUT_OF_RANGE", `${where}.${key} must be a number in [0, 1]`);
  }
  return value;
}

/** One axis's candidate predicate and affinity table. */
export interface AxisDescriptor {
  readonly name: string;
  /** Unit kinds admitted as candidates. Empty means "kind is not a filter". */
  readonly kinds: readonly string[];
  /** Case-insensitive substrings tested against the unit's harvested text. */
  readonly textIncludes: readonly string[];
  /** Case-insensitive substrings tested against the unit id alone. */
  readonly idIncludes: readonly string[];
  /** A `cluster` field value that admits a unit regardless of the tests above. */
  readonly cluster: string | undefined;
  /** Preference order applied before budget slicing. Absent kinds sort last. */
  readonly kindOrder: readonly string[];
  /** axis_affinity by kind. */
  readonly affinityKinds: Readonly<Record<string, number>>;
  /** axis_affinity by id regex source. */
  readonly affinityIdPattern: string | undefined;
  /** axis_affinity for a kind whose *tags* match `affinityIdPattern`. */
  readonly affinityTaggedKinds: Readonly<Record<string, number>>;
  /** school → persona unit id, used by school_match on the register axis. */
  readonly schoolPersonaMap: Readonly<Record<string, string>>;
  /** Unit id used when the axis yields no candidate at all. */
  readonly fallbackUnit: string | undefined;
}

export interface DensityCues {
  readonly tight: readonly string[];
  readonly comfy: readonly string[];
  readonly loose: readonly string[];
}

export interface SixAxisConfig {
  readonly axes: readonly AxisDescriptor[];
  readonly defaultAxisBudget: number;
  readonly densityCues: DensityCues;
  readonly densityNoSignalScore: number;
  readonly minTokenLength: number;
  readonly stopwords: ReadonlySet<string>;
}

function readAxis(name: string, raw: Readonly<Record<string, unknown>>): AxisDescriptor {
  const where = `extensions.axes.${name}`;
  return {
    name,
    kinds: readStringArray(raw, "kinds", where),
    textIncludes: readStringArray(raw, "textIncludes", where),
    idIncludes: readStringArray(raw, "idIncludes", where),
    cluster: readOptionalString(raw, "cluster", where),
    kindOrder: readStringArray(raw, "kindOrder", where),
    affinityKinds: readNumberMap(raw, "affinityKinds", where),
    affinityIdPattern: readOptionalString(raw, "affinityIdPattern", where),
    affinityTaggedKinds: readNumberMap(raw, "affinityTaggedKinds", where),
    schoolPersonaMap: readStringMap(raw, "schoolPersonaMap", where),
    fallbackUnit: readOptionalString(raw, "fallbackUnit", where),
  };
}

/**
 * Narrow a profile's `extensions` into the config the generators need.
 *
 * `generatorNames` is the profile's own `candidateGenerators` list. Requiring the
 * two to line up is what stops a profile from naming a seventh generator that no
 * axis descriptor backs, or from describing an axis that nothing ever runs.
 */
export function readSixAxisConfig(
  extensions: Readonly<Record<string, unknown>> | undefined,
  generatorNames: readonly string[],
  generatorPrefix: string,
): SixAxisConfig {
  if (extensions === undefined) fail("EXTENSIONS_MISSING", "Retrieval profile declares no extensions block");
  const axesRaw = readRecord(extensions, "axes", "extensions");

  const declared = Object.keys(axesRaw).sort();
  const expected = generatorNames
    .filter(name => name.startsWith(generatorPrefix))
    .map(name => name.slice(generatorPrefix.length))
    .sort();
  if (expected.length === 0) {
    fail("NO_AXIS_GENERATORS", `No candidate generator name starts with '${generatorPrefix}'`);
  }
  const missing = expected.filter(axis => !declared.includes(axis));
  if (missing.length > 0) {
    fail("AXIS_DESCRIPTOR_MISSING", `Generators [${missing.join(", ")}] have no extensions.axes entry`);
  }
  const unused = declared.filter(axis => !expected.includes(axis));
  if (unused.length > 0) {
    fail("AXIS_DESCRIPTOR_UNUSED", `extensions.axes declares [${unused.join(", ")}] but no generator runs them`);
  }

  return {
    axes: expected.map(axis => readAxis(axis, readRecord(axesRaw, axis, "extensions.axes"))),
    defaultAxisBudget: readPositiveInt(extensions, "defaultAxisBudget", "extensions"),
    densityCues: {
      tight: readStringArray(readRecord(extensions, "densityCues", "extensions"), "tight", "extensions.densityCues"),
      comfy: readStringArray(readRecord(extensions, "densityCues", "extensions"), "comfy", "extensions.densityCues"),
      loose: readStringArray(readRecord(extensions, "densityCues", "extensions"), "loose", "extensions.densityCues"),
    },
    densityNoSignalScore: readUnitScore(extensions, "densityNoSignalScore", "extensions"),
    minTokenLength: readPositiveInt(extensions, "minTokenLength", "extensions"),
    stopwords: new Set(readStringArray(extensions, "stopwords", "extensions")),
  };
}
