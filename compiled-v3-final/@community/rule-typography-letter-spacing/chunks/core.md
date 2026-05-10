# TypographyLetterSpacing [rule] v1.0.0
Letter-spacing MUST follow size-dependent rules: display text (36px+) uses -0.02em to -0.04em to counteract optical spread; body text (14–20px) uses 0em (no tracking); small UI labels and uppercase abbreviations (10–13px) use +0.04em to +0.1em; ALL-CAPS labels always require +0.05em minimum.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
medium

## Quantitative
- **Display Large**: -0.02em to -0.04em (48px+)
- **Display Medium**: -0.01em to -0.02em (36–48px)
- **Body Prose**: 0em (14–20px — never add tracking)
- **Small Labels**: +0.04em to +0.08em (11–13px)
- **All Caps**: +0.05em minimum (any size)
- **Uppercase Abbreviations**: +0.08em to +0.12em (short UPPERCASE strings)

## Remediation
- Display headings: `h1 { letter-spacing: -0.025em; }`
- ALL-CAPS badges: `.badge-uppercase { text-transform: uppercase; letter-spacing: 0.08em; }`
- Body: never set letter-spacing on `p`, `.prose`, `article` — remove any tracking declaration.
- Use em units (not px) so tracking scales proportionally with font-size.
