# IosLaunchScreenMatch [rule] v1.0.0
> The launch screen must visually replicate the app's initial view rather than showing a logo or branding screen.
domain: frontend-design

## Applies To
iOS LaunchScreen.storyboard / launch screen configuration

## Examples
- Show the skeleton of the home tab (navigation bar, tab bar, placeholder rows) in the launch storyboard so the real view loads over it imperceptibly.
- Anti-example: full-screen app logo on a branded background color that disappears before the real UI appears.

## Rationale
A matched launch screen creates the perception of instant launch — the transition from launch screen to first view feels seamless. Branding/logo splash screens add artificial delay, feel dated, and are explicitly discouraged by Apple HIG Rule 8.3.

## Applies To
iOS LaunchScreen.storyboard / launch screen configuration
