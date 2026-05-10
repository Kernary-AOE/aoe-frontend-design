# WcagAaDefaultTarget [rule] v1.0.0
> All frontend components must meet WCAG 2.1 Level AA conformance by default — AA is the widely accepted legal and ethical baseline for web accessibility.
domain: frontend-design

## Severity
warning

## Metric
WCAG conformance level

## Pass
AA or AAA

## Warn
A only

## Block
below A

## Key Aa Requirements
- 1.4.3 Contrast (Minimum): text ≥ 4.5:1, large text ≥ 3:1
- 1.4.4 Resize Text: text resizes to 200% without loss of content (no user-scalable=no)
- 1.4.10 Reflow: content reflows at 320px width without horizontal scrolling
- 1.4.11 Non-text Contrast: UI component boundaries ≥ 3:1 against adjacent colors
- 1.4.12 Text Spacing: no content or functionality lost when letter-spacing ≥ 0.12em, line-height ≥ 1.5, word-spacing ≥ 0.16em
- 2.1.1 Keyboard: all functionality operable by keyboard without time-dependent path
- 2.4.3 Focus Order: focus sequence preserves meaning and operability
- 2.4.7 Focus Visible: any keyboard operable UI has a visible focus indicator
- 4.1.3 Status Messages: status messages programmatically determined without receiving focus
