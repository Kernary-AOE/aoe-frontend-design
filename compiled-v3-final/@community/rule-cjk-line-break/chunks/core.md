# CjkLineBreak [rule] v1.0.0
CJK (Chinese/Japanese/Korean) text must use language-aware line-breaking rules. CSS line-break and word-break properties have language-specific semantics that change which characters may start or end a line (kinsoku shori in Japanese).
> Containers that may render CJK text MUST set `lang` correctly on the HTML element (lang='ja', 'zh-Hans', 'zh-Hant', 'ko') and use `line-break: strict` (or `normal` with explicit `word-break: keep-all` where words must not split). Never apply Latin-only `word-break: break-all` to CJK content — it produces grammatically broken lines that violate JIS X 4051 / GB/T 15834 rules. For mixed Latin+CJK, prefer `overflow-wrap: anywhere` on Latin tokens only or use `<bdi>` boundaries.
domain: i18n

## Applies To
- Any product surface that renders CJK content (zh, ja, ko)
- User-generated content (comments, posts) that may contain CJK
- Translation files containing CJK target locales
- Text in fixed-width containers (cards, table cells, sidebars)
- Email templates and PDF exports rendered with CSS

## Implementation Checklist
- Root <html lang=...> reflects active locale; switching languages updates lang attribute
- CJK locales set CSS `line-break: strict` and `word-break: normal` (NOT break-all)
- Mixed Latin+CJK tokens use `overflow-wrap: anywhere` only on Latin substrings via <span lang='en'>
- Test fixtures include lines ending in 「 and lines starting with 。 — visual regression must catch kinsoku violations
- Hyphenation (`hyphens: auto`) is meaningless for CJK; do not enable for CJK locales

## Severity
warn

## Counter Examples
- <div style='word-break: break-all'>こんにちは、世界</div> — breaks between any two characters including immediately before 、 and after 「, violating kinsoku.
- Missing lang attribute defaults to lang='en' even when content is Chinese — browser uses Latin breaking rules; no kinsoku enforcement.
- `overflow-wrap: anywhere` applied globally — Latin URL fragments break correctly, but CJK punctuation now appears at line starts.
