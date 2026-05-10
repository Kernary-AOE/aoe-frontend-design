# ScaleClamp [transform] v1.0.0
Generates a CSS `clamp()` expression for fluid typography or spacing that linearly interpolates between minSize at minVp viewport width and maxSize at maxVp viewport width, clamped at both ends. The result is a single CSS value string suitable for use in a design token or component style.
domain: visual-design

signature: (minSize: px, maxSize: px, minVp: px, maxVp: px) -> string

## Pure
true

## Body
```
    // Fluid type formula (Mike Riethmüller / CSS-Tricks)
    // clamp(minSize, minSize + (maxSize - minSize) * (100vw - minVp) / (maxVp - minVp), maxSize)

    function px(n) { return n + 'px'; }
    function rem(n) { return (n / 16).toFixed(4) + 'rem'; }

    const slope = (maxSize - minSize) / (maxVp - minVp);
    const intercept = minSize - slope * minVp;

    const preferred = `${intercept > 0 ? '+' : ''}${intercept.toFixed(4)}px + ${(slope * 100).toFixed(4)}vw`;
    // Using rem for min/max improves zoom behavior:
    return `clamp(${rem(minSize)}, calc(${preferred}), ${rem(maxSize)})`;
  
```

## Example
- **Input**:
  - **MinSize**: 16
  - **MaxSize**: 22
  - **MinVp**: 320
  - **MaxVp**: 1280
- **Output**: clamp(1.0000rem, calc(14.3333px + 0.6250vw), 1.3750rem)
