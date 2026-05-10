# PxToRem [transform] v1.0.0
Converts a CSS pixel value to its rem equivalent relative to the root element font-size (default 16px). rem-based sizing is an accessibility requirement: when users override their browser's default font size, rem values scale proportionally while px values do not.
domain: visual-design

signature: (px: number, rootSize?: number) -> string

## Pure
true

## Body
```
    function pxToRem(px, rootSize = 16) {
      if (typeof px !== 'number' || !isFinite(px)) {
        throw new TypeError('px must be a finite number');
      }
      if (rootSize <= 0) {
        throw new RangeError('rootSize must be positive');
      }
      const rem = px / rootSize;
      // Trim trailing zeros, preserve up to 4 decimals
      const formatted = parseFloat(rem.toFixed(4));
      return `${formatted}rem`;
    }
  
```

## Inverse
@community/transform-rem-to-px

## Examples

## Pure
true

## Body
```
    function pxToRem(px, rootSize = 16) {
      if (typeof px !== 'number' || !isFinite(px)) {
        throw new TypeError('px must be a finite number');
      }
      if (rootSize <= 0) {
        throw new RangeError('rootSize must be positive');
      }
      const rem = px / rootSize;
      // Trim trailing zeros, preserve up to 4 decimals
      const formatted = parseFloat(rem.toFixed(4));
      return `${formatted}rem`;
    }
  
```

## Inverse
@community/transform-rem-to-px
