export interface ValidationReport {
  pass: boolean;
  l1: { pass: boolean; issues: string[] };       // structure / a11y
  l2: { pass: boolean; alignment_score: number; issues: string[] };  // semantic alignment
  l3: { pass: boolean; honored: string[]; violated: string[] };      // composition contract
  feedback: string;                                // retry prompt if !pass
}
