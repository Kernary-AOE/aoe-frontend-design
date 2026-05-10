# FlagAsLanguage [anti-pattern] v1.0.0
Using a national flag icon to represent a language in a language switcher. Flags signify nation-states, not languages — the mapping from flag to language is many-to-many, often contested, and can offend or confuse users whose language is not tied to a single country.
domain: i18n

## Label
Country Flag as Language Selector

## Why Bad
A flag is a political symbol with sovereign and ethnic associations; a language is a linguistic system spoken across multiple countries by people of many backgrounds. The Brazilian flag does not mean 'Portuguese' — it excludes 220M Portuguese speakers in Portugal, Angola, Mozambique, Cape Verde, Macau, and Timor-Leste. The Spanish flag excludes 480M Latin American speakers. The British flag excludes 330M Americans, 38M Canadians, 26M Australians, and the entire Indian English-speaking population. The Chinese flag conflates Mandarin (普通话 PRC) with Cantonese (粵語 Hong Kong) and ignores Taiwan's Traditional Chinese. There is no flag for Esperanto, Klingon, or 100+ other living languages without a single nation-state. Beyond inaccuracy, flags carry political weight: showing the Russian flag for a Ukrainian Russian-speaker, the Spanish flag for a Catalan speaker, or the Israeli flag for an Arabic-speaking user is not neutral. Worst: in regions with active conflict (Taiwan/PRC, Israel/Palestine, Russia/Ukraine, Serbia/Kosovo), a flag choice forces a political stance into a UI control that should be neutral.

## Instead Do
Display the language name in its OWN language (autonym): 'English', 'Français', 'Deutsch', '日本語', 'العربية', 'हिन्दी', 'Русский'. Pair with the BCP 47 language tag for accessibility (lang='ja' on the option). For locale-specific variants, append region in parentheses: 'English (US)', 'English (UK)', '中文 (简体)', '中文 (繁體)', 'Português (Brasil)', 'Português (Portugal)'. Sort by autonym alphabetically per locale OR by user prevalence. Never use flag emoji as primary indicator — it is acceptable as a secondary visual hint paired with the autonym, but never alone.

## Structure
```
    /* WRONG */
    <button>🇺🇸 English</button>
    <button>🇪🇸 Spanish</button>     <!-- excludes Latin America -->
    <button>🇨🇳 中文</button>        <!-- conflates Simplified/Traditional -->
    <button>🇧🇷 Português</button>    <!-- excludes European Portuguese -->

    /* CORRECT */
    <ul role="listbox" aria-label="Choose language">
      <li lang="en"><button>English</button></li>
      <li lang="es"><button>Español</button></li>
      <li lang="zh-Hans"><button>中文 (简体)</button></li>
      <li lang="zh-Hant"><button>中文 (繁體)</button></li>
      <li lang="pt-BR"><button>Português (Brasil)</button></li>
      <li lang="pt-PT"><button>Português (Portugal)</button></li>
      <li lang="ar" dir="rtl"><button>العربية</button></li>
      <li lang="he" dir="rtl"><button>עברית</button></li>
    </ul>

    /* If region matters separately (currency/tax/shipping), use a SEPARATE region selector */
    <select name="region" aria-label="Shipping country">
      <option value="US">United States</option>
      <option value="DE">Deutschland</option>
    </select>
  
```

## Relations
enhances: @community/rule-intl-api-locale-formatting

## Label
Country Flag as Language Selector

## Why Bad
A flag is a political symbol with sovereign and ethnic associations; a language is a linguistic system spoken across multiple countries by people of many backgrounds. The Brazilian flag does not mean 'Portuguese' — it excludes 220M Portuguese speakers in Portugal, Angola, Mozambique, Cape Verde, Macau, and Timor-Leste. The Spanish flag excludes 480M Latin American speakers. The British flag excludes 330M Americans, 38M Canadians, 26M Australians, and the entire Indian English-speaking population. The Chinese flag conflates Mandarin (普通话 PRC) with Cantonese (粵語 Hong Kong) and ignores Taiwan's Traditional Chinese. There is no flag for Esperanto, Klingon, or 100+ other living languages without a single nation-state. Beyond inaccuracy, flags carry political weight: showing the Russian flag for a Ukrainian Russian-speaker, the Spanish flag for a Catalan speaker, or the Israeli flag for an Arabic-speaking user is not neutral. Worst: in regions with active conflict (Taiwan/PRC, Israel/Palestine, Russia/Ukraine, Serbia/Kosovo), a flag choice forces a political stance into a UI control that should be neutral.

## Instead Do
Display the language name in its OWN language (autonym): 'English', 'Français', 'Deutsch', '日本語', 'العربية', 'हिन्दी', 'Русский'. Pair with the BCP 47 language tag for accessibility (lang='ja' on the option). For locale-specific variants, append region in parentheses: 'English (US)', 'English (UK)', '中文 (简体)', '中文 (繁體)', 'Português (Brasil)', 'Português (Portugal)'. Sort by autonym alphabetically per locale OR by user prevalence. Never use flag emoji as primary indicator — it is acceptable as a secondary visual hint paired with the autonym, but never alone.

## Structure
```
    /* WRONG */
    <button>🇺🇸 English</button>
    <button>🇪🇸 Spanish</button>     <!-- excludes Latin America -->
    <button>🇨🇳 中文</button>        <!-- conflates Simplified/Traditional -->
    <button>🇧🇷 Português</button>    <!-- excludes European Portuguese -->

    /* CORRECT */
    <ul role="listbox" aria-label="Choose language">
      <li lang="en"><button>English</button></li>
      <li lang="es"><button>Español</button></li>
      <li lang="zh-Hans"><button>中文 (简体)</button></li>
      <li lang="zh-Hant"><button>中文 (繁體)</button></li>
      <li lang="pt-BR"><button>Português (Brasil)</button></li>
      <li lang="pt-PT"><button>Português (Portugal)</button></li>
      <li lang="ar" dir="rtl"><button>العربية</button></li>
      <li lang="he" dir="rtl"><button>עברית</button></li>
    </ul>

    /* If region matters separately (currency/tax/shipping), use a SEPARATE region selector */
    <select name="region" aria-label="Shipping country">
      <option value="US">United States</option>
      <option value="DE">Deutschland</option>
    </select>
  
```

## Enhances
@community/rule-intl-api-locale-formatting
