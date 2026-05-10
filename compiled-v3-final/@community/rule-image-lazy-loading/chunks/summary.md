# ImageLazyLoading [rule] v1.0.0
Images that are not visible in the initial viewport MUST use loading='lazy' to defer their network fetch; above-the-fold images MUST use loading='eager' (the default) and should use fetchpriority='high' for the LCP image.
domain: frontend-design
