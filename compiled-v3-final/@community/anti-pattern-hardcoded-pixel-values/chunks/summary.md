# HardcodedPixelValues [anti-pattern] v1.0.0
Writing raw pixel values (`padding: 16px`, `font-size: 14px`, `border-radius: 8px`) directly into component CSS instead of referencing CSS custom properties or design tokens. The values may individually look correct, but they bypass the token layer that allows theming, scaling, and consistent global change.
domain: design-system
