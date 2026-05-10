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

## Rationale
Design documents without machine-readable front matter are browsable by humans but invisible to automated systems. The front matter is the hook that allows MCP tools (@prime-wiki/prime_query) to retrieve the right design context at generation time.

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
