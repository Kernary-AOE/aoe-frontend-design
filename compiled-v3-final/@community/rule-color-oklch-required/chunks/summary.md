# ColorOklchRequired [rule] v1.0.0
All new color declarations in CSS / inline styles MUST use the oklch() color function. Hex (#rrggbb), rgb(), and hsl() are prohibited for new code because they encode color in non-perceptual spaces, making consistent lightness ramps and dark-mode mirroring mathematically painful.
domain: visual-design
