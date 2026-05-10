# IosTextMin17pt [constraint] v1.0.0
> No text on iOS may be smaller than 11pt; body text should be 17pt. Hardcoded sizes must not go below 11pt; use semantic text styles to scale naturally with Dynamic Type.
domain: frontend-design

## Target
- all text elements rendered in iOS apps

## Threshold
Minimum absolute: 11pt (caption2 style). Recommended body: 17pt.

## Rationale
Text below 11pt (the caption2 Dynamic Type style) is illegible on iPhone screens even at arm's length. 17pt is the Apple HIG-recommended body size for comfortable reading. Hardcoded sizes below these thresholds degrade legibility and violate accessibility expectations for the millions of users who rely on readable text.
