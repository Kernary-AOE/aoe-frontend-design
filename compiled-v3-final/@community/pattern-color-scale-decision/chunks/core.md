# ColorScaleDecision [pattern] v1.0.0
domain: frontend-design

## Label
Color Scale System Decision Flowchart

## Problem
Designers and agents face three viable color scale systems (Radix Colors, Open Color, custom OKLCH ramp) and no clear decision criteria for choosing between them. Choosing the wrong system leads to missing dark mode support, brittle token structures, or over-engineering a prototype.

## Solution
Follow a flowchart gated on three questions: dark mode requirement, production readiness need, and brand uniqueness. For most production projects, Radix Colors + OKLCH primitives + Tailwind v4 tokens is the recommended stack.

## Structure
```
    Need dark mode auto-flip?
      ├── Yes → Radix Colors (built-in dark variants)
      └── No
          ├── Need production design system? → Radix Colors
          ├── Quick prototype or teaching? → Open Color
          └── Unique brand with specific OKLCH targets? → Custom ramp via oklch-palette-generation-method
  
```
