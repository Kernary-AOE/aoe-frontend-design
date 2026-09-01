/**
 * @module @prime-domain/frontend-design/scout-catalog
 *
 * Scout as a `SourceAdapter`: 18 third-party reference catalogues, normalised to
 * one shape, searchable with a §9.3 feature breakdown, and **not** ingested as
 * corpus units.
 *
 * Read `src/types.ts` for why this is a source adapter rather than a
 * `CandidateGenerator`, and `README.md` for the acceptance criteria and for how a
 * capability whose payload is not in git is expected to be deployed.
 *
 * Dependency direction (§15.4): this module imports `@aoe/ir` and
 * `@aoe/query-engine` and nothing imports it from there. It imports
 * nothing from the repository-root `packages/` tree.
 */

import { existsSync } from "node:fs";
import type { DiagnosticIR } from "@aoe/ir";
import { loadScoutReferences } from "./loader.ts";
import { ADAPTER_ROOT, MANIFEST_PATH, SCOUT_FEATURE_AXES, loadScoutManifest, parseScoutManifest } from "./manifest.ts";
import { renderReferences, searchReferences, tokenize, type ScoutSearchIndex } from "./search.ts";
import {
  SCOUT_NOT_LOADED,
  ScoutManifestError,
  diagnostic,
  type ExternalCandidate,
  type ExternalReference,
  type ExternalSourceDescriptor,
  type ScoutDataRoot,
  type ScoutManifest,
  type ScoutSearchRequest,
  type ScoutSearchResult,
  type ScoutSourceAdapter,
} from "./types.ts";

export { ADAPTER_ROOT, MANIFEST_FILENAME, MANIFEST_PATH, SCOUT_FEATURE_AXES, loadScoutManifest, parseScoutManifest } from "./manifest.ts";
export { loadScoutReferences, type ScoutLoadOptions, type ScoutLoadResult } from "./loader.ts";
export { renderReferences, searchReferences, tokenize, type ScoutSearchIndex } from "./search.ts";
export * from "./types.ts";

/** The adapter name a host registers it under, and the id half of `provides`. */
export const SCOUT_ADAPTER_NAME = "scout-catalog";

export interface ScoutAdapterOptions {
  /** Defaults to the manifest shipped beside this adapter. */
  readonly manifest?: ScoutManifest;
  /**
   * Where payloads live. **Explicit on purpose**: §9.2 forbids a process-global
   * `AOE_CORPUS_DIR` standing in for a complete run context, and the legacy loader
   * derived the payload root by walking one level up from `primeRoot`
   * (`data.ts:445`), which silently tied the data location to the corpus location.
   */
  readonly dataRoot?: ScoutDataRoot;
  readonly verifyDigest?: boolean;
}

/**
 * Resolve a data root from an explicit path, reporting *why* it is absent rather
 * than returning a bare undefined. A directory that does not exist and a
 * directory that was never configured are different operator mistakes.
 */
export function resolveDataRoot(path: string | undefined): ScoutDataRoot {
  if (path === undefined || path.length === 0) {
    return { kind: "absent", reason: "no payload root was configured" };
  }
  if (!existsSync(path)) {
    return { kind: "absent", reason: `configured payload root '${path}' does not exist` };
  }
  return { kind: "directory", path };
}

class ScoutCatalogAdapter implements ScoutSourceAdapter {
  readonly name = SCOUT_ADAPTER_NAME;
  private readonly manifest: ScoutManifest;
  private readonly dataRoot: ScoutDataRoot;
  private readonly verifyDigest: boolean;
  private index: ScoutSearchIndex | undefined;

  constructor(options: ScoutAdapterOptions) {
    this.manifest = options.manifest ?? loadScoutManifest();
    this.dataRoot = options.dataRoot ?? { kind: "absent", reason: "no payload root was configured" };
    this.verifyDigest = options.verifyDigest ?? false;
  }

  get loaded(): boolean {
    return this.index !== undefined;
  }

  describeSources(): readonly ExternalSourceDescriptor[] {
    return this.manifest.sources;
  }

