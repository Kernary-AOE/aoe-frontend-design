/**
 * @module scout-catalog/manifest
 *
 * Reads and validates `sources.yaml`.
 *
 * Validation is hand-written rather than zod-backed on purpose: the domain
 * package's dependency set is `@aoe/{ir,model-schema,query-engine,sdk-codegen}`
 * plus `yaml`, and `zod` resolves only through the kernel packages' own
 * `node_modules`. Adding it would pull zod 4 (what `plugin-host` requires) beside
 * the root's zod 3.23.8, and a shim-free refactor is not the place to introduce a
 * duplicated validator. The checks below are exhaustive over the schema, and a
 * malformed manifest throws with a field path rather than producing `undefined`
 * three modules downstream.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { parse } from "yaml";
import {
  ScoutManifestError,
  type ExternalSourceDescriptor,
  type FieldMapping,
  type PayloadDescriptor,
  type ScoutManifest,
  type ScoutRetrievalConfig,
} from "./types.ts";

export const MANIFEST_FILENAME = "sources.yaml";

/** The adapter root, resolved from this module rather than from `cwd`. */
export const ADAPTER_ROOT = join(dirname(new URL(import.meta.url).pathname), "..");

export const MANIFEST_PATH = join(ADAPTER_ROOT, MANIFEST_FILENAME);

/** Feature axes the search stage produces. The manifest must weight exactly these. */
export const SCOUT_FEATURE_AXES = [
  "assetPresence",
  "curatedSource",
  "sourceAffinity",
  "textMatch",
  "titleMatch",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function fail(code: string, path: string, detail: string): never {
  throw new ScoutManifestError(code, `${path}: ${detail}`);
}

function readString(record: Record<string, unknown>, key: string, path: string): string {
  const value = record[key];
  if (typeof value !== "string" || value.length === 0) {
    fail("MANIFEST_FIELD_INVALID", `${path}.${key}`, "must be a non-empty string");
  }
  return value;
}

function readNullableString(record: Record<string, unknown>, key: string, path: string): string | null {
  const value = record[key];
  if (value === null || value === undefined) return null;
  if (typeof value !== "string" || value.length === 0) {
    fail("MANIFEST_FIELD_INVALID", `${path}.${key}`, "must be a non-empty string or null");
  }
  return value;
}

function readInteger(record: Record<string, unknown>, key: string, path: string): number {
  const value = record[key];
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    fail("MANIFEST_FIELD_INVALID", `${path}.${key}`, "must be a non-negative integer");
  }
  return value;
}

function readNumber(record: Record<string, unknown>, key: string, path: string): number {
  const value = record[key];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    fail("MANIFEST_FIELD_INVALID", `${path}.${key}`, "must be a finite number");
  }
  return value;
}

function readBoolean(record: Record<string, unknown>, key: string, path: string): boolean {
  const value = record[key];
  if (typeof value !== "boolean") fail("MANIFEST_FIELD_INVALID", `${path}.${key}`, "must be a boolean");
  return value;
}

function readStringArray(record: Record<string, unknown>, key: string, path: string): readonly string[] {
  const value = record[key] ?? [];
  if (!Array.isArray(value) || value.some(item => typeof item !== "string")) {
    fail("MANIFEST_FIELD_INVALID", `${path}.${key}`, "must be an array of strings");
  }
  return value as readonly string[];
}

function readFields(value: unknown, path: string): FieldMapping {
  if (!isRecord(value)) fail("MANIFEST_FIELD_INVALID", path, "must be a mapping");
  const fields: FieldMapping = {
    title: readNullableString(value, "title", path),
    url: readNullableString(value, "url", path),
    category: readNullableString(value, "category", path),
    thumbnail: readNullableString(value, "thumbnail", path),
    description: readNullableString(value, "description", path),
  };
  // A source that maps neither title nor url can never contribute a reference,
  // because normalisation drops every record lacking both. Refusing it here turns
  // a source that silently loads zero entries into a manifest error.
  if (fields.title === null && fields.url === null) {
    fail("MANIFEST_SOURCE_UNRETRIEVABLE", path, "maps neither `title` nor `url`, so every record would be discarded");
  }
  return fields;
}

function readPayload(value: unknown, path: string): PayloadDescriptor {
  if (!isRecord(value)) fail("MANIFEST_FIELD_INVALID", path, "must be a mapping");
  const sha256 = readString(value, "sha256", path);
  if (!/^[0-9a-f]{64}$/.test(sha256)) {
    fail("MANIFEST_FIELD_INVALID", `${path}.sha256`, "must be 64 lowercase hex characters");
  }
  const declaredEntryCount = readInteger(value, "declaredEntryCount", path);
  const loadableEntryCount = readInteger(value, "loadableEntryCount", path);
  if (loadableEntryCount > declaredEntryCount) {
    fail(
      "MANIFEST_COUNT_INCOHERENT",
      path,
      `loadableEntryCount ${loadableEntryCount} exceeds declaredEntryCount ${declaredEntryCount}; normalisation only ever discards`,
    );
  }
  const payloadPath = readString(value, "path", path);
  // Payload paths are resolved against a caller-supplied data root, so a manifest
  // that names an absolute path or escapes upward would read outside it.
  if (payloadPath.startsWith("/") || payloadPath.split("/").includes("..")) {
    fail("MANIFEST_PATH_ESCAPES_ROOT", `${path}.path`, "must be a relative path with no `..` segment");
  }
  return {
    path: payloadPath,
    bytes: readInteger(value, "bytes", path),
    sha256,
    declaredEntryCount,
    loadableEntryCount,
  };
}

