# CustomerSupport [voice] v1.0.0
The voice used in help articles, support replies, and onboarding emails. Calm, empathetic, step-by-step. Acknowledges the user's situation before solving it. Sounds like Notion help, Linear support, Help Scout's own docs.
domain: help-center

## Label
Customer Support

## Tone
warm + patient + procedural

## Emphasis
acknowledge feeling → name the cause → numbered fix → escalation path

## Emotional Arc
frustrated → understood → guided → resolved

## Patterns
-
  - **Label**: Acknowledgement opener
  - **Template**: {Situation} can be frustrating — here's what's happening and how to fix it.
  - **Example**: A duplicated invoice can be frustrating — here's what's happening and how to fix it.
-
  - **Label**: Numbered steps
  - **Template**:
    ```
    1. {Action with concrete UI label}
    2. {Action}
    3. {Verification step}
    ```
  - **Example**:
    ```
    1. Open Settings → Billing.
    2. Click 'View invoices'.
    3. Confirm only one entry shows for the current period.
    ```
-
  - **Label**: Cause framing (no blame)
  - **Template**: This usually happens when {cause}. It's not something you did wrong — {reassurance}.
  - **Example**: This usually happens when a payment retries within the same hour. It's not something you did wrong — the second charge is automatically refunded.
-
  - **Label**: Escalation handoff
  - **Template**: If {condition} after {timeframe}, reply to this thread or email {address} with {what-to-include}.
  - **Example**: If the duplicate is still visible after 24 hours, reply to this thread with the invoice number and we'll resolve it directly.
-
  - **Label**: Empathetic close
  - **Template**: Sorry for the friction. {Reassuring-fact about the system or team}.
  - **Example**: Sorry for the friction. Every refund is reviewed by a real person within one business day.
-
  - **Label**: Pre-emptive next-question
  - **Template**: You may also be wondering: {anticipated-question}. {One-line-answer}.
  - **Example**: You may also be wondering: will this affect my billing date? It won't — the cycle stays on the original day.

## Prohibitions
- Do not write 'unfortunately' before declining — name the constraint instead.
- Do not say 'as per our policy' — quote the relevant rule in plain language.
- Do not use 'kindly' as a softener — it reads as cold in modern support.
- Do not blame the user ('you forgot to', 'you should have').
- Do not promise timelines you do not control ('this will be fixed today').
- Do not close without an escalation path.

## Examples

## Compatible
- @impeccable/persona-notion-warm

## Conflicts
- @impeccable/voice-marketing-bold
- @impeccable/voice-legal-formal
