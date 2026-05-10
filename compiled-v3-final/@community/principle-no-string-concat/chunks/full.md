# NoStringConcat [principle] v1.0.0
Translatable strings must never be assembled by concatenation in code. Word order, plural forms, gender agreement, and grammatical case differ across languages — concatenation hardcodes English grammar and produces broken translations in 6500+ other locales.
> Every user-facing string must be a single, complete sentence template owned by the translation pipeline. Variables interpolate via named placeholders ({count}, {name}, {gender}); plurals use ICU MessageFormat plural rules; gender uses ICU select. Code that concatenates two translatable fragments (`t('hello') + ' ' + name + t('today')`) is broken — translators cannot reorder words, cannot inflect adjectives, cannot insert language-specific punctuation.
domain: i18n

## Attributed To
Mozilla L10n Best Practices; ICU Project (IBM/Unicode); Mark Davis, 'Why We Need Real Localization' (Unicode Conference 2009).

## Applies To
- All translatable strings in any product UI
- Server-rendered emails and notifications
- Push notification payloads (title + body)
- Voice assistant prompts and TTS output
- Marketing copy that ships to multiple locales
- Error messages, validation messages, accessibility labels

## Counter Examples
- WRONG: `t('You have ') + count + t(' new messages')` — Russian needs three plural forms, Arabic six; the template fragments cannot encode this.
- WRONG: `${count} ${count === 1 ? t('item') : t('items')}` — hardcodes English plural rule; Polish has 'jeden / dwa / pięć' three-way agreement.
- WRONG: `t('Welcome') + ', ' + name + '!'` — Japanese punctuation is 「 」, German often capitalizes nouns, Arabic reverses order.
- WRONG: building lists via `arr.join(', ') + ' and ' + last` — English-only conjunction; use Intl.ListFormat which handles 'A, B, et C' (French) and Arabic RTL.

## Sources

## Examples
- Correct: t('items.cart.summary', { count: 3 }) → ICU template '{count, plural, one {# item} other {# items}} in cart'. Translators handle Slavic 3-form plurals (one/few/many).
- Correct: t('user.greeting', { name: user.name, gender: user.gender }) → '{gender, select, female {Welcome back, {name}!} male {Welcome back, {name}!} other {Welcome back, {name}!}}' — Spanish/French inflect adjectives; English does not, but the template supports both.
- Correct: dates via Intl.DateTimeFormat, numbers via Intl.NumberFormat, lists via Intl.ListFormat — never manual `' and '` joining.

## Relations
requires: @community/pattern-icu-message-format

## Source
- ICU MessageFormat 2.0 specification (Unicode Technical Standard 35, Part 2)
- Mozilla Localization Best Practices — 'Don't concatenate strings'
- GNU gettext manual — Section on plural forms and message contexts
- W3C Internationalization Working Group — 'Localizable Strings' best practice

## Requires
@community/pattern-icu-message-format
