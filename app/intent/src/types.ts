export interface IntentObject {
  task_type: string;        // e.g. "marketing-landing"
  sub_type: string;         // e.g. "waitlist"
  register_candidates: Array<{ school: string; weight: number; rationale: string }>;
  vibe: string[];
  motion_priority: "low" | "med" | "high";
  density: "tight" | "comfy" | "loose";
  domain: string;
  required_axes: string[];  // ["register", "pattern", "motion", "typography", "color", "rules"]
  ambiguity_flags: string[];
}
