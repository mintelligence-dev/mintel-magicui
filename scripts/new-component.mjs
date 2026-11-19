#!/usr/bin/env node
// Scaffolds a React registry component: every file and entry the build checks for.
//
//   npm run new:component -- rating --title "Rating" --category forms
//
// Categories: core (default), forms, data, navigation, effects, glass, motion, mobile.
// Everything it writes is marked TODO; CI fails while a TODO is left in the registry or docs data.
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const docs = join(root, "apps/docs")
const args = process.argv.slice(2)
const flag = (name) => (args.includes(`--${name}`) ? args[args.indexOf(`--${name}`) + 1] : undefined)
const name = args.find((a) => !a.startsWith("--") && a !== flag("title") && a !== flag("category"))
const category = flag("category") ?? "core"
const CATEGORIES = ["core", "forms", "data", "navigation", "effects", "glass", "motion", "mobile"]

if (!name || !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name) || !CATEGORIES.includes(category)) {
  console.error(`Usage: npm run new:component -- <kebab-name> [--title "Title"] [--category ${CATEGORIES.join("|")}]`)
  process.exit(2)
}

const pascal = name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())
const title = flag("title") ?? pascal.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^(\w)(.*)$/, (_, a, b) => a + b.toLowerCase())
// Core, forms, data and navigation live in ui/; the rest have their own folder and a meta.category.
const ownFolder = ["effects", "glass", "motion", "mobile"].includes(category)
const folder = ownFolder ? category : "ui"

const read = (p) => readFileSync(join(docs, p), "utf8")
const write = (p, s) => writeFileSync(join(docs, p), s)
const edit = (p, fn) => {
  const before = read(p)
  const after = fn(before)
  if (after === before) throw new Error(`Could not find where to add "${name}" in ${p}`)
  write(p, after)
}

const items = JSON.parse(read("registry/items.json"))
if (items.some((i) => i.name === name)) {
  console.error(`✗ "${name}" is already in registry/items.json`)
  process.exit(1)
}
const componentPath = `registry/mintel/${folder}/${name}.tsx`
if (existsSync(join(docs, componentPath))) {
  console.error(`✗ ${componentPath} already exists`)
  process.exit(1)
}

// 1. The component.
write(
  componentPath,
  `import * as React from "react"

import { cn } from "@/lib/utils"

/** TODO: one sentence on what ${title} is for. */
function ${pascal}({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="${name}" className={cn("rounded-xl border bg-card p-4 text-card-foreground", className)} {...props} />
}

export { ${pascal} }
`
)

// 2. The example: rendered as the docs preview and shown as the code sample.
write(
  `examples/${name}.tsx`,
  `import { ${pascal} } from "@/registry/mintel/${folder}/${name}"

export default function ${pascal}Example() {
  return <${pascal}>${title}</${pascal}>
}
`
)
edit("examples/index.ts", (s) => {
  const imports = [...s.matchAll(/^import \w+ from "\.\/[\w-]+"\n/gm)]
  const last = imports[imports.length - 1]
  const at = last.index + last[0].length
  const withImport = `${s.slice(0, at)}import ${pascal}Example from "./${name}"\n${s.slice(at)}`
  return withImport.replace(/\n}\s*$/, `\n  "${name}": ${pascal}Example,\n}\n`)
})

// 3. The registry item.
items.push({
  name,
  type: "registry:ui",
  title,
  description: `TODO: what ${title} does, in one sentence.`,
  registryDependencies: ["utils"],
  files: [{ path: componentPath, type: "registry:ui" }],
  ...(ownFolder ? { meta: { category } } : {}),
})
write("registry/items.json", `${JSON.stringify(items, null, 2)}\n`)

// 4. Docs data: category (for ui/ items), the New badge, the Thai description and props.
edit("lib/component-docs.ts", (s) => {
  let out = s
  const SETS = { forms: "FORM_ITEMS", data: "DATA_ITEMS", navigation: "NAV_ITEMS" }
  if (SETS[category]) out = out.replace(new RegExp(`(const ${SETS[category]} = new Set\\(\\[)`), `$1"${name}", `)
  out = out.replace(/(export const BADGES: Record<string, "new" \| "updated"> = \{\n)/, `$1  "${name}": "new",\n`)
  return out.replace(
    /\n}\s*$/,
    `\n  "${name}": {\n    th: "TODO: คำอธิบายภาษาไทยของ ${title}",\n    // props: [p("name", "type", "English description.", "คำอธิบายไทย", "default")],\n  },\n}\n`
  )
})

// 5. The changeset.
writeFileSync(join(root, `.changeset/${name}.md`), `---\n"docs": minor\n---\n\nNew component: ${title} (\`@mintel/${name}\`). TODO: one sentence for the changelog.\n`)

console.log(`✓ Scaffolded @mintel/${name} (${category})

  apps/docs/${componentPath}            the component
  apps/docs/examples/${name}.tsx        preview + code sample
  apps/docs/registry/items.json         registry entry (description, dependencies)
  apps/docs/lib/component-docs.ts       Thai description, props, New badge
  .changeset/${name}.md

Next: fill in every TODO, then
  npm run dev                           preview at http://localhost:3000/components/${name}
  npm run build                         regenerates public/r/${name}.json (commit it)
See CONTRIBUTING.md for the rest (when-to-use guidance, checks before a pull request).`)
