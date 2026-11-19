# Mintel UI

Design system ของ [M-Intelligence](https://m-intelligence.tech) สำหรับงาน open source ของบริษัท:
brand tokens ชุดเดียวใช้ได้ทั้ง **React** และ **Salesforce LWC** พร้อม **animated components**
ที่ติดตั้งผ่าน [shadcn registry](https://ui.shadcn.com/docs/registry).

The M-Intelligence design system: one set of brand tokens for React and Salesforce LWC, plus animated,
brand-ready components distributed as a shadcn-compatible registry.

```
src/tokens.json ──build──► CSS variables · Tailwind v4 theme · JS · shadcn theme
                       └─► LWC CSS module · SLDS styling hooks
```

| Package | What it is | How you get it |
|---|---|---|
| [`packages/tokens`](packages/tokens) | `@mintelligence-dev/tokens` — colors, fonts, radius (light + dark) | npm (planned) / copy files |
| [`apps/docs`](apps/docs) | Docs site + shadcn registry (`public/r/*.json`) | `npx shadcn add <url>` |

## Use it in React / Next.js

Requires a project set up with Tailwind v4 and shadcn (`npx shadcn@latest init`).

```bash
# 1. Brand theme (colors light/dark, fonts, radius) → written into your globals.css
npx shadcn@latest add https://raw.githubusercontent.com/mintelligence-dev/mintel-magicui/main/apps/docs/public/r/mintel-theme.json

# 2. Any component — the source is copied into your project, edit freely
npx shadcn@latest add https://raw.githubusercontent.com/mintelligence-dev/mintel-magicui/main/apps/docs/public/r/shimmer-button.json
```

**Components**

- Core: `button` (incl. `brand` gradient variant), `badge`, `card`, `input`
- Animated (adapted from [Magic UI](https://magicui.design)): `shimmer-button`, `aurora-text`,
  `animated-gradient-text`, `magic-card`, `border-beam`, `shine-border`, `number-ticker`, `meteors`,
  `marquee`, `dot-pattern`, `blur-fade`, `animated-beam`

All default colors point at brand tokens (`--brand`, `--brand-accent`, `--brand-cyan`, `--brand-gradient`),
so components follow the theme — including dark mode — without passing colors.

Brand fonts are **Manrope** (Latin) + **IBM Plex Sans Thai** (Thai), headings in **Rubik**. Load them with
`next/font` or `@import "@mintelligence-dev/tokens/fonts.css"`.

## Use it in Salesforce (LWC)

See [`packages/tokens/README.md`](packages/tokens/README.md#salesforce-lwc). In short:

```css
/* force-app/main/default/lwc/myCard/myCard.css */
@import 'c/mintelTokens';

.cta {
  background-image: var(--mintel-brand-gradient);
  color: var(--mintel-brand-foreground);
  border-radius: var(--mintel-radius);
}
```

## Develop

```bash
npm install
npm run dev        # builds tokens + registry, starts docs on http://localhost:3000
npm run build      # tokens → registry.json → public/r/*.json → static docs (apps/docs/out)
```

- Change colors/fonts only in `packages/tokens/src/tokens.json`, then `npm run build`.
- Add a component: put the file in `apps/docs/registry/mintel/{ui,magicui}/`, add an entry to
  `apps/docs/registry/items.json`, run `npm run build`.
- Generated files (`packages/tokens/{dist,lwc,salesforce}`, `apps/docs/public/r`, `registry.json`)
  are committed so they can be used straight from GitHub; CI fails if they are stale.

## License

[MIT](LICENSE) © M Intelligence Co., Ltd. Animated components are adapted from Magic UI (MIT) — see
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
