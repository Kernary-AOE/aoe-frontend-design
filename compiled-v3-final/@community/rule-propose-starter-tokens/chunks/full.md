# ProposeStarterTokens [rule] v1.0.0
When no design token files exist in a project, generate minimal starter token files at design/tokens/ before applying any styles — never hardcode values into components without a token layer.
> If a project contains no design/tokens/* files (or equivalent CSS custom property / Tailwind token definitions): create minimal starter token files covering color (brand, surface, text), typography (font families, scale, weight), spacing (base unit, scale steps), and border radius before writing any component styles. If token files already exist, use them as the authoritative source without modification.
domain: frontend-design

## Applies To
Any new project or green-field component system that has not yet defined a design token file.

## Counter Example
Adding className='bg-[#3b82f6] text-[#1a1a1a] rounded-[8px]' inline to a new component in a project with no token file — three magic numbers that will diverge from future design decisions.

## Examples
-       /* design/tokens/color.css — minimal starter */
      :root {
        --color-brand: oklch(55% 0.18 220);
        --color-surface-page: #fafafa;
        --color-surface-card: #ffffff;
        --color-text-primary: #1a1a1a;
        --color-text-secondary: #6b7280;
        --color-border: rgba(0,0,0,0.08);
      }
    

## Rationale
Styling components without a token layer creates ungoverned magic numbers scattered across files. Migrating these later requires a full search-and-replace across the codebase rather than a single token value change. The cost of establishing a token layer at component-zero is ~10 minutes; the cost of migrating 200 hardcoded values is 4-8 hours. Tokens also enforce the constraint that all colors, spacings, and type sizes are named design decisions rather than incidental numeric choices.

## Applies To
Any new project or green-field component system that has not yet defined a design token file.

## Counter Example
Adding className='bg-[#3b82f6] text-[#1a1a1a] rounded-[8px]' inline to a new component in a project with no token file — three magic numbers that will diverge from future design decisions.
