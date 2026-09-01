/**
 * @module scout-catalog/loader
 *
 * Normalises the 18 foreign JSON payloads into `ExternalReference[]`.
 *
 * This replicates `mcp-server/data.ts:443-533` field-for-field — both flatten
 * shapes, the `catalog.fields` mapping, the array-join for `category`, the
 * `description ?? excerpt` fallback, and the `if (!title && !url) continue`
 * discard — and changes exactly three things, each because the original was
 * lossy rather than because a different behaviour is nicer:
 *
 * 1. **Ids are content digests, not load indices.** See `ExternalReference.id`.
 * 2. **Nothing is written to `console.error`.** The legacy loader reported a
 *    missing payload, an unparseable payload and a per-source entry count by
 *    printing to stderr and returning normally, so a source silently vanishing
 *    was indistinguishable from a source that was never declared. Every one of
 *    those is now a `DiagnosticIR` the caller receives.
 * 3. **`raw` is dropped.** The legacy `ScoutEntry.raw` kept the entire foreign
 *    record on every one of 61590 entries, which is most of the 12.45 MiB held in
 *    memory and re-serialised into every tool response. The normalised fields are
 *    the contract; a consumer needing more should get a wider mapping in
 *    `sources.yaml`, not an untyped escape hatch.
 *
 * An absent payload is a **warning, not a throw**. That is the design answer to
 * "the data is not in git": see `README.md`.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { DiagnosticIR } from "@aoe/ir";
import {
  SCOUT_DATA_ROOT_ABSENT,
  SCOUT_ENTRY_COUNT_DRIFT,
  SCOUT_ENTRY_DISCARDED,
  SCOUT_ENTRY_ID_COLLISION,
  SCOUT_SOURCE_DIGEST_MISMATCH,
  SCOUT_SOURCE_PAYLOAD_MISSING,
  SCOUT_SOURCE_PAYLOAD_UNREADABLE,
  diagnostic,
  type ExternalReference,
  type ExternalSourceDescriptor,
  type ScoutDataRoot,
  type ScoutManifest,
} from "./types.ts";

export interface ScoutLoadOptions {
  readonly manifest: ScoutManifest;
  readonly dataRoot: ScoutDataRoot;
  /**
   * Hash every payload and compare against the manifest. Off by default: it costs
   * a second full read of 12.45 MiB, and the loaded count already catches the
   * drift that matters at query time. A release gate should turn it on.
   */
  readonly verifyDigest?: boolean;
}

export interface ScoutLoadResult {
  readonly references: readonly ExternalReference[];
  /** Source id -> how many references it contributed. Sources at 0 are present. */
  readonly countsBySource: Readonly<Record<string, number>>;
  readonly diagnostics: readonly DiagnosticIR[];
}

function digest16(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex").slice(0, 16);
}

/** `Array.isArray(raw) ? raw : Object.values(raw).flatMap(...)` — `data.ts:496`. */
function flatten(raw: unknown): readonly unknown[] {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "object" && raw !== null) {
    return Object.values(raw as Record<string, unknown>).flatMap(value => (Array.isArray(value) ? value : []));
  }
  return [];
}

function pick(record: Record<string, unknown>, key: string | null): string | undefined {
  if (key === null) return undefined;
  const value = record[key];
  if (value === null || value === undefined) return undefined;
  // `data.ts:501` joins an array-valued category; applied to every mapped field so
  // a source whose `title` is a list does not stringify as "[object Object]".
  if (Array.isArray(value)) {
    const joined = value.filter(item => item !== null && item !== undefined).join(", ");
    return joined.length === 0 ? undefined : joined;
  }
  if (typeof value === "object") return undefined;
  const text = String(value);
  return text.length === 0 ? undefined : text;
}

interface SourceLoad {
  readonly references: readonly ExternalReference[];
  readonly discarded: number;
  readonly diagnostics: readonly DiagnosticIR[];
}

