# BrandColorPrimaryOnly [rule] v1.0.0
> High-chroma brand colors and the primary action color must appear only on primary interactive actions (CTAs, active states, focus rings, progress indicators) and key highlights — never on decorative elements, backgrounds, or secondary content.
domain: frontend-design

## Applies To
- primary CTA buttons and interactive affordances
- active navigation states and selection indicators
- progress bars, loaders, and completion indicators
- focus rings on keyboard-interactive elements

## Counter Examples
- Brand orange on hero background, card borders, icon fills, AND primary CTA — saturation everywhere, hierarchy nowhere
- High-chroma accent on every feature badge — decorative overload dilutes signal
- Using --color-primary directly on section dividers or illustrative shapes

## Severity
medium

## Examples
- A SaaS dashboard: primary brand blue appears only on the 'Create New' CTA and the active sidebar item — all other chrome is neutral
- oklch(55% 0.18 220) for the primary button; oklch(88% 0.04 220) for subtle card backgrounds — chroma drop signals non-interactive role

## Rationale
Color scarcity is a visual hierarchy tool. When the brand's most saturated color appears on every card, icon, badge, and background, it loses its ability to direct attention. Users learn to ignore it. Reserving high-chroma and brand colors for primary actions trains the eye: saturated color = something to do. Overuse is a primary marker of AI-generated UI that lacks hierarchy intent.

## Applies To
- primary CTA buttons and interactive affordances
- active navigation states and selection indicators
- progress bars, loaders, and completion indicators
- focus rings on keyboard-interactive elements

## Counter Examples
- Brand orange on hero background, card borders, icon fills, AND primary CTA — saturation everywhere, hierarchy nowhere
- High-chroma accent on every feature badge — decorative overload dilutes signal
- Using --color-primary directly on section dividers or illustrative shapes

## Severity
medium
