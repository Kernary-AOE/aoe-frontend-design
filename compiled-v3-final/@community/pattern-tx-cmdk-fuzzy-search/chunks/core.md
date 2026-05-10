# TxCmdkFuzzySearch [pattern] v1.0.0
cmdk (pacocoursey/cmdk) fuzzy search scoring constants from command-score.ts: six weights that encode specific UX priorities for match ranking — SCORE_CONTINUE_MATCH=1.0, SCORE_SPACE_WORD_JUMP=0.9, SCORE_NON_SPACE_WORD_JUMP=0.8, SCORE_CHARACTER_JUMP=0.17, SCORE_TRANSPOSITION=0.1, with multiplicative penalties for skipped chars, case mismatches, and distance-from-start.
domain: frontend-design

## Code
```
    // cmdk scoring constants — the design spec for what 'good fuzzy match' means
    var SCORE_CONTINUE_MATCH = 1,      // continuous match = full score
      SCORE_SPACE_WORD_JUMP = 0.9,     // match at word boundary after space
      SCORE_NON_SPACE_WORD_JUMP = 0.8, // match at boundary after _+.#"@ etc.
      SCORE_CHARACTER_JUMP = 0.17,     // arbitrary character jump (worst match)
      SCORE_TRANSPOSITION = 0.1,       // transposition penalty: 'ouch' > 'curtain' for 'uc'

      PENALTY_SKIPPED = 0.999,         // decay per skipped char: 'bad' > 'bard' for 'bd'
      PENALTY_CASE_MISMATCH = 0.9999,  // 'HTML' > 'haml' for 'HM' (tiny edge)
      PENALTY_DISTANCE_FROM_START = 0.9, // multiplicative per position
      PENALTY_NOT_COMPLETE = 0.99;     // 'html' > 'html5' if user types 'html'

    // Usage in cmdk — already active on Command.Item by default.
    // Override only if your domain needs different ranking intuitions.
    // Add synonyms without polluting display text:
    <Command.Item keywords={['billing', 'invoice']}>Accounts</Command.Item>
  
```

## How To Adapt
- cmdk uses these constants by default — you get them for free with Command.Item.
- Use the keywords prop on Command.Item to add synonyms without changing display text.
- For exact identifier search (UUIDs, commit hashes): drop SCORE_CHARACTER_JUMP to near zero.
- For prefix-only domains: raise PENALTY_DISTANCE_FROM_START to 0.5 to strongly penalize mid-string matches.
- PENALTY_DISTANCE_FROM_START=0.9 is multiplicative per recursion level — don't flatten to a post-hoc scaling.

## Gotchas
- keywords on an item are scored separately and the best-of is taken — 'team' matches 'Slack' but display never shows 'team'.
- PENALTY_SKIPPED threshold of 100 chars means relative ordering of SCORE_* is stable for practical inputs.
- Do not homogenize to 'substring only' — that makes ranking effectively alphabetical for common prefixes.
