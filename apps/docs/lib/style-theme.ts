// Design themes for the docs site (Mintel plus every file in packages/tokens/src/themes), shared by the
// head script, the header menu, the Themes page and the theme builder.
import themeIndex from "@mintelligence-dev/tokens/themes/index.json"

export const STYLE_KEY = "mintel-theme"

export type ThemeInfo = {
  id: string
  title: string
  description: { en: string; th: string }
  base: boolean
  font: string
  radius: string
  light: Record<string, string>
  dark: Record<string, string>
  gradient: string
  type: Record<string, [string, string]>
  glassBlur: string
}

export const THEMES = themeIndex as unknown as ThemeInfo[]
export const THEME_IDS = THEMES.map((t) => t.id)

/** Applies the saved design theme before paint, like the dark-mode script. Unknown ids are ignored. */
export const styleScript = `try{var t=localStorage.getItem("${STYLE_KEY}");if(t&&t!=="mintel"&&${JSON.stringify(
  THEME_IDS
)}.indexOf(t)>-1)document.documentElement.setAttribute("data-mintel-theme",t)}catch(e){}`

/** Switches the whole site to a theme and remembers it. */
export function applySiteTheme(id: string) {
  const root = document.documentElement
  if (id === "mintel") root.removeAttribute("data-mintel-theme")
  else root.setAttribute("data-mintel-theme", id)
  try {
    if (id === "mintel") localStorage.removeItem(STYLE_KEY)
    else localStorage.setItem(STYLE_KEY, id)
  } catch {}
}

export function currentSiteTheme(): string {
  return document.documentElement.getAttribute("data-mintel-theme") ?? "mintel"
}

// next/font exposes the Mintel fonts under these variables on the docs site (and in apps set up per Getting started).
export const FONT_STACKS = {
  brand: {
    sans: 'var(--font-manrope, Manrope), var(--font-plex-thai, "IBM Plex Sans Thai"), ui-sans-serif, system-ui, sans-serif',
    heading: 'var(--font-rubik, Rubik), var(--font-plex-thai, "IBM Plex Sans Thai"), ui-sans-serif, system-ui, sans-serif',
  },
  system: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, var(--font-plex-thai, "IBM Plex Sans Thai"), sans-serif',
    heading:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, var(--font-plex-thai, "IBM Plex Sans Thai"), sans-serif',
  },
  thai: {
    sans: 'var(--font-plex-thai, "IBM Plex Sans Thai"), ui-sans-serif, system-ui, sans-serif',
    heading: 'var(--font-plex-thai, "IBM Plex Sans Thai"), ui-sans-serif, system-ui, sans-serif',
  },
} as const
export type FontChoice = keyof typeof FONT_STACKS

// Tailwind's default reading sizes, restored when a preview shows a theme without its own type scale.
const DEFAULT_TYPE: Record<string, [string, string]> = {
  xs: ["0.75rem", "1.333"],
  sm: ["0.875rem", "1.429"],
  base: ["1rem", "1.5"],
}

/**
 * Every CSS variable a theme sets, as an inline style. Lets a preview show any theme in any mode,
 * whatever theme the page itself is using.
 */
export function themeVars(theme: ThemeInfo, mode: "light" | "dark"): Record<string, string> {
  const colors = theme[mode]
  const fonts = theme.base ? FONT_STACKS.brand : { sans: theme.font, heading: theme.font }
  const type = { ...DEFAULT_TYPE, ...theme.type }
  return {
    ...Object.fromEntries(Object.entries(colors).map(([k, v]) => [`--${k}`, v])),
    "--radius": theme.radius,
    "--mintel-radius": theme.radius,
    "--brand-gradient": theme.gradient,
    "--mintel-font-sans": fonts.sans,
    "--mintel-font-heading": fonts.heading,
    "--mintel-glass-blur": theme.glassBlur,
    ...Object.fromEntries(
      Object.entries(type).flatMap(([k, [size, lh]]) => [
        [`--text-${k}`, size],
        [`--text-${k}--line-height`, lh],
      ])
    ),
    "color-scheme": mode,
  }
}

// ---------- color helpers (hex only: the builder's inputs are <input type="color">) ----------
const toRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6)
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number]
}
const toHex = (rgb: number[]) => "#" + rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("").toUpperCase()

/** Mix two hex colors in sRGB; `amount` is the share of `b`. */
export const mix = (a: string, b: string, amount: number) => {
  const [x, y] = [toRgb(a), toRgb(b)]
  return toHex(x.map((c, i) => c + (y[i] - c) * amount))
}

const luminance = (hex: string) => {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two hex colors. */
export const contrast = (a: string, b: string) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

/** White or near-black text, whichever reads better on `bg`. */
export const readableOn = (bg: string, dark = "#0B0C10") => (contrast("#FFFFFF", bg) >= contrast(dark, bg) ? "#FFFFFF" : dark)
