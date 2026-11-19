"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, Link2, RotateCcw } from "lucide-react"

import { CodeBlock } from "@/components/code-block"
import { CopyCommand } from "@/components/copy-command"
import { installCommand } from "@/components/theme-gallery"
import { ThemeSample } from "@/components/theme-sample"
import { getDict, type Lang } from "@/lib/i18n"
import { FONT_STACKS, THEMES, contrast, mix, readableOn, themeVars, type FontChoice, type ThemeInfo } from "@/lib/style-theme"
import { cn } from "@/lib/utils"
import { SegmentedControl } from "@/registry/mintel/glass/segmented-control"
import { Label } from "@/registry/mintel/ui/label"

type State = { base: string; primary: string; accent: string; radius: number; font: "theme" | FontChoice }

const PRESETS = ["#295DA8", "#7040F2", "#0E7C86", "#1F9254", "#C2570C", "#C8325F", "#334155"]
const HEX = /^#[0-9A-F]{6}$/i

const findTheme = (id: string) => THEMES.find((t) => t.id === id) ?? THEMES[0]
const initial = (theme: ThemeInfo): State => ({
  base: theme.id,
  primary: theme.light.brand.toUpperCase(),
  accent: theme.light["brand-accent"].toUpperCase(),
  radius: Math.round(parseFloat(theme.radius) * 16),
  font: "theme",
})

/** Lighter version for dark mode, so the color still reads on a dark background. */
const forDark = (hex: string) => mix(hex, "#FFFFFF", 0.35)

/** The variables the builder changes, per mode. Everything else comes from the starting theme. */
function overrides(s: State, theme: ThemeInfo) {
  const colors = (mode: "light" | "dark") => {
    const p = mode === "light" ? s.primary : forDark(s.primary)
    const a = mode === "light" ? s.accent : forDark(s.accent)
    const out: Record<string, string> = {
      primary: p,
      "primary-foreground": readableOn(p),
      brand: p,
      "brand-foreground": readableOn(p),
      ring: p,
      "sidebar-primary": p,
      "sidebar-primary-foreground": readableOn(p),
      "sidebar-ring": p,
      info: p,
      "chart-1": p,
      "brand-accent": a,
      "brand-accent-foreground": readableOn(a),
      "chart-2": a,
    }
    // Themes whose accent surface is a tint of the brand keep that relationship.
    if (!theme.base) {
      out.accent = `${p}${mode === "light" ? "1A" : "29"}`
      out["accent-foreground"] = mode === "light" ? p : mix(p, "#FFFFFF", 0.3)
    }
    return out
  }
  const font = s.font === "theme" ? null : FONT_STACKS[s.font]
  return { light: colors("light"), dark: colors("dark"), radius: `${s.radius / 16}rem`, font }
}

function toCss(s: State, theme: ThemeInfo) {
  const o = overrides(s, theme)
  const block = (sel: string, vars: Record<string, string>) =>
    `${sel} {\n${Object.entries(vars)
      .map(([k, v]) => `  --${k}: ${v};`)
      .join("\n")}\n}`
  const parts = []
  if (o.font) parts.push(`@theme inline {\n  --font-sans: ${o.font.sans};\n  --font-heading: ${o.font.heading};\n}`)
  parts.push(block(":root", { radius: o.radius, ...o.light }))
  parts.push(block(".dark", o.dark))
  return `/* Custom theme, built on ${theme.title}. */\n${parts.join("\n\n")}\n`
}

function readHash(): Partial<State> | null {
  if (!location.hash.startsWith("#builder?")) return null
  const q = new URLSearchParams(location.hash.slice("#builder?".length))
  const out: Partial<State> = {}
  const base = q.get("base")
  if (base && THEMES.some((t) => t.id === base)) out.base = base
  for (const key of ["primary", "accent"] as const) {
    const v = `#${q.get(key) ?? ""}`
    if (HEX.test(v)) out[key] = v.toUpperCase()
  }
  const r = Number(q.get("radius"))
  if (q.has("radius") && Number.isFinite(r) && r >= 0 && r <= 24) out.radius = r
  const f = q.get("font")
  if (f && (f === "theme" || f in FONT_STACKS)) out.font = f as State["font"]
  return out
}

