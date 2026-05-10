# OverloadedScreen [anti-pattern] v1.0.0
Cramming many unrelated actions, decisions, or form sections onto a single screen within a user flow — presenting everything at once instead of guiding users through focused, single-purpose steps.
domain: frontend-design

## Label
Overloaded Single Screen

## Trap
Reduces perceived flow length (fewer screens = simpler, right?). Product managers prefer fewer 'steps'. Engineers default to putting all related data in one form. The result looks efficient on a wireframe but overwhelms in production.

## Consequence
Overloaded screens trigger cognitive overload — users abandon flows, make errors on infrequent fields, and miss important options buried at the bottom. Miller's Law: working memory handles ~7 items; screens with 20+ decisions exceed it entirely.

## Detection Heuristics
- A single form/screen has more than 2 distinct decision stages (account type → billing → preferences)
- Scroll depth on a key flow screen exceeds 2× the viewport height
- Multiple independent sections on one screen that could logically be their own step
- User testing shows users missing important fields because they didn't scroll far enough
- A 'submit' button is preceded by more than 7–8 form fields without any grouping breaks

## Remediation
- Break complex flows into focused, single-purpose steps using a multi-step wizard pattern.
- One question or decision per screen for high-stakes flows (onboarding, checkout, account setup).
- Use progressive disclosure: show advanced options only after the primary path is complete.
- Group related fields into clear sections with visible headings — then consider whether each section belongs on a separate step.

## Severity
warning

## Label
Overloaded Single Screen

## Trap
Reduces perceived flow length (fewer screens = simpler, right?). Product managers prefer fewer 'steps'. Engineers default to putting all related data in one form. The result looks efficient on a wireframe but overwhelms in production.

## Consequence
Overloaded screens trigger cognitive overload — users abandon flows, make errors on infrequent fields, and miss important options buried at the bottom. Miller's Law: working memory handles ~7 items; screens with 20+ decisions exceed it entirely.

## Detection Heuristics
- A single form/screen has more than 2 distinct decision stages (account type → billing → preferences)
- Scroll depth on a key flow screen exceeds 2× the viewport height
- Multiple independent sections on one screen that could logically be their own step
- User testing shows users missing important fields because they didn't scroll far enough
- A 'submit' button is preceded by more than 7–8 form fields without any grouping breaks

## Remediation
- Break complex flows into focused, single-purpose steps using a multi-step wizard pattern.
- One question or decision per screen for high-stakes flows (onboarding, checkout, account setup).
- Use progressive disclosure: show advanced options only after the primary path is complete.
- Group related fields into clear sections with visible headings — then consider whether each section belongs on a separate step.

## Severity
warning
