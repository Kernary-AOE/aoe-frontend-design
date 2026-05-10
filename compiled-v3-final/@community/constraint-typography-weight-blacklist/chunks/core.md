# TypographyWeightBlacklist [constraint] v1.0.0
font-weight 100, 200, and 300 are BANNED for body text (≤ 20px) and primary UI labels; font-weight 900 is BANNED for body text. Permitted body/label weights are 400 (regular), 500 (medium), and 600 (semibold). Weight 700 (bold) is permitted for headings only. Weight 800–900 is permitted for display/hero text only.
domain: frontend-design

## Target
font-weight values for body prose and primary UI text

## Severity
high

## Values
-
  - **Weight**: 100
  - **Name**: Thin
  - **Body Use**: BANNED
  - **Heading Use**: BANNED
  - **Display Use**: BANNED
-
  - **Weight**: 200
  - **Name**: ExtraLight
  - **Body Use**: BANNED
  - **Heading Use**: BANNED
  - **Display Use**: decoration-only
-
  - **Weight**: 300
  - **Name**: Light
  - **Body Use**: BANNED
  - **Heading Use**: warn
  - **Display Use**: allowed
-
  - **Weight**: 400
  - **Name**: Regular
  - **Body Use**: REQUIRED-default
  - **Heading Use**: allowed
  - **Display Use**: allowed
-
  - **Weight**: 500
  - **Name**: Medium
  - **Body Use**: allowed
  - **Heading Use**: allowed
  - **Display Use**: allowed
-
  - **Weight**: 510
  - **Name**: SemiBold+
  - **Body Use**: emphasis-only
  - **Heading Use**: PREFERRED
  - **Display Use**: allowed
-
  - **Weight**: 700
  - **Name**: Bold
  - **Body Use**: emphasis-inline-only
  - **Heading Use**: allowed
  - **Display Use**: allowed
-
  - **Weight**: 800
  - **Name**: ExtraBold
  - **Body Use**: BANNED
  - **Heading Use**: warn-verify-rendering
  - **Display Use**: allowed
-
  - **Weight**: 900
  - **Name**: Black
  - **Body Use**: BANNED
  - **Heading Use**: BANNED
  - **Display Use**: allowed-hero-only

## Approved Alternatives
- Use weight 400 for body prose as default.
- Use weight 500–600 for UI labels needing slight emphasis.
- Use weight 700 for headings where bold differentiation is needed.
- Use weight 800–900 only for hero/display text at 48px+ where stroke weight is visually substantial.
