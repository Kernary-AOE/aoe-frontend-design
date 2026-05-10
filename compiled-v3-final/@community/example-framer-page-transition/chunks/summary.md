# FramerPageTransition [example] v1.0.0
Framer's marketing site uses a two-stage page transition: outgoing content fades down (opacity 1 → 0, translateY 0 → -8px) over 280ms, immediately followed by incoming content fading up (opacity 0 → 1, translateY 12px → 0) over 360ms. Total: ~640ms with a tight 80ms overlap. Uses cubic-bezier(0.32, 0.72, 0, 1) — a custom 'long-tail decel' that feels unmistakably Framer.
domain: motion
