# I18nLaunchV1 [feedback] v1.0.0
Accumulated execution feedback for first-release i18n rollouts using @community/collection-i18n-ready-component. Synthesized from observed launches at multiple SaaS companies (anonymized) — captures the failure modes that consistently emerge between week 0 and month 6 of multi-locale support.
domain: i18n

## Target
@community/collection-i18n-ready-component

## Observations
- **Sample Size**: 12
- **Period**: 2024-Q3 to 2026-Q1
- **Success Rate**: 0.67
- **Common Failures**:
  -
    - **Step**: @community/principle-no-string-concat
    - **Failure**: early-stage strings ship with concatenation; developer says 'we'll fix it for translation'; never gets fixed and breaks 5 locales
    - **Frequency**: 0.83
    - **Impact**: translation pipeline rejects strings; engineering re-work to refactor; ship date slips 2-4 weeks
    - **Mitigation**: lint rule prohibits string concatenation in JSX/template files from day 1, even before second locale exists
  -
    - **Step**: @community/fact-bidi-direction
    - **Failure**: RTL added late as 'a CSS toggle' — chevrons don't mirror, slide-in animations come from wrong direction, scrollbars on wrong side
    - **Frequency**: 0.75
    - **Impact**: Arabic users see broken UI; bug bash adds 2-3 weeks of layout work post-launch
    - **Mitigation**: audit every directional icon and animation BEFORE first RTL locale; use CSS logical properties (margin-inline-start) instead of physical from start
  -
    - **Step**: translator hand-off
    - **Failure**: translators receive strings without context (no description field, no screenshots) — translations are grammatically correct but contextually wrong
    - **Frequency**: 0.58
    - **Impact**: user complaints about awkward phrasing; multiple revision cycles per locale
    - **Mitigation**: every extracted string includes `description` field + Lokalise/Phrase screenshots auto-uploaded from CI
  -
    - **Step**: pseudo-locale testing
    - **Failure**: team did not run pseudo-locale tests; truncation issues found by real translators in production
    - **Frequency**: 0.5
    - **Impact**: buttons clip text in German (often 30% longer than English); dashboard cards overflow
    - **Mitigation**: add pseudo-locale to CI; visual regression catches truncation before real translation begins
  -
    - **Step**: @community/transform-relative-time-format
    - **Failure**: team rolled own date formatting because Intl.RelativeTimeFormat 'wasn't available everywhere' — actually available in Node 12+ and all modern browsers
    - **Frequency**: 0.42
    - **Impact**: wrong plurals in Russian, Arabic, Polish; embarrassing bugs noticed by community
    - **Mitigation**: use Intl.* APIs unconditionally; check support matrix once and trust it
- **Confidence Adjustments**:
  - **@Community/Principle No String Concat**: 0.95
  - **@Community/Pattern Icu Message Format**: 0.92
  - **@Community/Fact Bidi Direction**: 0.78
  - **@Community/Rule Cjk Line Break**: 0.72
  - **@Community/Anti Pattern Flag As Language**: 0.96

## Ai Confidence
0.81

## Lessons
- Day-one i18n hygiene (no concatenation, ICU templates, dir-aware CSS) costs near zero. Retrofitting at month 6 costs quarters.
- Translators are users — give them context, screenshots, and tooling. Strings without context produce wrong translations.
- Pseudo-localization in CI catches 80% of truncation/overflow issues before any real translator sees the build.
- RTL is a layout problem more than a string problem. Audit it before adding the first RTL locale, not after.
- Multi-locale launch should be staged: first 2 locales (often en + es or en + fr) prove the pipeline. Only then expand.
