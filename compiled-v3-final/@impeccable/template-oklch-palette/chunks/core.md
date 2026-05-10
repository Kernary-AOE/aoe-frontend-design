# OklchPalette [template] v1.0.0
Generates a full 10-step tonal palette in oklch() for a brand color, with dark-mode variants. Steps are perceptually even due to oklch's uniform lightness axis. Each step includes a semantic role comment.
domain: visual-design

## Language
css

## Body
```
    /* Generated oklch palette — HUE: {HUE}, CHROMA: {CHROMA} */
    :root {
      /* Primitives */
      {PREFIX}-50:  oklch(96% {CHROMA * 0.4} {HUE});   /* near-white tint */
      {PREFIX}-100: oklch(92% {CHROMA * 0.5} {HUE});
      {PREFIX}-200: oklch(84% {CHROMA * 0.7} {HUE});
      {PREFIX}-300: oklch(74% {CHROMA * 0.85} {HUE});
      {PREFIX}-400: oklch(64% {CHROMA} {HUE});
      {PREFIX}-500: oklch(55% {CHROMA} {HUE});          /* brand default */
      {PREFIX}-600: oklch(46% {CHROMA} {HUE});
      {PREFIX}-700: oklch(38% {CHROMA} {HUE});
      {PREFIX}-800: oklch(28% {CHROMA * 0.8} {HUE});
      {PREFIX}-900: oklch(18% {CHROMA * 0.6} {HUE});   /* near-black shade */

      /* Semantic roles (light mode) */
      {PREFIX}-bg:           {PREFIX}-50;
      {PREFIX}-surface:      {PREFIX}-100;
      {PREFIX}-border:       {PREFIX}-200;
      {PREFIX}-text-muted:   {PREFIX}-400;
      {PREFIX}-text:         {PREFIX}-700;
      {PREFIX}-primary:      {PREFIX}-500;
      {PREFIX}-primary-hover:{PREFIX}-600;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        {PREFIX}-bg:           {PREFIX}-950; /* add 950: oklch(10% {CHROMA*0.4} {HUE}) */
        {PREFIX}-surface:      {PREFIX}-900;
        {PREFIX}-border:       {PREFIX}-800;
        {PREFIX}-text-muted:   {PREFIX}-500;
        {PREFIX}-text:         {PREFIX}-100;
        {PREFIX}-primary:      {PREFIX}-400;  /* lighter in dark mode for contrast */
        {PREFIX}-primary-hover:{PREFIX}-300;
      }
    }
  
```
