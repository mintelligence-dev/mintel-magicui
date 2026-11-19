// Reads the CHANGELOG.md files written by Changesets (build time) and merges them by version.
import { readFileSync } from "node:fs"
import { join } from "node:path"

export type ChangeKind = "major" | "minor" | "patch" | "breaking"
export type PackageKey = "tokens" | "registry" | "salesforce"

export type Release = {
  version: string
  date?: string
  packages: { key: PackageKey; groups: { kind: ChangeKind; items: string[] }[] }[]
}

const SOURCES: { key: PackageKey; file: string }[] = [
  { key: "registry", file: "CHANGELOG.md" },
  { key: "tokens", file: "../../packages/tokens/CHANGELOG.md" },
  { key: "salesforce", file: "../../packages/salesforce/CHANGELOG.md" },
]

const KIND: Record<string, ChangeKind> = {
  "major changes": "major",
  "minor changes": "minor",
  "patch changes": "patch",
  "breaking changes": "breaking",
}

/** "- abc1234: text" (Changesets adds the commit) or "- text"; continuation lines are joined. */
function items(block: string): string[] {
  const out: string[] = []
  for (const line of block.split("\n")) {
    if (/^- /.test(line)) out.push(line.slice(2).replace(/^[0-9a-f]{7,40}: /, "").trim())
    else if (line.trim() && out.length) out[out.length - 1] += ` ${line.trim()}`
  }
  return out
}

function parse(md: string) {
  const versions: { version: string; date?: string; groups: { kind: ChangeKind; items: string[] }[] }[] = []
  for (const chunk of md.split(/^## /m).slice(1)) {
    const [heading, ...rest] = chunk.split("\n")
    const m = heading.match(/^(\S+)(?:\s+—\s+(\d{4}-\d{2}-\d{2}))?/)
    if (!m) continue
    const groups = rest
      .join("\n")
      .split(/^### /m)
      .slice(1)
      .flatMap((g) => {
        const [title, ...body] = g.split("\n")
        const kind = KIND[title.trim().toLowerCase()]
        // Drop the "- @scope/pkg@1.2.3" lines Changesets adds for internal dependency bumps.
        const list = items(body.join("\n")).filter((x) => !/^@[\w-]+\/[\w-]+@\d/.test(x))
        return kind && list.length ? [{ kind, items: list }] : []
      })
    versions.push({ version: m[1], date: m[2], groups })
  }
  return versions
}

const semver = (v: string) => v.split(/[.-]/).map((n) => Number.parseInt(n, 10) || 0)
const newerFirst = (a: string, b: string) => {
  const [x, y] = [semver(a), semver(b)]
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return y[i] - x[i]
  return 0
}

export function readReleases(): Release[] {
  const byVersion = new Map<string, Release>()
  for (const { key, file } of SOURCES) {
    for (const v of parse(readFileSync(join(process.cwd(), file), "utf8"))) {
      const release = byVersion.get(v.version) ?? { version: v.version, date: v.date, packages: [] }
      release.date ??= v.date
      if (v.groups.length) release.packages.push({ key, groups: v.groups })
      byVersion.set(v.version, release)
    }
  }
  return [...byVersion.values()].filter((r) => r.packages.length).sort((a, b) => newerFirst(a.version, b.version))
}
