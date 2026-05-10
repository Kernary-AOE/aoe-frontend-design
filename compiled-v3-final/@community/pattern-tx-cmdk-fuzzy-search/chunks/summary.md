# TxCmdkFuzzySearch [pattern] v1.0.0
cmdk (pacocoursey/cmdk) fuzzy search scoring constants from command-score.ts: six weights that encode specific UX priorities for match ranking — SCORE_CONTINUE_MATCH=1.0, SCORE_SPACE_WORD_JUMP=0.9, SCORE_NON_SPACE_WORD_JUMP=0.8, SCORE_CHARACTER_JUMP=0.17, SCORE_TRANSPOSITION=0.1, with multiplicative penalties for skipped chars, case mismatches, and distance-from-start.
domain: frontend-design
