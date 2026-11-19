import { ArrowRight, Sparkles } from "lucide-react"
import { tokens } from "@mintelligence-dev/tokens"

import { BeamDemo } from "@/components/beam-demo"
import { CopyCommand } from "@/components/copy-command"
import { GithubIcon } from "@/components/github-icon"
import { ThemeToggle } from "@/components/theme-toggle"
import { REPO_URL, installCmd } from "@/lib/site"
import { cn } from "@/lib/utils"
import { AnimatedGradientText } from "@/registry/mintel/magicui/animated-gradient-text"
import { AuroraText } from "@/registry/mintel/magicui/aurora-text"
import { BlurFade } from "@/registry/mintel/magicui/blur-fade"
import { BorderBeam } from "@/registry/mintel/magicui/border-beam"
import { DotPattern } from "@/registry/mintel/magicui/dot-pattern"
import { MagicCard } from "@/registry/mintel/magicui/magic-card"
import { Marquee } from "@/registry/mintel/magicui/marquee"
import { Meteors } from "@/registry/mintel/magicui/meteors"
import { NumberTicker } from "@/registry/mintel/magicui/number-ticker"
import { ShimmerButton } from "@/registry/mintel/magicui/shimmer-button"
import { ShineBorder } from "@/registry/mintel/magicui/shine-border"
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

