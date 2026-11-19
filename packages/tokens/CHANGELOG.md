# @mintelligence-dev/tokens

## 0.1.0 — 2026-11-19

### Minor Changes

- First version of the design tokens: one DTCG source (`src/tokens.json`) generates CSS variables, a Tailwind v4 theme, a shadcn theme, JS tokens, the LWC module `c/tokens` and the SLDS styling-hook stylesheet `mintelGlobal`. (#1, #2)
- Motion and glass tokens: durations, easings, spring curves (`--ease-spring-snappy`, `--ease-spring-smooth`, `--ease-spring-bouncy`) and blur levels; all motion is off under reduced motion. (#1, #19)
- Themes: the Clarity theme next to the default Mintel theme, built to `dist/themes/<id>.css`, `<id>-shadcn.json`, `all.css` and `index.json`. (#5, #6)
- Accessible colors: muted text `#646775`, success `#137038`, warning `#A14A08`, destructive `#B91C1C`, dark brand `#8DB6F2`, dark destructive `#F87171`, so text on cards and badges meets WCAG AA. (#10)
- **Changed:** the light `info` color is now `#0E7490` (was cyan 600, `#0891B2`) for 4.5:1 contrast on light backgrounds. (#20)
