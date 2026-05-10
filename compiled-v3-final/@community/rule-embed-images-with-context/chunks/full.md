# EmbedImagesWithContext [rule] v1.0.0
> Images embedded in documentation, blog posts, or content pages must always include contextual framing — at minimum an alt text describing what is shown AND a caption or surrounding copy explaining why the image is relevant. Images without contextual framing are invisible to screen readers and incomprehensible to users who cannot load them.
domain: frontend-design

## Severity
warning

## Applies When
Inserting any non-decorative image into a documentation page, blog post, or instructional content.

## Verify By
- Alt text is present and describes the content of the image (not just its filename).
- A caption or adjacent paragraph explains the relevance or takeaway of the image.
- Decorative images (visual separators, background patterns) have alt='' (empty, not absent).

## Rationale
An image with no alt text is a content void for screen reader users. An image with no contextual caption is ambiguous — the user must infer why it is there. Together, alt + context ensure the image contributes meaning to all users.

## Severity
warning

## Applies When
Inserting any non-decorative image into a documentation page, blog post, or instructional content.

## Verify By
- Alt text is present and describes the content of the image (not just its filename).
- A caption or adjacent paragraph explains the relevance or takeaway of the image.
- Decorative images (visual separators, background patterns) have alt='' (empty, not absent).
