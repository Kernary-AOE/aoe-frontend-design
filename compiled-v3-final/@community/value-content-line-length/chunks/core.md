# content-line-length [value] v1.0.0
domain: visual-design

## Constant
65ch

## Type
css-length

## Usage
```
    :root {
      --content-line-length-tight:    50ch;  /* poetry, captions, narrow columns */
      --content-line-length:           65ch;  /* default body copy, articles */
      --content-line-length-wide:     75ch;  /* lower-density body, novels */
    }

    /* Apply to text containers, NOT to layout containers */
    .prose,
    .article-body p,
    .article-body li,
    .article-body blockquote {
      max-width: var(--content-line-length);
    }

    /* Headings can be wider; figures / code blocks expand */
    .prose figure,
    .prose pre {
      max-width: 100%;
    }

    /* On narrow viewports, ch falls below viewport width naturally — no media query needed */
  
```

## Variants
- **Bringhurst Recommended**: 66 characters / ~66ch — 'The Elements of Typographic Style'
- **Tight 50ch**: 50ch — captions, sidebars, narrow columns
- **Comfortable 65ch**: 65ch — default body copy
- **Wide 75ch**: 75ch — when leading is generous and density acceptable
- **Wcag 1 4 8 Block Of Text**: max 80 characters (40 for CJK) per WCAG 1.4.8 (AAA)
