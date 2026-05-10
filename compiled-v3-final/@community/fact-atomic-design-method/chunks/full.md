# AtomicDesignMethod [fact] v1.0.0
Brad Frost's Atomic Design (2013) decomposes UI into a 5-level hierarchy — atoms, molecules, organisms, templates, pages — modelled after chemistry. It became the dominant mental model for component-system thinking in the 2010s.
> A UI component system can be modelled as five compositional levels: Atoms (irreducible HTML elements like input, label, button), Molecules (small functional groups like a labeled input), Organisms (composite regions like a navbar), Templates (page-level skeletons), and Pages (templates with real content).

## Confidence
strong

## Applies To
- component library architecture
- design-system documentation structure
- design-token cascade boundaries
- naming conventions for files and Storybook hierarchy

## Quantitative
- **Levels**: 5
- **Canonical Order**: atoms → molecules → organisms → templates → pages

## Counter Conditions
- Atomic Design is a mental model, not a strict file taxonomy — many teams collapse molecules + organisms into one 'components' bucket.
- Headless / primitive libraries (Radix, Headless UI) blur the atom/molecule line — the primitive may already be a 'molecule' (e.g., Dialog).
- Token-driven systems often treat tokens as a layer below atoms, making the model effectively 6 levels.

## Sources

## Confidence
strong

## Source
- Brad Frost, 'Atomic Design' (book, 2016)
- https://atomicdesign.bradfrost.com/
- Brad Frost blog post 'Atomic Design' (2013)

## Applies To
- component library architecture
- design-system documentation structure
- design-token cascade boundaries
- naming conventions for files and Storybook hierarchy

## Quantitative
- **Levels**: 5
- **Canonical Order**: atoms → molecules → organisms → templates → pages

## Counter Conditions
- Atomic Design is a mental model, not a strict file taxonomy — many teams collapse molecules + organisms into one 'components' bucket.
- Headless / primitive libraries (Radix, Headless UI) blur the atom/molecule line — the primitive may already be a 'molecule' (e.g., Dialog).
- Token-driven systems often treat tokens as a layer below atoms, making the model effectively 6 levels.
