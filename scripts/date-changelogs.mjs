#!/usr/bin/env node
// Adds the release date to new version headings in the package CHANGELOG.md files:
// "## 0.2.0" becomes "## 0.2.0 — 2026-11-20" (Asia/Bangkok). Already dated headings are left alone.
import { existsSync, readFileSync, writeFileSync } from "node:fs"

const FILES = ["packages/tokens/CHANGELOG.md", "packages/salesforce/CHANGELOG.md", "apps/docs/CHANGELOG.md"]
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok" }).format(new Date())

for (const file of FILES) {
  if (!existsSync(file)) continue
  const before = readFileSync(file, "utf8")
  const after = before.replace(/^## (\d+\.\d+\.\d+(?:-[\w.]+)?)[ \t]*$/gm, `## $1 — ${today}`)
  if (after !== before) writeFileSync(file, after)
}
