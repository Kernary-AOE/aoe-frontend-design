import type { IntentObject } from "@prime-lang/intent";

export type Axis = "register" | "pattern" | "motion" | "typography" | "color" | "rules";

export interface AxisResult {
  axis: Axis;
  primary: AtomRef;
  alternates: AtomRef[];
  rationale: string;
}

export interface AtomRef {
  id: string;
  kind: string;
  level: "summary" | "core" | "full";
  tokens: number;
  description: string;
  edges: Array<{ type: string; target: string }>;
  /** Optional tags used for vibe/density alignment in the ranker */
  tags?: string[];
}

export interface RetrievalResult {
  intent: IntentObject;
  axes: AxisResult[];
  task_yaml: TaskTypeDefinition | null;
  total_atoms: number;
  total_tokens_estimate: number;
}

export interface TaskTypeDefinition {
  task_type: string;
  parent: string;
  description: string;
  trigger_keywords: string[];
  default_register_pool: Array<{ school: string; weight: number }>;
  required_atoms: string[];
  recommended_motion: string[];
  forbidden_atoms: string[];
  quality_checks: string[];
  /** Per-axis atom budget; default 3 each. Lower for text-heavy tasks
   *  (blog), higher for motion-heavy (toast). */
  max_atoms_per_axis?: Partial<Record<string, number>>;
}
