# `sources/` — Plan §4.3 source sets

Lane **L13-F** · 2026-08-29

`../prime-corpus.yaml` declares, under `sources:`, the six source sets this corpus
**already carries** — where each came from, its licence, its attribution
obligation, and its unit count. Those units live in `../primes-v3/sources/@<ns>/`.

This directory is the other half of §4.3: the standing record for legacy units the
corpus does **not** carry, so that "absent" is a decision with a reason attached
rather than a gap somebody later reads as an oversight.

| file | what it is |
|---|---|
| `intake.yaml` | machine-readable standing disposition per action, with the counts and the blockers |
| `REJECTED.md` | the 1669 units that cannot be taken in, grouped by licence, each with the reason |
| `intake/legacy-unmapped-triage.csv` | all 2734 candidate units, one row each, with licence verdict, nearest shipped unit, and disposition |
| `intake/bundle-only-triage.csv` | the 698 shipped units with no legacy ancestor, with their provenance verdict |

The reasoning, the evidence and the sampling behind every disposition:
`../../../docs/analysis/corpus-reconciliation/UNMAPPED-VERDICT.md`.

## How intake works

Nothing here is hand-maintained. Regenerate after the reconciliation manifest
changes:

```bash
export PATH="$HOME/.bun/bin:$PATH"
cd /Users/houxianchao/Desktop/prime
python3 docs/analysis/corpus-reconciliation/tools/measure2.py      # writes /tmp/l13f/legacy_best.json
python3 docs/analysis/corpus-reconciliation/tools/measure3.py      # writes /tmp/l13f/content_best.json
python3 docs/analysis/corpus-reconciliation/tools/disposition.py   # writes this directory
```

Every disposition is a pure function of `(tree, namespace, source.license,
content cosine to the nearest shipped unit)`. If a unit's disposition looks wrong,
the fix is to the licence data or the scoring, not to the CSV.

## Taking a unit in

Absorbing an `ABSORB` candidate is three coupled edits, and doing fewer than three
produces a half-migration:

1. Translate the legacy YAML dialect into `.prime`. They are not interchangeable —
   legacy uses `claim:` / `anatomy:` / `verify_by:` / `severity:`, `.prime` uses
   `statement:` / `observations:` / `implications:`. A legacy file dropped into
   `../primes-v3/sources/` does not parse.
2. Add or extend a `sources:` entry in `../prime-corpus.yaml` carrying the unit's
   licence and attribution. `license.policy.requireDeclared` is `true`: a unit no
   set claims cannot be published.
3. Regenerate the bundle so the unit compiles **and its licence reaches the
   compiled `atom.yaml`**. This step is not optional. Today 0 of the 899 compiled
   artifacts carry a licence, which is why 12 GPL-3.0-derived units passed a
   `policy.deny` that lists GPL-3.0 — see `REJECTED.md` §3.

Step 1 alone would add unparsed files plus undeclared licence obligation. Do the
three together, per source set, or not at all.
