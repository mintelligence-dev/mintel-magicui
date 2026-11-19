import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

import { COMPONENTS, GUIDES, SF_PAGES, TEMPLATES, openPage } from "./pages"

/** Fails on serious and critical WCAG 2.1 A/AA issues; prints every finding so it can be fixed. */
async function audit(page: import("@playwright/test").Page) {
  // Entrance animations (blur-fade, staggered rows) start at hydration; let them finish first.
  await page.waitForTimeout(1200)
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    // The SLDS preview is a sandboxed srcdoc iframe of Salesforce's own markup, not our components.
    .exclude("iframe[title]")
    .analyze()
  const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical")
  const report = blocking.map((v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(" ")).slice(0, 5).join("\n  ")}`)
  expect(report, report.join("\n")).toEqual([])
}

const PAGES = [
  ...GUIDES,
  ...COMPONENTS.map((c) => `/components/${c}`),
  ...TEMPLATES.map((t) => `/templates/${t}`),
  ...SF_PAGES.map((n) => `/salesforce/${n}`),
]

for (const path of PAGES) {
  test(`a11y ${path}`, async ({ page }) => {
    await openPage(page, path)
    await audit(page)
  })
}

// Thai pages and dark mode change text and colors, so check them too (guides + a sample of components).
const SAMPLE = [...GUIDES, "/components/button", "/components/data-table", "/components/conversation", "/components/thai-address", "/components/tabs"]
// Sections sit on the page background and use brand fills, so check each in dark mode too.
for (const name of COMPONENTS.filter((c) => c.startsWith("section-"))) {
  test(`a11y dark section ${name}`, async ({ page }) => {
    await openPage(page, `/components/${name}`, { dark: true })
    await audit(page)
  })
}

for (const path of SAMPLE) {
  test(`a11y th ${path}`, async ({ page }) => {
    await openPage(page, `/th${path === "/" ? "" : path}`)
    await audit(page)
  })
  test(`a11y dark ${path}`, async ({ page }) => {
    await openPage(page, path, { dark: true })
    await audit(page)
  })
}
