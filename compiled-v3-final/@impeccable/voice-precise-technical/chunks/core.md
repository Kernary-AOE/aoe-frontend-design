# PreciseTechnical [voice] v1.0.0
The voice used when writing technical specifications, code comments, and implementation guidance. Values exactness over brevity, uses precise CSS/HTML/ARIA terminology, and always provides working code examples.
domain: frontend-engineering

## Label
Precise Technical

## Tone
neutral + precise

## Emphasis
definition → specification → example code → edge cases

## Emotional Arc
flat — no hedging, no enthusiasm, pure information

## Patterns
-
  - **Label**: Property specification
  - **Template**: Set `{property}: {value}` on `{selector}`. Effect: {effect}. Browser support: {support}.
  - **Example**: Set `outline-offset: 2px` on `:focus-visible`. Effect: creates a 2px gap between component edge and focus ring. Browser support: Baseline 2022 (all major browsers).
-
  - **Label**: Code block
  - **Template**:
    ```
    ```{language}
    {code}
    ```
    // {explanation}
    ```
  - **Example**: Always include language tag on fenced code blocks; always explain non-obvious lines.
-
  - **Label**: Caveat / edge case
  - **Template**: Note: {condition} — in this case, {alternative-behavior}.
  - **Example**: Note: when `outline-color` is `currentColor` and the element has `color: inherit`, the ring color is resolved from the nearest ancestor with an explicit color value.

## Prohibitions
- Do not use approximations ('about 4px', 'roughly half') when exact values are known.
- Do not write 'simply' or 'easily' before an instruction — it implies the reader should already know.
- Do not omit units on numeric CSS values (write '2px' not '2').
- Do not write `<br>` line breaks for spacing in technical documentation — use proper heading/paragraph structure.
