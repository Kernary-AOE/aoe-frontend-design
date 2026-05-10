# AiPaletteConvergence [fact] v1.0.0
Language-model agents, when given no color constraints, statistically converge on a narrow default palette derived from Tailwind's built-in color system and popular SaaS templates.
> Unconstrained LLM agents converge on: Indigo-600 or Violet-500 for hero backgrounds, Blue-500 for CTAs on white, Slate-700 for body text, and identical Tailwind default tokens across every project — producing 'AI slop' sites that look machine-generated because they share the same safe-but-boring palette.
domain: frontend-design

## Applies To
- any AI-generated frontend build without color system constraints
- prompt-only design workflows
- scaffolded Tailwind projects without custom palette configuration

## Counter Conditions
- When the prompt explicitly specifies brand hue angles in OKLCH, convergence is broken
- When a persona constraint is provided (e.g. 'developer tool aesthetic'), the agent may self-select away from violet/indigo
- Human designers reviewing AI output before ship can catch and correct convergence patterns
