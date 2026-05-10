# ColorLayerPrimitive [template] v1.0.0
domain: frontend-design

## Label
Color Architecture Layer 1 — Primitive Layer (OKLCH Values)

## Body
```
    /* Layer 1: Primitive Layer — raw OKLCH values, source of truth */
    /* L (Lightness): 0–1, perceptually uniform */
    /* C (Chroma):    0–~0.4, absolute colorfulness */
    /* H (Hue):       0–360, perceptually even spacing */

    :root {
      /* Brand primitive ramp — replace HUE and CHROMA with your brand values */
      --brand-primitive-50:  oklch(97% 0.01 {HUE});   /* near-white tint */
      --brand-primitive-100: oklch(94% 0.02 {HUE});
      --brand-primitive-200: oklch(88% 0.05 {HUE});
      --brand-primitive-300: oklch(80% 0.08 {HUE});
      --brand-primitive-400: oklch(70% {CHROMA} {HUE});
      --brand-primitive-500: oklch(60% {CHROMA} {HUE});   /* brand default */
      --brand-primitive-600: oklch(50% {CHROMA} {HUE});
      --brand-primitive-700: oklch(40% {CHROMA} {HUE});
      --brand-primitive-800: oklch(30% {CHROMA * 0.8} {HUE});
      --brand-primitive-900: oklch(20% {CHROMA * 0.6} {HUE});  /* near-black shade */

      /* Rule: no hex, no HSL, no RGB at the primitive layer */
      /* Tools that output hex must be converted to OKLCH before entering the system */
    }
  
```

## Usage
Populate HUE (0–360) and CHROMA (0–0.4, typically 0.10–0.18 for accessible mid-range) from brand intent. Feed these primitives into the semantic scale layer (Layer 2). Never reference primitive tokens directly from components — that is the role of Layer 3 application tokens.
