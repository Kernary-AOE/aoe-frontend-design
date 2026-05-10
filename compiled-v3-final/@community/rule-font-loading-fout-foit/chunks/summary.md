# FontLoadingFoutFoit [rule] v1.0.0
Every `@font-face` declaration for a custom web font MUST include `font-display: swap` to prevent FOIT (Flash of Invisible Text — up to 3 s of blank text) and control FOUT (Flash of Unstyled Text) by showing the fallback font immediately.
domain: frontend-design
