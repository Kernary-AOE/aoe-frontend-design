# FontBlacklist [constraint] v1.0.0
A list of typefaces that are banned from use as the primary display or body typeface in impeccable-quality frontend design because they are statistically over-represented in AI-generated interfaces and commodity templates, producing undistinguished output.
domain: visual-design

values: Inter, Roboto, Arial, Helvetica Neue, Space Grotesk, DM Sans, Nunito, Poppins, Open Sans, Lato

## Target
font-family

## Severity
block

## Values
- Inter
- Roboto
- Arial
- Helvetica Neue
- Space Grotesk
- DM Sans
- Nunito
- Poppins
- Open Sans
- Lato

## Exceptions
-
  - **Font**: Inter
  - **Allowed When**: Dense data table UI (@impeccable/persona-dense-pragmatist context) where Inter's tabular figure quality and screen optimization are the primary requirement.
-
  - **Font**: Arial / Helvetica Neue
  - **Allowed When**: System font stack fallback after a custom web font — e.g. `font-family: 'Söhne', 'Helvetica Neue', sans-serif`.

## Remediation
@impeccable/whitelist-display-fonts — approved display and body typefaces

## Approved Alternatives
- Geist (Vercel's custom, free)
- Söhne (Klim Type, licensed)
- Canela (Commercial Type, licensed)
- Freight Display / Freight Text (GarageFonts)
- Roc Grotesk (Kostic)
- GT Super (Grilli Type)
- Tiempos Text / Tiempos Headline (Klim Type)
- Berkeley Mono (Berkeley Graphics, for monospace contexts)

## Rationale
These fonts appear in the top-10 most-used Google Fonts and are the default choices in shadcn/ui, Tailwind UI, and most LLM-generated code. Using them communicates nothing about brand identity and produces visually indistinguishable interfaces. The blacklist forces deliberate typographic choice.
