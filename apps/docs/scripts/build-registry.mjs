#!/usr/bin/env node
// Assembles registry.json and app/registry.css from:
//   - registry/items.json                         (component items)
//   - @mintelligence-dev/tokens/shadcn-theme.json (theme item, generated from tokens)
// Then `shadcn build` turns registry.json into public/r/*.json.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(import.meta.url)
const theme = require("@mintelligence-dev/tokens/shadcn-theme.json")
const themeIndex = require("@mintelligence-dev/tokens/themes/index.json")
const items = JSON.parse(readFileSync(join(root, "registry/items.json"), "utf8"))

// Registry dependencies on our own items must point at THIS registry by URL — a bare name like
// "button" would install shadcn's own component. Items write them as "@mintel/<name>".
const vercelProduction = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProduction ? `https://${vercelProduction}` : "http://localhost:3000")
const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL ?? `${siteUrl}/r`
const itemNames = new Set(items.map((i) => i.name))
for (const item of items) {
  item.registryDependencies = (item.registryDependencies ?? []).map((dep) => {
    if (!dep.startsWith("@mintel/")) return dep
    const name = dep.slice("@mintel/".length)
    if (!itemNames.has(name)) throw new Error(`${item.name} depends on unknown item "${name}"`)
    return `${registryUrl}/${name}.json`
  })
}

const themeItem = {
  name: "mintel-theme",
  type: "registry:theme",
  title: "Mintel Theme",
  description:
    "M-Intelligence brand theme: colors (light + dark), fonts and radius. Install this first.",
  // Safety net for apps whose globals.css lacks shadcn's base layer (Tailwind v4 borders default to currentColor).
  css: {
    "@layer base": {
      "*": { "border-color": "var(--border)" },
      // Tailwind v4 resets buttons to the default cursor.
      'button:not(:disabled), [role="button"]:not(:disabled)': { cursor: "pointer" },
    },
    // material-thin / -regular / -thick surfaces
    ...theme.css,
  },
  cssVars: {
    theme: {
      ...theme.theme,
      // Lives in `theme`, not `light`: shadcn maps every light var into @theme as `--x: var(--x)`,
      // which for a non-color var produces a self-referencing (invalid) custom property.
      "brand-gradient": "linear-gradient(135deg, var(--brand) 0%, var(--brand-accent) 100%)",
    },
    light: theme.light,
    dark: theme.dark,
  },
}

// Optional themes (packages/tokens/src/themes/*.json), each installed on top of mintel-theme. Installing one
// rewrites the app's variables, so the whole app takes that look (to switch at runtime instead, use
// tokens' themes/<id>.css with <html data-mintel-theme="<id>">).
const extraThemeItems = themeIndex
  .filter((t) => !t.base)
  .map((t) => {
    const th = require(`@mintelligence-dev/tokens/themes/${t.id}-shadcn.json`)
    return {
      name: `theme-${t.id}`,
      type: "registry:theme",
      title: `Mintel ${th.title} Theme`,
      description: `${th.description.en} Install after mintel-theme.`,
      registryDependencies: [`${registryUrl}/mintel-theme.json`],
      ...(th.squircle.length
        ? {
            css: {
              // Continuous corners where supported; rectangular surfaces only, so pills and avatars stay round.
              "@supports (corner-shape: squircle)": {
                [`:is(${th.squircle.map((slot) => `[data-slot="${slot}"]`).join(", ")})`]: { "corner-shape": "squircle" },
              },
            },
          }
        : {}),
      cssVars: { theme: th.theme, light: th.light, dark: th.dark },
    }
  })

const blocks = JSON.parse(readFileSync(join(root, "registry/blocks.json"), "utf8")).map((b) => ({
  name: b.name,
  type: "registry:block",
  title: b.title,
  description: b.description,
  dependencies: b.dependencies,
  registryDependencies: ["utils", `${registryUrl}/mintel-theme.json`, ...b.registryDependencies.map((n) => `${registryUrl}/${n}.json`)],
  files: [{ path: `registry/mintel/blocks/${b.name}.tsx`, type: "registry:page", target: `app/${b.route}/page.tsx` }],
  meta: { category: "template", route: b.route },
}))
for (const b of blocks) {
  for (const dep of b.registryDependencies.slice(2)) {
    const name = dep.split("/").pop().replace(/\.json$/, "")
    if (!items.some((i) => i.name === name)) throw new Error(`Template ${b.name} depends on unknown item "${name}"`)
  }
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "mintel",
  homepage: "https://github.com/muisurasak/mintel-ui",
  items: [themeItem, ...extraThemeItems, ...items, ...blocks],
}
writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n")

// app/registry.css: animation theme vars + keyframes that `shadcn add` would inject into a consumer's CSS.
const toCss = (obj, indent = "") =>
  Object.entries(obj)
    .map(([k, v]) =>
      typeof v === "object"
        ? `${indent}${k} {\n${toCss(v, indent + "  ")}\n${indent}}`
        : `${indent}${k}: ${v};`
    )
    .join("\n")
const themeVars = {}
const rules = {}
for (const item of items) {
  Object.assign(themeVars, item.cssVars?.theme ?? {})
  Object.assign(rules, item.css ?? {})
}
const css =
  "/* Generated by scripts/build-registry.mjs — do not edit. */\n" +
  `@theme inline {\n${Object.entries(themeVars)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n")}\n}\n\n` +
  toCss(rules) +
  "\n"
writeFileSync(join(root, "app/registry.css"), css)
// Every registry item needs an example (preview + shown code) and a docs entry.
{
  const missing = []
  const docs = readFileSync(join(root, "lib/component-docs.ts"), "utf8")
  const index = readFileSync(join(root, "examples/index.ts"), "utf8")
  for (const item of items) {
    if (!existsSync(join(root, "examples", `${item.name}.tsx`))) missing.push(`examples/${item.name}.tsx`)
    if (!index.includes(`"${item.name}":`)) missing.push(`examples/index.ts → "${item.name}"`)
    if (!new RegExp(`^  "?${item.name}"?: \\{`, "m").test(docs)) missing.push(`lib/component-docs.ts → ${item.name}`)
  }
  // shadcn's Base UI styles rewrite `asChild` to `render` on install, which breaks Radix primitives.
  const allowed = /asChild = false|asChild\?: boolean|asChild \? Slot|No asChild here/
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith(".tsx") ? [join(dir, e.name)] : []
    )
  for (const file of walk(join(root, "registry/mintel"))) {
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, n) => {
        if (/\basChild\b/.test(line) && !allowed.test(line)) missing.push(`${file.slice(root.length + 1)}:${n + 1} uses asChild`)
      })
  }
  // Scaffolds (npm run new:component / new:lwc) leave TODO markers: fine while developing, not in CI.
  for (const f of ["registry/items.json", "lib/component-docs.ts", "lib/sf-index.ts", "lib/sf-components.tsx", "lib/i18n.tsx"]) {
    readFileSync(join(root, f), "utf8")
      .split("\n")
      .forEach((line, n) => {
        if (!/TODO:/.test(line)) return
        if (process.env.CI) missing.push(`${f}:${n + 1} still has a TODO`)
        else console.warn(`! ${f}:${n + 1} still has a TODO (CI will fail)`)
      })
  }
  if (missing.length) {
    console.error(`✗ Registry checks failed:\n  ${missing.join("\n  ")}`)
    process.exit(1)
  }
}
console.log(`✓ registry.json (${registry.items.length} items), app/registry.css`)
