# @mintelligence-dev/tokens

## 0.2.1 — 2026-11-20

No changes in this release.

## 0.2.0 — 2026-11-20

### Minor Changes

- 00c5e7c: Mintel LWC can follow the org's SLDS 2 theme: Brand Loader gets a Theme property (brand or follow-org), the new mintelFollowOrg stylesheet maps the components to the SLDS 2 global styling hooks, and class="mintel-follow-org" opts in a single component. Without the opt-in nothing changes. Also fixes the Brand Loader, which threw an error and never loaded the brand stylesheet after the components were renamed.

## 0.1.0 — 2026-11-19

### Minor Changes

- First version of the design tokens: one DTCG source (`src/tokens.json`) generates CSS variables, a Tailwind v4 theme, a shadcn theme, JS tokens, the LWC module `c/tokens` and the SLDS styling-hook stylesheet `mintelGlobal`. (#1, #2)
- Motion and glass tokens: durations, easings, spring curves (`--ease-spring-snappy`, `--ease-spring-smooth`, `--ease-spring-bouncy`) and blur levels; all motion is off under reduced motion. (#1, #19)
- Themes: the Clarity theme next to the default Mintel theme, built to `dist/themes/<id>.css`, `<id>-shadcn.json`, `all.css` and `index.json`. (#5, #6)
- Accessible colors: muted text `#646775`, success `#137038`, warning `#A14A08`, destructive `#B91C1C`, dark brand `#8DB6F2`, dark destructive `#F87171`, so text on cards and badges meets WCAG AA. (#10)
- **Changed:** the light `info` color is now `#0E7490` (was cyan 600, `#0891B2`) for 4.5:1 contrast on light backgrounds. (#20)
