# ProposeStarterTokens [rule] v1.0.0
When no design token files exist in a project, generate minimal starter token files at design/tokens/ before applying any styles — never hardcode values into components without a token layer.
> If a project contains no design/tokens/* files (or equivalent CSS custom property / Tailwind token definitions): create minimal starter token files covering color (brand, surface, text), typography (font families, scale, weight), spacing (base unit, scale steps), and border radius before writing any component styles. If token files already exist, use them as the authoritative source without modification.
domain: frontend-design
