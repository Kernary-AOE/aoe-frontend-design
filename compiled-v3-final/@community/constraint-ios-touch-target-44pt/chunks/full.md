# IosTouchTarget44pt [constraint] v1.0.0
> Every touch-activated control must present a hit area of at least 44×44pt on iOS. Visual rendering may be smaller, but the effective tap target must reach 44×44pt.
domain: frontend-design

## Target
- all interactive elements in iOS apps
- buttons / links / icon buttons / form controls on touch viewports

## Threshold
44 × 44 pt (iOS points, per Apple HIG Rule 1.1)

## Rationale
Targets smaller than 44pt cause mis-taps, especially for users with motor impairments or using the device in motion. Apple research found the average adult fingertip pad is 10–14mm, requiring ~44pt of touch surface for reliable targeting without parallax error. Sub-44pt targets are the single most common cause of frustration in mobile usability tests.
