import type { ValidationReport } from "./types.ts";

export function buildRetryPrompt(report: ValidationReport): string {
  const lines = ["Your HTML did not pass validation. Please fix:"];
  if (!report.l1.pass) {
    lines.push("\n## Structure / a11y issues:");
    for (const i of report.l1.issues) lines.push(`- ${i}`);
  }
  if (!report.l2.pass) {
    lines.push(`\n## Aesthetic alignment (score ${report.l2.alignment_score.toFixed(2)} / 0.70 required):`);
    for (const i of report.l2.issues) lines.push(`- ${i}`);
  }
  if (!report.l3.pass) {
    lines.push("\n## Composition contract violations:");
    for (const v of report.l3.violated) lines.push(`- ${v}`);
  }
  lines.push("\n\nRewrite index.html addressing the above. Keep what works.");
  return lines.join("\n");
}
