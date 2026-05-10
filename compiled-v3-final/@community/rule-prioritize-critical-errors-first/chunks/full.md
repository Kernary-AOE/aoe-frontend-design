# PrioritizeCriticalErrorsFirst [rule] v1.0.0
When multiple validation errors exist simultaneously, surface the most critical error first rather than dumping a full list — guide users one issue at a time to reduce abandonment.
> When a form submission produces multiple validation errors: (1) rank errors by severity (blocker > warning > suggestion); (2) display the highest-severity error prominently at the top of the form, adjacent to the offending field; (3) show a maximum of 1–2 errors at a time; (4) only reveal subsequent errors after the top error is resolved. Never flood the user with a full list of all failures at once.
domain: frontend-design

## Applies To
Any form with multi-field validation — registration, checkout, settings, profile update — where more than one field can fail simultaneously.

## Counter Example
A form that renders 6 red error messages all at once on first submit — the user sees a 'wall of red' and cannot identify where to start.

## Examples
-       {/* CORRECT — show most critical error first */}
      {errors.email && (
        <p role="alert" className="text-[13px] text-red-500 mt-1">
          Enter a valid email address to continue.
        </p>
      )}
      {/* Only show password error after email is resolved */}
      {!errors.email && errors.password && (
        <p role="alert" className="text-[13px] text-red-500 mt-1">
          Password must be at least 8 characters.
        </p>
      )}
    

## Rationale
A wall of simultaneous errors overwhelms users and increases abandonment. Users perceive a long error list as 'this form is broken' and disengage. Incremental guidance — fixing one thing, seeing progress, fixing the next — is a proven completion strategy used by onboarding flows at Stripe, Linear, and Notion. The severity ordering ensures users tackle the blocking issue (e.g., invalid email format) before optional warnings (e.g., password strength).

## Applies To
Any form with multi-field validation — registration, checkout, settings, profile update — where more than one field can fail simultaneously.

## Counter Example
A form that renders 6 red error messages all at once on first submit — the user sees a 'wall of red' and cannot identify where to start.
