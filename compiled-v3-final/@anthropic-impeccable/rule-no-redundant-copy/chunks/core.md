# NoRedundantCopy [rule] v1.0.0
> Every word in a UI must earn its place. Heading text must not be restated in the first paragraph. Button labels must not repeat what the heading already says. Intro copy that explains what a page already shows through its content is redundant and should be removed.
domain: frontend-design

## Label
UI Copy Must Not Repeat Information the User Can Already See

## Detection
- An intro paragraph immediately below a page heading that restates the heading topic
- A modal title and modal body that express the same sentence in two formulations
- A button label that duplicates the action already described by the form heading it submits
- A tooltip on a self-descriptive icon button that only says the button's label text
- A card header and card description that describe the same feature with different words

## Remediation
- Apply the 'say it once' rule: if the heading already communicates X, the body should communicate Y, not X again.
- Delete intro paragraphs on pages with clear headings — test if the page loses information. It usually does not.
- For button labels: 'Save changes' is already the entire information — a tooltip saying 'Save your changes' is noise.
- Check every modal: if the title says 'Delete project?', the body should explain consequences, not rephrase the question.
