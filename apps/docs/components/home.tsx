import { ArrowRight, Atom, Cloud, Globe, Layers, Orbit, Palette, Smartphone, Sparkles, Triangle, Wind } from "lucide-react"
import { tokens } from "@m-intelligence/tokens"

import { DialogDemo, ChannelSelect, TableDemo, TabsDemo, ToastDemo } from "@/components/app-ui-demos"
import { ChoiceDemo, ComboboxDemo, DatePickerDemo, DropdownMenuDemo, FormDemo, TooltipPopoverDemo } from "@/components/form-demos"
import { BeamDemo } from "@/components/beam-demo"
import { CopyCommand } from "@/components/copy-command"
import { GlassShowcase } from "@/components/glass-showcase"
import { MobileNav } from "@/components/mobile-nav"
import { MobileShowcase } from "@/components/mobile-showcase"
import { MotionShowcase, ZoomShowcase } from "@/components/motion-showcase"
import { SiteHeader } from "@/components/site-header"
import { countItems } from "@/lib/component-docs"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { installCmd } from "@/lib/site"
import { cn } from "@/lib/utils"
import { AnimatedGradientText } from "@/registry/mintel/effects/animated-gradient-text"
import { AuroraText } from "@/registry/mintel/effects/aurora-text"
import { BlurFade } from "@/registry/mintel/effects/blur-fade"
import { BorderBeam } from "@/registry/mintel/effects/border-beam"
import { DotPattern } from "@/registry/mintel/effects/dot-pattern"
import { MagicCard } from "@/registry/mintel/effects/magic-card"
import { Marquee } from "@/registry/mintel/effects/marquee"
import { Meteors } from "@/registry/mintel/effects/meteors"
import { NumberTicker } from "@/registry/mintel/effects/number-ticker"
import { ShimmerButton } from "@/registry/mintel/effects/shimmer-button"
import { ShineBorder } from "@/registry/mintel/effects/shine-border"
import { Badge } from "@/registry/mintel/ui/badge"
import { Button } from "@/registry/mintel/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/mintel/ui/card"
import { Input } from "@/registry/mintel/ui/input"

const SCALES = ["blue", "purple", "neutral"] as const
const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]

const SEMANTIC = [
  "background",
  "foreground",
  "primary",
  "brand-accent",
  "brand-cyan",
  "muted",
  "border",
  "success",
  "warning",
  "destructive",
] as const

const STACK = [
  { name: "React", icon: Atom, tone: "text-brand-cyan" },
  { name: "Next.js", icon: Triangle, tone: "text-foreground" },
  { name: "Tailwind v4", icon: Wind, tone: "text-brand-cyan" },
  { name: "shadcn/ui", icon: Layers, tone: "text-foreground" },
  { name: "Motion", icon: Orbit, tone: "text-brand-accent" },
  { name: "Salesforce LWC", icon: Cloud, tone: "text-brand" },
  { name: "SLDS", icon: Palette, tone: "text-brand" },
  { name: "Experience Cloud", icon: Globe, tone: "text-brand" },
  { name: "Mobile Web", icon: Smartphone, tone: "text-brand-accent" },
]

function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-16 sm:px-6", className)}>
      <BlurFade inView>
        <p className="text-sm font-semibold tracking-wide text-brand uppercase">{eyebrow}</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      </BlurFade>
      <div className="mt-10">{children}</div>
    </section>
  )
}

function Preview({
  name,
  title,
  className,
  wrapperClassName,
  copyLabel,
  lang,
  children,
}: {
  copyLabel?: string
  lang: Lang
  name: string
  title: string
  className?: string
  wrapperClassName?: string
  children: React.ReactNode
}) {
  return (
    <Card className={cn("gap-0 overflow-hidden py-0 [contain-intrinsic-size:auto_320px] [content-visibility:auto]", wrapperClassName)}>
      <div
        className={cn(
          "relative flex min-h-48 items-center justify-center overflow-hidden border-b bg-muted/30 p-6",
          className
        )}
      >
        {children}
      </div>
      <div className="flex flex-col gap-3 p-4">
        <a
          href={langPath(lang, `/components/${name}`)}
          className="group inline-flex w-fit items-center gap-1 font-heading text-sm font-semibold hover:text-brand"
        >
          {title}
          <ArrowRight className="size-3.5 opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100" />
        </a>
        <CopyCommand command={installCmd(name)} label={copyLabel} />
      </div>
    </Card>
  )
}

