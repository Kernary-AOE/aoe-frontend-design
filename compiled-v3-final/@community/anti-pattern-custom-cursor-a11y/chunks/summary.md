# CustomCursorA11y [anti-pattern] v1.0.0
Custom cursor implementations that apply cursor: none globally or add trailing/lerp animation create five distinct accessibility failures: semantic cursor loss, click hot-zone misalignment, vestibular motion harm (prefers-reduced-motion), silent breakage on touch devices, and invisibility under Windows High Contrast Mode.
domain: frontend-design
