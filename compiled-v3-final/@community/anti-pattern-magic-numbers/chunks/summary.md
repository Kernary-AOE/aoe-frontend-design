# MagicNumbers [anti-pattern] v1.0.0
Numeric values that have no traceable origin: `padding: 13px`, `top: 47px`, `width: calc(100% - 73px)`, `transform: translateY(-2.5rem)`. Unlike hardcoded-pixel-values (which are at least canonical step sizes like 16/24/32), magic numbers are off-grid values invented to make a particular layout look right at one viewport. They are unmaintainable because nobody — including the original author — remembers why they exist.
domain: design-system
