# ConfirmBeforeApplyingTheme [rule] v1.0.0
> Never apply a visual theme to an artifact until the user has explicitly confirmed their theme choice by naming a specific theme or number in the same exchange. Applying an assumed or inferred theme wastes user time and damages trust.
domain: frontend-design

## Severity
warning

## Applies When
Applying a visual theme to any artifact on behalf of a user.

## Verify By
The user has said a specific theme name or number and confirmed the choice. An ambiguous request ('make it look nicer') is not a theme confirmation.

## Sources

## Rationale
Theme changes are high-visibility and high-effort to reverse. Applying the wrong theme, even once, signals that the agent is not listening carefully — the cost of confirmation is negligible compared to the cost of correction and the trust damage.

## Severity
warning

## Applies When
Applying a visual theme to any artifact on behalf of a user.

## Verify By
The user has said a specific theme name or number and confirmed the choice. An ambiguous request ('make it look nicer') is not a theme confirmation.