export function Home({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  return (
    <main id="top" className="min-h-screen overflow-x-clip pb-24 sm:pb-0">
      <SiteHeader lang={lang} />

      {/* Hero */}
      <section className="relative isolate flex flex-col items-center px-4 pt-20 pb-24 text-center [contain-intrinsic-size:auto_900px] [content-visibility:auto] sm:pt-28">
        <DotPattern
          className="-z-10 text-brand/30 [mask-image:radial-gradient(520px_circle_at_center,white,transparent)]"
        />
        <Meteors number={14} className="-z-10" />
        <BlurFade delay={0.05}>
          <AnimatedGradientText className="rounded-full border border-brand/20 bg-background/60 px-4 py-1 text-sm font-medium backdrop-blur">
            {t.hero.badge}
          </AnimatedGradientText>
        </BlurFade>
        <BlurFade delay={0.15}>
          <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl">
            Build faster. <br />
            <AuroraText>Look Mintel.</AuroraText>
          </h1>
        </BlurFade>
        <BlurFade delay={0.25}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.hero.subtitle}</p>
        </BlurFade>
        <BlurFade delay={0.35} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#components">
            <ShimmerButton className="font-semibold">
              {t.hero.browse} <ArrowRight className="ml-2 size-4" />
            </ShimmerButton>
          </a>
          <Button variant="outline" size="lg" asChild>
            <a href="#install">{t.hero.start}</a>
          </Button>
        </BlurFade>

        <BlurFade delay={0.45} className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4">
          {[
            { v: Object.keys(tokens.light).length, l: t.hero.stats.tokens },
            { v: countItems(), l: t.hero.stats.items },
            { v: 2, l: t.hero.stats.platforms },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border bg-card/60 p-4 backdrop-blur">
              <NumberTicker value={s.v} className="font-heading text-3xl font-bold text-foreground sm:text-4xl" />
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.l}</p>
            </div>
          ))}
        </BlurFade>
      </section>

      <div className="border-y bg-muted/30 py-8">
        <p className="mb-5 text-center text-sm font-medium text-muted-foreground">
          {t.stackLabel}
        </p>
        <Marquee
          pauseOnHover
          className="[--duration:45s] [--gap:0.75rem] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          {STACK.map(({ name, icon: Icon, tone }) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 font-heading text-sm font-semibold text-foreground/80 shadow-xs transition-colors hover:border-brand/40 hover:text-foreground"
            >
              <Icon className={cn("size-4", tone)} />
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Architecture */}
      <Section id="how" eyebrow={t.architecture.eyebrow} title={t.architecture.title}>
        <div className="grid items-center gap-8 lg:grid-cols-2 [&>*]:min-w-0">
          <div className="relative overflow-hidden rounded-2xl border bg-card">
            <BeamDemo />
            <BorderBeam size={120} duration={8} />
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>{t.architecture.tokens}</p>
            <p>{t.architecture.components}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="soft">Light + Dark</Badge>
              <Badge variant="soft">{t.architecture.thai}</Badge>
              <Badge variant="soft">WCAG AA</Badge>
              <Badge variant="brand">MIT</Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* Install */}
      <Section id="install" eyebrow={t.install.eyebrow} title={t.install.title}>
        <div className="grid gap-6 md:grid-cols-2 [&>*]:min-w-0">
          <Card>
            <CardHeader>
              <CardTitle>{t.install.step1}</CardTitle>
              <CardDescription>{t.install.step1Desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <CopyCommand command={installCmd("mintel-theme")} label={t.nav.copy} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t.install.step2}</CardTitle>
              <CardDescription>{t.install.step2Desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <CopyCommand command={installCmd("shimmer-button")} label={t.nav.copy} />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Tokens */}
      <Section id="tokens" eyebrow={t.tokens.eyebrow} title={t.tokens.title}>
        <div className="space-y-6">
          {SCALES.map((scale) => (
            <div key={scale}>
              <p className="mb-2 font-heading text-sm font-semibold capitalize">{scale}</p>
              <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
                {STEPS.map((step) => {
                  const hex = tokens.color[scale][step]
                  return (
                    <div key={step} className="space-y-1">
                      <div
                        className={cn(
                          "h-12 rounded-md border border-black/5",
                          step === "600" && scale !== "neutral" && "ring-2 ring-ring ring-offset-2 ring-offset-background",
                          step === "900" && scale === "neutral" && "ring-2 ring-ring ring-offset-2 ring-offset-background"
                        )}
                        style={{ background: hex }}
                      />
                      <p className="text-[11px] font-medium">{step}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{hex}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          <div>
            <p className="mb-2 font-heading text-sm font-semibold">{t.tokens.semantic}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {SEMANTIC.map((name) => (
                <div key={name} className="flex items-center gap-2 rounded-lg border p-2">
                  <span className="size-8 shrink-0 rounded-md border" style={{ background: `var(--${name})` }} />
                  <code className="truncate text-xs">--{name}</code>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 [&>*]:min-w-0">
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">font-sans · Manrope + IBM Plex Sans Thai</p>
              <p className="mt-2 text-xl">{t.tokens.sampleSans}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">font-heading · Rubik + IBM Plex Sans Thai</p>
              <p className="mt-2 font-heading text-xl font-semibold">{t.tokens.sampleHeading}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">--brand-gradient</p>
              <div className="mt-2 h-8 rounded-md bg-[image:var(--brand-gradient)]" />
            </div>
          </div>
        </div>
      </Section>

      {/* Components */}
      <Section id="components" eyebrow={t.components.eyebrow} title={t.components.title}>
        <nav aria-label={t.components.categories} className="mb-10 flex flex-wrap gap-2">
          {[
            ["#core", "Core UI", countItems("core", "forms", "data", "navigation")],
            ["#effects", "Effects", countItems("effects")],
            ["#glass", "Glass", countItems("glass")],
            ["#mobile", "Mobile", countItems("mobile")],
            ["#motion", "Fluid Motion", countItems("motion")],
          ].map(([href, label, n]) => (
            <a
              key={href}
              href={href as string}
              className="inline-flex min-h-9 items-center gap-2 rounded-full border bg-background px-4 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand"
            >
              {label}
              <span className="rounded-full bg-muted px-1.5 text-xs text-muted-foreground tabular-nums">{n}</span>
            </a>
          ))}
        </nav>

        <h3 id="core" className="mb-4 scroll-mt-20 font-heading text-xl font-semibold">Core UI</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          <Preview lang={lang} copyLabel={t.nav.copy} name="button" title="Button">
            <div className="flex flex-wrap justify-center gap-2">
              <Button>Default</Button>
              <Button variant="brand">Brand</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="badge" title="Badge">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>Default</Badge>
              <Badge variant="brand">Brand</Badge>
              <Badge variant="soft">Soft</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="input" title="Input">
            <Input placeholder={t.components.inputPlaceholder} className="max-w-xs bg-background" />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="dialog" title="Dialog">
            <DialogDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="select" title="Select">
            <ChannelSelect lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="tabs" title="Tabs">
            <TabsDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="toast" title="Toast">
            <ToastDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="table" title="Table" className="p-4" wrapperClassName="md:col-span-2">
            <TableDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="combobox" title={t.components.comboboxTitle}>
            <ComboboxDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="date-picker" title={t.components.datePickerTitle}>
            <DatePickerDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="switch" title="Switch · Checkbox · Radio">
            <ChoiceDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="dropdown-menu" title="Dropdown Menu">
            <DropdownMenuDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="tooltip" title="Tooltip · Popover">
            <TooltipPopoverDemo lang={lang} />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="card" title="Card" className="p-4">
            <Card className="w-full max-w-xs gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle>Salesforce Connector</CardTitle>
                <CardDescription>LINE · Facebook · TikTok</CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <Button size="sm" variant="brand" className="w-full">
                  {t.components.connect}
                </Button>
              </CardContent>
            </Card>
          </Preview>
        </div>
        <div className="mt-6">
          <Card className="gap-0 overflow-hidden py-0">
            <div className="border-b bg-muted/30 p-5 sm:p-8">
              <FormDemo lang={lang} />
            </div>
            <div className="flex flex-col gap-3 p-4">
              <p className="font-heading text-sm font-semibold">{t.components.formTitle}</p>
              <CopyCommand command={installCmd("form")} label={t.nav.copy} />
            </div>
          </Card>
        </div>

        <h3 id="effects" className="mt-16 mb-4 flex scroll-mt-20 items-center gap-2 font-heading text-xl font-semibold">
          <Sparkles className="size-5 text-brand-accent" /> Effects
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
          <Preview lang={lang} copyLabel={t.nav.copy} name="shimmer-button" title="Shimmer Button">
            <ShimmerButton>Get Started</ShimmerButton>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="aurora-text" title="Aurora Text">
            <span className="font-heading text-4xl font-bold">
              <AuroraText>Mintel</AuroraText>
            </span>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="animated-gradient-text" title="Animated Gradient Text">
            <AnimatedGradientText className="text-2xl font-semibold">Customer Experience</AnimatedGradientText>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="magic-card" title="Magic Card" className="p-4">
            <MagicCard className="flex h-36 w-full flex-col items-center justify-center rounded-xl p-4 text-center">
              <p className="font-heading font-semibold">{t.components.magicCard}</p>
              <p className="text-sm text-muted-foreground">{t.components.magicCardSub}</p>
            </MagicCard>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="border-beam" title="Border Beam">
            <div className="relative flex h-28 w-full items-center justify-center rounded-xl border bg-card">
              <span className="text-sm text-muted-foreground">{t.components.borderBeam}</span>
              <BorderBeam size={80} duration={6} />
            </div>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="shine-border" title="Shine Border">
            <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-card">
              <ShineBorder borderWidth={2} />
              <span className="text-sm text-muted-foreground">{t.components.shineBorder}</span>
            </div>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="number-ticker" title="Number Ticker">
            <NumberTicker value={98765} className="font-heading text-5xl font-bold text-brand dark:text-brand" />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="meteors" title="Meteors">
            <Meteors number={10} />
            <span className="font-heading text-lg font-semibold">Meteors</span>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="marquee" title="Marquee" className="px-0">
            <Marquee pauseOnHover className="[--duration:18s]">
              {["LINE", "Facebook", "TikTok", "Instagram", "X", "Pantip"].map((s) => (
                <Badge key={s} variant="soft" className="mx-1 px-3 py-1 text-sm">
                  {s}
                </Badge>
              ))}
            </Marquee>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="dot-pattern" title="Dot Pattern">
            <DotPattern glow cr={1.5} className="text-brand/70 [mask-image:radial-gradient(160px_circle_at_center,white,transparent)]" />
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="blur-fade" title="Blur Fade">
            <BlurFade inView delay={0.2}>
              <p className="font-heading text-xl font-semibold">{t.components.blurFade}</p>
            </BlurFade>
          </Preview>
          <Preview lang={lang} copyLabel={t.nav.copy} name="animated-beam" title="Animated Beam" className="p-0">
            <div className="w-full scale-90">
              <BeamDemo />
            </div>
          </Preview>
        </div>


        <h3 id="glass" className="mt-16 mb-4 scroll-mt-20 font-heading text-xl font-semibold">Glass</h3>
        <GlassShowcase lang={lang} />

        <h3 id="mobile" className="mt-16 mb-6 scroll-mt-20 font-heading text-xl font-semibold">Mobile</h3>
        <MobileShowcase lang={lang} />

        <h3 id="motion" className="mt-16 mb-6 scroll-mt-20 font-heading text-xl font-semibold">Fluid Motion</h3>
        <MotionShowcase lang={lang} />
      </Section>
      <ZoomShowcase lang={lang} />


      {/* Salesforce */}
      <Section id="salesforce" eyebrow={t.salesforceTeaser.eyebrow} title={t.salesforceTeaser.title}>
        <div className="flex flex-col items-start gap-6 rounded-2xl border bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-2xl text-muted-foreground">{t.salesforceTeaser.body}</p>
          <Button variant="brand" size="lg" asChild>
            <a href={langPath(lang, "/salesforce")}>
              {t.salesforceTeaser.cta} <ArrowRight />
            </a>
          </Button>
        </div>
      </Section>

      <MobileNav lang={lang} />
      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        © 2026 {t.footer}
      </footer>
    </main>
  )
}
