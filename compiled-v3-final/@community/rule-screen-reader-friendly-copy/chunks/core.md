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
