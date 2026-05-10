# MotionAsFeedback [fact] v1.0.0
Effective UI motion communicates state changes and causality (something happened, something moved here from there) rather than serving as decoration. Motion divorced from state is overhead — perceived cost without functional return.
> Animation in production UI must communicate one of: (a) cause-and-effect (clicking here triggered that), (b) origin / continuity (this panel came from that button), (c) state change (saved, loading, errored), or (d) spatial relationship (this is below, this opens upward) — animation that does none of these is decorative overhead.

## Confidence
strong

## Applies To
- motion design decisions on every interactive component
- audit: any animation that doesn't pass the 'what state did this change' test
- modal open / close, drawer slide, dropdown reveal
- list reorder, item add / remove, optimistic update confirmation
- form save / validation feedback

## Counter Conditions
- Brand-expressive marketing motion (hero animations) trades the rule for emotional value — an explicit decision, not the default.
- Loading / progress animations communicate 'still working' which is itself state — they pass the test.
- Idle / micro-interactions can be decorative if they're rare and short, but should not be the rule.

## Sources

## Confidence
strong

## Source
- Pasquale D'Silva, 'Transitional Interfaces' (2013)
- Material Design Motion principles — 'meaningful movement, useful and intentional'
- Apple HIG — Motion section ('use motion to clarify, not decorate')
- Val Head, 'Designing Interface Animation' (Rosenfeld, 2016)

## Applies To
- motion design decisions on every interactive component
- audit: any animation that doesn't pass the 'what state did this change' test
- modal open / close, drawer slide, dropdown reveal
- list reorder, item add / remove, optimistic update confirmation
- form save / validation feedback

## Counter Conditions
- Brand-expressive marketing motion (hero animations) trades the rule for emotional value — an explicit decision, not the default.
- Loading / progress animations communicate 'still working' which is itself state — they pass the test.
- Idle / micro-interactions can be decorative if they're rare and short, but should not be the rule.