function normaliseSource(source: ExternalSourceDescriptor, raw: unknown): SourceLoad {
  const records = flatten(raw);
  const references: ExternalReference[] = [];
  const diagnostics: DiagnosticIR[] = [];
  const occurrences = new Map<string, number>();
  let discarded = 0;

  for (const candidate of records) {
    if (typeof candidate !== "object" || candidate === null || Array.isArray(candidate)) continue;
    const record = candidate as Record<string, unknown>;
    const title = pick(record, source.fields.title) ?? "";
    const url = pick(record, source.fields.url) ?? "";
    // `data.ts:500` — the sole discard rule, and the whole of the 61707 -> 61590 gap.
    if (title.length === 0 && url.length === 0) {
      discarded += 1;
      continue;
    }
    const description = source.fields.description !== null
      ? pick(record, source.fields.description)
      : (pick(record, "description") ?? pick(record, "excerpt"));

    const base = digest16(`${url}\u0000${title}`);
    const seen = occurrences.get(base) ?? 0;
    occurrences.set(base, seen + 1);
    // A repeat is a real duplicate in the payload, not a hash collision: the
    // suffix keeps ids unique without making the first occurrence's id depend on
    // whether a later duplicate exists.
    const id = seen === 0 ? `${source.id}#${base}` : `${source.id}#${base}~${seen + 1}`;

    const reference: ExternalReference = {
      id,
      sourceId: source.id,
      sourceName: source.sourceName,
      title,
      url,
      ...(pick(record, source.fields.category) !== undefined
        ? { category: pick(record, source.fields.category)! }
        : {}),
      ...(description !== undefined ? { description } : {}),
      ...(pick(record, source.fields.thumbnail) !== undefined
        ? { thumbnail: pick(record, source.fields.thumbnail)! }
        : {}),
    };
    references.push(reference);
  }

  const duplicates = [...occurrences.values()].filter(count => count > 1).length;
  if (duplicates > 0) {
    diagnostics.push(
      diagnostic(
        SCOUT_ENTRY_ID_COLLISION,
        `Source '${source.id}': ${duplicates} reference digest(s) occur more than once; later occurrences carry a '~n' suffix`,
        "info",
        ["sources", source.id],
      ),
    );
  }
  return { references, discarded, diagnostics };
}

export function loadScoutReferences(options: ScoutLoadOptions): ScoutLoadResult {
  const { manifest, dataRoot } = options;
  const diagnostics: DiagnosticIR[] = [];
  const countsBySource: Record<string, number> = {};
  const references: ExternalReference[] = [];

  if (dataRoot.kind === "absent") {
    // Deliberately one diagnostic, not eighteen: the sources are not individually
    // missing, the whole payload set was never acquired, and eighteen copies of
    // one fact reads like eighteen problems.
    diagnostics.push(
      diagnostic(
        SCOUT_DATA_ROOT_ABSENT,
        `Scout payload root is not configured (${dataRoot.reason}); ${manifest.sources.length} declared source(s) contribute no reference. Provenance and licences remain available through describeSources().`,
        "warning",
      ),
    );
    for (const source of manifest.sources) countsBySource[source.id] = 0;
    return { references, countsBySource, diagnostics };
  }

  for (const source of manifest.sources) {
    countsBySource[source.id] = 0;
    const absolute = join(dataRoot.path, source.payload.path);
    if (!existsSync(absolute)) {
      diagnostics.push(
        diagnostic(
          SCOUT_SOURCE_PAYLOAD_MISSING,
          `Source '${source.id}' declares payload '${source.payload.path}' (${source.payload.bytes} bytes, ${source.payload.loadableEntryCount} loadable entries) which is absent under the data root`,
          "warning",
          ["sources", source.id, "payload", "path"],
        ),
      );
      continue;
    }

    let raw: unknown;
    try {
      const text = readFileSync(absolute, "utf8");
      raw = JSON.parse(text);
    } catch (error) {
      diagnostics.push(
        diagnostic(
          SCOUT_SOURCE_PAYLOAD_UNREADABLE,
          `Source '${source.id}': ${error instanceof Error ? error.message : "read or parse failed"}`,
          "error",
          ["sources", source.id, "payload", "path"],
        ),
      );
      continue;
    }

    if (options.verifyDigest === true) {
      const actualBytes = statSync(absolute).size;
      const actualDigest = createHash("sha256").update(readFileSync(absolute)).digest("hex");
      if (actualDigest !== source.payload.sha256) {
        diagnostics.push(
          diagnostic(
            SCOUT_SOURCE_DIGEST_MISMATCH,
            `Source '${source.id}': payload sha256 is ${actualDigest} (${actualBytes} bytes), manifest records ${source.payload.sha256} (${source.payload.bytes} bytes)`,
            "warning",
            ["sources", source.id, "payload", "sha256"],
          ),
        );
      }
    }

    const load = normaliseSource(source, raw);
    diagnostics.push(...load.diagnostics);
    if (load.discarded > 0) {
      diagnostics.push(
        diagnostic(
          SCOUT_ENTRY_DISCARDED,
          `Source '${source.id}': ${load.discarded} record(s) mapped neither a title nor a URL and were discarded`,
          "info",
          ["sources", source.id],
        ),
      );
    }
    if (load.references.length !== source.payload.loadableEntryCount) {
      diagnostics.push(
        diagnostic(
          SCOUT_ENTRY_COUNT_DRIFT,
          `Source '${source.id}': loaded ${load.references.length} reference(s), manifest records ${source.payload.loadableEntryCount}`,
          "warning",
          ["sources", source.id, "payload", "loadableEntryCount"],
        ),
      );
    }
    countsBySource[source.id] = load.references.length;
    references.push(...load.references);
  }

  return { references, countsBySource, diagnostics };
}
