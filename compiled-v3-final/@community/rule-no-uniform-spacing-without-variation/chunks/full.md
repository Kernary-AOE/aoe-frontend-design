# NoUniformSpacingWithoutVariation [rule] v1.0.0
> Do not apply uniform 8pt grid spacing mechanically to every element without variation. The 8pt grid is a floor — not a ceiling. Intentional spacing variation (tight groupings within a section, generous separation between sections) creates visual rhythm; uniform gap-4 or gap-8 everywhere creates visual monotony.
domain: frontend-design

## Severity
warning

## Use Instead
- Within-section spacing: 4–12px (tight relationship between related elements)
- Between-section spacing: 48–96px (generous separation between content groups)
- Section padding: varies by persona — 24px for dense, 64–96px for editorial/marketing
- At minimum 5 distinct spacing values in any complete page design

## Rationale
AI models default to 2-3 spacing values for the entire UI (gap-4 and gap-8 account for 70%+ of gap usage in training data). Uniform spacing is a convergence signal — it communicates that no spacing decisions were made. Rhythm requires contrast between dense and generous spacing zones.

## Severity
warning

## Use Instead
- Within-section spacing: 4–12px (tight relationship between related elements)
- Between-section spacing: 48–96px (generous separation between content groups)
- Section padding: varies by persona — 24px for dense, 64–96px for editorial/marketing
- At minimum 5 distinct spacing values in any complete page design
