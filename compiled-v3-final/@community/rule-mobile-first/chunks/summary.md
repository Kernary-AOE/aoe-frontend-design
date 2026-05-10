# MobileFirst [rule] v1.0.0
CSS responsive breakpoints MUST be authored mobile-first: base styles target the smallest viewport, and `@media (min-width: ...)` queries layer on enhancements for larger viewports. Desktop-first authoring (`@media (max-width: ...)`) requires the cascade to override styles repeatedly and tends to bloat mobile payloads.
domain: frontend-engineering
