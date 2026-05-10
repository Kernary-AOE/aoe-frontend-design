# InformativeImageAlt [rule] v1.0.0
Images that convey meaning or information must have descriptive `alt` text explaining their content or function; decorative images must use `alt=''` to hide them from assistive technology.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
critical

## Common Failures
- alt='image' or alt='photo' — describes medium not content
- alt='IMG_4872.jpg' — filename is not a description
- Omitting alt entirely — different from alt=''
- Redundant alt that duplicates adjacent caption text — doubles screen reader output
