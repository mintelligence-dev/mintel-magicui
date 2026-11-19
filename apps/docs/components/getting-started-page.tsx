import { ArrowRight } from "lucide-react"

import { CodeBlock } from "@/components/code-block"
import { CopyCommand } from "@/components/copy-command"
import { DocsShell } from "@/components/docs-shell"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { REGISTRY_URL } from "@/lib/site"

const LAYOUT = `import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans_Thai, Manrope, Rubik } from "next/font/google"

import { Toaster } from "@/components/ui/toast"
import "./globals.css"

// Variable names the Mintel theme looks for.
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" })
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
})

export const metadata: Metadata = { title: "My app" }

// Lets drawer / tab-bar / glass-navbar pad for the notch and home indicator.
export const viewport: Viewport = { viewportFit: "cover" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning className={\`\${manrope.variable} \${rubik.variable} \${plexThai.variable}\`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`

const DARK = `"use client"

import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme"
      onClick={() => document.documentElement.classList.toggle("dark")}>
      <Moon />
    </Button>
  )
}`

export function GettingStartedPage({ lang }: { lang: Lang }) {
  const d = getDict(lang)
  const t = d.docs.gs
  const copy = d.nav.copy
  const registries = `{
  "registries": {
    "@mintel": "${REGISTRY_URL}/{name}.json"
  }
}`

  const steps: React.ReactNode[] = [
    <CopyCommand key="1" label={copy} command="npx create-next-app@latest my-app --yes" />,
    <CopyCommand key="2" label={copy} command="npx shadcn@latest init" />,
    <CodeBlock key="3" title="components.json" code={registries} copyLabel={copy} />,
    <div key="4" className="grid gap-2">
      <CopyCommand label={copy} command="npx shadcn@latest add @mintel/mintel-theme" />
      <p className="text-sm text-muted-foreground">
        {t.themesMore}{" "}
        <a href={langPath(lang, "/themes")} className="font-medium text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
          {t.themesLink}
        </a>
      </p>
    </div>,
    <CodeBlock key="5" title="app/layout.tsx" code={LAYOUT} copyLabel={copy} />,
    <CopyCommand key="6" label={copy} command="npx shadcn@latest add @mintel/button @mintel/toast @mintel/date-picker" />,
    <CodeBlock key="7" title="components/theme-toggle.tsx" code={DARK} copyLabel={copy} />,
  ]

  return (
    <DocsShell lang={lang} current="getting-started">
      <article className="max-w-3xl space-y-10">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.body}</p>
        </header>

        <ol className="space-y-10">
          {t.steps.map((step, i) => (
            <li key={step.title} className="relative grid gap-3 pl-12 [&>*]:min-w-0">
              <span className="absolute top-0 left-0 inline-flex size-8 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] text-sm font-bold text-white">
                {i + 1}
              </span>
              <h2 className="font-heading text-xl font-semibold">{step.title}</h2>
              <p className="text-muted-foreground">{step.body}</p>
              {steps[i]}
            </li>
          ))}
        </ol>

        <section className="space-y-3 rounded-xl border bg-muted/30 p-5">
          <p className="text-sm">{t.noConfig}</p>
          <CopyCommand label={copy} command={`npx shadcn@latest add ${REGISTRY_URL}/mintel-theme.json`} />
        </section>


        <div className="flex flex-wrap gap-3">
          <a
            href={langPath(lang, "/components")}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {d.docs.allComponents} <ArrowRight className="size-4" />
          </a>
          <a
            href={langPath(lang, "/salesforce")}
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent"
          >
            {t.salesforce}
          </a>
        </div>
      </article>
    </DocsShell>
  )
}
