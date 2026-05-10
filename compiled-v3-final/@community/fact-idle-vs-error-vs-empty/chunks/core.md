# IdleVsErrorVsEmpty [fact] v1.0.0
Three different absence-of-content states are commonly conflated but require distinct UI: idle (no action taken yet — invite the user), empty (action taken but legitimately no data — show next-step CTA), and error (action taken, system failed — show recovery).
> Three states that all show 'nothing here' must be visually and semantically distinct: (1) idle / first-run — no query / filter / action yet, copy invites onboarding action; (2) empty result — query / filter ran successfully and returned zero, copy explains the criterion and offers refinement; (3) error — fetch failed, copy describes the failure and offers retry — collapsing them produces ambiguous UX where users cannot tell whether they should retry, change input, or take a first action.

## Confidence
strong

## Applies To
- list / table / search-result UI
- first-run experience design
- filter / search empty states
- API failure UI
- dashboard widgets with conditional data

## Quantitative
- **Distinct States**: 3
- **Each State Cta**: idle: onboarding/CTA; empty: refine/clear filter; error: retry/contact

## Counter Conditions
- Trivial UI (no first-run distinction needed) may collapse idle into empty.
- Loading state is a fourth orthogonal state — these three apply once loading completes.
- Partial-error states (some rows loaded, some failed) need a hybrid — show what loaded, surface the failure inline.
