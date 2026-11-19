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
| [`apps/docs`](apps/docs) | Docs site (English `/`, Thai `/th`) + shadcn registry (`public/r/*.json`) | `npx shadcn add <url>` |
| [`packages/salesforce`](packages/salesforce) | SFDX project: LWC tokens, SLDS hooks static resource, branded LWC | `sf project deploy start` |

## Use it in React / Next.js

Requires a project set up with Tailwind v4 and shadcn (`npx shadcn@latest init`).
`<docs-domain>` is wherever the docs site is deployed (e.g. the Vercel production URL) — the registry JSON is
served from its `/r` path.

```bash
# 1. Brand theme (colors light/dark, fonts, radius) → written into your globals.css
npx shadcn@latest add https://<docs-domain>/r/mintel-theme.json

# 2. Any component — the source is copied into your project, edit freely
npx shadcn@latest add https://<docs-domain>/r/shimmer-button.json
```

**Components** (45 registry items)

| Category | Items |
|---|---|
| Theme | `mintel-theme` — install first |
| Core UI | `button`, `badge`, `card`, `input`, `dialog`, `select`, `table`, `tabs`, `toast` (sonner — render `<Toaster />` once, then call `toast()`), `dropdown-menu`, `tooltip`, `popover` |
| Forms | `label`, `textarea`, `checkbox`, `radio-group`, `switch`, `form` (react-hook-form + zod), `combobox` (searchable, multiple, async), `calendar` + `date-picker` (Thai, พ.ศ. by default; values stay JS `Date`) |
| Effects | `shimmer-button`, `aurora-text`, `animated-gradient-text`, `magic-card`, `border-beam`, `shine-border`, `number-ticker`, `meteors`, `marquee`, `dot-pattern`, `blur-fade`, `animated-beam` |
| Glass | `glass-card` (optional refraction), `glass-button`, `glass-navbar`, `segmented-control` |
| Fluid Motion | `scroll-reveal-text`, `sticky-showcase`, `zoom-parallax`, `dock`, `animated-tabs` |
| Mobile | `drawer` (bottom sheet, drag to dismiss), `tab-bar` |

All default colors point at brand tokens (`--brand`, `--brand-accent`, `--brand-cyan`, `--brand-gradient`),
so components follow the theme — including dark mode — without passing colors.

**Mobile web & accessibility** — the docs site is checked at 390px with touch emulation, in WebKit
(iPhone 15 profile) and with 4× CPU throttling. Not yet tested on real devices, Firefox or the Salesforce Mobile App.

- Add `viewport-fit=cover` to your viewport meta so `drawer`, `tab-bar` and `glass-navbar` can pad for the
  notch / home indicator (`env(safe-area-inset-*)`).
- Small controls get a ≥ 44px hit area on touch screens without changing their visual size.
- All animations respect `prefers-reduced-motion`; glass falls back to a solid surface for
  `prefers-reduced-transparency` and browsers without `backdrop-filter`.
- Glass refraction only runs on Chromium with a mouse. Don't animate content behind glass on touch devices
  (backdrop blur is recomputed every frame).

Brand fonts are **Manrope** (Latin) + **IBM Plex Sans Thai** (Thai), headings in **Rubik**. Load them with
`next/font` or `@import "@mintelligence-dev/tokens/fonts.css"`.

## Use it in Salesforce

[`packages/salesforce`](packages/salesforce) is a deployable SFDX project: the `c/tokens` CSS module, the
`mintelGlobal` static resource (SLDS styling hooks that rebrand standard `lightning-*` components) and branded LWC
(`glassCard`, `shimmerButton`, `gradientText`, `statCard`, `brandLoader`).

```bash
sf project deploy start --source-dir packages/salesforce/force-app --target-org my-org
```

The docs site has a Salesforce guide (`/salesforce`, Thai at `/th/salesforce`) with a live before/after preview of
real SLDS components. Details: [`packages/salesforce/README.md`](packages/salesforce/README.md).

## Develop

```bash
npm install
npm run dev        # builds tokens + registry, starts docs on http://localhost:3000
npm run build      # tokens → registry.json → public/r/*.json → static docs (apps/docs/out)
```

- Change colors/fonts only in `packages/tokens/src/tokens.json`, then `npm run build`.
- Add a component: put the file in `apps/docs/registry/mintel/{ui,effects,glass,motion}/`, add an entry to
  `apps/docs/registry/items.json`, run `npm run build`.
- Generated files (`packages/tokens/{dist,lwc,salesforce}`, `apps/docs/public/r`, `registry.json`)
  are committed; CI fails if they are stale.

### Quality checks (CI)

- `npm test`: LWC unit tests (jest).
- `npm run test:a11y -w docs`: axe on every docs page (EN, plus TH and dark mode for a sample). CI fails on
  serious or critical WCAG 2.1 AA issues.
- Visual regression: every component preview (light and dark) and every template is compared with the
  baselines in `apps/docs/e2e/__screenshots__`. Baselines are rendered on Linux, so on a Mac run them in
  Docker after `npm run build`:

  ```bash
  npm run test:e2e:docker -w docs                          # compare
  npm run test:e2e:docker -w docs -- --update-snapshots    # accept intended visual changes
  ```

  The spec lists the few previews that are skipped (random or scroll-driven effects) and why.

## Deploy (Vercel)

- Import the repo, set **Root Directory** to `apps/docs` (framework: Next.js). Build and install commands can stay
  default — npm workspaces are detected from the repo root.
- The site is a static export; the registry is served at `https://<domain>/r/<item>.json`.
- Install commands on the site use the production domain automatically (`NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`).
  Set `NEXT_PUBLIC_SITE_URL` when you add a custom domain.
- `npx shadcn add` must be able to fetch `/r/*.json` without logging in: keep the production deployment public
  (Vercel Authentication protects preview URLs by default).

## License

[MIT](LICENSE) © M Intelligence Co., Ltd. Third-party licenses: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
