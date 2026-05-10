# FontFeatureSettings [rule] v1.0.0
Display and body fonts MUST enable OpenType features at the CSS level: at minimum `font-feature-settings: 'kern' 1, 'liga' 1` globally; fintech/data UIs MUST add `'tnum' 1, 'lnum' 1`; brand or editorial contexts SHOULD add stylistic sets `'ss01' 1` or character variants `'cv01' 1` where the typeface ships them.
domain: frontend-design

## Checks
- [ ] @community/check-font-blacklist-applied

## Applies To
@community/type-html-artifact

## Severity
medium

## Remediation
- Set globally: `html { font-feature-settings: 'kern' 1, 'liga' 1; font-kerning: auto; font-variant-ligatures: common-ligatures; }`
- For numeric contexts: add `font-variant-numeric: tabular-nums lining-nums;` (equivalent to `tnum + lnum`).
- For brand/editorial: inspect the font's OpenType feature list and activate relevant `ss01`–`ss20` or `cv01`–`cv99` sets.
- Prefer high-level `font-variant-*` properties over `font-feature-settings` where the feature maps cleanly — they compose better across cascade.

## Exceptions
-
  - **Case**: System font stacks
  - **Allowed When**: Using system-ui or -apple-system — the OS already manages feature activation for native UI fonts.
-
  - **Case**: Icon fonts
  - **Allowed When**: icon-only @font-face blocks — ligatures and kerning are irrelevant in glyph-substitution contexts.

## Rationale
Browsers do not enable all OpenType features by default. Kerning (`kern`) prevents awkward spacing in display text; standard ligatures (`liga`) improve common letter pairs (fi, fl); tabular numerics (`tnum`) prevent column jitter in data tables; lining numerals (`lnum`) align numbers with capital letters in running text. Leaving these off produces typographically inferior output even with premium typefaces.

## Applies To
@community/type-html-artifact

## Severity
medium

## Remediation
- Set globally: `html { font-feature-settings: 'kern' 1, 'liga' 1; font-kerning: auto; font-variant-ligatures: common-ligatures; }`
- For numeric contexts: add `font-variant-numeric: tabular-nums lining-nums;` (equivalent to `tnum + lnum`).
- For brand/editorial: inspect the font's OpenType feature list and activate relevant `ss01`–`ss20` or `cv01`–`cv99` sets.
- Prefer high-level `font-variant-*` properties over `font-feature-settings` where the feature maps cleanly — they compose better across cascade.

## Exceptions
-
  - **Case**: System font stacks
  - **Allowed When**: Using system-ui or -apple-system — the OS already manages feature activation for native UI fonts.
-
  - **Case**: Icon fonts
  - **Allowed When**: icon-only @font-face blocks — ligatures and kerning are irrelevant in glyph-substitution contexts.
