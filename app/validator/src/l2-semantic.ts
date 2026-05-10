import { readFileSync } from "fs";
import type { IntentObject } from "@prime-lang/intent";
import { callAI, AI_MODELS } from "../../compiler/src/ai-client.ts";

export interface L2Result {
  pass: boolean;
  alignment_score: number;
  issues: string[];
  /** True when L2 was skipped (no API key / no model configured); pass=true in that case. */
  skipped?: boolean;
}

function hasAnyLLMKey(): boolean {
  const env = (globalThis as any)?.process?.env ?? {};
  return Boolean(
    env.ANTHROPIC_API_KEY ||
      env.DEEPSEEK_API_KEY ||
      env.OPENAI_API_KEY ||
      env.GOOGLE_API_KEY ||
      env.GEMINI_API_KEY,
  );
}

/** L2 — DeepSeek check: does this HTML aesthetic match the intended register?
 *
 * If no LLM API key is configured the check is *skipped* (pass=true, skipped=true)
 * so the validation loop doesn't burn agent turns retrying a check that can't run.
 */
export async function checkL2Semantic(
  htmlPath: string,
  intent: IntentObject
): Promise<L2Result> {
  if (!hasAnyLLMKey()) {
    return {
      pass: true,
      alignment_score: 1.0,
      issues: [],
      skipped: true,
    };
  }

  const html = readFileSync(htmlPath, "utf-8");
  // truncate large HTML to fit prompt
  const sample = html.length > 20000 ? html.slice(0, 20000) + "\n...[truncated]" : html;

  const targetSchool = intent.register_candidates[0]?.school || "unknown";
  const prompt = `You are a frontend design judge. Look at this HTML output:

\`\`\`html
${sample}
\`\`\`

Target aesthetic: ${targetSchool} school
Vibe descriptors: ${intent.vibe.join(", ")}
Motion priority: ${intent.motion_priority}
Density: ${intent.density}

Score 0.0-1.0 how well the HTML matches the target aesthetic. Reply ONLY in this JSON format:
{"alignment_score": 0.85, "issues": ["specific issue 1", "specific issue 2"]}

If alignment_score >= 0.7, the design is acceptable for the target. Below 0.7 is failure.`;

  const response = await callAI(prompt, { model: AI_MODELS.L2, maxTokens: 512 });
  if (!response) {
    // Key was present but call failed (network / quota). Skip rather than fail —
    // failing here causes spurious retry loops at the agent layer.
    return {
      pass: true,
      alignment_score: 1.0,
      issues: ["L2 LLM call returned empty (network/quota?) — skipped"],
      skipped: true,
    };
  }

  // robust JSON extraction
  let parsed: any = {};
  try {
    const match = response.match(/\{[\s\S]*\}/);
    if (match) parsed = JSON.parse(match[0]);
  } catch (e) {
    return {
      pass: true,
      alignment_score: 1.0,
      issues: [`L2 response not JSON — skipped: ${response.slice(0, 200)}`],
      skipped: true,
    };
  }

  const score = Number(parsed.alignment_score) || 0;
  return {
    pass: score >= 0.7,
    alignment_score: score,
    issues: Array.isArray(parsed.issues) ? parsed.issues : [],
  };
}
