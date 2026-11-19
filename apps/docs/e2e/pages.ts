import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Page } from "@playwright/test"

// Playwright runs from apps/docs (the config directory).
const root = process.cwd()
const read = (f: string) => JSON.parse(readFileSync(join(root, f), "utf8"))

export const COMPONENTS: string[] = read("registry/items.json").map((i: { name: string }) => i.name)
export const TEMPLATES: string[] = read("registry/blocks.json").map((b: { name: string }) => b.name)
// Salesforce component pages, from the lightweight index (no TSX import needed here).
export const SF_PAGES: string[] = [...readFileSync(join(root, "lib/sf-index.ts"), "utf8").matchAll(/name: "(\w+)", label/g)].map((m) => m[1])
export const GUIDES = ["/", "/getting-started", "/themes", "/components", "/templates", "/salesforce", "/salesforce/get-started", "/changelog"]

/** A fixed moment for every page, so "Today", calendars and countdowns render the same each run. */
export const FIXED_TIME = new Date("2026-11-19T10:00:00+07:00")

/** Open a docs page in a known state: light/dark, Mintel theme, fixed clock, fonts loaded. */
export async function openPage(page: Page, path: string, { dark = false } = {}) {
  await page.clock.setFixedTime(FIXED_TIME)
  await page.addInitScript((isDark) => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light")
      localStorage.removeItem("mintel-theme")
    } catch {}
  }, dark)
  await page.goto(path, { waitUntil: "networkidle" })
  await page.evaluate(() => document.fonts.ready)
}
