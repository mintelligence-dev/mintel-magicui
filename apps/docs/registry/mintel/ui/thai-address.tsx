"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Combobox } from "@/registry/mintel/ui/combobox"
import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"

// Compact dataset (public/mintel/thai-address.json): ids let the fields cascade.
type Province = [id: number, th: string, en: string]
type District = [id: number, provinceId: number, th: string, en: string]
type SubDistrict = [id: number, districtId: number, th: string, en: string, zip: string]
export type ThaiAddressData = { v: number; p: Province[]; d: District[]; s: SubDistrict[] }

export type ThaiAddressValue = {
  provinceId?: number
  districtId?: number
  subDistrictId?: number
  zip?: string
}

/** Names for the picked ids, in the chosen language. */
export type ThaiAddressNames = { province?: string; district?: string; subDistrict?: string; zip?: string }

const BANGKOK = 1
const pName = (p: Province, en: boolean) => (en ? p[2] : p[1])
const dName = (d: District, en: boolean) => (en ? d[3] : d[2])
const sName = (s: SubDistrict, en: boolean) => (en ? s[3] : s[2])
const LABELS = {
  th: {
    province: "จังหวัด",
    district: "อำเภอ",
    districtBkk: "เขต",
    subDistrict: "ตำบล",
    subDistrictBkk: "แขวง",
    zip: "รหัสไปรษณีย์",
    pick: "เลือก",
    zipHint: (n: number) => `พบ ${n} ตำบล เลือกจากรายการด้านล่าง`,
    zipNone: "ไม่พบรหัสไปรษณีย์นี้",
    loading: "กำลังโหลดข้อมูลที่อยู่...",
    failed: "โหลดข้อมูลที่อยู่ไม่สำเร็จ",
  },
  en: {
    province: "Province",
    district: "District",
    districtBkk: "District (Khet)",
    subDistrict: "Sub-district",
    subDistrictBkk: "Sub-district (Khwaeng)",
    zip: "Postal code",
    pick: "Select ",
    zipHint: (n: number) => `${n} sub-districts use this code; pick one below`,
    zipNone: "No sub-district has this postal code",
    loading: "Loading address data...",
    failed: "Could not load address data",
  },
}

// One request per URL for the whole app.
const cache = new Map<string, Promise<ThaiAddressData>>()
function loadThaiAddress(url: string) {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<ThaiAddressData>
      })
    )
    cache.get(url)!.catch(() => cache.delete(url))
  }
  return cache.get(url)!
}

/** Loads the dataset once (shared). Returns null while loading. */
export function useThaiAddressData(url = "/mintel/thai-address.json") {
  const [state, setState] = React.useState<{ data: ThaiAddressData | null; error: boolean }>({ data: null, error: false })
  React.useEffect(() => {
    let alive = true
    loadThaiAddress(url).then(
      (data) => alive && setState({ data, error: false }),
      () => alive && setState({ data: null, error: true })
    )
    return () => {
      alive = false
    }
  }, [url])
  return state
}

/** Resolve ids to names (e.g. to save or print the address). */
export function thaiAddressNames(data: ThaiAddressData, value: ThaiAddressValue, locale: "th" | "en" = "th"): ThaiAddressNames {
  const en = locale === "en"
  const p = data.p.find((x) => x[0] === value.provinceId)
  const d = data.d.find((x) => x[0] === value.districtId)
  const s = data.s.find((x) => x[0] === value.subDistrictId)
  return {
    province: p && pName(p, en),
    district: d && dName(d, en),
    subDistrict: s && sName(s, en),
    zip: value.zip,
  }
}

/**
 * Thai address fields: province → district → sub-district, with the postal code filled in. Or type the
 * postal code first: one match fills everything, several narrow the sub-district list. Bangkok uses
 * khet / khwaeng labels. The dataset loads lazily from `dataUrl` the first time a picker mounts.
 */
