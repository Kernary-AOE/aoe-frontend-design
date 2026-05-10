# LocaleFallbackChain [transform] v1.0.0
Computes the BCP 47 locale fallback chain for a requested locale tag. Implements RFC 4647 'Lookup' algorithm: try the most specific tag, then truncate subtags from the right, fall through to a default. Critical for graceful degradation when a translation file is missing.
domain: i18n
