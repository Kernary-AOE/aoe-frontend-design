# OpticalSizing [fact] v1.0.0
Optically-sized typefaces adjust letter spacing, contrast, and proportion across size ranges: large display sizes need tighter tracking and higher stroke contrast; small body sizes need looser tracking and lower contrast for legibility.
> Type set at large display sizes (> ~36 px) wants tighter letter-spacing (-1% to -3%) and may carry higher stroke contrast, while type set at small body sizes (≤ ~14 px) wants looser letter-spacing (+1% to +3%) and lower stroke contrast — variable fonts with optical-sizing axis (`opsz`) automate this; static fonts require manual tracking adjustments per size.

## Confidence
strong

## Applies To
- letter-spacing tokens at large vs small sizes
- selecting variable fonts with `opsz` axis (Source Serif 4, Newsreader, Recursive)
- headline tracking corrections in static-font systems
- small-text legibility on UI labels

## Quantitative
- **Display Tracking Typical**: -1% to -3% (negative letter-spacing)
- **Body Tracking Typical**: 0%
- **Micro Text Tracking Typical**: +1% to +3% (positive letter-spacing for tiny labels)
- **Optical Size Axis Css**: font-optical-sizing: auto; or font-variation-settings: 'opsz' <px>;

## Counter Conditions
- Many widely-used UI fonts (Inter, Söhne) have a single optical size — manual tracking adjustment needed.
- Mono / system fonts generally don't ship optical-sizing axes; spacing relies on font-feature-settings rather than tracking.
- Variable fonts add filesize cost — for limited-style UIs, a fixed font may still be the right choice.

## Sources

## Confidence
strong

## Source
- Bringhurst, 'The Elements of Typographic Style' — sections on optical sizing and small-cap design
- Adobe / Tim Brown, 'Optical sizing' research (Type Brigade)
- CSS Fonts Module Level 4 — `font-optical-sizing` property and `opsz` axis
- Variable font specifications — Google Fonts variable axis docs

## Applies To
- letter-spacing tokens at large vs small sizes
- selecting variable fonts with `opsz` axis (Source Serif 4, Newsreader, Recursive)
- headline tracking corrections in static-font systems
- small-text legibility on UI labels

## Quantitative
- **Display Tracking Typical**: -1% to -3% (negative letter-spacing)
- **Body Tracking Typical**: 0%
- **Micro Text Tracking Typical**: +1% to +3% (positive letter-spacing for tiny labels)
- **Optical Size Axis Css**: font-optical-sizing: auto; or font-variation-settings: 'opsz' <px>;

## Counter Conditions
- Many widely-used UI fonts (Inter, Söhne) have a single optical size — manual tracking adjustment needed.
- Mono / system fonts generally don't ship optical-sizing axes; spacing relies on font-feature-settings rather than tracking.
- Variable fonts add filesize cost — for limited-style UIs, a fixed font may still be the right choice.