const STACK = ["React", "Next.js", "Tailwind v4", "shadcn/ui", "Motion", "Salesforce LWC", "SLDS", "Experience Cloud"]

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
  children,
}: {
  name: string
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div
        className={cn(
          "relative flex min-h-48 items-center justify-center overflow-hidden border-b bg-muted/30 p-6",
          className
        )}
      >
        {children}
      </div>
      <div className="flex flex-col gap-3 p-4">
        <p className="font-heading text-sm font-semibold">{title}</p>
        <CopyCommand command={installCmd(name)} />
      </div>
    </Card>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-heading font-semibold">
            <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[image:var(--brand-gradient)] text-sm font-bold text-white">
              M
            </span>
            Mintel UI
          </a>
          <nav className="flex items-center gap-1 text-sm">
            <a href="#tokens" className="hidden rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground sm:block">
              Tokens
            </a>
            <a href="#components" className="hidden rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground sm:block">
              Components
            </a>
            <a href="#salesforce" className="hidden rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground sm:block">
              Salesforce
            </a>
            <Button variant="ghost" size="icon" asChild>
              <a href={REPO_URL} aria-label="GitHub">
                <GithubIcon />
              </a>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate flex flex-col items-center px-4 pt-20 pb-24 text-center sm:pt-28">
        <DotPattern
          className="-z-10 text-brand/30 [mask-image:radial-gradient(520px_circle_at_center,white,transparent)]"
        />
        <Meteors number={14} className="-z-10" />
        <BlurFade delay={0.05}>
          <AnimatedGradientText className="rounded-full border border-brand/20 bg-background/60 px-4 py-1 text-sm font-medium backdrop-blur">
            ✨ Open-source design system โดย M-Intelligence
          </AnimatedGradientText>
        </BlurFade>
        <BlurFade delay={0.15}>
          <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl">
            ออกแบบครั้งเดียว <br className="hidden sm:block" />
            <AuroraText>ใช้ได้ทุกที่</AuroraText>
          </h1>
        </BlurFade>
        <BlurFade delay={0.25}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Brand tokens ชุดเดียวสำหรับ React และ Salesforce LWC พร้อม animated components
            ที่ติดตั้งผ่าน shadcn registry — โค้ดเป็นของโปรเจกต์คุณ ปรับแต่งได้ทุกบรรทัด
          </p>
        </BlurFade>
        <BlurFade delay={0.35} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#components">
            <ShimmerButton className="font-semibold">
              ดู Components <ArrowRight className="ml-2 size-4" />
            </ShimmerButton>
          </a>
          <Button variant="outline" size="lg" asChild>
            <a href="#install">เริ่มใช้งาน</a>
          </Button>
        </BlurFade>

        <BlurFade delay={0.45} className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4">
          {[
            { v: Object.keys(tokens.light).length, l: "Semantic tokens" },
            { v: 16, l: "Registry items" },
            { v: 2, l: "Platforms" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border bg-card/60 p-4 backdrop-blur">
              <NumberTicker value={s.v} className="font-heading text-3xl font-bold text-foreground sm:text-4xl" />
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.l}</p>
            </div>
          ))}
        </BlurFade>
      </section>

      <div className="border-y bg-muted/30 py-6">
        <Marquee pauseOnHover className="[--duration:30s]">
          {STACK.map((s) => (
            <span key={s} className="mx-6 font-heading text-lg font-semibold text-muted-foreground">
              {s}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Architecture */}
      <Section id="how" eyebrow="Architecture" title="Tokens ชุดเดียว → ทุกแพลตฟอร์ม">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border bg-card">
            <BeamDemo />
            <BorderBeam size={120} duration={8} />
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">@mintelligence-dev/tokens</strong> เก็บสี ฟอนต์ และ radius ไว้ที่{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-sm">src/tokens.json</code> ที่เดียว แล้ว build
              ออกเป็น CSS variables, Tailwind v4 theme, JS object และ LWC module
            </p>
            <p>
              <strong className="text-foreground">Components</strong> แจกผ่าน shadcn registry — คำสั่ง{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-sm">shadcn add</code> จะ copy source
              เข้าโปรเจกต์ ไม่ผูก version ไม่ต้องรอ release
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="soft">Light + Dark</Badge>
              <Badge variant="soft">ภาษาไทย (IBM Plex Sans Thai)</Badge>
              <Badge variant="soft">WCAG AA</Badge>
              <Badge variant="brand">MIT</Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* Install */}
      <Section id="install" eyebrow="Getting started" title="เริ่มใช้งานใน 2 ขั้นตอน">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>1. ติดตั้ง theme</CardTitle>
              <CardDescription>
                ใส่สีแบรนด์ (light/dark), ฟอนต์ และ radius ลงใน globals.css ของโปรเจกต์ shadcn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CopyCommand command={installCmd("mintel-theme")} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. เพิ่ม component ที่ต้องการ</CardTitle>
              <CardDescription>ทุก component ใช้ token ของแบรนด์อยู่แล้ว ไม่ต้องตั้งสีเอง</CardDescription>
            </CardHeader>
            <CardContent>
              <CopyCommand command={installCmd("shimmer-button")} />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Tokens */}
      <Section id="tokens" eyebrow="Foundations" title="Brand tokens">
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
            <p className="mb-2 font-heading text-sm font-semibold">Semantic (สลับ dark mode เพื่อดูค่าที่เปลี่ยน)</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {SEMANTIC.map((name) => (
                <div key={name} className="flex items-center gap-2 rounded-lg border p-2">
                  <span className="size-8 shrink-0 rounded-md border" style={{ background: `var(--${name})` }} />
                  <code className="truncate text-xs">--{name}</code>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">font-sans · Manrope + IBM Plex Sans Thai</p>
              <p className="mt-2 text-xl">Customer Experience ลูกค้าคือหัวใจ</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">font-heading · Rubik + IBM Plex Sans Thai</p>
              <p className="mt-2 font-heading text-xl font-semibold">Intelligence ข้อมูลอัจฉริยะ</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">--brand-gradient</p>
              <div className="mt-2 h-8 rounded-md bg-[image:var(--brand-gradient)]" />
            </div>
          </div>
        </div>
      </Section>

      {/* Components */}
      <Section id="components" eyebrow="Registry" title="Components">
        <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold">
          <Sparkles className="size-5 text-brand-accent" /> Animated
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Preview name="shimmer-button" title="Shimmer Button">
            <ShimmerButton>Get Started</ShimmerButton>
          </Preview>
          <Preview name="aurora-text" title="Aurora Text">
            <span className="font-heading text-4xl font-bold">
              <AuroraText>Mintel</AuroraText>
            </span>
          </Preview>
          <Preview name="animated-gradient-text" title="Animated Gradient Text">
            <AnimatedGradientText className="text-2xl font-semibold">Customer Experience</AnimatedGradientText>
          </Preview>
          <Preview name="magic-card" title="Magic Card" className="p-4">
            <MagicCard className="flex h-36 w-full flex-col items-center justify-center rounded-xl p-4 text-center">
              <p className="font-heading font-semibold">เลื่อนเมาส์มาที่นี่</p>
              <p className="text-sm text-muted-foreground">spotlight ตามเคอร์เซอร์</p>
            </MagicCard>
          </Preview>
          <Preview name="border-beam" title="Border Beam">
            <div className="relative flex h-28 w-full items-center justify-center rounded-xl border bg-card">
              <span className="text-sm text-muted-foreground">Beam รอบกรอบ</span>
              <BorderBeam size={80} duration={6} />
            </div>
          </Preview>
          <Preview name="shine-border" title="Shine Border">
            <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-card">
              <ShineBorder borderWidth={2} />
              <span className="text-sm text-muted-foreground">ขอบไล่เฉดแบรนด์</span>
            </div>
          </Preview>
          <Preview name="number-ticker" title="Number Ticker">
            <NumberTicker value={98765} className="font-heading text-5xl font-bold text-brand dark:text-brand" />
          </Preview>
          <Preview name="meteors" title="Meteors">
            <Meteors number={10} />
            <span className="font-heading text-lg font-semibold">Meteors</span>
          </Preview>
          <Preview name="marquee" title="Marquee" className="px-0">
            <Marquee pauseOnHover className="[--duration:18s]">
              {["LINE", "Facebook", "TikTok", "Instagram", "X", "Pantip"].map((s) => (
                <Badge key={s} variant="soft" className="mx-1 px-3 py-1 text-sm">
                  {s}
                </Badge>
              ))}
            </Marquee>
          </Preview>
          <Preview name="dot-pattern" title="Dot Pattern">
            <DotPattern glow cr={1.5} className="text-brand/70 [mask-image:radial-gradient(160px_circle_at_center,white,transparent)]" />
          </Preview>
          <Preview name="blur-fade" title="Blur Fade">
            <BlurFade inView delay={0.2}>
              <p className="font-heading text-xl font-semibold">ค่อยๆ ปรากฏตอน scroll</p>
            </BlurFade>
          </Preview>
          <Preview name="animated-beam" title="Animated Beam" className="p-0">
            <div className="w-full scale-90">
              <BeamDemo />
            </div>
          </Preview>
        </div>

        <h3 className="mt-14 mb-4 font-heading text-lg font-semibold">Core UI</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Preview name="button" title="Button">
            <div className="flex flex-wrap justify-center gap-2">
              <Button>Default</Button>
              <Button variant="brand">Brand</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </Preview>
          <Preview name="badge" title="Badge">
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
          <Preview name="input" title="Input">
            <Input placeholder="อีเมลของคุณ" className="max-w-xs bg-background" />
          </Preview>
          <Preview name="card" title="Card" className="p-4">
            <Card className="w-full max-w-xs gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle>Salesforce Connector</CardTitle>
                <CardDescription>LINE · Facebook · TikTok</CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <Button size="sm" variant="brand" className="w-full">
                  เชื่อมต่อ
                </Button>
              </CardContent>
            </Card>
          </Preview>
        </div>
      </Section>

      {/* Salesforce */}
      <Section id="salesforce" eyebrow="Salesforce" title="ใช้กับ LWC และ SLDS">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>LWC CSS module</CardTitle>
              <CardDescription>
                copy โฟลเดอร์ <code>packages/tokens/lwc/mintelTokens</code> ไปที่{" "}
                <code>force-app/main/default/lwc/</code> แล้ว import ใน CSS ของ component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed">
{`/* myCard.css */
@import 'c/mintelTokens';

.card {
  background: var(--mintel-card);
  border-radius: var(--mintel-radius);
  font-family: var(--mintel-font-sans);
}
.cta {
  background-image: var(--mintel-brand-gradient);
  color: var(--mintel-brand-foreground);
}`}
              </pre>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>SLDS styling hooks</CardTitle>
              <CardDescription>
                <code>salesforce/mintel-global.css</code> map สีแบรนด์เข้า <code>lightning-*</code> base
                components — อัปโหลดเป็น Static Resource หรือใส่ใน head ของ Experience Cloud (LWR)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed">
{`import { loadStyle } from 'lightning/platformResourceLoader';
import MINTEL from '@salesforce/resourceUrl/mintelGlobal';

connectedCallback() {
  loadStyle(this, MINTEL);
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </Section>

      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} M Intelligence Co., Ltd. · MIT License · Animated components adapted from{" "}
        <a href="https://magicui.design" className="underline underline-offset-4 hover:text-foreground">
          Magic UI
        </a>
      </footer>
    </main>
  )
}
