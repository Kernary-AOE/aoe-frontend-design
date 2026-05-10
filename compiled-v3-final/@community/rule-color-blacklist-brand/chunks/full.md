# ColorBlacklistBrand [rule] v1.0.0
Forbids the canonical AI-slop color palette — Inter-purple (#6366F1 / oklch(60% 0.20 280)), pure black (#000) on pure white (#fff) body, and the default browser blue link (#0000EE / #1A0DAB) — from production artifacts. These choices broadcast 'LLM-generated commodity output' and erase brand identity.
domain: visual-design

## Checks
- [ ] @community/check-color-blacklist-brand

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
blacklist color appears as primary/brand → BLOCK
blacklist color appears only as fallback → WARN
no blacklist color present              → PASS
```

## Failure Mode
Output is visually indistinguishable from a default shadcn/ui scaffold; the brand has no visual signature; reviewers and users perceive the product as 'AI-generated', reducing trust and perceived craftsmanship.

## Remediation
- Replace Inter-purple with a brand-specific oklch() hue — derive from a real brand asset, not from a Tailwind default. See @impeccable/template-oklch-palette.
- Replace `#000` body text with `oklch(20% 0.01 <brand-hue>)` and `#fff` body background with `oklch(98% 0.005 <brand-hue>)` — small chroma keeps the surface alive.
- Replace default blue links with a derived brand accent at adequate contrast (≥ 4.5:1 against body bg).

## Exceptions
-
  - **Case**: System / OS native dialogs
  - **Allowed When**: Color is rendered by the user agent (e.g. <input type='color'> picker chrome) and cannot be overridden.
-
  - **Case**: Brand palette legitimately uses one of these values
  - **Allowed When**: Brand book documents the value as official; in this case it is not 'AI-slop' but a coincidence — annotate with `data-brand-color='true'` to opt out.

## Applies To
@community/type-html-artifact

## Severity
high

## Validates With
- @impeccable/anti-pattern-ai-slop-palette
- @impeccable/counter-example-inter-purple-dark

## Severity Combination
```
blacklist color appears as primary/brand → BLOCK
blacklist color appears only as fallback → WARN
no blacklist color present              → PASS
```

## Failure Mode
Output is visually indistinguishable from a default shadcn/ui scaffold; the brand has no visual signature; reviewers and users perceive the product as 'AI-generated', reducing trust and perceived craftsmanship.

## Remediation
- Replace Inter-purple with a brand-specific oklch() hue — derive from a real brand asset, not from a Tailwind default. See @impeccable/template-oklch-palette.
- Replace `#000` body text with `oklch(20% 0.01 <brand-hue>)` and `#fff` body background with `oklch(98% 0.005 <brand-hue>)` — small chroma keeps the surface alive.
- Replace default blue links with a derived brand accent at adequate contrast (≥ 4.5:1 against body bg).

## Exceptions
-
  - **Case**: System / OS native dialogs
  - **Allowed When**: Color is rendered by the user agent (e.g. <input type='color'> picker chrome) and cannot be overridden.
-
  - **Case**: Brand palette legitimately uses one of these values
  - **Allowed When**: Brand book documents the value as official; in this case it is not 'AI-slop' but a coincidence — annotate with `data-brand-color='true'` to opt out.

## See Also
- @community/check-color-blacklist-brand
