#!/usr/bin/env bun
import { resolve } from "node:path";
import {
  createAoeMcpServer,
  executeAoePlan,
} from "../../aoe-engine/packages/mcp-server-core/src/index.ts";
import { createDesignServer } from "../mcp/src/server.ts";

const root = resolve(import.meta.dir, "..");
const bundle = resolve(root, "corpus", "dist");
const model = resolve(root, "model");
const silent = { error() {} };

const generic = createAoeMcpServer({
  corpusDir: bundle,
  modelRoot: model,
  requireManifest: true,
  stderr: silent,
});
const plan = executeAoePlan({ query: "accessible checkout", limit: 3 }, generic.serve);
if (!("plan" in plan) || plan.plan.selected.length === 0) {
  throw new Error("Generic MCP returned no selection for the production smoke query");
}

const domain = createDesignServer({
  corpusDir: bundle,
  environment: {
    AOE_MODEL_DIR: model,
    AOE_SCOUT_DATA_ROOT: resolve(root, "..", ".."),
  },
  stderr: silent,
});
const names = domain.toolset.tools.map(tool => tool.schema.name);
if (!names.includes("aoe_design_plan") || !names.includes("aoe_design_validate")) {
  throw new Error(`Domain MCP projected an incomplete toolset: ${names.join(", ")}`);
}
await domain.toolset.invoke("aoe_design_plan", { brief: "accessible checkout" });

const genericSnapshot = `${generic.snapshot.corpus}@${generic.snapshot.release}`;
if (domain.snapshotLabel !== genericSnapshot) {
  throw new Error(`MCP snapshot split-brain: generic=${genericSnapshot}, domain=${domain.snapshotLabel}`);
}

console.log(JSON.stringify({
  status: "pass",
  snapshot: genericSnapshot,
  model: generic.model.model.manifest.name,
  activeUnits: generic.index.atoms.length,
  selected: plan.plan.selected.map(candidate => candidate.unitId),
  domainTools: names,
}, null, 2));
