# HoverFocusAnimationParity [rule] v1.0.0
When a card lifts 4px on :hover, keyboard-focused cards must also lift 4px. When a button darkens and scales on :hover, the same must happen on :focus-visible. The focus-visible outline or ring is required but is NOT a substitute for the hover motion — it is additive. Motion feedback communicates 'this element is interactive and responding to your attention.'
> Every CSS animation or transition applied on :hover must also be applied identically on :focus-visible — keyboard users must receive the same visual motion feedback as mouse users, not just a static outline.
domain: frontend-design
