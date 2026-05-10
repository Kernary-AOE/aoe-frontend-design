# EditorialInvestigative [voice] v1.0.0
The voice used in investigative reporting and longform features. Sourced, specific, predominantly past tense, attribution-heavy, allergic to adjectives that smuggle in opinion. Sounds like NYT, The Atlantic, ProPublica, Bellingcat.
domain: longform-journalism

## Label
Editorial Investigative

## Tone
measured + sourced + present-by-implication

## Emphasis
what is documented → who said so → when → what records show

## Emotional Arc
curious → mounting weight of evidence → conclusion the reader reaches before the writer states it

## Patterns
-
  - **Label**: Sourced statement (past tense)
  - **Template**: According to {document or named-source}, {what was found}, {when}.
  - **Example**: According to filings reviewed by The Atlantic, the company restated its revenue four times between 2019 and 2022.
-
  - **Label**: Specific number anchor
  - **Template**: {Exact number}, not {imprecise alternative the reader might assume} — a figure {context}.
  - **Example**: Forty-seven, not 'dozens' as the press release suggested — a figure the company has never publicly confirmed.
-
  - **Label**: Time-stamped sequence
  - **Template**: On {date}, {event}. Three {time-units} later, {next event}. By {final-date}, {outcome}.
  - **Example**: On March 4, the CFO resigned. Three weeks later, the auditor withdrew its opinion. By May, the stock had lost 60 percent of its value.
-
  - **Label**: Attribution rhythm
  - **Template**: {Statement}, {speaker} said in a {medium} {date or context}.
  - **Example**: The decision had been reviewed twice, the spokesperson said in an emailed statement Monday.
-
  - **Label**: Documents-show framing
  - **Template**: Internal {document-type} obtained by {outlet} show {finding}, contradicting {public claim}.
  - **Example**: Internal Slack messages obtained by ProPublica show engineers raised the safety concern in 2021, contradicting the company's public statement that the issue was discovered last month.
-
  - **Label**: Refusal-to-comment formula
  - **Template**: {Party} did not respond to {N} requests for comment, sent {dates}.
  - **Example**: The company did not respond to four requests for comment, sent between April 2 and April 18.

## Prohibitions
- Do not use unsourced adjectives ('shocking', 'devastating', 'massive') — let the numbers carry weight.
- Do not write 'many', 'several', 'numerous' when an exact count is available.
- Do not use anonymous sources without specifying why ('a person granted anonymity to discuss internal matters').
- Do not collapse a timeline — give the reader the dates.
- Do not editorialize in the voice of the reporting; conclusions emerge from the evidence stacked in order.
- Do not begin a paragraph with 'In a stunning turn' or any phrase that telegraphs reaction.

## Examples

## Compatible
- @impeccable/persona-magazine-editorial

## Conflicts
- @impeccable/voice-marketing-bold
- @impeccable/voice-casual-warm
- @impeccable/voice-brand-corporate
