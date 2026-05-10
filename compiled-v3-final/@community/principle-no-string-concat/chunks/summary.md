# NoStringConcat [principle] v1.0.0
Translatable strings must never be assembled by concatenation in code. Word order, plural forms, gender agreement, and grammatical case differ across languages — concatenation hardcodes English grammar and produces broken translations in 6500+ other locales.
> Every user-facing string must be a single, complete sentence template owned by the translation pipeline. Variables interpolate via named placeholders ({count}, {name}, {gender}); plurals use ICU MessageFormat plural rules; gender uses ICU select. Code that concatenates two translatable fragments (`t('hello') + ' ' + name + t('today')`) is broken — translators cannot reorder words, cannot inflect adjectives, cannot insert language-specific punctuation.
domain: i18n
