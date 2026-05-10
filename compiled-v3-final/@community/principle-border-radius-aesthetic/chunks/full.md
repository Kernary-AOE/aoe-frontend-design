# BorderRadiusAesthetic [principle] v1.0.0
> Border-radius is a design decision that communicates product personality — it must be chosen intentionally based on persona and brand, not accepted as a framework default. Using rounded-2xl (16px) uniformly on all elements is the clearest marker of an unconsidered UI.
domain: frontend-design

## Applies To
- any UI with card, button, input, or modal components
- design token definition phase
- AI-generated component scaffolding
- design system --radius base token decisions

## Counter Examples
- rounded-2xl applied to every card, button, and modal in a B2B SaaS dashboard
- Applying 16px+ radius to a data-dense dashboard or developer tool
- Mixing arbitrary radius values (4px, 8px, 12px, 16px, 20px) without a derived scale

## Examples
- Developer tool using 2–3px radius — precise, minimal, professional aesthetic
- shadcn/ui pattern: --radius: 8px base token, all derived with calc() for a cohesive system
- Brutalist editorial site using 0px — confrontational, intentional signal

## Rationale
Every radius value communicates personality. Choosing a radius without intentionality is the same as choosing a typeface without intentionality — you're still making a choice, just an unconsidered one. A 0px card says 'we take structure seriously.' A 24px card says 'we're approachable and fun.' Neither is wrong — but they must match the product's actual personality. The problem is when a serious B2B SaaS ships rounded-2xl on everything because it was the Tailwind default.
