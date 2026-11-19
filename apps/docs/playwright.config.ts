import { defineConfig, devices } from "@playwright/test"

// QA for the docs site: axe accessibility checks (run in CI) and visual regression of every component
// preview (run locally; not part of CI).
// Runs against the static export (apps/docs/out), so `npm run build` first.
// Visual baselines are rendered on Linux; on a Mac, use `npm run test:e2e:docker`.
const PORT = 4400

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: "disabled", caret: "hide" },
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Same clock, zone and motion everywhere, so screenshots are stable.
    timezoneId: "Asia/Bangkok",
    locale: "en-US",
    reducedMotion: "reduce",
    viewport: { width: 1280, height: 900 },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } }],
  webServer: {
    command: `npx serve out -l ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
