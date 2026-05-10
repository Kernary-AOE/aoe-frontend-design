# PostelLaw [fact] v1.0.0
Postel's Law / Robustness Principle (Jon Postel, 1980): be conservative in what you send, be liberal in what you accept — applied to UX: tolerate varied user input formats while producing clean, consistent output.
> Jon Postel formulated this principle for TCP/IP implementations: a well-behaved system should accept a wide variety of valid and near-valid inputs without breaking, while always emitting strictly well-formed output. Applied to user interfaces, this means forms should accept common input variants (phone number formats, date spellings, case variations) and normalise them silently, rather than forcing users to conform to a rigid format — lowering entry friction without sacrificing data integrity downstream.

## Confidence
proven

## Applies To
- phone number input fields — accept any common format (dashes, spaces, parentheses) and normalise on submit
- date / time entry — accept natural language ('next Monday', 'Jan 5') alongside ISO formats
- search boxes — tolerate misspellings, partial matches, and synonyms rather than requiring exact terms
- file upload components — accept multiple variants of an expected format (csv with or without headers, different encodings)

## Counter Conditions
- Security-sensitive inputs (passwords, API keys, payment fields) must NOT silently normalise — strict input validation is required to prevent injection attacks.
- Over-liberal acceptance without feedback can confuse users who do not know their input was transformed; always surface what the system interpreted.
- Postel's Law was later criticised (Rusty Russell, 2001) in network protocol design as enabling security vulnerabilities — in UX, the tradeoff remains valid but normalization logic must be audited.
