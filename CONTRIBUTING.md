# Contributing to Mintel UI

How to add or change a component, a token or the docs. The build checks most of these rules, so a missing
piece fails `npm run build` with a message that names the file.

## Set up

```bash
npm install
npm run dev        # builds tokens + registry, starts the docs at http://localhost:3000
```

Needs Node.js 20 or later. Docker is only needed for the Playwright checks on a Mac.

## Where things live

| Path | What |
| --- | --- |
| `packages/tokens/src/tokens.json` | The one source of colors, fonts, radius, motion. Everything in `dist/`, `lwc/`, `salesforce/` is generated |
| `packages/tokens/src/themes/*.json` | Themes (overrides only), e.g. Clarity |
| `apps/docs/registry/mintel/**` | React component sources (what `shadcn add` copies into an app) |
| `apps/docs/registry/items.json`, `blocks.json` | Registry entries for components and page templates |
| `apps/docs/examples/` | One example per component: the docs preview and the code sample |
| `apps/docs/lib/component-docs.ts` | Thai descriptions, props tables, New/Updated badges |
| `apps/docs/lib/component-guides.ts`, `sf-guides.ts` | "When to use / Not for" |
| `packages/salesforce/force-app/main/default/lwc/` | Lightning Web Components |
| `apps/docs/lib/sf-index.ts`, `sf-components.tsx` | The LWC list for the docs: label, group, usage, preview |
| `apps/docs/lib/i18n.tsx` | UI text and LWC descriptions, English and Thai |

Generated files are committed: `packages/tokens/{dist,lwc,salesforce}`, `apps/docs/public/r`,
`apps/docs/registry.json`, `apps/docs/app/registry.css`, and the copies under `packages/salesforce`.
Run `npm run build` and commit what changed; CI fails if they are stale.

## Add a React component

```bash
npm run new:component -- rating --title "Rating" --category forms
```

Categories: `core` (default), `forms`, `data`, `navigation`, `effects`, `glass`, `motion`, `mobile`.
The script creates the component, its example, the registry entry, the docs entry with a New badge and a
changeset, each with a `TODO` to fill in. `npm run dev` warns about TODOs that are left; CI fails on them.

Then:

1. Write the component in `apps/docs/registry/mintel/<folder>/<name>.tsx`.
2. In `registry/items.json`, list npm packages under `dependencies` and other Mintel items under
   `registryDependencies` as `@mintel/<name>` (they become absolute URLs at build time). Pin a major version
   when a newer major would break the code, as `data-table` does.
3. Keyframes and custom utilities go in the item's `css` field, not in a global stylesheet, so they are
   installed with the component.
4. Make the example show the component in real use. It is the preview on the docs page and the code people
   copy, and it is what `/llms-full.txt` gives AI assistants.
5. Fill in the Thai description and the props table in `lib/component-docs.ts`. Document the props Mintel
   adds or changes; link to the primitive's docs with `upstream` for the rest.
6. If people could confuse it with another component, add an entry to `lib/component-guides.ts`.
7. `npm run build`, then commit the generated `public/r/<name>.json` and `registry.json`.

Rules for component code:

- **Colors come from tokens** (`bg-brand`, `text-muted-foreground`, `border`), never hex values, so themes
  and dark mode work.
- **Motion** uses the brand springs (`ease-spring-snappy`, `ease-spring-smooth`, `ease-spring-bouncy`) and
  must stop under `prefers-reduced-motion` (`motion-reduce:` or `motion-safe:`).
- **No `asChild` in registry sources.** shadcn's Base UI styles rewrite it to `render` on install, which
  breaks Radix primitives. The build rejects it.
- **No clock or randomness during render** (`new Date()`, `Math.random()`): the docs are prerendered. Read
  the clock after mount, and generate sample data from the index.
- **Accessible by default:** every control has a name, keyboard works, focus is visible. Text on a colored
  background must reach 4.5:1.
- Thai text must fit: do not fix heights on elements that hold text.

## Add a Lightning Web Component

```bash
npm run new:lwc -- caseSummary --label "Case Summary" --group record
```

Groups: `record` (default), `display`, `forms`, `chat`, `site`. The script creates the bundle with a jest
test, and the docs entries (index, usage and preview, English and Thai descriptions, New badge, changeset).

Rules:

- **The description in `js-meta.xml` starts with `[Mintel UI]`.** `npm run deploy` uses it to tell our
  components from someone else's with the same name, and refuses to overwrite theirs.
- **No Apex.** Use the UI API wire adapters (`getRecord`, `getRelatedListRecords`, `getObjectInfo`,
  `updateRecord`, GraphQL), so sharing and field-level security apply.
- **Names carry no `mintel` prefix** (`slaTimer`, not `mintelSlaTimer`); the namespace is the prefix. The
  `masterLabel` is `Mintel <Label>`, and the label in `lib/sf-index.ts` must match it without "Mintel".
- **Styles:** start the CSS with `@import 'c/tokens';` and use `--mintel-*` variables only. End with a
  `prefers-reduced-motion: reduce` block that turns animations off.
- **Text** has Thai and English (`locale` property, Thai by default), as the other components do.
- **Give App Builder properties a `description`** when the value has a format or must be an API name. The
  docs page and `/llms-full.txt` show it.
- **Tests:** cover what the component decides (states, parsing, events), not just that it renders.
- **Docs preview:** a React component that mirrors the LWC's markup. When the LWC changes, change the
  preview too.
- **Check it in an org** before calling it done. Never deploy to a customer's org to try something:
  use a sandbox, scratch org or Developer Edition you own. Run `npm run deploy:check` first.

## Change a token or a theme

Edit `packages/tokens/src/tokens.json` (or a file in `src/themes/`), run `npm run build`, and commit the
generated outputs. A color change needs a look at contrast in both light and dark; the axe check in CI
catches most failures.

## Checks before a pull request

```bash
npm run build                                   # tokens, registry, docs; also the completeness checks
npm test                                        # LWC jest tests + deploy guard tests
npm run typecheck -w docs
npm run test:e2e:docker -w docs -- e2e/a11y.spec.ts       # axe on every page (CI runs this)
npm run test:e2e:docker -w docs -- e2e/visual.spec.ts     # visual regression (not in CI; run for UI changes)
```

If a visual change is intended, re-render the baselines with `--update-snapshots` and commit them.

## Changesets, commits and pull requests

- Every pull request that changes what people install adds a changeset: `npx changeset` (the scaffold
  scripts write one for you). List **every** package the change touches: `docs` for the registry and site,
  `@m-intelligence/salesforce` for LWC, `@m-intelligence/tokens` for tokens. See
  [.changeset/README.md](.changeset/README.md).
- Code comments, commit messages and pull requests are in English.
- Open pull requests against `main`. Merges to `main` deploy the docs to production.
- Releases: `npm run version-packages`, a "Release x.y.z" pull request merged with a merge commit, then a
  `v<version>` tag and a GitHub release from the changelog.
