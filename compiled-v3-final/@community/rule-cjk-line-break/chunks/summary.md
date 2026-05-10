# CjkLineBreak [rule] v1.0.0
CJK (Chinese/Japanese/Korean) text must use language-aware line-breaking rules. CSS line-break and word-break properties have language-specific semantics that change which characters may start or end a line (kinsoku shori in Japanese).
> Containers that may render CJK text MUST set `lang` correctly on the HTML element (lang='ja', 'zh-Hans', 'zh-Hant', 'ko') and use `line-break: strict` (or `normal` with explicit `word-break: keep-all` where words must not split). Never apply Latin-only `word-break: break-all` to CJK content — it produces grammatically broken lines that violate JIS X 4051 / GB/T 15834 rules. For mixed Latin+CJK, prefer `overflow-wrap: anywhere` on Latin tokens only or use `<bdi>` boundaries.
domain: i18n
