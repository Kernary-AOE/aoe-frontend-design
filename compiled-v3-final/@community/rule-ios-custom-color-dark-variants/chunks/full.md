# IosCustomColorDarkVariants [rule] v1.0.0
> Every custom color in an iOS app must define both Any Appearance and Dark Appearance variants in the asset catalog (.xcassets) so it adapts automatically when the system appearance changes.
domain: frontend-design

## Applies To
all custom or brand colors added to an iOS app's color assets

## Examples
- BrandBlue: light variant #0057FF; dark variant #4D90FF (lightened for dark backgrounds).
- Verify by switching to dark mode in Settings — custom colors should adjust, not invert or disappear.

## Rationale
A single-variant custom color will look wrong in the opposing appearance mode — a bright brand color designed for light backgrounds can become glaring or invisible in dark mode. The asset catalog's appearance-variant system is the correct iOS mechanism for this.

## Applies To
all custom or brand colors added to an iOS app's color assets
