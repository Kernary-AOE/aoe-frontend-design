# ScreenReaderFriendlyCopy [rule] v1.0.0
UI copy must read naturally when spoken aloud — use short, declarative sentences with subject-first word order so screen reader announcements are unambiguous without visual context.
>     When writing any user-facing text in a UI:
    1. Keep sentences short — one idea per sentence, ≤20 words preferred.
    2. Use subject-first order: 'Your password was reset.' not 'Reset has been applied to your password.'
    3. Avoid em-dashes and parenthetical clauses mid-sentence — they disrupt spoken rhythm.
    4. Write error messages as complete sentences: 'Enter a valid email address.' not 'Invalid email'.
    5. Avoid abbreviations that expand unexpectedly when spoken (e.g., 'Dr.' may be read as 'Doctor' or 'Drive').
    6. Test by running a screen reader (NVDA, VoiceOver, TalkBack) over key flows and listening to the announcements.
  
domain: frontend-design

## Applies To
- Error messages and validation copy
- Modal and dialog body text
- Form field helper text
- Empty state descriptions
- Toast / notification messages
- Button labels and CTA copy

## Counter Example
An error message that reads 'An error occurred while processing your request due to an unexpected server condition — please try again or contact support if the issue persists.' — too long, disorienting when spoken.

## Examples
- Good: 'Your changes have been saved.' / Bad: 'The save operation has been completed successfully.'
- Good: 'Enter a 6-digit verification code.' / Bad: 'Input the verification code (6 digits) sent to your device.'

## Rationale
Long or convoluted sentences that read fine visually become confusing when heard sequentially without visual context. A screen reader user cannot skim — they hear every word in order. A sentence like 'Please note that the selected action, while reversible within 24 hours, cannot be undone thereafter' takes 3× longer to parse aurally than 'This action can be undone within 24 hours. After that, it is permanent.' Clarity for screen reader users improves copy quality for all users.

## Applies To
- Error messages and validation copy
- Modal and dialog body text
- Form field helper text
- Empty state descriptions
- Toast / notification messages
- Button labels and CTA copy

## Counter Example
An error message that reads 'An error occurred while processing your request due to an unexpected server condition — please try again or contact support if the issue persists.' — too long, disorienting when spoken.
