# MotionForms [pattern] v1.0.0
Form animation patterns — validation shake on error, input focus glow, and success feedback on submit — that communicate state changes functionally rather than decoratively, using Motion.dev or CSS transitions.
domain: frontend-design

## Label
Motion Pattern: Form Animations

## Problem
Static form error states (red border + text) are noticed less reliably, especially when multiple errors appear at once. Conversely, animating every keystroke creates visual noise that distracts from filling the form.

## Solution
Apply motion only on meaningful state transitions: shake/pulse on validation failure to direct attention, subtle border glow on focus to confirm the active field, and a success animation on submit to confirm completion. Always respect prefers-reduced-motion.

## Animation Catalog
- **Validation Shake**:
  - **Trigger**: field fails validation on submit or blur
  - **Motion**: horizontal shake: translateX sequence [0, -6px, 6px, -4px, 4px, 0] over 400ms
  - **Purpose**: draws attention to the error location faster than text alone
- **Focus Glow**:
  - **Trigger**: field receives focus
  - **Motion**: box-shadow scale in from 0 to 0 0 0 3px {focus-color}/40% over 150ms ease-out
  - **Purpose**: confirms active field; supplements :focus-visible outline
- **Submit Success**:
  - **Trigger**: form submitted successfully
  - **Motion**: submit button morphs to checkmark or fades out; success message fades in from below
  - **Purpose**: confirms the action completed without requiring a page navigation

## Code Motion Dev
```
    import { motion, AnimatePresence } from "motion/react";

    // Validation shake
    <motion.div
      animate={hasError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <input aria-invalid={hasError} ... />
    </motion.div>

    // Focus glow (CSS approach — no JS)
    // input:focus-visible { box-shadow: 0 0 0 3px oklch(65% 0.15 250 / 40%); }

    // Submit success
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.button key="btn" exit={{ opacity: 0, scale: 0.95 }}>Submit</motion.button>
      ) : (
        <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <CheckIcon /> Saved!
        </motion.div>
      )}
    </AnimatePresence>
  
```

## Reduced Motion
All animations must be wrapped or conditioned on `@media (prefers-reduced-motion: no-preference)` or the Motion.dev `useReducedMotion()` hook — disable translate/scale; keep opacity transitions at ≤150ms.

## Rules
- Animation supplements, never replaces, text error messages and ARIA state updates.
- Never animate while the user is actively typing — only on blur or submit.
- Shake only the affected field(s), not the entire form.

## Label
Motion Pattern: Form Animations

## Problem
Static form error states (red border + text) are noticed less reliably, especially when multiple errors appear at once. Conversely, animating every keystroke creates visual noise that distracts from filling the form.

## Solution
Apply motion only on meaningful state transitions: shake/pulse on validation failure to direct attention, subtle border glow on focus to confirm the active field, and a success animation on submit to confirm completion. Always respect prefers-reduced-motion.

## Animation Catalog
- **Validation Shake**:
  - **Trigger**: field fails validation on submit or blur
  - **Motion**: horizontal shake: translateX sequence [0, -6px, 6px, -4px, 4px, 0] over 400ms
  - **Purpose**: draws attention to the error location faster than text alone
- **Focus Glow**:
  - **Trigger**: field receives focus
  - **Motion**: box-shadow scale in from 0 to 0 0 0 3px {focus-color}/40% over 150ms ease-out
  - **Purpose**: confirms active field; supplements :focus-visible outline
- **Submit Success**:
  - **Trigger**: form submitted successfully
  - **Motion**: submit button morphs to checkmark or fades out; success message fades in from below
  - **Purpose**: confirms the action completed without requiring a page navigation

## Code Motion Dev
```
    import { motion, AnimatePresence } from "motion/react";

    // Validation shake
    <motion.div
      animate={hasError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <input aria-invalid={hasError} ... />
    </motion.div>

    // Focus glow (CSS approach — no JS)
    // input:focus-visible { box-shadow: 0 0 0 3px oklch(65% 0.15 250 / 40%); }

    // Submit success
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.button key="btn" exit={{ opacity: 0, scale: 0.95 }}>Submit</motion.button>
      ) : (
        <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <CheckIcon /> Saved!
        </motion.div>
      )}
    </AnimatePresence>
  
```

## Reduced Motion
All animations must be wrapped or conditioned on `@media (prefers-reduced-motion: no-preference)` or the Motion.dev `useReducedMotion()` hook — disable translate/scale; keep opacity transitions at ≤150ms.

## Rules
- Animation supplements, never replaces, text error messages and ARIA state updates.
- Never animate while the user is actively typing — only on blur or submit.
- Shake only the affected field(s), not the entire form.
