# ConsistentProductTerminology [rule] v1.0.0
> The same concept or product entity must use the same word or phrase everywhere in the product. Using different words for the same thing in different screens (e.g. 'workspace' in one place and 'project' in another for the same entity) is prohibited.
domain: frontend-design

## Severity
warning

## Applies When
Writing any UI copy, navigation labels, headings, or empty states.

## Verify By
Maintain a shared terminology glossary. Audit copy for synonym drift — search the codebase for alternate terms for each core entity.

## Anti Pattern
Copy is often written piecemeal by different contributors without a shared glossary, causing 'workspace' / 'project' / 'space' to refer to the same concept in different parts of the UI. Users must then resolve whether two terms are the same thing, increasing cognitive load.

## Use Instead
Define each core entity name once in a terminology glossary and enforce it across all copy.

## Severity
warning

## Applies When
Writing any UI copy, navigation labels, headings, or empty states.

## Verify By
Maintain a shared terminology glossary. Audit copy for synonym drift — search the codebase for alternate terms for each core entity.

## Anti Pattern
Copy is often written piecemeal by different contributors without a shared glossary, causing 'workspace' / 'project' / 'space' to refer to the same concept in different parts of the UI. Users must then resolve whether two terms are the same thing, increasing cognitive load.

## Use Instead
Define each core entity name once in a terminology glossary and enforce it across all copy.
