# ContentLanguageDeclared [constraint] v1.0.0
Every shipped HTML document must declare the primary content language via `<html lang='...'>`. Content blocks in a different language must be marked with `lang='...'` on the containing element.
domain: accessibility

## Target
- root <html> element of every shipped HTML document
- language switches inside long-form content

## Severity
high

## Values
-
  - **Required**: <html lang='en'> (or appropriate BCP-47 tag) at the document root
-
  - **Required**: <blockquote lang='fr'> / <span lang='ja'> for inline language switches
-
  - **Forbidden**: <html> with no lang attribute
-
  - **Forbidden**: lang='' empty value
-
  - **Forbidden**: non-BCP-47 codes (e.g., lang='english', lang='zhcn')

## Exceptions
- Email templates rendered into a known-locale client (lang inherits from envelope).
- Code-only fragments (e.g., a JSON viewer) where prose language is irrelevant — still set lang on the wrapper for consistency.

## Approved Alternatives
- Set lang at the framework root: Next.js `<Html lang='en'>`, Nuxt `app.head.htmlAttrs.lang`, SvelteKit `<html lang='%lang%'>`.
- Detect locale at the edge (Cloudflare Workers / Next middleware) and inject lang server-side.
- Use BCP-47 tags: en, en-US, zh-Hans, ja, fr-CA.

## Enforcement
axe-core rule `html-has-lang` + `html-lang-valid` + `valid-lang`. Lighthouse a11y category. Build-time check in SSR templates.

## Rationale
Screen readers select the correct pronunciation engine based on lang. Without it, English content is read in the user's default voice (e.g., a French screen-reader pronouncing English content as if it were French — incomprehensible). Search engines, translation tools, browser spellcheck, and hyphenation also rely on lang. WCAG 2.2 SC 3.1.1 (Language of Page) is Level A — non-negotiable.
