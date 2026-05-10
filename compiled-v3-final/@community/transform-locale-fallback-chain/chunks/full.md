# LocaleFallbackChain [transform] v1.0.0
Computes the BCP 47 locale fallback chain for a requested locale tag. Implements RFC 4647 'Lookup' algorithm: try the most specific tag, then truncate subtags from the right, fall through to a default. Critical for graceful degradation when a translation file is missing.
domain: i18n

signature: (requested: string, available: string[]) -> string[]

## Pure
true

## Body
```
    /**
     * Compute fallback chain for a BCP 47 locale tag.
     *
     * Examples:
     *   localeFallbackChain('zh-Hant-HK', ['en', 'zh-Hans', 'zh-Hant', 'zh-Hant-HK'])
     *     → ['zh-Hant-HK', 'zh-Hant', 'en']
     *
     *   localeFallbackChain('en-US', ['en', 'fr'])
     *     → ['en-US', 'en']
     *
     *   localeFallbackChain('xx-YY', ['en', 'fr'])
     *     → ['en'] (final default)
     */
    function localeFallbackChain(requested, available, defaultLocale = 'en') {
      if (typeof requested !== 'string' || requested.length === 0) {
        throw new TypeError('requested must be a non-empty BCP 47 tag');
      }
      if (!Array.isArray(available) || available.length === 0) {
        throw new TypeError('available must be a non-empty array');
      }

      const norm = s => s.toLowerCase();
      const availableSet = new Set(available.map(norm));
      const chain = [];
      const seen = new Set();

      // Try requested, then truncate by hyphen from the right
      let tag = requested;
      while (tag.length > 0) {
        const normTag = norm(tag);
        if (availableSet.has(normTag) && !seen.has(normTag)) {
          // Preserve the original case from `available` array
          const preserved = available.find(a => norm(a) === normTag);
          chain.push(preserved);
          seen.add(normTag);
        }
        const lastHyphen = tag.lastIndexOf('-');
        if (lastHyphen === -1) break;
        tag = tag.substring(0, lastHyphen);
        // RFC 4647: skip private-use sequences and single-letter subtags
        const next = tag.substring(0, tag.lastIndexOf('-'));
        if (tag.length - next.length === 2 && next.length > 0) {
          tag = next;
        }
      }

      // Append default if not already in chain
      if (!seen.has(norm(defaultLocale))) {
        const preservedDefault = available.find(a => norm(a) === norm(defaultLocale));
        if (preservedDefault) {
          chain.push(preservedDefault);
        }
      }

      return chain;
    }
  
```

## Inverse
null

## Examples

## Pure
true

## Body
```
    /**
     * Compute fallback chain for a BCP 47 locale tag.
     *
     * Examples:
     *   localeFallbackChain('zh-Hant-HK', ['en', 'zh-Hans', 'zh-Hant', 'zh-Hant-HK'])
     *     → ['zh-Hant-HK', 'zh-Hant', 'en']
     *
     *   localeFallbackChain('en-US', ['en', 'fr'])
     *     → ['en-US', 'en']
     *
     *   localeFallbackChain('xx-YY', ['en', 'fr'])
     *     → ['en'] (final default)
     */
    function localeFallbackChain(requested, available, defaultLocale = 'en') {
      if (typeof requested !== 'string' || requested.length === 0) {
        throw new TypeError('requested must be a non-empty BCP 47 tag');
      }
      if (!Array.isArray(available) || available.length === 0) {
        throw new TypeError('available must be a non-empty array');
      }

      const norm = s => s.toLowerCase();
      const availableSet = new Set(available.map(norm));
      const chain = [];
      const seen = new Set();

      // Try requested, then truncate by hyphen from the right
      let tag = requested;
      while (tag.length > 0) {
        const normTag = norm(tag);
        if (availableSet.has(normTag) && !seen.has(normTag)) {
          // Preserve the original case from `available` array
          const preserved = available.find(a => norm(a) === normTag);
          chain.push(preserved);
          seen.add(normTag);
        }
        const lastHyphen = tag.lastIndexOf('-');
        if (lastHyphen === -1) break;
        tag = tag.substring(0, lastHyphen);
        // RFC 4647: skip private-use sequences and single-letter subtags
        const next = tag.substring(0, tag.lastIndexOf('-'));
        if (tag.length - next.length === 2 && next.length > 0) {
          tag = next;
        }
      }

      // Append default if not already in chain
      if (!seen.has(norm(defaultLocale))) {
        const preservedDefault = available.find(a => norm(a) === norm(defaultLocale));
        if (preservedDefault) {
          chain.push(preservedDefault);
        }
      }

      return chain;
    }
  
```

## Inverse
null