function ColorField({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
}) {
  const [text, setText] = useState(value)
  useEffect(() => setText(value), [value])
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {hint && <p className="-mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="size-9 shrink-0 cursor-pointer rounded-md border bg-transparent p-0.5"
        />
        <input
          id={id}
          value={text}
          spellCheck={false}
          onChange={(e) => {
            setText(e.target.value)
            const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`
            if (HEX.test(v)) onChange(v.toUpperCase())
          }}
          className="h-9 w-28 rounded-md border bg-background px-2.5 font-mono text-sm uppercase outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-label={c}
            className={cn(
              "size-6 rounded-full ring-offset-2 ring-offset-background transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              value === c && "ring-2 ring-foreground/60"
            )}
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  )
}

/** Theme builder: start from a theme, tweak colors / corners / font, preview real components, copy the CSS. */
export function ThemeBuilder({ lang, copyLabel }: { lang: Lang; copyLabel: string }) {
  const t = getDict(lang).themes
  const [state, setState] = useState<State>(() => initial(THEMES[0]))
  const [shared, setShared] = useState(false)
  const theme = findTheme(state.base)

  useEffect(() => {
    const fromHash = readHash()
    if (fromHash) setState((s) => ({ ...initial(findTheme(fromHash.base ?? s.base)), ...fromHash }))
  }, [])

  const o = useMemo(() => overrides(state, theme), [state, theme])
  const preview = (mode: "light" | "dark") => {
    const vars = themeVars(theme, mode)
    const colors = mode === "light" ? o.light : o.dark
    return {
      ...vars,
      ...Object.fromEntries(Object.entries(colors).map(([k, v]) => [`--${k}`, v])),
      "--radius": o.radius,
      "--mintel-radius": o.radius,
      ...(o.font ? { "--mintel-font-sans": o.font.sans, "--mintel-font-heading": o.font.heading } : {}),
    }
  }
  const ratio = contrast(state.primary, readableOn(state.primary))
  const css = toCss(state, theme)

  const update = (patch: Partial<State>) => setState((s) => ({ ...s, ...patch }))
  const share = async () => {
    const q = new URLSearchParams({
      base: state.base,
      primary: state.primary.slice(1),
      accent: state.accent.slice(1),
      radius: String(state.radius),
      font: state.font,
    })
    const url = `${location.origin}${location.pathname}#builder?${q}`
    history.replaceState(null, "", url)
    try {
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 1500)
    } catch {}
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      {/* Controls */}
      <div className="grid content-start gap-6 rounded-2xl border p-5">
        <div className="grid gap-2">
          <Label>{t.base}</Label>
          <SegmentedControl
            aria-label={t.base}
            value={state.base}
            onValueChange={(id) => setState(initial(findTheme(id)))}
            options={THEMES.map((x) => ({ value: x.id, label: x.title }))}
          />
        </div>
        <ColorField id="tb-primary" label={t.primary} value={state.primary} onChange={(primary) => update({ primary })} />
        <ColorField id="tb-accent" label={t.accent} hint={t.accentHint} value={state.accent} onChange={(accent) => update({ accent })} />
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="tb-radius">{t.radius}</Label>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{state.radius}px</span>
          </div>
          <input
            id="tb-radius"
            type="range"
            min={0}
            max={24}
            step={1}
            value={state.radius}
            onChange={(e) => update({ radius: Number(e.target.value) })}
            className="w-full accent-[var(--brand)]"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tb-font">{t.font}</Label>
          <select
            id="tb-font"
            value={state.font}
            onChange={(e) => update({ font: e.target.value as State["font"] })}
            className="h-9 rounded-md border bg-background px-2.5 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {(["theme", "brand", "system", "thai"] as const).map((f) => (
              <option key={f} value={f}>
                {t.fonts[f]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/60 px-3 py-2 text-sm">
          <span>{t.contrast}</span>
          <span className={cn("inline-flex items-center gap-1.5 font-medium tabular-nums", ratio >= 4.5 ? "text-success" : "text-destructive")}>
            {ratio >= 4.5 && <Check className="size-4" />}
            {ratio.toFixed(1)}:1 · {ratio >= 4.5 ? t.contrastPass : t.contrastFail}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setState(initial(theme))}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <RotateCcw className="size-4" />
            {t.reset}
          </button>
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            {shared ? <Check className="size-4 text-success" /> : <Link2 className="size-4" />}
            {shared ? t.shared : t.share}
          </button>
        </div>
      </div>

      {/* Preview + output */}
      <div className="grid min-w-0 content-start gap-4">
        <div className="grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
          <ThemeSample lang={lang} vars={preview("light")} dark={false} className="rounded-2xl border p-4" />
          <ThemeSample lang={lang} vars={preview("dark")} dark className="rounded-2xl border p-4" />
        </div>
        <p className="text-sm text-muted-foreground">{t.outputHint}</p>
        <CopyCommand label={copyLabel} command={installCommand(theme.id)} />
        <CodeBlock title={t.output} code={css} copyLabel={copyLabel} />
      </div>
    </div>
  )
}
