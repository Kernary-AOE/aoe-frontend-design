export interface CompositionContract {
  source_atom: string;                  // atom that owns this contract (e.g. "@community/persona-stripe")
  must_include: string[];               // atom ids
  must_avoid: string[];                 // atom ids
  typography_required: Record<string, string>;
  color_required: Record<string, string>;
  motion_prescriptions: string[];       // atom ids
  raw: any;                             // raw composition block from AST
}

export interface MergedContract {
  source_atoms: string[];               // contracts merged from multiple personas
  must_include: Set<string>;
  must_avoid: Set<string>;
  typography_required: Record<string, string>;
  color_required: Record<string, string>;
  motion_prescriptions: Set<string>;
  conflicts: Array<{                    // detected conflicts
    atom: string;
    reason: string;
  }>;
}
