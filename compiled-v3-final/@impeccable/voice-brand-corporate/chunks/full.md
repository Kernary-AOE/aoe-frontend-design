# BrandCorporate [voice] v1.0.0
The voice used by large legacy enterprises in annual reports, investor decks, and About pages. Stable, aspirational, third-person, abstraction-heavy. Sounds like IBM, Salesforce, Oracle, SAP. INCLUDED AS AN ANTI-PATTERN: agents should recognize this voice and, in most modern product contexts, deliberately avoid it.
domain: enterprise-brand

## Label
Brand Corporate (anti-pattern reference)

## Tone
stable + aspirational + abstract

## Emphasis
global scope → trusted partner framing → outcomes phrased as transformation

## Emotional Arc
neutral → reassured-by-scale → too-distant-to-act — which is precisely why this voice fails on product surfaces

## Patterns
-
  - **Label**: Third-person company self-reference
  - **Template**: {CompanyName} {action verb} {abstract noun} for {category of customer} worldwide.
  - **Example**: Globex empowers digital transformation for enterprises worldwide.
-
  - **Label**: Abstraction stack
  - **Template**: Through {platform}, {customer-type} can {abstract-verb} {abstract-outcome} at {scale-modifier}.
  - **Example**: Through the Globex Cloud Platform, organizations can accelerate innovation at unprecedented scale.
-
  - **Label**: Trusted-partner phrasing
  - **Template**: A trusted partner to {N} of the {prestige-list}, {company} delivers {category} solutions.
  - **Example**: A trusted partner to 95 of the Fortune 100, Globex delivers AI-driven enterprise solutions.
-
  - **Label**: Mission-statement abstraction
  - **Template**: Our mission is to {verb} {abstract-noun} through {abstract-method}.
  - **Example**: Our mission is to advance human progress through intelligent systems.
-
  - **Label**: Aspirational future tense
  - **Template**: We envision a future where {idealized-state}.
  - **Example**: We envision a future where every business is empowered by data.
-
  - **Label**: Tri-pillar framing
  - **Template**: Built on three pillars: {abstract-1}, {abstract-2}, and {abstract-3}.
  - **Example**: Built on three pillars: trust, innovation, and partnership.

## Prohibitions
- Do not use this voice on product surfaces (landing pages, dashboards, in-product copy) — it actively reduces conversion.
- Do not use this voice when the audience is a developer or a builder.
- Do not combine with `voice-marketing-bold` or `voice-casual-warm` — the resulting tone reads as committee-edited.
- Do not let an LLM default to this voice when the persona is anything other than a regulated-industry homepage.
- Do not use first-person plural ('we') alongside the third-person company name in the same paragraph — pick one.

## Examples

## Compatible
- @impeccable/voice-brand-corporate

## Conflicts
- @impeccable/voice-marketing-bold
- @impeccable/voice-casual-warm
- @impeccable/voice-dev-technical
- @impeccable/voice-poetic-literary
