# FAQ — corpus-specific questions

15 questions teams have asked before deciding whether to use this
corpus. For protocol-level FAQ (lexer, semantics, etc.), see the
system repo's docs.

---

### 1 · What's a persona, exactly?

A persona is a **typed atom** that captures a coherent visual
aesthetic — color palette, typography choices, density, layout
preferences, motion language — in one declaration. The agent adopts a
persona wholesale (not piecemeal) when generating output.

Concretely, a persona has:

- `school:` — a short ID (e.g. `magazine-editorial`)
- `implies:` — visual decisions returned as structured JSON
- `composition:` — must-include / must-avoid contract
- `compatible:` / `conflicts:` — relationship edges to other personas
- `example-brands:` — public brand references

There are 31 personas in this corpus. See [`personas.md`](personas.md).

### 2 · Do I have to use all 31 personas?

No. The retrieval algorithm picks **one** persona per brief based on
the task taxonomy's `default_register_pool`. Most briefs touch 1–3
personas total in their lifetime.

If you want a smaller subset, fork the corpus and delete the personas
you don't want. The retrieval algorithm degrades gracefully: with 5
personas you'd see less variety in output, but everything still
works. With 0 personas the register axis falls back to a default
(notion-warm).

### 3 · Can I use only the security atoms?

Yes — the 32 security atoms in `@community/<rule|principle|pattern|
anti-pattern|fact>-*-{security|csp|xss|csrf|...}.prime` are
self-contained. They're tagged `domain: security` so the
DomainRegistry boosts them on security briefs.

That said, if your use case is *only* security, fork to
`prime-corpus-security` rather than carrying the entire 899-atom
frontend-design corpus.

### 4 · How is this different from a Tailwind preset?

A Tailwind preset is a **single fixed taste** — one set of color
tokens, one spacing scale, one font choice. This corpus is a **graph
of choices the agent picks from based on brief**:

| | Tailwind preset | This corpus |
|---|---|---|
| Personas / aesthetics | 1 | 31 |
| Task taxonomy | None | 30 task types in 5 families |
| Retrieval algorithm | None (designer chooses tokens manually) | 6-axis structured retrieval |
| Composition contract | None | must-include / must-avoid / typography_required |
| Validator | None | L1 + L2 + L3 |
| Edge graph | None | ~3,500 edges across 14 verbs |

You can use both: keep Tailwind for the build-time token system, use
this corpus for the agent-time aesthetic decisions.

### 5 · How is this different from a shadcn template?

A shadcn template is a **single component implementation** — `Button`
with one variant, `Toast` with one variant. This corpus is the
**design knowledge** that informs implementations across many
component libraries:

- shadcn-Toast is one *implementation* of `pattern-toast-stack`.
- Radix-Toast is another implementation of the same pattern.
- `template-spring-config` supplies-to both.

The corpus and shadcn coexist. You can author atoms that reference
shadcn (and we have one: `template-shadcn-pricing-toggle`).

### 6 · How do I add my brand?

Two options:

**a)** **Brand persona in `@community/persona-<your-brand>.prime`** — if
your brand is publicly visible enough that observable design
characteristics can be cited from public web pages. Follow
[`extending.md` § Adding a new persona](extending.md).

**b)** **Private team scope `@<yourteam>/`** — if your brand isn't
public or you want internal-only. Author atoms under your scope and
keep them in a fork. The retrieval system supports any namespace.

### 7 · Do I have to use the MCP tools, or can I read atoms directly?

Both work. The MCP tools are for agents (Claude Code, etc.) that
need conversational interaction with the corpus. Direct atom reading
is for:

- IDE plugins that show atom previews
- Build-time tooling that compiles personas into design-token files
- Custom retrievers (your own scoring algorithm)

The atoms are just files. `compiled-v3-final/` has the projection
artifacts. Read what you need.

### 8 · Why is the chunker bug story still in the docs?

Because it's the most instructive failure of this project. The
benchmark data said "Prime is winning" while users said "the output
looks worse than Skill". We almost dismissed user feedback in favor
of the data. Investigating revealed `persona-editorial.prime` source
was 1841 B, but the projected `chunks/full.md` was 286 B — a stub.
The projection layer was silently truncating the persona's structured
fields (`implies`, `palette`, `prohibitions`, `body`).

Fixing the chunker (no prompt change, no atom change) flipped the
visual quality reversal in one benchmark run. The lesson encoded in
the docs:

> **Visual difference = content difference = projection difference.
> Architecture being right is necessary but not sufficient.**

### 9 · Why are there only 5 MCP tools and not 17?

Skill ecosystem-style "many small tools" was rejected as a design
choice. Reasoning:

- 5 tools map cleanly onto the 5 pipeline layers.
- Each tool has rich, parameterized input (e.g. `prime_query` has 7
  scopes); the semantic richness is in parameters, not tool count.
- Agents struggle with tool discovery once tool count > ~8. 5 keeps
  the decision tree tractable.

Adding new tools is a system-repo decision, not a corpus decision.

### 10 · Why isn't there an `npm install prime-corpus-frontend-design`?

ROADMAP § 8 (system repo) covers the registry / publish work. Today
the corpus is consumed by:

- `git clone` + boot the MCP server locally
- The `compiled-v3-final/` artifact directly (point your tool at it)
- `prime install --remote <url>` (registry round-trip exists at
  v1.13)

A real npm package once the registry is GA.

### 11 · How do I run the benchmarks myself?

The bench-v2 harness lives in `benchmarks/`:

```bash
cd benchmarks/

# One task end-to-end on prime condition
bun run scripts/run-task.ts \
  --task 09-blog-article \
  --condition prime \
  --output-dir results/2026-05-XX/

# N=3 for noise estimate
bash scripts/run-noise.sh 09-blog-article prime 3
```

You'll need API keys for the LLM the agent runs (`ANTHROPIC_API_KEY`
or whichever) and for the optional L2 validator
(`DEEPSEEK_API_KEY` or similar — L2 skips cleanly without a key).

### 12 · The validator says "unverifiable" on most of my must-include atoms. Is that bad?

`unverifiable` is a deliberate verdict. It means "we don't have a
signature mapping AND noun-keyword check is ambiguous; we can't tell
if the atom was honored or not". It counts as **pass** (no false
positives).

If you're seeing too many `unverifiable` in your output, it's because
the atoms you're including don't have signatures in the L3 library
yet. The fix is usually: extend `ATOM_SIGNATURES` in
`packages/validator/src/l3-composition.ts` to add a signature for the
atom-id pattern. ROADMAP § 6 plans expansion to ~60 patterns.

### 13 · Why is the L2 validator opt-in?

Cost. L2 makes one LLM call per validation. At DeepSeek prices that's
~$0.0008, but if you run benchmarks N=3 across 20 tasks, that's
$0.05 per condition. We chose opt-in to keep the default zero-cost
mode useful.

ROADMAP § 8 plans to make L2 default once a per-layer cheap-model
registry is built into the runtime.

### 14 · The intent classifier picked the wrong persona for my brief. How do I debug?

Three options, in order of effort:

**a)** **Use `prime_intent` directly** to inspect the IntentObject. If
the `register_candidates` are wrong, the YAML's
`default_register_pool` for that task type is the place to look.

**b)** **Pass `persona_school` explicitly** in the legacy
`skip_intent=true` mode if you want to override the classifier.

**c)** **Add a trigger keyword** to the relevant taxonomy YAML and
re-test. The classifier learns from `trigger_keywords:` but doesn't
fine-tune; you have to author the keywords by hand.

If the classifier is consistently wrong on briefs that should be
routed differently, file an issue tagged `intent-misroute` with the
brief, the expected route, and the actual route.

### 15 · Can I use this corpus with a different LLM than Claude?

In principle yes — the MCP server speaks the standard MCP protocol,
and the atoms are markdown / JSON. Any agent runtime that supports
MCP (Claude Code, Cursor, Continue.dev, …) can consume the tools.

In practice, every benchmark run has been on `claude-opus-4-7[1m]`.
ROADMAP § 2 plans a cross-LLM matrix; results pending. Be cautious
calling this "model-agnostic" until that data exists.

For LLM-side specifics:

- **Claude (Opus / Sonnet / Haiku)**: tested. The five MCP tools work
  natively in Claude Code.
- **GPT-4o**: untested but should work via Continue.dev or
  Cursor's MCP support.
- **Gemini Flash**: untested. The intent classifier has DeepSeek and
  Anthropic paths; Gemini would need a small adapter.
- **Open-source models**: untested. The schema-validation cost may
  exceed inference savings for sub-7B models.

---

For the broader project FAQ (history, philosophy, comparison with
Skill ecosystem), see the system repo's `PHILOSOPHY.md` and
`PRIME-VS-SKILLS.md`.