  /** Total references the manifest says a complete payload set would yield. */
  get declaredReferenceCount(): number {
    return this.manifest.sources.reduce((sum, source) => sum + source.payload.loadableEntryCount, 0);
  }

  async load(): Promise<readonly DiagnosticIR[]> {
    const result = loadScoutReferences({
      manifest: this.manifest,
      dataRoot: this.dataRoot,
      verifyDigest: this.verifyDigest,
    });
    this.index = {
      references: result.references,
      sourcesById: new Map(this.manifest.sources.map(source => [source.id, source])),
      retrieval: this.manifest.retrieval,
    };
    this.counts = result.countsBySource;
    return result.diagnostics;
  }

  private counts: Readonly<Record<string, number>> = {};

  get countsBySource(): Readonly<Record<string, number>> {
    return this.counts;
  }

  get referenceCount(): number {
    return this.index?.references.length ?? 0;
  }

  search(request: ScoutSearchRequest): ScoutSearchResult {
    if (this.index === undefined) {
      // A throw here would make "payload absent" and "load() not called" both
      // surface as a crash in a tool handler. Only the second is a programming
      // error, and it is reported as one without taking the process down.
      return {
        count: 0,
        items: [],
        diagnostics: [
          diagnostic(
            SCOUT_NOT_LOADED,
            `Adapter '${this.name}' was queried before load() completed; no payload is in memory`,
            "error",
          ),
        ],
      };
    }
    return searchReferences(this.index, request);
  }

  /** `## References` for a brief, in one call. Scout's second legacy consumer. */
  renderReferencesFor(text: string, limit = 4): string {
    const result = this.search({ text, requireThumbnail: true, limit });
    return renderReferences(result.items);
  }
}

export type { ScoutCatalogAdapter };

export function createScoutSourceAdapter(options: ScoutAdapterOptions = {}): ScoutCatalogAdapter {
  return new ScoutCatalogAdapter(options);
}

/**
 * A minimal in-process adapter registry.
 *
 * This exists because the kernel has no `SourceAdapter` registry to register
 * against — `CandidateGeneratorRegistry` is typed on `CandidateGenerator` and
 * cannot hold this. It is deliberately as thin as the kernel's own registry
 * (register / get / names, duplicate is an error, nothing registered by default)
 * so that when the kernel grows the real one, this class is deleted rather than
 * migrated.
 */
export class SourceAdapterRegistry {
  private readonly byName = new Map<string, ScoutSourceAdapter>();

  register(adapter: ScoutSourceAdapter): this {
    if (adapter.name.length === 0) {
      throw new ScoutManifestError("ADAPTER_NAME_EMPTY", "Source adapter name must be non-empty");
    }
    if (this.byName.has(adapter.name)) {
      throw new ScoutManifestError(
        "ADAPTER_DUPLICATE",
        `Source adapter '${adapter.name}' is already registered`,
      );
    }
    this.byName.set(adapter.name, adapter);
    return this;
  }

  get(name: string): ScoutSourceAdapter | undefined {
    return this.byName.get(name);
  }

  names(): readonly string[] {
    return [...this.byName.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }
}

export interface ScoutRegistration {
  readonly registry: SourceAdapterRegistry;
  readonly adapter: ScoutCatalogAdapter;
  /** Diagnostics from the payload load. Empty only when all 18 payloads loaded. */
  readonly diagnostics: readonly DiagnosticIR[];
}

/**
 * Build, load and register the scout adapter. This is the entry point a host
 * (`projects/aoe-frontend-design/mcp`) calls; `dataRoot` is threaded through so
 * the host, not this module, decides where payloads come from.
 */
export async function registerScoutSourceAdapter(
  options: ScoutAdapterOptions & { readonly registry?: SourceAdapterRegistry } = {},
): Promise<ScoutRegistration> {
  const registry = options.registry ?? new SourceAdapterRegistry();
  const adapter = createScoutSourceAdapter(options);
  const diagnostics = await adapter.load();
  registry.register(adapter);
  return { registry, adapter, diagnostics };
}

export type { ExternalCandidate, ExternalReference };
