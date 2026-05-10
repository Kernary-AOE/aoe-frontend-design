# DesignMdFrontMatter [rule] v1.0.0
> Every design.md file must begin with YAML front matter declaring at minimum: project name, persona archetype, and 3-5 aesthetic keywords. A design.md without front matter cannot be reliably indexed, queried, or referenced by an AI agent.
domain: frontend-design

## Severity
warning

## Required Fields
- name: (project or component name)
- persona: (one of: brutalist | editorial | tokyo-minimal | warm-institutional | dense-pragmatist | swiss-modernist | custom)
- keywords: [list of 3-5 aesthetic descriptors]

## Optional Fields
- version: (semver)
- status: (draft | validated | archived)
- created-at: (ISO date)
