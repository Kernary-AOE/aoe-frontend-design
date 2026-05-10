# IosFlexibleLayout [rule] v1.0.0
> Layouts must adapt from iPhone SE (375pt width) to iPhone Pro Max (430pt width) without hardcoded widths or fixed dimensions.
domain: frontend-design

## Applies To
all iOS screen layouts for iPhone

## Examples
- Use .frame(maxWidth: .infinity) on cards instead of .frame(width: 350).
- Test on both smallest (iPhone SE 375pt) and largest (iPhone 16 Pro Max 430pt) in the Xcode canvas.
- Use GeometryReader only when a dimension truly needs to be a percentage of the screen; prefer stack-based relative sizing.

## Rationale
Fixed widths break on small screens (SE clips content) and waste space on large ones (Pro Max shows awkward gaps). Flexible relative sizing covers the full iPhone point-width range of 375–430pt.

## Applies To
all iOS screen layouts for iPhone
