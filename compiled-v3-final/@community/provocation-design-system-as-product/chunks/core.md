# DesignSystemAsProduct [provocation] v1.0.0
domain: design-system

## Label
Is Your Design System a Product or a Liability?

## Trigger
team is building a 'design system' as a side-project, library dump, or token export — without a roadmap, owner, customer, or release process

## Question
If your design system has no PM, no release notes, no migration guide, no SLA on bug fixes, no customer interviews with consuming teams, and no metric for adoption — in what sense is it a system rather than a folder of components someone copies and forks? You are not running a design system; you are running a graveyard.

## Intent
A design system is a product whose customers are other product teams inside the company. Like any product, it succeeds or fails based on whether its customers adopt it, can rely on it, and have a path to influence it. Most failed design systems were never run as products — they were treated as a one-time export from the design tool, then abandoned when consuming teams forked. Reframing the system as a product (with an owner, roadmap, support channel, deprecation policy, semver) is the only configuration that survives company growth.

## Resolution Paths
-
  - **Context**: Component library in a monorepo, no owner, last release 6+ months ago
  - **Answer**: You don't have a design system, you have legacy. Either staff a small DS team (1 designer + 1–2 engineers + part-time PM) and run it as a product, or formally deprecate it and let teams own their components.
-
  - **Context**: Tokens exist but no component library; teams copy-paste
  - **Answer**: Tokens are a foundation, not a system. Either accept that your DS is tokens-only (and document that explicitly) or invest in primitives + migration guidance.
-
  - **Context**: DS owned by design team only, no engineering buy-in
  - **Answer**: Components don't ship from Figma. A DS without an engineering co-owner ships marketing slides, not production UI. Pair design with engineering or accept that consumers will fork.
-
  - **Context**: DS team exists, has PM, releases regularly, measures adoption
  - **Answer**: You're running it as a product. Continue: solicit customer feedback, maintain a deprecation policy, measure component adoption % and time-to-implement-new-pattern.

## Diagnostic Questions
- Who is the PM of the design system? (If 'no one', this is a liability not a product.)
- What is your release cadence? When was the last release?
- How do consuming teams report bugs? Is there an SLA?
- What % of new product surfaces use the DS vs forking? Is this measured?
- Do you have a deprecation policy? When did you last deprecate something?
- Is there a migration guide for breaking changes?
