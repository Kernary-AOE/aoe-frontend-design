# TintedNeutrals [principle] v1.0.0
> Neutrals (grays, near-blacks, off-whites) should carry a subtle tint of the brand hue. Even a chroma of 0.01 in OKLCH creates subconscious cohesion that pure achromatic grays cannot achieve.
domain: frontend-design

## Example
```
    /* Dead neutrals — no personality */
    --gray-100: oklch(95% 0 0);
    --gray-900: oklch(15% 0 0);

    /* Brand-tinted neutrals — warm brand at hue 60° */
    --gray-100: oklch(95% 0.01 60);
    --gray-900: oklch(15% 0.01 60);

    /* Cool-tinted (tech, blue-brand) */
    --gray-100: oklch(95% 0.01 250);
    --gray-900: oklch(15% 0.01 250);
  
```
