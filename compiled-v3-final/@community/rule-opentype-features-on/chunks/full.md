# OpentypeFeaturesOn [rule] v1.0.0
By default, browsers activate only a small subset of OpenType features; production CSS MUST explicitly enable `kern` (kerning), `liga` (standard ligatures), and numeric figure features (`tnum`/`lnum`) at minimum — and SHOULD activate stylistic sets `ss01` or character variants `cv01` where the brand typeface ships them.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
medium

## Applies To Details
- Root CSS that sets the base font-family
- Any context displaying financial / tabular numbers
- Editorial / marketing contexts where brand typeface ships ss01 / cv01

## Remediation
- Root: `html { font-kerning: auto; font-variant-ligatures: common-ligatures; }`
- Numerics: `.amount, td, .metric { font-variant-numeric: tabular-nums lining-nums; }`
- Brand stylistic sets: check font specimen; activate via `font-feature-settings: 'ss01' 1;`
- OpenType code reference: kern (kerning), liga (standard ligatures), tnum (tabular figures), lnum (lining figures), onum (oldstyle figures), pnum (proportional figures), ss01–ss20 (stylistic sets), cv01–cv99 (character variants).

## Applies To
@community/type-html-artifact

## Severity
medium

## Applies To Details
- Root CSS that sets the base font-family
- Any context displaying financial / tabular numbers
- Editorial / marketing contexts where brand typeface ships ss01 / cv01

## Remediation
- Root: `html { font-kerning: auto; font-variant-ligatures: common-ligatures; }`
- Numerics: `.amount, td, .metric { font-variant-numeric: tabular-nums lining-nums; }`
- Brand stylistic sets: check font specimen; activate via `font-feature-settings: 'ss01' 1;`
- OpenType code reference: kern (kerning), liga (standard ligatures), tnum (tabular figures), lnum (lining figures), onum (oldstyle figures), pnum (proportional figures), ss01–ss20 (stylistic sets), cv01–cv99 (character variants).
