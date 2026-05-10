# FigmaTokensPlugin [tool] v1.0.0
Tokens Studio for Figma is the de-facto plugin for managing design tokens inside Figma and syncing them with code repositories (GitHub, GitLab, JSON files, Style Dictionary). It supports the W3C Design Tokens Community Group format draft, theme switching (light/dark/brand), and round-trip editing between Figma and Git.
domain: design-system

signature: (figmaFile: FigmaFileId, options: TokensPluginOptions) -> { tokens: TokenSet, syncStatus: SyncResult }

## External
true

## Package
Figma plugin: Tokens Studio for Figma (formerly Figma Tokens)

## Capabilities
- Define tokens in Figma: colors, typography, spacing, radii, shadows, opacity, composition tokens
- Token references and aliases (semantic → primitive)
- Theme/brand variants with `$themes` configuration
- Sync to GitHub/GitLab/Bitbucket/Azure DevOps via personal access token
- Export to: JSON (DTCG format), Style Dictionary, Tailwind config, CSS variables
- Apply tokens to Figma layers as styles or variables (Figma Variables API since 2023)
- Math/expressions: `{spacing.base} * 2` resolves at build time

## Output Type
- **Tokens**: TokenSet
- **FileExports**: ExportArtifact[] // generated CSS/JS/JSON fi
- **SyncStatus**:
  - **Ahead**: number
  - **Behind**: number
  - **Conflicts**: ConflictInfo[]

## Usage
```
    1. Install plugin in Figma (Plugins → Tokens Studio).
    2. Create or import a token set as JSON. Recommended structure:
       - `core` (primitive palette, primitive scales)
       - `semantic` (role-named: text.primary, surface.raised)
       - `component` (button.primary.bg, card.padding-y)
       - `themes/light`, `themes/dark`
    3. Apply tokens to layers: select layer → token panel → click token name.
    4. Sync to Git:
       - Settings → Sync providers → GitHub
       - Provide PAT, repo, branch, file path (e.g. `tokens/tokens.json`)
       - Pull/push with conflict UI for round-trips
    5. In code repo, run Style Dictionary or `pnpm dlx @tokens-studio/sd` to transform JSON → CSS/iOS/Android outputs.
  
```

## External
true

## Package
Figma plugin: Tokens Studio for Figma (formerly Figma Tokens)

## Capabilities
- Define tokens in Figma: colors, typography, spacing, radii, shadows, opacity, composition tokens
- Token references and aliases (semantic → primitive)
- Theme/brand variants with `$themes` configuration
- Sync to GitHub/GitLab/Bitbucket/Azure DevOps via personal access token
- Export to: JSON (DTCG format), Style Dictionary, Tailwind config, CSS variables
- Apply tokens to Figma layers as styles or variables (Figma Variables API since 2023)
- Math/expressions: `{spacing.base} * 2` resolves at build time

## Output Type
- **Tokens**: TokenSet
- **FileExports**: ExportArtifact[] // generated CSS/JS/JSON fi
- **SyncStatus**:
  - **Ahead**: number
  - **Behind**: number
  - **Conflicts**: ConflictInfo[]

## Usage
```
    1. Install plugin in Figma (Plugins → Tokens Studio).
    2. Create or import a token set as JSON. Recommended structure:
       - `core` (primitive palette, primitive scales)
       - `semantic` (role-named: text.primary, surface.raised)
       - `component` (button.primary.bg, card.padding-y)
       - `themes/light`, `themes/dark`
    3. Apply tokens to layers: select layer → token panel → click token name.
    4. Sync to Git:
       - Settings → Sync providers → GitHub
       - Provide PAT, repo, branch, file path (e.g. `tokens/tokens.json`)
       - Pull/push with conflict UI for round-trips
    5. In code repo, run Style Dictionary or `pnpm dlx @tokens-studio/sd` to transform JSON → CSS/iOS/Android outputs.
  
```
