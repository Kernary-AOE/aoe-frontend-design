# SingleAccentColor [rule] v1.0.0
> A product's UI must use exactly one accent/tint color for all interactive affordances — buttons, links, toggles, active states, progress indicators, and focus rings — creating a consistent visual signal for interactivity across all surfaces.
domain: frontend-design

## Applies To
- primary buttons and CTA elements
- links and text-button affordances
- toggles, checkboxes, radio buttons, and sliders
- active navigation items and selection indicators
- progress bars and completion states
- focus rings on keyboard-interactive elements

## Counter Examples
- Blue CTAs, green success-state links, orange notification badges all appearing interactive — three accents create ambiguity
- Using the success-state green (#22c55e) on a primary 'Submit' button — semantic collision between action and feedback
- Card hover accent in purple, primary CTA in blue — dual interactive accent signal

## Severity
medium

## Examples
- All interactive elements use oklch(55% 0.18 220) as their base accent; hover is oklch(48% 0.20 220) (same hue, darker); focus ring is oklch(55% 0.18 220 / 50%) outline
- Decorative icons use accent-alt oklch(58% 0.16 145) (green) — non-interactive, distinct hue, not competing with the interactive blue

## Rationale
Multiple accent colors on interactive controls produce ambiguity: users cannot learn a reliable mental model of 'what is tappable' if affordances appear in three different colors. One accent color trains a reflex. This is the foundational principle behind Apple's tintColor system and the reason design systems like Radix, Chakra, and shadcn default to a single `--primary` token. The accent may vary in lightness (hover/active states) but must stay on the same hue. A separate accent for decorative elements (icons, shapes) is permitted — it must not be interactive.

## Applies To
- primary buttons and CTA elements
- links and text-button affordances
- toggles, checkboxes, radio buttons, and sliders
- active navigation items and selection indicators
- progress bars and completion states
- focus rings on keyboard-interactive elements

## Counter Examples
- Blue CTAs, green success-state links, orange notification badges all appearing interactive — three accents create ambiguity
- Using the success-state green (#22c55e) on a primary 'Submit' button — semantic collision between action and feedback
- Card hover accent in purple, primary CTA in blue — dual interactive accent signal

## Severity
medium
