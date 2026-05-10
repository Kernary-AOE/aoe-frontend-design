# AriaLivePoliteness [fact] v1.0.0
aria-live='polite' waits for the screen reader to finish the current utterance before announcing a region update, while aria-live='assertive' interrupts immediately — use polite for status messages and assertive only for time-critical errors (ARIA 1.2 live region properties).
domain: frontend-design

## Term
aria-live politeness levels

## Definition
```
ARIA live regions have two politeness values:
- "polite"  — announcement waits for an idle pause in speech. Use for: search result counts,
form validation success, cart updates, notification toasts, progress completions.
- "assertive" — announcement interrupts the current speech immediately. Use for: session-expiry
warnings, payment failure alerts, security prompts requiring immediate action.

Semantic equivalents (shorthand roles that imply aria-live):
- role="status"  ≡  aria-live="polite"  aria-atomic="true"
- role="alert"   ≡  aria-live="assertive" aria-atomic="true"
- role="log"     ≡  aria-live="polite"  aria-atomic="false"
```

## Cautions
- aria-live='off' is the default — regions must be in the DOM before content is injected; injecting the element and its content simultaneously may not trigger an announcement in all screen readers.
- Changing aria-live from 'off' to 'polite' after injection is unreliable — always keep the container in the DOM with empty content and inject text only.
- aria-atomic='true' causes the entire region to be read on any change; aria-atomic='false' reads only changed nodes. Most status messages should use aria-atomic='true'.
- Do not use assertive for decorative or low-priority updates — frequent interruptions cause significant UX friction for screen reader users.

## Source Authority
ARIA 1.2 spec §6.6 — Live Region Attributes

## Term
aria-live politeness levels

## Definition
```
ARIA live regions have two politeness values:
- "polite"  — announcement waits for an idle pause in speech. Use for: search result counts,
form validation success, cart updates, notification toasts, progress completions.
- "assertive" — announcement interrupts the current speech immediately. Use for: session-expiry
warnings, payment failure alerts, security prompts requiring immediate action.

Semantic equivalents (shorthand roles that imply aria-live):
- role="status"  ≡  aria-live="polite"  aria-atomic="true"
- role="alert"   ≡  aria-live="assertive" aria-atomic="true"
- role="log"     ≡  aria-live="polite"  aria-atomic="false"
```

## Cautions
- aria-live='off' is the default — regions must be in the DOM before content is injected; injecting the element and its content simultaneously may not trigger an announcement in all screen readers.
- Changing aria-live from 'off' to 'polite' after injection is unreliable — always keep the container in the DOM with empty content and inject text only.
- aria-atomic='true' causes the entire region to be read on any change; aria-atomic='false' reads only changed nodes. Most status messages should use aria-atomic='true'.
- Do not use assertive for decorative or low-priority updates — frequent interruptions cause significant UX friction for screen reader users.

## Source Authority
ARIA 1.2 spec §6.6 — Live Region Attributes
