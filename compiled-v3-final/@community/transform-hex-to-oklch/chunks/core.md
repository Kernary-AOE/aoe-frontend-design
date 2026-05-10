# HexToOklch [transform] v1.0.0
Converts a hex color string ('#3B82F6' or '3B82F6' or '#fff') to oklch coordinates. Composes hex parsing → sRGB → linear sRGB → XYZ D65 → Oklab → polar oklch. The result is suitable for storing in a design token in oklch() form, enabling perceptually-even tonal palettes.
domain: visual-design

signature: (hex: string) -> { l: 0..1, c: 0..0.4, h: 0..360 }

## Pure
true

## Body
```
    function hexToOklch(hex) {
      // Step 1: parse hex into 0–255 RGB
      const m = hex.replace(/^#/, '');
      let r, g, b;
      if (m.length === 3) {
        r = parseInt(m[0] + m[0], 16);
        g = parseInt(m[1] + m[1], 16);
        b = parseInt(m[2] + m[2], 16);
      } else if (m.length === 6) {
        r = parseInt(m.slice(0, 2), 16);
        g = parseInt(m.slice(2, 4), 16);
        b = parseInt(m.slice(4, 6), 16);
      } else {
        throw new Error(`Invalid hex color: ${hex}`);
      }

      // Step 2: sRGB → linear sRGB (gamma decode)
      const linearize = (c) => {
        c = c / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      };
      const [lr, lg, lb] = [r, g, b].map(linearize);

      // Step 3: linear sRGB → XYZ D65 (IEC 61966-2-1 matrix)
      const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
      const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb;
      const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb;

      // Step 4: XYZ → Oklab (Björn Ottosson)
      const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
      const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
      const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);

      const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
      const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
      const b_ok = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

      // Step 5: Oklab → polar oklch
      const c = Math.sqrt(a * a + b_ok * b_ok);
      const h = ((Math.atan2(b_ok, a) * 180 / Math.PI) + 360) % 360;

      return { l: L, c, h };
    }
  
```

## Inverse
@community/transform-oklch-to-rgb
