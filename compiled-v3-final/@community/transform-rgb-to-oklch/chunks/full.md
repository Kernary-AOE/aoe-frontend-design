# RgbToOklch [transform] v1.0.0
Converts an sRGB color to oklch() coordinates via linear sRGB → XYZ D65 → Oklab → polar oklch. The result has perceptually uniform lightness (l), chroma (c), and hue-angle (h) suitable for generating accessible tonal palettes.
domain: visual-design

signature: (rgb: { r: 0..255, g: 0..255, b: 0..255 }) -> { l: 0..1, c: 0..0.4, h: 0..360 }

## Pure
true

## Body
```
    // Step 1: sRGB → linear sRGB
    function linearize(c) {
      c = c / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(linearize);

    // Step 2: linear sRGB → XYZ D65 (IEC 61966-2-1)
    const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
    const y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
    const z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;

    // Step 3: XYZ D65 → Oklab (Björn Ottosson's matrix)
    const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
    const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
    const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);

    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const b_ok = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

    // Step 4: Oklab → oklch (polar)
    const c = Math.sqrt(a * a + b_ok * b_ok);
    const h = ((Math.atan2(b_ok, a) * 180 / Math.PI) + 360) % 360;

    return { l: L, c, h };
  
```

## Pure
true

## Body
```
    // Step 1: sRGB → linear sRGB
    function linearize(c) {
      c = c / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(linearize);

    // Step 2: linear sRGB → XYZ D65 (IEC 61966-2-1)
    const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
    const y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
    const z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;

    // Step 3: XYZ D65 → Oklab (Björn Ottosson's matrix)
    const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
    const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
    const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);

    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const b_ok = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

    // Step 4: Oklab → oklch (polar)
    const c = Math.sqrt(a * a + b_ok * b_ok);
    const h = ((Math.atan2(b_ok, a) * 180 / Math.PI) + 360) % 360;

    return { l: L, c, h };
  
```
