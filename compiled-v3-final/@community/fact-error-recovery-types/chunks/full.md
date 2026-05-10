# ErrorRecoveryTypes [fact] v1.0.0
User-visible errors fall into three placement / severity tiers: inline (field-level, contextual), toast / notification (transient, action-level), and global / blocking (page-level, recovery required).
> Error feedback should be placed at one of three levels matched to scope and severity: (1) inline next to the field / control that produced the error (form validation, individual save failure), (2) toast / banner for transient action-level failures that don't block the surrounding workflow (network blip, auto-save retry), and (3) global / blocking modal or page for irrecoverable / session-level failures (auth expired, payment hard-decline).

## Confidence
strong

## Applies To
- form design (inline validation)
- save / auto-save feedback
- global error boundaries (network down, auth expired)
- decision: when to escalate from inline to toast to blocking

## Quantitative
- **Tiers**: 3
- **Tier 1 Inline**: field / control level, persistent until resolved
- **Tier 2 Transient**: toast / banner, 4–7 s auto-dismiss with retry action
- **Tier 3 Blocking**: modal / full-page, requires user acknowledgment

## Counter Conditions
- Some errors span tiers — a payment rejection may show inline + toast + send to email.
- Single-error-tier products (only toasts, only inline) often miss recovery affordance for one tier.
- Accessibility: aria-live='assertive' for blocking, 'polite' for transient, no announcement for inline-on-blur.

## Sources

## Confidence
strong

## Source
- Jakob Nielsen, '10 Usability Heuristics for User Interface Design' — Heuristic 9: Help users recognize, diagnose, and recover from errors
- Refactoring UI (Wathan & Schoger), chapter on error states
- Material Design — Snackbars vs Banners vs Dialogs guidance

## Applies To
- form design (inline validation)
- save / auto-save feedback
- global error boundaries (network down, auth expired)
- decision: when to escalate from inline to toast to blocking

## Quantitative
- **Tiers**: 3
- **Tier 1 Inline**: field / control level, persistent until resolved
- **Tier 2 Transient**: toast / banner, 4–7 s auto-dismiss with retry action
- **Tier 3 Blocking**: modal / full-page, requires user acknowledgment

## Counter Conditions
- Some errors span tiers — a payment rejection may show inline + toast + send to email.
- Single-error-tier products (only toasts, only inline) often miss recovery affordance for one tier.
- Accessibility: aria-live='assertive' for blocking, 'polite' for transient, no announcement for inline-on-blur.
