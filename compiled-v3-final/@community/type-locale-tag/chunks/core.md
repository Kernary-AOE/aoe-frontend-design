# LocaleTag [type] v1.0.0
Schema for a locale identifier conforming to BCP 47 (RFC 5646), the IETF standard for language tags. A locale tag combines language, optional script, optional region, and optional variants (e.g. 'en-US', 'zh-Hant-HK', 'sr-Cyrl', 'pt-BR').
domain: i18n

## Fields
- **Language**:
  - **Type**: string
  - **Format**: ISO 639-1 two-letter or ISO 639-3 three-letter code, lowercase: 'en', 'zh', 'pt', 'haw'
  - **Required**: true
- **Script**:
  - **Type**: string | null
  - **Format**: ISO 15924 four-letter code, Title Case: 'Hans', 'Hant', 'Cyrl', 'Latn'
  - **Description**: Required when the language has multiple writing systems (Chinese, Serbian, Mongolian, Uzbek).
  - **Required**: false
- **Region**:
  - **Type**: string | null
  - **Format**: ISO 3166-1 alpha-2 two-letter, UPPERCASE: 'US', 'GB', 'BR', 'TW' OR UN M.49 three-digit: '419' (Latin America)
  - **Description**: Optional regional variant. Required when locale-specific formatting differs (en-US vs en-GB date format).
  - **Required**: false
- **Variant**:
  - **Type**: string[] | null
  - **Format**: Up to 8 alphanumeric characters per variant subtag
  - **Description**: Rarely-used dialect or orthographic variant: 'de-DE-1996' (post-1996 German spelling), 'sl-rozaj' (Resian)
  - **Required**: false
- **Extension**:
  - **Type**: object
  - **Description**: BCP 47 extension subtags — most common is `u` (Unicode locale extension) for calendar/numbers/collation: '-u-ca-buddhist', '-u-nu-arab'
  - **Shape**: Record<string, string>
  - **Required**: false
- **Private Use**:
  - **Type**: string | null
  - **Format**: Begins with 'x-': 'x-internal', 'x-pig-latin'
  - **Description**: Application-specific tags; never carry standardized meaning
  - **Required**: false

## Invariants
- Concatenation form: language[-script][-region][-variant][-extensions][-x-private] separated by hyphens
- Letter case is NORMATIVE (informational only): language lowercase, script Title Case, region UPPERCASE — but tag matching is case-insensitive
- language subtag is REQUIRED; all others are optional
- script subtag MUST be present when the language is conventionally written in multiple scripts (zh-Hans / zh-Hant; sr-Cyrl / sr-Latn)
- region 'GB' is correct (NOT 'UK'); 'CN' is mainland China (NOT Chinese language); '419' is Latin America (UN M.49 region code)
- Tag MUST NOT exceed 35 characters per spec (rare edge case)

## Example
- **Language**: zh
- **Script**: Hans
- **Region**: CN
- **Variant**: null
- **Extension**:
  - **U**: ca-chinese-nu-hanidec
- **Private Use**: null
- **String Form**: zh-Hans-CN-u-ca-chinese-nu-hanidec
