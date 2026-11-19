#!/usr/bin/env node
// Builds the compact Thai address dataset used by the thai-address-picker item and the mintelThaiAddress LWC.
// Source: https://github.com/kongvut/thai-province-data (MIT), files api/latest/{province,district,sub_district}.json.
// Usage: node scripts/build-thai-address.mjs <dir with the three source files>
//
// Output shape (arrays keep it small; ids let the UI cascade):
//   { v, p: [[id, th, en]], d: [[id, provinceId, th, en]], s: [[id, districtId, th, en, zip]] }
import { readFileSync, writeFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const src = process.argv[2]
if (!src) throw new Error("Pass the directory that holds province.json, district.json and sub_district.json")
const load = (f) => JSON.parse(readFileSync(join(src, f), "utf8")).filter((x) => !x.deleted_at)
const byThai = (a, b) => a[a.length === 3 ? 1 : 2].localeCompare(b[b.length === 3 ? 1 : 2], "th")

const p = load("province.json").map((x) => [x.id, x.name.th, x.name.en]).sort(byThai)
const d = load("district.json").map((x) => [x.id, x.province_id, x.name.th, x.name.en]).sort(byThai)
const s = load("sub_district.json")
  .map((x) => [x.id, x.district_id, x.name.th, x.name.en, String(x.zip_code ?? "")])
  .sort(byThai)

const data = JSON.stringify({ v: 1, source: "kongvut/thai-province-data (MIT)", p, d, s })
const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const targets = [
  join(root, "public/mintel/thai-address.json"),
  join(root, "../../packages/salesforce/force-app/main/default/staticresources/mintelThaiAddress.json"),
]
for (const t of targets) writeFileSync(t, data + "\n")
console.log(`✓ ${p.length} provinces, ${d.length} districts, ${s.length} sub-districts (${Math.round(data.length / 1024)} KB)`)
