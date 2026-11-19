#!/usr/bin/env node
// Deploys force-app to an org only if none of our LWC names are already taken by someone else's component.
//
// Without a package, our bundles go into the org's default namespace (c), where generic names such as
// tabs, path, kanban or timeline may already exist. A bundle counts as ours when its description starts
// with "[Mintel UI]" (every js-meta.xml in this project does); those are updated, anything else stops
// the deploy and nothing is written.
//
//   npm run deploy -- --target-org my-org            check, then deploy
//   npm run deploy -- --target-org my-org --check    check only
import { execFileSync } from "node:child_process"
import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const MARKER = "[Mintel UI]"
const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const lwcDir = join(root, "force-app/main/default/lwc")

const args = process.argv.slice(2)
const orgIndex = args.findIndex((a) => a === "--target-org" || a === "-o")
const org = orgIndex >= 0 ? args[orgIndex + 1] : undefined
const checkOnly = args.includes("--check")
const fromJson = args.includes("--from-json") ? args[args.indexOf("--from-json") + 1] : undefined
if (!org && !fromJson) {
  console.error("Usage: npm run deploy -- --target-org <alias> [--check]")
  process.exit(2)
}

const ours = readdirSync(lwcDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)

/** Existing bundles in the default namespace with one of our names. */
function existingBundles() {
  if (fromJson) return JSON.parse(execFileSync("cat", [fromJson], { encoding: "utf8" }))
  const names = ours.map((n) => `'${n}'`).join(",")
  const query = `SELECT DeveloperName, Description FROM LightningComponentBundle WHERE NamespacePrefix = null AND DeveloperName IN (${names})`
  const out = execFileSync("sf", ["data", "query", "--use-tooling-api", "--json", "--target-org", org, "--query", query], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  })
  return JSON.parse(out).result.records
}

const existing = existingBundles()
const conflicts = existing.filter((r) => !(r.Description ?? "").startsWith(MARKER))
const updates = existing.length - conflicts.length

if (conflicts.length) {
  console.error(`✗ ${org ?? "org"} already has components with these names that are not Mintel UI:`)
  for (const c of conflicts) console.error(`  - c:${c.DeveloperName}${c.Description ? ` (${c.Description})` : ""}`)
  console.error("Nothing was deployed. Rename or remove those components, or install Mintel UI as a package (namespace mintel).")
  process.exit(1)
}

console.log(`✓ No conflicts: ${ours.length} Mintel UI components (${updates} already in the org will be updated).`)
if (checkOnly || fromJson) process.exit(0)

const deployArgs = ["project", "deploy", "start", "--source-dir", "force-app", ...args.filter((a) => a !== "--check")]
execFileSync("sf", deployArgs, { cwd: root, stdio: "inherit" })
