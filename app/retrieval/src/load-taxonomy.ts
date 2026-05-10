/**
 * load-taxonomy.ts
 * Reads a task-type YAML from primes-v3/taxonomy/<task_type>/<sub_type>.yaml
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import type { TaskTypeDefinition } from "./types.ts";

/**
 * Load a taxonomy YAML for a specific task_type + sub_type.
 * Returns null if the file does not exist.
 */
export function loadTaskYaml(
  taxonomyDir: string,
  task_type: string,
  sub_type: string,
): TaskTypeDefinition | null {
  const yamlPath = join(taxonomyDir, task_type, `${sub_type}.yaml`);
  if (!existsSync(yamlPath)) return null;

  const raw = readFileSync(yamlPath, "utf8");
  const parsed = parseYaml(raw) as Partial<TaskTypeDefinition>;

  return {
    task_type: parsed.task_type ?? sub_type,
    parent: parsed.parent ?? task_type,
    description: parsed.description ?? "",
    trigger_keywords: parsed.trigger_keywords ?? [],
    default_register_pool: parsed.default_register_pool ?? [],
    required_atoms: parsed.required_atoms ?? [],
    recommended_motion: parsed.recommended_motion ?? [],
    forbidden_atoms: parsed.forbidden_atoms ?? [],
    quality_checks: parsed.quality_checks ?? [],
    max_atoms_per_axis: parsed.max_atoms_per_axis,
  };
}