function readSource(value: unknown, index: number): ExternalSourceDescriptor {
  const path = `sources[${index}]`;
  if (!isRecord(value)) fail("MANIFEST_FIELD_INVALID", path, "must be a mapping");
  const id = readString(value, "id", path);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) {
    fail("MANIFEST_FIELD_INVALID", `${path}.id`, "must be lowercase alphanumeric with hyphens");
  }
  return {
    id,
    legacyAtomId: readString(value, "legacyAtomId", path),
    sourceName: readString(value, "sourceName", path),
    sourceUrl: readString(value, "sourceUrl", path),
    license: readString(value, "license", path),
    curated: readBoolean(value, "curated", path),
    usefulFor: readStringArray(value, "usefulFor", path),
    personaLean: readStringArray(value, "personaLean", path),
    fields: readFields(value["fields"], `${path}.fields`),
    payload: readPayload(value["payload"], `${path}.payload`),
  };
}

function readRetrieval(value: unknown): ScoutRetrievalConfig {
  if (!isRecord(value)) fail("MANIFEST_FIELD_INVALID", "retrieval", "must be a mapping");
  const rawWeights = value["weights"];
  if (!isRecord(rawWeights)) fail("MANIFEST_FIELD_INVALID", "retrieval.weights", "must be a mapping");
  const weights: Record<string, number> = {};
  for (const axis of Object.keys(rawWeights).sort()) {
    weights[axis] = readNumber(rawWeights, axis, "retrieval.weights");
  }
  // The generator/profile agreement check `readSixAxisConfig` performs for the six
  // axes, applied here: an axis produced but unweighted scores nothing, and an
  // axis weighted but never produced is a typo that would otherwise be invisible.
  const declared = Object.keys(weights).sort();
  const produced = [...SCOUT_FEATURE_AXES];
  if (declared.join(",") !== produced.join(",")) {
    fail(
      "MANIFEST_AXES_DISAGREE",
      "retrieval.weights",
      `weights [${declared.join(", ")}] must be exactly the axes this adapter produces [${produced.join(", ")}]`,
    );
  }
  const defaultLimit = readInteger(value, "defaultLimit", "retrieval");
  const maxLimit = readInteger(value, "maxLimit", "retrieval");
  if (defaultLimit < 1 || maxLimit < defaultLimit) {
    fail("MANIFEST_FIELD_INVALID", "retrieval", `defaultLimit ${defaultLimit} must be >= 1 and <= maxLimit ${maxLimit}`);
  }
  return {
    weights,
    defaultLimit,
    maxLimit,
    minTokenLength: readInteger(value, "minTokenLength", "retrieval"),
  };
}

export function parseScoutManifest(source: string): ScoutManifest {
  let raw: unknown;
  try {
    raw = parse(source);
  } catch (error) {
    throw new ScoutManifestError(
      "MANIFEST_YAML_INVALID",
      error instanceof Error ? error.message : "YAML parsing failed",
    );
  }
  if (!isRecord(raw)) fail("MANIFEST_FIELD_INVALID", "(root)", "must be a mapping");
  const protocol = readString(raw, "protocol", "(root)");
  if (protocol !== "prime/scout-catalog/v1") {
    fail("MANIFEST_PROTOCOL_UNSUPPORTED", "protocol", `expected 'prime/scout-catalog/v1', found '${protocol}'`);
  }
  const rawSources = raw["sources"];
  if (!Array.isArray(rawSources) || rawSources.length === 0) {
    fail("MANIFEST_FIELD_INVALID", "sources", "must be a non-empty array");
  }
  const sources = rawSources.map(readSource);
  const seen = new Set<string>();
  for (const source of sources) {
    if (seen.has(source.id)) fail("MANIFEST_SOURCE_DUPLICATE", `sources[${source.id}]`, "id appears twice");
    seen.add(source.id);
  }
  return {
    protocol: "prime/scout-catalog/v1",
    adapter: readString(raw, "adapter", "(root)"),
    retrieval: readRetrieval(raw["retrieval"]),
    // Sorted so downstream iteration order does not depend on YAML authoring order.
    sources: [...sources].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
  };
}

export function loadScoutManifest(path: string = MANIFEST_PATH): ScoutManifest {
  let source: string;
  try {
    source = readFileSync(path, "utf8");
  } catch (error) {
    throw new ScoutManifestError(
      "MANIFEST_UNREADABLE",
      `${path}: ${error instanceof Error ? error.message : "read failed"}`,
    );
  }
  return parseScoutManifest(source);
}