function ThaiAddressPicker({
  value: controlled,
  defaultValue,
  onValueChange,
  locale = "th",
  dataUrl,
  disabled,
  idPrefix = "thai-address",
  className,
}: {
  value?: ThaiAddressValue
  defaultValue?: ThaiAddressValue
  onValueChange?: (value: ThaiAddressValue, names: ThaiAddressNames) => void
  locale?: "th" | "en"
  /** Where the dataset is served. Installed by the registry at public/mintel/thai-address.json. */
  dataUrl?: string
  disabled?: boolean
  idPrefix?: string
  className?: string
}) {
  const t = LABELS[locale]
  const { data, error } = useThaiAddressData(dataUrl)
  const [uncontrolled, setUncontrolled] = React.useState<ThaiAddressValue>(defaultValue ?? {})
  const value = controlled ?? uncontrolled
  const [zipText, setZipText] = React.useState(value.zip ?? "")
  React.useEffect(() => setZipText(value.zip ?? ""), [value.zip])

  const en = locale === "en"
  const set = (next: ThaiAddressValue) => {
    if (controlled === undefined) setUncontrolled(next)
    if (data) onValueChange?.(next, thaiAddressNames(data, next, locale))
  }

  const zipMatches = React.useMemo(
    () => (data && /^\d{5}$/.test(zipText) ? data.s.filter((s) => s[4] === zipText) : []),
    [data, zipText]
  )

  const provinces = React.useMemo(() => (data ? data.p.map((p) => ({ value: String(p[0]), label: pName(p, en), keywords: [p[1], p[2]] })) : []), [data, en])
  const districts = React.useMemo(
    () =>
      data && value.provinceId
        ? data.d.filter((d) => d[1] === value.provinceId).map((d) => ({ value: String(d[0]), label: dName(d, en), keywords: [d[2], d[3]] }))
        : [],
    [data, value.provinceId, en]
  )
  const subDistricts = React.useMemo(() => {
    if (!data) return []
    // When the postal code matches several places in this district, show only those.
    const inDistrict = value.districtId ? data.s.filter((s) => s[1] === value.districtId) : zipMatches
    const list = zipMatches.length > 1 && value.districtId ? inDistrict.filter((s) => s[4] === zipText) : inDistrict
    return (list.length ? list : inDistrict).map((s) => ({
      value: String(s[0]),
      label: value.districtId ? sName(s, en) : `${sName(s, en)} · ${dName(data.d.find((d) => d[0] === s[1])!, en)}`,
      keywords: [s[2], s[3], s[4]],
    }))
  }, [data, value.districtId, zipMatches, zipText, en])

  const fromSubDistrict = (id: number): ThaiAddressValue => {
    const s = data!.s.find((x) => x[0] === id)!
    const d = data!.d.find((x) => x[0] === s[1])!
    return { provinceId: d[1], districtId: d[0], subDistrictId: s[0], zip: s[4] }
  }

  const bkk = value.provinceId === BANGKOK
  const field = "grid min-w-0 gap-1.5"
  const status = error ? t.failed : !data ? t.loading : null

  return (
    <div data-slot="thai-address" className={cn("grid gap-3 sm:grid-cols-2 [&>*]:min-w-0", className)} aria-busy={!data}>
      <div className={field}>
        <Label htmlFor={`${idPrefix}-province`}>{t.province}</Label>
        <Combobox
          id={`${idPrefix}-province`}
          locale={locale}
          options={provinces}
          value={value.provinceId ? String(value.provinceId) : undefined}
          onValueChange={(v) => set({ provinceId: Number(v) || undefined })}
          placeholder={`${t.pick}${t.province}`}
          loading={!data && !error}
          disabled={disabled || !data}
        />
      </div>
      <div className={field}>
        <Label htmlFor={`${idPrefix}-district`}>{bkk ? t.districtBkk : t.district}</Label>
        <Combobox
          id={`${idPrefix}-district`}
          locale={locale}
          options={districts}
          value={value.districtId ? String(value.districtId) : undefined}
          onValueChange={(v) => set({ provinceId: value.provinceId, districtId: Number(v) || undefined })}
          placeholder={`${t.pick}${bkk ? t.districtBkk : t.district}`}
          disabled={disabled || !value.provinceId}
        />
      </div>
      <div className={field}>
        <Label htmlFor={`${idPrefix}-sub`}>{bkk ? t.subDistrictBkk : t.subDistrict}</Label>
        <Combobox
          id={`${idPrefix}-sub`}
          locale={locale}
          options={subDistricts}
          value={value.subDistrictId ? String(value.subDistrictId) : undefined}
          onValueChange={(v) => (v ? set(fromSubDistrict(Number(v))) : set({ ...value, subDistrictId: undefined, zip: undefined }))}
          placeholder={`${t.pick}${bkk ? t.subDistrictBkk : t.subDistrict}`}
          disabled={disabled || (!value.districtId && zipMatches.length < 2)}
        />
      </div>
      <div className={field}>
        <Label htmlFor={`${idPrefix}-zip`}>{t.zip}</Label>
        <Input
          id={`${idPrefix}-zip`}
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={zipText}
          disabled={disabled || !data}
          placeholder="10200"
          aria-invalid={(/^\d{5}$/.test(zipText) && data && zipMatches.length === 0) || undefined}
          onChange={(e) => {
            const zip = e.target.value.replace(/\D/g, "").slice(0, 5)
            setZipText(zip)
            if (!data || zip.length < 5) return
            const matches = data.s.filter((s) => s[4] === zip)
            // One place: fill everything. Several in one district: fill up to the district.
            if (matches.length === 1) set(fromSubDistrict(matches[0][0]))
            else if (matches.length > 1) {
              const districtsHit = new Set(matches.map((m) => m[1]))
              const first = fromSubDistrict(matches[0][0])
              set(districtsHit.size === 1 ? { provinceId: first.provinceId, districtId: first.districtId, zip } : { zip })
            }
          }}
        />
        {zipMatches.length > 1 && !value.subDistrictId && <p className="text-xs text-muted-foreground">{t.zipHint(zipMatches.length)}</p>}
        {/^\d{5}$/.test(zipText) && data && zipMatches.length === 0 && <p className="text-xs text-destructive">{t.zipNone}</p>}
      </div>
      {status && (
        <p role="status" className={cn("text-xs sm:col-span-2", error ? "text-destructive" : "text-muted-foreground")}>
          {status}
        </p>
      )}
    </div>
  )
}

export { ThaiAddressPicker }
