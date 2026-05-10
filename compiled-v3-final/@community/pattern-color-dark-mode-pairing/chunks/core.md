# ColorDarkModePairing [pattern] v1.0.0
domain: frontend-design

## Label
Dark Mode Color Correspondence

## Problem
Developers implement dark mode by CSS inversion filters or by simply flipping lightness values, producing muddy colors, over-saturated midtones, and backgrounds that are pure black rather than near-black. This breaks color fidelity and the chroma envelope rule.

## Solution
Treat dark mode as a full re-palette, not a filter. Map every light-mode token to a deliberate dark-mode counterpart using these rules: background steps move from L=0.97–0.99 to L=0.10–0.15; solid steps (9–10) may stay similar or increase slightly; chroma decreases at low lightness to respect the chroma envelope.
