# RequiredInteractionStates [fact] v1.0.0
Every interactive UI component must explicitly design and implement six canonical interaction states: default, hover, focus, active, disabled, and loading/error.
>     Six states are required for every interactive component:

    | State    | Trigger                       | Visual signal required                             |
    |----------|-------------------------------|-----------------------------------------------------|
    | default  | Component idle, ready          | Base appearance; no visual treatment needed        |
    | hover    | Pointer over element           | Visible change (bg, border, shadow, cursor change) |
    | focus    | Keyboard or programmatic focus | Visible focus ring ≥2px offset, 3:1 contrast       |
    | active   | Element pressed/held           | Depression feedback (scale down, darker shade)     |
    | disabled | Component not interactive      | ≥40% opacity OR grayed colors; cursor:not-allowed  |
    | loading  | Async operation in progress    | Spinner or skeleton replacing or overlaying content|

    Additionally: error state for form inputs (red border + icon + message).

    Omitting any state creates an "invisible cliff" where users cannot tell what the component is doing.
  
domain: frontend-design

## Sources

## Source
- github.com/spencergoldade/cursor-designer, .cursor/rules/frontend/ui-components-and-states.mdc (GPL-3.0)
