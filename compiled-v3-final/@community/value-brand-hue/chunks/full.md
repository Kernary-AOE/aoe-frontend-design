# brand-hue-default [value] v1.0.0
domain: visual-design

## Constant
258

## Type
oklch-hue-degrees

## Usage
```
    :root {
      --hue: 258;
      --chroma: 0.13;
      --brand-500: oklch(58% var(--chroma) var(--hue));
      --brand-300: oklch(76% var(--chroma) var(--hue));
      --brand-700: oklch(40% var(--chroma) var(--hue));
    }
  
```

## Rationale
Hue 258 in oklch() corresponds to a mid-blue-violet that sits in the 'trust + digital' quadrant of color psychology. At chroma 0.12–0.15 and lightness 55–65%, it resolves to a color perceptually close to classic 'brand blue' but with noticeably richer depth than HSL equivalents. This is the default starting hue for new oklch palettes; authors should adjust for brand identity.

## Constant
258

## Type
oklch-hue-degrees

## Usage
```
    :root {
      --hue: 258;
      --chroma: 0.13;
      --brand-500: oklch(58% var(--chroma) var(--hue));
      --brand-300: oklch(76% var(--chroma) var(--hue));
      --brand-700: oklch(40% var(--chroma) var(--hue));
    }
  
```

## Supplies To
- @community/constraint-brand-hue-required
