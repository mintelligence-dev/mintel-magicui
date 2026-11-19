# Changesets

Every pull request that changes what people install (tokens, registry components, LWC) adds a changeset:

```bash
npx changeset
```

Pick the packages it touches and the bump:

| Package | What it covers |
| --- | --- |
| `@mintelligence-dev/tokens` | Design tokens and their generated outputs (CSS, Tailwind, shadcn, LWC, themes) |
| `docs` | The shadcn registry (`@mintel/*` components, sections, templates) and the docs site |
| `@mintelligence-dev/salesforce` | Lightning Web Components, static resources, deploy scripts |

- **patch**: fixes and small visual changes
- **minor**: new components, props or tokens (while the version is 0.x, also anything that breaks)
- **major**: reserved for after 1.0

The three packages share one version (`fixed`), so a release is a single number for the whole design system.

## Releasing

```bash
npm run version-packages   # applies the changesets, bumps versions, writes CHANGELOG.md files and dates them
```

Open a pull request with the result. After it is merged, tag the release (`v<version>`) and create the
GitHub release from the CHANGELOG entries. The docs site shows them at /changelog.
