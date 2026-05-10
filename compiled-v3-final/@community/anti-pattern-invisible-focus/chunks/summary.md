# InvisibleFocus [anti-pattern] v1.0.0
A broader category than @community/anti-pattern-outline-suppression: the focus ring exists in CSS but is effectively invisible — too low contrast (1.5:1 against background), only 1px wide, hidden by `overflow: hidden` clipping, the same color as the element background, or covered by a sibling element. Different from outright `outline: none` because the developer thinks they 'have a focus state' but visual verification reveals nothing.
domain: accessibility
