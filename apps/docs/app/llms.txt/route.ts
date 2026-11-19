// llms.txt (https://llmstxt.org): a plain-text map of the design system for AI coding assistants,
// so they pick the right component and install it the right way. Built from the same data as the docs.
import blocks from "@/registry/blocks.json"
import { CATEGORY_LABEL, CATEGORY_ORDER, itemsByCategory } from "@/lib/component-docs"
import { COMPONENT_GUIDES } from "@/lib/component-guides"
import { getDict } from "@/lib/i18n"
import { SF_GUIDES } from "@/lib/sf-guides"
import { SF_GROUP_ORDER, SF_INDEX, sfTag } from "@/lib/sf-index"
import { SF_LABELS } from "@/lib/sf-labels"
import { REGISTRY_URL, REPO_URL } from "@/lib/site"
import { abs } from "@/lib/site-pages"

export const dynamic = "force-static"

const oneLine = (s: string) => s.replace(/\s+/g, " ").trim()

/** Components the "Not for" guidance points to instead, as a short hint after the description. */
function insteadHint(avoid: { en: string; alt?: string }[] | undefined, label: (name: string) => string) {
  const alts = [...new Set((avoid ?? []).filter((l) => l.alt).map((l) => label(l.alt!)))]
  return alts.length ? ` See also: ${alts.join(", ")}.` : ""
}

export function GET() {
  const d = getDict("en")
  const sfDescriptions = d.sf.components as Record<string, string>
  const groups = itemsByCategory()
  const titleOf = (name: string) => groups.flatMap((g) => g.items).find((i) => i.name === name)?.title ?? name

  const lines: string[] = [
    "# Mintel UI",
    "",
    "> M-Intelligence's design system: brand tokens, a shadcn-compatible React component registry (`@mintel/<name>`), page sections and templates, and Lightning Web Components for Salesforce. Docs are in English and Thai (Thai pages live under /th).",
    "",
    "## How to use it",
    "",
    "- React components are installed with the shadcn CLI, not from npm. Add the registry to `components.json`:",
    "  `{ \"registries\": { \"@mintel\": \"" + REGISTRY_URL + "/{name}.json\" } }`",
    "- Install the theme once: `npx shadcn@latest add @mintel/mintel-theme`",
    "- Install a component: `npx shadcn@latest add @mintel/<name>` (it lands in `components/ui/<name>.tsx`; sections land in `components/section-*.tsx`).",
    "- Use the Mintel version of a component when one exists, instead of the stock shadcn one with the same name.",
    "- Each registry item's source and dependencies: `" + REGISTRY_URL + "/<name>.json`. Index of all items: `" + REGISTRY_URL + "/registry.json`.",
    "- Salesforce components are deployed from the repository with `npm run deploy -w @mintelligence-dev/salesforce -- --target-org <alias>`; inside the project they are used as `<c-kebab-name>`.",
    "",
    "## Guides",
    "",
    `- [Getting started](${abs("/getting-started")}): set up a Next.js app with the registry, theme, fonts and dark mode`,
    `- [Themes](${abs("/themes")}): the Mintel and Clarity themes, and a theme builder`,
    `- [Salesforce overview](${abs("/salesforce")}): tokens in LWC, rebranding standard components, the LWC list`,
    `- [Salesforce getting started](${abs("/salesforce/get-started")}): install, name-conflict check, deploy, App Builder, Experience Cloud`,
    `- [Changelog](${abs("/changelog")}): what changed in each version`,
    `- [Source code](${REPO_URL})`,
    "",
  ]

  for (const category of CATEGORY_ORDER) {
    const group = groups.find((g) => g.category === category)
    if (!group?.items.length) continue
    lines.push(`## React: ${CATEGORY_LABEL[category].en}`, "")
    for (const item of group.items) {
      const hint = insteadHint(COMPONENT_GUIDES[item.name]?.avoid, titleOf)
      lines.push(`- [${item.title}](${abs(`/components/${item.name}`)}): \`@mintel/${item.name}\`. ${oneLine(item.description)}${hint}`)
    }
    lines.push("")
  }

  lines.push("## React: Page templates", "")
  for (const b of blocks as { name: string; title: string; description: string }[]) {
    lines.push(`- [${b.title}](${abs(`/templates/${b.name}`)}): \`@mintel/${b.name}\`. ${oneLine(b.description)}`)
  }
  lines.push("")

  const sfLabelOf = (name: string) => SF_INDEX.find((c) => c.name === name)?.label ?? name
  for (const g of SF_GROUP_ORDER) {
    const items = SF_INDEX.filter((c) => c.group === g)
    if (!items.length) continue
    lines.push(`## Salesforce LWC: ${SF_LABELS.en.groups[g]}`, "")
    for (const c of items) {
      const hint = insteadHint(SF_GUIDES[c.name]?.avoid, sfLabelOf)
      lines.push(`- [${c.label}](${abs(`/salesforce/${c.name}`)}): \`<${sfTag(c.name)}>\`. ${oneLine(sfDescriptions[c.name] ?? "")}${hint}`)
    }
    lines.push("")
  }

  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } })
}
