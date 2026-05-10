# VisualFingerprintUniqueness [constraint] v1.0.0
A designed product must have a unique visual fingerprint — a set of at least 3 specific, non-default design choices that make it immediately recognizable as distinct from both AI-generated output and competitor products in its category.
domain: frontend-design

## Severity
warning

## Target
- product UIs before public launch
- brand identity systems
- component library initialization

## Values
-
  - **Required**: At least one distinctive typography choice (not Inter, Roboto, or Tailwind defaults)
-
  - **Required**: At least one distinctive color choice with documented brand rationale (not default Tailwind hue)
-
  - **Required**: At least one distinctive structural choice (radius philosophy, layout asymmetry, spacing density, or motion signature)
-
  - **Required**: The three choices are internally consistent — they derive from the same aesthetic bet, not from random differentiation
