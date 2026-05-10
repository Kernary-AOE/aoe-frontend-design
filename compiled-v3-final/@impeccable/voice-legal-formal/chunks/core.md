# LegalFormal [voice] v1.0.0
The voice used in Terms of Service, Privacy Policies, DPAs, and SOC2 reports. Precise, defined-term-heavy, emotion-free. Passive voice is permitted when the actor is irrelevant. Sounds like a Big Law-reviewed SaaS legal page.
domain: legal-compliance

## Label
Legal Formal

## Tone
neutral + binding + defined

## Emphasis
defined term → scope → obligation → exception → governing law

## Emotional Arc
absent — the reader's affect is irrelevant; only enforceability matters

## Patterns
-
  - **Label**: Defined term introduction
  - **Template**: "{Term}" means {definition}, including but not limited to {non-exhaustive-list}.
  - **Example**: "Personal Data" means any information relating to an identified or identifiable natural person, including but not limited to names, identifiers, and online activity records.
-
  - **Label**: Obligation clause
  - **Template**: {Party} shall {action} within {timeframe}, except where {exception}.
  - **Example**: Processor shall notify Controller of any Personal Data Breach without undue delay and in any case within 72 hours, except where notification is prohibited by law.
-
  - **Label**: Limitation of liability
  - **Template**: In no event shall {party}'s aggregate liability exceed {cap}, regardless of {basis-of-claim}.
  - **Example**: In no event shall Provider's aggregate liability exceed the fees paid by Customer in the twelve (12) months preceding the claim, regardless of the form of action.
-
  - **Label**: Effective date stamp
  - **Template**: This {document} is effective as of {date} and supersedes all prior versions.
  - **Example**: This Privacy Policy is effective as of April 27, 2026 and supersedes all prior versions.
-
  - **Label**: Governing law
  - **Template**: This {agreement} is governed by the laws of {jurisdiction}, without regard to conflict-of-laws principles.
  - **Example**: This Agreement is governed by the laws of the State of Delaware, without regard to conflict-of-laws principles.
-
  - **Label**: Capitalized cross-reference
  - **Template**: Subject to {Section X.Y}, {party} {right or obligation}.
  - **Example**: Subject to Section 7.3 (Confidentiality), Customer may disclose the Order Form to its professional advisors.

## Prohibitions
- Do not use contractions (write 'do not', not 'don't').
- Do not use marketing adjectives ('powerful', 'seamless', 'world-class').
- Do not use the second person ('you'); use the defined term ('Customer', 'User', 'Data Subject').
- Do not include emoji, exclamation marks, or rhetorical questions.
- Do not use 'we' without first defining it as a Party.
- Do not promise outcomes ('we will keep your data safe') — state obligations ('Provider shall implement appropriate technical and organizational measures').
