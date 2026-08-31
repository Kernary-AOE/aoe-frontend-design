# Scout SourceAdapter

Scout is an optional external reference catalogue under
`adapters/scout-catalog/`. Its 18 source declarations describe 61,590 normalized
references without turning those records into Corpus Units.

The payload is not committed or fetched at query time. An operator supplies a
data root. `sources.yaml` records provenance, licence text, field mapping,
declared count, and digest for each source.

No data root produces an explicit `SCOUT_DATA_ROOT_ABSENT` diagnostic and zero
references. Count or digest drift is also reported. The adapter never presents a
missing payload as an empty successful search.

Scout is a SourceAdapter because a reference result needs an external URL,
thumbnail, provenance, and licence. Kernary's in-corpus Candidate Generator
returns Unit identities and feeds projection budgeting; forcing 61,590 external
records into that contract would erase the distinction.

See `adapters/scout-catalog/README.md` for acquisition, sandbox registration,
and payload verification.
