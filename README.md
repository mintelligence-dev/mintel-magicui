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
| [`packages/tokens`](packages/tokens) | `@mintelligence-dev/tokens` — colors, fonts, radius, motion (light + dark) | Through the registry theme (`@mintel/mintel-theme`). **Not on npm yet**; see the package README |
| [`apps/docs`](apps/docs) | Docs site (English `/`, Thai `/th`) + shadcn registry (`public/r/*.json`) | `npx shadcn add @mintel/<name>` |
| [`packages/salesforce`](packages/salesforce) | SFDX project: LWC tokens, SLDS hooks static resource, branded LWC | `npm run deploy` (checks for name conflicts first) |

## Use it in React / Next.js

Docs and registry: **https://mintel-ui.vercel.app** (Thai at `/th`). Full steps, verified in a fresh Next.js
app, are in [Getting started](https://mintel-ui.vercel.app/getting-started).

Requires a project with Tailwind v4 and shadcn (`npx shadcn@latest init`). Add the registry to
`components.json`:

```json
{ "registries": { "@mintel": "https://mintel-ui.vercel.app/r/{name}.json" } }
```

```bash
# 1. Brand theme (colors light/dark, fonts, radius) → written into your globals.css
npx shadcn@latest add @mintel/mintel-theme

# 2. Any component — the source is copied into your project, edit freely
npx shadcn@latest add @mintel/button @mintel/data-table @mintel/thai-address
```

What is available:

- [Components](https://mintel-ui.vercel.app/components): core UI, forms (including Thai ID, phone and
  address), data display, navigation, glass, motion, mobile and effects.
- Page sections and [templates](https://mintel-ui.vercel.app/templates).
- [Themes](https://mintel-ui.vercel.app/themes): Mintel and Clarity, plus a theme builder.
- For AI coding assistants: [`/llms.txt`](https://mintel-ui.vercel.app/llms.txt) (index) and
  [`/llms-full.txt`](https://mintel-ui.vercel.app/llms-full.txt) (props, examples, LWC properties).

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
`next/font` (the Getting started guide has the layout code).

## Use it in Salesforce

[`packages/salesforce`](packages/salesforce) is a deployable SFDX project: the `c/tokens` CSS module, the
`mintelGlobal` static resource (SLDS styling hooks that rebrand standard `lightning-*` components) and the
Mintel LWC (record pages, KPIs, kanban, timelines, Thai address, chat, Experience Cloud sections). No Apex.

```bash
sf org login web --alias my-org
npm run deploy:check -w @mintelligence-dev/salesforce -- --target-org my-org   # name conflicts only
npm run deploy -w @mintelligence-dev/salesforce -- --target-org my-org         # checks, then deploys
```

Guide: [Salesforce getting started](https://mintel-ui.vercel.app/salesforce/get-started). Every component
has a page under [/salesforce](https://mintel-ui.vercel.app/salesforce). Details:
[`packages/salesforce/README.md`](packages/salesforce/README.md).

**Status:** the LWC are covered by jest and compile checks, but have not been verified in a real org yet.

## Develop

```bash
npm install
npm run dev        # builds tokens + registry, starts docs on http://localhost:3000
npm run build      # tokens → registry.json → public/r/*.json → static docs (apps/docs/out)
```

- Change colors/fonts only in `packages/tokens/src/tokens.json`, then `npm run build`.
- Add a component: `npm run new:component -- <name>` or `npm run new:lwc -- <name>` scaffolds every file
  and entry the build checks for. See [CONTRIBUTING.md](CONTRIBUTING.md).
- Generated files (`packages/tokens/{dist,lwc,salesforce}`, `apps/docs/public/r`, `registry.json`)
  are committed; CI fails if they are stale.

### Quality checks (CI)

- `npm test`: LWC unit tests (jest).
- `npm run test:a11y -w docs`: axe on every docs page (EN, plus TH and dark mode for a sample). CI fails on
  serious or critical WCAG 2.1 AA issues.
- Visual regression (**not run in CI**; run it locally before merging UI changes): every component preview
  (light and dark) and every template is compared with the baselines in `apps/docs/e2e/__screenshots__`.
  Baselines are rendered on Linux, so on a Mac run them in Docker after `npm run build`:

  ```bash
  npm run test:e2e:docker -w docs -- e2e/visual.spec.ts                       # compare
  npm run test:e2e:docker -w docs -- e2e/visual.spec.ts --update-snapshots    # accept intended visual changes
  ```

  The spec lists the few previews that are skipped (random or scroll-driven effects) and why.

## Versioning

Tokens, the registry and the Salesforce components share one version, managed with
[Changesets](https://github.com/changesets/changesets). Add a changeset to every pull request that changes
what people install:

```bash
npx changeset
```

`npm run version-packages` applies them, bumps the version and writes the dated `CHANGELOG.md` files that the
docs show at [/changelog](https://mintel-ui.vercel.app/changelog). See [.changeset/README.md](.changeset/README.md).

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
