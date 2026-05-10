# DistinctivenessMandate [constraint] v1.0.0
Every designed artifact must pass the AI-slop test before ship: show the interface to someone who knows design tools and say 'AI made this.' If they believe you immediately — the design has failed the distinctiveness mandate.
domain: frontend-design

## Severity
critical

## Target
- any AI-generated or AI-assisted frontend before public launch

## Values
-
  - **Required**: Font choice is not Inter, Plus Jakarta Sans, DM Sans, Roboto, or Arial
-
  - **Required**: Primary color is not in the 240–300° hue range (Tailwind purple/violet/indigo default)
-
  - **Required**: Border radius is applied per persona intent — not rounded-2xl universally
-
  - **Required**: Page structure is not the generic hero→3-column features→testimonials→CTA template
-
  - **Required**: At least one design choice would make a designer ask 'how did they do that?' rather than 'which AI made this?'

## Rationale
The distinctiveness mandate operationalizes @impeccable/principle-distinctiveness as a hard gate. A design that passes casual AI detection has not merely failed aesthetically — it has failed to communicate brand identity, which is a functional failure.
