// Reads each LWC bundle at build time so the docs never drift from the code:
// App Builder properties and targets from js-meta.xml, public @api names and fired events from the JS.
import { readFileSync } from "node:fs"
import { join } from "node:path"

const LWC_DIR = join(process.cwd(), "../../packages/salesforce/force-app/main/default/lwc")

export type SfProperty = { name: string; type: string; label: string; default?: string; options?: string; targets: string[] }
export type SfMeta = {
  label?: string
  exposed: boolean
  targets: string[]
  formFactors: string[]
  properties: SfProperty[]
  /** @api names that are not App Builder properties (set from a parent LWC). */
  apiOnly: string[]
  events: string[]
  apex: boolean
}

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1]

export function readSfMeta(name: string): SfMeta {
  const xml = readFileSync(join(LWC_DIR, name, `${name}.js-meta.xml`), "utf8")
  let js = ""
  try {
    js = readFileSync(join(LWC_DIR, name, `${name}.js`), "utf8")
  } catch {}

  const targets = [...xml.matchAll(/<target>([^<]+)<\/target>/g)].map((m) => m[1])
  const formFactors = [...new Set([...xml.matchAll(/<supportedFormFactor type="(\w+)"/g)].map((m) => m[1]))]

  // Same property can appear in several targetConfigs: merge, keeping where it applies.
  const props = new Map<string, SfProperty>()
  for (const cfg of xml.matchAll(/<targetConfig targets="([^"]+)">([\s\S]*?)<\/targetConfig>/g)) {
    const cfgTargets = cfg[1].split(",")
    for (const p of cfg[2].matchAll(/<property\b[^>]*\/?>/g)) {
      const n = attr(p[0], "name")!
      const existing = props.get(n)
      if (existing) existing.targets.push(...cfgTargets)
      else
        props.set(n, {
          name: n,
          type: attr(p[0], "type") ?? "String",
          label: attr(p[0], "label") ?? n,
          default: attr(p[0], "default"),
          options: attr(p[0], "datasource"),
          targets: [...cfgTargets],
        })
    }
  }

  const api = [...js.matchAll(/@api\s+(?:get\s+)?(\w+)/g)].map((m) => m[1])
  const events = [...new Set([...js.matchAll(/new CustomEvent\(\s*['"]([\w-]+)['"]/g)].map((m) => m[1]))]

  return {
    label: xml.match(/<masterLabel>([^<]+)<\/masterLabel>/)?.[1],
    exposed: /<isExposed>true<\/isExposed>/.test(xml),
    targets,
    formFactors,
    properties: [...props.values()],
    apiOnly: [...new Set(api)].filter((n) => !props.has(n)),
    events,
    apex: /@salesforce\/apex\//.test(js),
  }
}

export function readSfSource(names: readonly string[]) {
  return names.flatMap((name) =>
    (["html", "js", "css"] as const).flatMap((ext) => {
      try {
        return [{ name: `${name}.${ext}`, code: readFileSync(join(LWC_DIR, name, `${name}.${ext}`), "utf8") }]
      } catch {
        return []
      }
    })
  )
}
