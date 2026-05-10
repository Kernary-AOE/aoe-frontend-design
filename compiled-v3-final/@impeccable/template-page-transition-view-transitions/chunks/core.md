# PageTransitionViewTransitions [template] v1.0.0
Smooth page transitions using the View Transitions API (Chrome 111+, Safari 18+). Single-page apps get cross-fade for free; shared elements (e.g. hero image → detail page header) morph automatically when given matching view-transition-name. Progressive enhancement — falls back to instant nav.
domain: motion

## Language
html-css-js

## Body
```
    <style>
      /* Default cross-fade for the whole document */
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation-duration: {DURATION};
        animation-timing-function: {EASING};
      }

      ::view-transition-old(root) {
        animation-name: page-fade-out;
      }
      ::view-transition-new(root) {
        animation-name: page-fade-in;
      }

      @keyframes page-fade-out {
        to { opacity: 0; transform: translateY(-4px); }
      }
      @keyframes page-fade-in {
        from { opacity: 0; transform: translateY(4px); }
      }

      /* Shared element example: any element with view-transition-name matching across pages morphs */
      .hero-image {
        view-transition-name: {SHARED_NAME};
      }

      ::view-transition-old({SHARED_NAME}),
      ::view-transition-new({SHARED_NAME}) {
        animation-duration: {DURATION};
        animation-timing-function: {EASING};
      }

      @media (prefers-reduced-motion: reduce) {
        ::view-transition-old(root),
        ::view-transition-new(root),
        ::view-transition-old({SHARED_NAME}),
        ::view-transition-new({SHARED_NAME}) {
          animation: none !important;
        }
      }
    </style>

    <script>
      /**
       * Wrap any DOM-mutating navigation in startViewTransition.
       *   navigateWithTransition(() => updateMainContent(newHTML))
       */
      function navigateWithTransition(domUpdateFn) {
        if (!document.startViewTransition) {
          // Fallback: just run the update; browser handles a hard cut.
          return domUpdateFn();
        }
        return document.startViewTransition(domUpdateFn);
      }

      // Example: intercept clicks on data-transition links
      document.addEventListener('click', function(e) {
        var link = e.target.closest('a[data-transition]');
        if (!link) return;
        if (link.target === '_blank' || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        navigateWithTransition(function() {
          // Replace this with your router call:
          window.location.href = link.href;
        });
      });

      window.navigateWithTransition = navigateWithTransition;
    </script>

    <!-- Markup:
      <a href="/post/123" data-transition>Read more</a>
      <img class="hero-image" src="..." alt="..."> on both pages morphs automatically.
    -->
  
```

## Usage Notes
- Multi-page apps need same-origin navigation + browser support for cross-document transitions (Chrome 126+).
- SPA case is universally supported (Chrome 111+, Safari 18+) via document.startViewTransition.
- view-transition-name MUST be unique per element per snapshot — duplicate names crash the transition.
- Don't transition long content (>1 viewport) — animation runs over the whole snapshot, can feel slow.
- 320ms is the sweet spot for page-level motion. Hover/press should be 80-150ms; pages get longer because they're bigger surface.
- Always feature-detect (document.startViewTransition) — older browsers fall back to instant nav, no error.

## Tested In
- Chrome 111+ (SPA)
- Chrome 126+ (cross-document)
- Safari 18+
- Firefox: no support — falls back to instant

## Accessibility
- prefers-reduced-motion disables all view transitions — instant cut, no fade.
- Animation runs against pseudo-elements that aria are already hidden from — no aria changes needed.
- Focus management is the consumer's job: after navigation, focus the new page's main heading.
