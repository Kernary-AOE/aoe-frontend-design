import { checkL1Structure } from "./l1-structure.ts";
import { checkL2Semantic } from "./l2-semantic.ts";
import { checkL3Composition } from "./l3-composition.ts";
import { buildRetryPrompt } from "./feedback-builder.ts";
import type { ValidationReport } from "./types.ts";
import type { IntentObject } from "@prime-lang/intent";
import type { MergedContract } from "@prime-lang/composition";

export * from "./types.ts";
export { checkL1Structure, checkL2Semantic, checkL3Composition, buildRetryPrompt };

/** Combined: run all three layers. */
export async function validate(
  htmlPath: string,
  intent: IntentObject,
  contract: MergedContract
): Promise<ValidationReport> {
  const l1 = checkL1Structure(htmlPath);
  const l2 = await checkL2Semantic(htmlPath, intent);
  const l3 = checkL3Composition(htmlPath, contract);
  const pass = l1.pass && l2.pass && l3.pass;
  const feedback = pass ? "OK" : buildRetryPrompt({ pass, l1, l2, l3, feedback: "" });
  return { pass, l1, l2, l3, feedback };
}
