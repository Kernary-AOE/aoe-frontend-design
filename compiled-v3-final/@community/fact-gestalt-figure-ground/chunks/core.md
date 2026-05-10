# GestaltFigureGround [fact] v1.0.0
Gestalt Principle of Figure-Ground (Rubin, 1915 / Köhler, 1929): the visual system separates a scene into a focal foreground object (figure) and a receding background (ground); this separation is a prerequisite for object recognition.
> The brain automatically segregates any visual scene into a figure — the object of attention, which appears closer, more defined, and more 'thing-like' — and a ground — the background, which appears further away and shapeless. The same visual region cannot be both figure and ground simultaneously; when it can be, ambiguous figure-ground creates visual instability (e.g., Rubin's vase).

## Confidence
proven

## Applies To
- modal overlays — scrim (ground) + dialog (figure) must have sufficient contrast so the dialog reads as foreground
- card elevation — box-shadow makes a card read as figure on a flat page background
- focus states — focused input must visually 'pop' as figure against the surrounding form ground
- navigation sidebars — background tint or border separates sidebar (figure) from content area (ground)
- data visualization — data marks (figure) vs chart grid lines (ground) require strong contrast ratio
- image overlays — text on photo requires sufficient contrast between text and underlying image ground

## Quantitative
- **Practical Implication**: Minimum 3:1 contrast ratio between figure element and its ground for UI components (WCAG AA non-text)
- **Scrim Opacity**: Modal scrims typically 40-60% black opacity — enough to suppress ground without making it inaccessible

## Counter Conditions
- Intentional figure-ground ambiguity is used in logos and art but is almost always a failure mode in UI — the user should never have to decide what is clickable vs decorative
- Dark mode inverts figure-ground relationships — an element styled only with a box-shadow on light backgrounds may disappear on dark backgrounds without a border or background change
- Transparent or semi-transparent overlays can create false figure-ground hierarchy when the background content is too visually active
