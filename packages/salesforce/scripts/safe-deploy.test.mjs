// Checks the conflict rule of safe-deploy.mjs with canned org results (no org needed).
import { execFileSync } from "node:child_process"
import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const script = fileURLToPath(new URL("./safe-deploy.mjs", import.meta.url))
const dir = mkdtempSync(join(tmpdir(), "safe-deploy-"))
const run = (records) => {
  const file = join(dir, `${Math.random()}.json`)
  writeFileSync(file, JSON.stringify(records))
  try {
    execFileSync("node", [script, "--from-json", file], { stdio: "pipe" })
    return 0
  } catch (e) {
    return e.status
  }
}

const cases = [
  ["empty org", [], 0],
  ["our earlier deploy", [{ DeveloperName: "tabs", Description: "[Mintel UI] Tabs with a spring-animated indicator." }], 0],
  ["someone else's tabs", [{ DeveloperName: "tabs", Description: "Account tabs" }], 1],
  ["someone else's path without description", [{ DeveloperName: "path", Description: null }], 1],
]
let failed = 0
for (const [name, records, expected] of cases) {
  const code = run(records)
  const ok = code === expected
  if (!ok) failed++
  console.log(`${ok ? "✓" : "✗"} safe-deploy: ${name} → exit ${code}`)
}
process.exit(failed ? 1 : 0)
