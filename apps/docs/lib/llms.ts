// Builds /llms.txt and /llms-full.txt (https://llmstxt.org) from the same data as the docs pages, so AI
// coding assistants pick the right component, install it the right way and can write code with it.
import { readFileSync } from "node:fs"
import { join } from "node:path"

import blocks from "@/registry/blocks.json"
import { CATEGORY_LABEL, CATEGORY_ORDER, COMPONENT_DOCS, itemsByCategory } from "@/lib/component-docs"
import { COMPONENT_GUIDES } from "@/lib/component-guides"
import { getDict } from "@/lib/i18n"
import { SF_COMPONENTS } from "@/lib/sf-components"
import { SF_GUIDES } from "@/lib/sf-guides"
import { SF_GROUP_ORDER, SF_INDEX, sfTag } from "@/lib/sf-index"
import { SF_LABELS } from "@/lib/sf-labels"
import { readSfMeta } from "@/lib/sf-meta"
import { REGISTRY_URL, REPO_URL } from "@/lib/site"
import { abs } from "@/lib/site-pages"

type Guide = { use: { en: string; alt?: string }[]; avoid: { en: string; alt?: string }[] }

const oneLine = (s: string) => s.replace(/\s+/g, " ").trim()
const readExample = (name: string) => {
  try {
    return readFileSync(join(process.cwd(), "examples", `${name}.tsx`), "utf8")
      .replace(/@\/registry\/mintel\/(?:ui|effects|glass|motion|mobile)\//g, "@/components/ui/")
      .replace(/@\/registry\/mintel\/sections\//g, "@/components/")
      .trim()
  } catch {
    return undefined
  }
}

const groups = itemsByCategory()
const reactTitle = (name: string) => groups.flatMap((g) => g.items).find((i) => i.name === name)?.title ?? name
const sfLabel = (name: string) => SF_INDEX.find((c) => c.name === name)?.label ?? name

/** " Use for: … Not for: … (use X)." appended to a one-line entry. */
function guideInline(guide: Guide | undefined, label: (name: string) => string) {
  if (!guide) return ""
  const strip = (s: string) => s.replace(/[.:]\s*$/, "")
  const use = guide.use.map((l) => strip(l.en)).join("; ")
  // Lines with a linked alternative often end in ": use tabs."; the link label replaces that clause.
  const avoid = guide.avoid.map((l) => (l.alt ? `${strip(l.en).replace(/: use [^:]*$/, "")} (use ${label(l.alt)})` : strip(l.en))).join("; ")
  return ` Use for: ${use}. Not for: ${avoid}.`
}

function guideBlock(guide: Guide | undefined, label: (name: string) => string) {
  if (!guide) return []
  return [
    "Use it for:",
    ...guide.use.map((l) => `- ${l.en}`),
    "Not for:",
    ...guide.avoid.map((l) => (l.alt ? `- ${l.en.replace(/[.:]\s*$/, "").replace(/: use [^:]*$/, "")}. Use ${label(l.alt)} instead.` : `- ${l.en}`)),
    "",
  ]
}

/** Where an LWC can be placed, in words. */
function sfPlacement(name: string) {
  const meta = readSfMeta(name)
  const t = SF_LABELS.en
  if (!meta.exposed) return { meta, text: "Not in App Builder: compose it inside your own LWC." }
  const where = [...new Set(meta.targets.map((x) => t.targets[x] ?? x))].join(", ")
  return { meta, text: `In App Builder as "${meta.label}"; can be placed on: ${where}.` }
}

function intro(full: boolean): string[] {
  return [
    "# Mintel UI",
    "",
    "> M-Intelligence's design system: brand tokens, a shadcn-compatible React component registry (`@mintel/<name>`), page sections and templates, and Lightning Web Components for Salesforce. Docs are in English and Thai (Thai pages live under /th).",
    "",
    full
      ? `This is the full reference: props, example code and LWC properties for every component. The short index is ${abs("/llms.txt")}.`
      : `For props, example code and LWC properties of every component, read ${abs("/llms-full.txt")}.`,
    "",
    "## React: setup",
    "",
    "Components are installed as source files with the shadcn CLI. They are not an npm package.",
    "",
    "1. In a Next.js app with Tailwind CSS 4, run `npx shadcn@latest init` if there is no `components.json` yet.",
    "2. Add the registry to `components.json` (merge it with what is there):",
    "   ```json",
    `   { "registries": { "@mintel": "${REGISTRY_URL}/{name}.json" } }`,
    "   ```",
    "3. Install the theme once: `npx shadcn@latest add @mintel/mintel-theme`",
    "4. Install components, several at a time if you like: `npx shadcn@latest add @mintel/button @mintel/toast @mintel/date-picker`",
    "5. Fonts: load Manrope, Rubik and IBM Plex Sans Thai with `next/font/google`, with the CSS variables `--font-manrope`, `--font-rubik` and `--font-plex-thai`, and put the three variable classes on `<html>`.",
    "6. Toasts: render `<Toaster />` (from `@/components/ui/toast`) once in the root layout.",
    "7. Dark mode: toggle the `dark` class on `<html>`.",
    "",
    "Rules:",
    "- Files land in `components/ui/<name>.tsx`; sections land in `components/section-*.tsx`; templates land in `app/<route>/page.tsx`.",
    "- Components with state or event handlers are client components: files that use them need `\"use client\"`, as the examples show.",
    "- Icons in the examples come from `lucide-react`.",
    "- When Mintel has a component, use it instead of the stock shadcn one with the same name. For anything Mintel does not have, stock shadcn components work with the theme.",
    `- The source and dependencies of an item are at \`${REGISTRY_URL}/<name>.json\`; the index of all items is \`${REGISTRY_URL}/registry.json\`.`,
    `- Step-by-step guide: ${abs("/getting-started")}`,
    "",
    "## Salesforce: setup",
    "",
    "The Lightning Web Components are deployed from the repository (there is no managed package yet).",
    "",
    `1. \`git clone ${REPO_URL}.git && cd ${REPO_URL.split("/").pop()} && npm install\` (needs Node.js 20+ and the Salesforce CLI, \`sf\`).`,
    "2. Log in to the org: `sf org login web --alias my-org` (add `--instance-url https://test.salesforce.com` for a sandbox).",
    "3. Check for name conflicts, without writing anything: `npm run deploy:check -w @mintelligence-dev/salesforce -- --target-org my-org`. The components go into the org's default namespace, where names such as `tabs`, `path` or `kanban` may already exist.",
    "4. Deploy every component, the `c/tokens` module and the brand stylesheets: `npm run deploy -w @mintelligence-dev/salesforce -- --target-org my-org`. It runs the same check first and stops rather than overwrite a component that is not from Mintel UI.",
    "",
    "Rules:",
    "- Admins place components in Lightning App Builder or Experience Builder, where each is listed under Custom by its App Builder name (\"Mintel Kanban\"). Developers use the tag (`<c-kanban>`) inside their own LWC.",
    "- Every component carries its own styles. \"Mintel Brand Loader\" is optional: once per Lightning page, Theme = brand gives standard `lightning-*` components the Mintel brand; Theme = follow-org makes the Mintel components follow the org's SLDS 2 theme instead.",
    "- After deploying: open a page, gear icon, Edit Page, drag the component from Custom, set its properties, then Save and Activate.",
    "- On a record page, `recordId` and `objectApiName` are filled in by Salesforce; you do not enter them.",
    "- Text inside the components is Thai by default: set the Language property (`locale`) to `en` for English.",
    "- To use a component inside your own LWC, deploy Mintel UI to the org first, then reference its tag; attributes are the property names in kebab-case.",
    "- No component uses Apex; they use the UI API, so sharing and field-level security apply.",
    "- In your own LWC CSS, `@import 'c/tokens';` gives the `--mintel-*` variables.",
    `- Step-by-step guide: ${abs("/salesforce/get-started")}`,
    "",
    "## Other pages",
    "",
    `- [Themes](${abs("/themes")}): the Mintel and Clarity themes, and a theme builder`,
    `- [Salesforce overview](${abs("/salesforce")}): tokens in LWC, rebranding standard components`,
    `- [Changelog](${abs("/changelog")}): what changed in each version`,
    `- [Source code](${REPO_URL})`,
    "",
  ]
}

/** The short index: one line per component. */
export function buildLlms(): string {
  const sfDescriptions = getDict("en").sf.components as Record<string, string>
  const lines = intro(false)

  for (const category of CATEGORY_ORDER) {
    const group = groups.find((g) => g.category === category)
    if (!group) continue
    lines.push(`## React: ${CATEGORY_LABEL[category].en}`, "")
    for (const item of group.items) {
      lines.push(`- [${item.title}](${abs(`/components/${item.name}`)}): \`@mintel/${item.name}\`. ${oneLine(item.description)}${guideInline(COMPONENT_GUIDES[item.name], reactTitle)}`)
    }
    lines.push("")
  }

  lines.push("## React: Page templates", "")
  for (const b of blocks as { name: string; title: string; description: string }[]) {
    lines.push(`- [${b.title}](${abs(`/templates/${b.name}`)}): \`@mintel/${b.name}\`. ${oneLine(b.description)}`)
  }
  lines.push("")

  for (const g of SF_GROUP_ORDER) {
    const items = SF_INDEX.filter((c) => c.group === g)
    if (!items.length) continue
    lines.push(`## Salesforce LWC: ${SF_LABELS.en.groups[g]}`, "")
    for (const c of items) {
      lines.push(`- [${c.label}](${abs(`/salesforce/${c.name}`)}): \`<${sfTag(c.name)}>\`. ${oneLine(sfDescriptions[c.name] ?? "")} ${sfPlacement(c.name).text}${guideInline(SF_GUIDES[c.name], sfLabel)}`)
    }
    lines.push("")
  }
  return lines.join("\n")
}

/** The full reference: a section per component with props, example code and LWC properties. */
export function buildLlmsFull(): string {
  const sfDescriptions = getDict("en").sf.components as Record<string, string>
  const lines = intro(true)

  for (const category of CATEGORY_ORDER) {
    const group = groups.find((g) => g.category === category)
    if (!group) continue
    lines.push(`# React: ${CATEGORY_LABEL[category].en}`, "")
    for (const item of group.items) {
      const doc = COMPONENT_DOCS[item.name]
      lines.push(`## ${item.title} (\`@mintel/${item.name}\`)`, "", oneLine(item.description), "")
      lines.push(`- Install: \`npx shadcn@latest add @mintel/${item.name}\``, `- Docs: ${abs(`/components/${item.name}`)}`)
      if (item.dependencies.length) lines.push(`- npm dependencies (installed for you): ${item.dependencies.join(", ")}`)
      if (doc?.upstream) lines.push(`- Other props follow ${doc.upstream.label}: ${doc.upstream.href}`)
      lines.push("")
      lines.push(...guideBlock(COMPONENT_GUIDES[item.name], reactTitle))
      if (doc?.props?.length) {
        lines.push("Props:")
        for (const p of doc.props) lines.push(`- \`${p.name}\` (\`${p.type}\`${p.default ? `, default ${p.default}` : ""}): ${p.description.en}`)
        lines.push("")
      }
      const example = readExample(item.name)
      if (example) lines.push("Example:", "```tsx", example, "```", "")
    }
  }

  lines.push("# React: Page templates", "")
  for (const b of blocks as { name: string; title: string; description: string; route?: string; registryDependencies?: string[] }[]) {
    lines.push(`## ${b.title} (\`@mintel/${b.name}\`)`, "", oneLine(b.description), "")
    lines.push(`- Install: \`npx shadcn@latest add @mintel/${b.name}\`${b.route ? ` (creates \`app/${b.route}/page.tsx\`)` : ""}`, `- Preview: ${abs(`/templates/${b.name}`)}`, "")
  }

  for (const g of SF_GROUP_ORDER) {
    const items = SF_INDEX.filter((c) => c.group === g)
    if (!items.length) continue
    lines.push(`# Salesforce LWC: ${SF_LABELS.en.groups[g]}`, "")
    for (const c of items) {
      const { meta, text } = sfPlacement(c.name)
      const targetNames = (targets: string[]) => [...new Set(targets.map((x) => SF_LABELS.en.targets[x] ?? x))].join(", ")
      lines.push(`## ${c.label} (\`<${sfTag(c.name)}>\`)`, "", oneLine(sfDescriptions[c.name] ?? ""), "")
      lines.push(`- ${text}`, `- Docs: ${abs(`/salesforce/${c.name}`)}`)
      if (meta.formFactors.includes("Small")) lines.push("- Works in the Salesforce mobile app.")
      lines.push("")
      lines.push(...guideBlock(SF_GUIDES[c.name], sfLabel))
      if (meta.properties.length) {
        lines.push("App Builder properties (the same names are attributes in kebab-case, or `@api` properties, from a parent LWC):")
        for (const p of meta.properties) {
          const extra = [p.type, p.default ? `default ${p.default}` : "", p.options ? `options: ${p.options}` : "", `on: ${targetNames(p.targets)}`].filter(Boolean).join("; ")
          lines.push(`- \`${p.name}\` — ${p.label} (${extra})${p.description ? `. ${p.description}` : ""}`)
        }
        lines.push("")
      }
      if (meta.apiOnly.length) lines.push(`Set from a parent LWC only: ${meta.apiOnly.map((a) => `\`${a}\``).join(", ")}`, "")
      if (meta.events.length) {
        lines.push("Events:")
        for (const e of meta.events) lines.push(`- \`on${e}\`${meta.eventDetails[e] ? ` — event.detail: { ${meta.eventDetails[e].join(", ")} }` : ""}`)
        lines.push("")
      }
      const usage = SF_COMPONENTS.find((x) => x.name === c.name)?.usage
      if (usage) lines.push("Usage:", "```html", usage.trim(), "```", "")
    }
  }
  return lines.join("\n")
}
