#!/usr/bin/env node
// Scaffolds a Lightning Web Component: the bundle, a jest test and every docs entry the build checks for.
//
//   npm run new:lwc -- caseSummary --label "Case Summary" --group record
//
// Groups: record (default), display, forms, chat, site.
// Everything it writes is marked TODO; CI fails while a TODO is left in the docs data.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const docs = join(root, "apps/docs")
const lwc = join(root, "packages/salesforce/force-app/main/default/lwc")
const args = process.argv.slice(2)
const flag = (name) => (args.includes(`--${name}`) ? args[args.indexOf(`--${name}`) + 1] : undefined)
const name = args.find((a) => !a.startsWith("--") && a !== flag("label") && a !== flag("group"))
const group = flag("group") ?? "record"
const GROUPS = ["record", "display", "forms", "chat", "site"]

if (!name || !/^[a-z][a-zA-Z0-9]*$/.test(name) || !GROUPS.includes(group)) {
  console.error(`Usage: npm run new:lwc -- <camelCaseName> [--label "Readable Name"] [--group ${GROUPS.join("|")}]`)
  process.exit(2)
}

const pascal = name[0].toUpperCase() + name.slice(1)
const label = flag("label") ?? pascal.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
const tag = `c-${name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`
const dir = join(lwc, name)
if (existsSync(dir)) {
  console.error(`✗ ${name} already exists in packages/salesforce`)
  process.exit(1)
}

const edit = (p, fn) => {
  const file = join(docs, p)
  const before = readFileSync(file, "utf8")
  const after = fn(before)
  if (after === before) throw new Error(`Could not find where to add "${name}" in ${p}`)
  writeFileSync(file, after)
}

// 1. The bundle. The description must start with "[Mintel UI]": npm run deploy uses it to tell our
//    components from other people's with the same name.
mkdirSync(join(dir, "__tests__"), { recursive: true })
writeFileSync(
  join(dir, `${name}.js`),
  `import { LightningElement, api } from 'lwc';

/** TODO: one sentence on what ${label} is for. No Apex: use the UI API wire adapters. */
export default class ${pascal} extends LightningElement {
    @api recordId;
    @api label = '${label}';
}
`
)
writeFileSync(
  join(dir, `${name}.html`),
  `<template>
    <section class="root">
        <h2 class="title">{label}</h2>
        <slot></slot>
    </section>
</template>
`
)
writeFileSync(
  join(dir, `${name}.css`),
  `@import 'c/tokens';

:host {
    display: block;
}

.root {
    padding: 1rem 1.25rem;
    border: 1px solid var(--mintel-border);
    border-radius: calc(var(--mintel-radius) + 4px);
    background: var(--mintel-card);
    color: var(--mintel-card-foreground);
    font-family: var(--mintel-font-sans);
}

.title {
    margin: 0;
    font-family: var(--mintel-font-heading);
    font-size: 1rem;
    font-weight: 600;
}

/* Any animation you add must stop here. */
@media (prefers-reduced-motion: reduce) {
    .root {
        animation: none;
        transition: none;
    }
}
`
)
writeFileSync(
  join(dir, `${name}.js-meta.xml`),
  `<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>62.0</apiVersion>
    <isExposed>true</isExposed>
    <masterLabel>Mintel ${label}</masterLabel>
    <description>[Mintel UI] TODO: what ${label} does.</description>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
        <target>lightning__HomePage</target>
    </targets>
    <targetConfigs>
        <targetConfig targets="lightning__RecordPage,lightning__AppPage,lightning__HomePage">
            <property name="label" type="String" label="Heading" default="${label}" />
            <supportedFormFactors>
                <supportedFormFactor type="Large" />
                <supportedFormFactor type="Small" />
            </supportedFormFactors>
        </targetConfig>
    </targetConfigs>
</LightningComponentBundle>
`
)
writeFileSync(
  join(dir, "__tests__", `${name}.test.js`),
  `import { createElement } from 'lwc';
import ${pascal} from 'c/${name}';

describe('${tag}', () => {
    afterEach(() => {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });

    it('shows the heading', () => {
        const el = createElement('${tag}', { is: ${pascal} });
        el.label = 'Hello';
        document.body.appendChild(el);
        expect(el.shadowRoot.querySelector('.title').textContent).toBe('Hello');
    });
});
`
)

// 2. Docs: index (name, label, group), page entry (usage + preview), descriptions (EN/TH), New badge.
const before = (anchor, insert) => (s) => (s.includes(anchor) ? s.replace(anchor, `${insert}${anchor}`) : s)
edit("lib/sf-index.ts", before(`  { name: "brandLoader",`, `  { name: "${name}", label: "${label}", group: "${group}" },\n`))
edit(
  "lib/sf-components.tsx",
  before(
    `  {\n    name: "brandLoader",`,
    `  {
    name: "${name}",
    group: "${group}",
    usage: \`<${tag} record-id={recordId} label="${label}"></${tag}>\`,
    // TODO: a React preview that mirrors the LWC (see components/sf-new-previews.tsx).
    preview: <p className="rounded-xl border bg-card px-5 py-4 font-heading font-semibold">${label}</p>,
  },
`
  )
)
edit("lib/i18n.tsx", (s) => {
  const en = `      brandLoader:\n        "Invisible helper`
  const th = `      brandLoader:\n        "ตัวช่วยที่มองไม่เห็น`
  if (!s.includes(en) || !s.includes(th)) return s
  return s
    .replace(en, `      ${name}: "TODO: what ${label} does, where it gets its data and what it needs.",\n${en}`)
    .replace(th, `      ${name}: "TODO: คำอธิบายภาษาไทยของ ${label}",\n${th}`)
})
edit("lib/component-docs.ts", before(`  "sf:quickActions": "new",`, `  "sf:${name}": "new",\n`))

// 3. The changeset.
writeFileSync(
  join(root, `.changeset/lwc-${name}.md`),
  `---\n"@mintelligence-dev/salesforce": minor\n"docs": patch\n---\n\nNew LWC: ${label} (\`<${tag}>\`). TODO: one sentence for the changelog.\n`
)

console.log(`✓ Scaffolded <${tag}> ("Mintel ${label}", group: ${group})

  packages/salesforce/force-app/main/default/lwc/${name}/   bundle + jest test
  apps/docs/lib/sf-index.ts          name, label, group
  apps/docs/lib/sf-components.tsx    usage snippet + docs preview
  apps/docs/lib/i18n.tsx             description (EN and TH)
  apps/docs/lib/component-docs.ts    New badge
  .changeset/lwc-${name}.md

Next: fill in every TODO, then
  npm test                           jest
  npm run dev                        docs page at http://localhost:3000/salesforce/${name}
See CONTRIBUTING.md for the rules (no Apex, tokens, reduced motion, checking in an org).`)
