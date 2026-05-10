# NoJustifiedTextNarrow [rule] v1.0.0
CSS `text-align: justify` is BANNED on any text container narrower than 45ch or on any mobile viewport without CSS hyphenation enabled (`hyphens: auto`); it produces uneven word-spacing rivers that destroy reading rhythm on short line lengths.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
medium

## Exceptions
-
  - **Case**: Long-form editorial with hyphenation
  - **Allowed When**: `hyphens: auto` is set, `lang` is correctly declared, container is ≥ 45ch, and desktop-only (not applied at < 640px viewport).
-
  - **Case**: RTL languages (Arabic, Hebrew)
  - **Allowed When**: RTL text with proper `dir='rtl'` — justification behavior differs and is often more natural in RTL script systems.

## Remediation
- Remove `text-align: justify` from all prose containers.
- If justified text is needed: add `hyphens: auto; overflow-wrap: break-word;` and test at all breakpoints.
- Default prose to `text-align: left` (LTR) or `text-align: start` (RTL-safe).

## Rationale
CSS justification on screens distributes inter-word spacing to fill each line to full width. Without hyphenation, short lines create dramatic gaps (called 'rivers') between words — a well-documented legibility problem identified by Bringhurst, Lupton, and extensively researched in web typography. This problem is especially acute on narrow containers (mobile viewports, sidebar prose, cards) where word counts per line are low and spacing variation is extreme. The browser's justification algorithm is also less sophisticated than professional typesetting engines (InDesign's paragraph composer), producing inferior results.

## Applies To
@community/type-html-artifact

## Severity
medium

## Exceptions
-
  - **Case**: Long-form editorial with hyphenation
  - **Allowed When**: `hyphens: auto` is set, `lang` is correctly declared, container is ≥ 45ch, and desktop-only (not applied at < 640px viewport).
-
  - **Case**: RTL languages (Arabic, Hebrew)
  - **Allowed When**: RTL text with proper `dir='rtl'` — justification behavior differs and is often more natural in RTL script systems.

## Remediation
- Remove `text-align: justify` from all prose containers.
- If justified text is needed: add `hyphens: auto; overflow-wrap: break-word;` and test at all breakpoints.
- Default prose to `text-align: left` (LTR) or `text-align: start` (RTL-safe).
