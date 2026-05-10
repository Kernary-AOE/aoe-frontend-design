# ProposeStarterTokens [rule] v1.0.0
When no design token files exist in a project, generate minimal starter token files at design/tokens/ before applying any styles — never hardcode values into components without a token layer.
> If a project contains no design/tokens/* files (or equivalent CSS custom property / Tailwind token definitions): create minimal starter token files covering color (brand, surface, text), typography (font families, scale, weight), spacing (base unit, scale steps), and border radius before writing any component styles. If token files already exist, use them as the authoritative source without modification.
domain: frontend-design

## Applies To
Any new project or green-field component system that has not yet defined a design token file.

## Counter Example
Adding className='bg-[#3b82f6] text-[#1a1a1a] rounded-[8px]' inline to a new component in a project with no token file — three magic numbers that will diverge from future design decisions.
