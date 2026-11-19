import { expect, test } from "@playwright/test"

import { COMPONENTS, TEMPLATES, openPage } from "./pages"

// Not compared, because they cannot render the same way twice:
const SKIP: Record<string, string> = {
  meteors: "random positions and timing",
  marquee: "continuous scroll loop",
  "dot-pattern": "random glowing dots",
  "animated-beam": "SVG path measured from live layout during an animation",
  "aurora-text": "continuous gradient animation",
  "zoom-parallax": "scroll-driven; depends on scroll position",
  "sticky-showcase": "scroll-driven; depends on scroll position",
  "scroll-reveal-text": "scroll-driven; depends on scroll position",
  progress: "the example ticks on an interval",
  "magic-card": "spotlight follows the pointer",
}

// Extra settle time for JS-driven entrance animations that reduced motion does not cover.
const SETTLE: Record<string, number> = { chart: 1800, "number-ticker": 1500, "progress-ring": 1400, "thai-address": 500 }

for (const name of COMPONENTS) {
  for (const dark of [false, true]) {
    const label = `${name}-${dark ? "dark" : "light"}`
    test(`component ${label}`, async ({ page }) => {
      test.skip(name in SKIP, SKIP[name])
      await openPage(page, `/components/${name}`, { dark })
      const preview = page.getByRole("tabpanel").first()
      await preview.scrollIntoViewIfNeeded()
      await page.waitForTimeout(SETTLE[name] ?? 250)
      await expect(preview).toHaveScreenshot(`components/${label}.png`)
    })
  }
}

for (const name of TEMPLATES) {
  test(`template ${name}`, async ({ page }) => {
    test.skip(name === "landing-page", "marquee and animated hero")
    await openPage(page, `/templates/${name}`)
    await page.waitForTimeout(600)
    await expect(page).toHaveScreenshot(`templates/${name}.png`, {
      // The console's SLA countdown keeps ticking even with a fixed clock.
      mask: [page.getByRole("timer")],
    })
  })
}
