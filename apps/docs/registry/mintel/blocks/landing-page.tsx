"use client"

import { ArrowRight, BarChart3, Bot, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { AnimatedGradientText } from "@/registry/mintel/effects/animated-gradient-text"
import { AuroraText } from "@/registry/mintel/effects/aurora-text"
import { BlurFade } from "@/registry/mintel/effects/blur-fade"
import { DotPattern } from "@/registry/mintel/effects/dot-pattern"
import { MagicCard } from "@/registry/mintel/effects/magic-card"
import { Marquee } from "@/registry/mintel/effects/marquee"
import { NumberTicker } from "@/registry/mintel/effects/number-ticker"
import { ShimmerButton } from "@/registry/mintel/effects/shimmer-button"
import { GlassNavbar } from "@/registry/mintel/glass/glass-navbar"
import { Button } from "@/registry/mintel/ui/button"

const LOGOS = ["Acme Retail", "Siam Foods", "Bangkok Air", "Nimit Co.", "Thai Home", "Chao Bank"]

const FEATURES = [
  { icon: MessageCircle, title: "Every channel", body: "LINE, Facebook, TikTok and Pantip arrive as cases in one inbox." },
  { icon: Bot, title: "AI that helps", body: "Draft replies and summaries, then hand off to a person when it matters." },
  { icon: BarChart3, title: "Real-time insight", body: "SLA and satisfaction dashboards that update every minute." },
  { icon: ShieldCheck, title: "PDPA ready", body: "Consent, retention and audit trails built in from day one." },
  { icon: Zap, title: "Fast to launch", body: "Go live in weeks with templates for your industry." },
  { icon: Sparkles, title: "On brand", body: "Mintel UI tokens keep every screen consistent." },
]

export default function LandingPage() {
  return (
    <div className="min-h-svh overflow-x-clip bg-background">
      <GlassNavbar floating className="flex h-14 items-center justify-between px-5">
        <span className="flex items-center gap-2 font-heading font-semibold">
          <Sparkles className="size-4 text-brand" /> Mintel
        </span>
        <Button size="sm" variant="brand">
          Book a demo
        </Button>
      </GlassNavbar>

      <section className="relative isolate px-6 pt-24 pb-20 text-center">
        <DotPattern className="-z-10 text-brand/25 [mask-image:radial-gradient(480px_circle_at_center,white,transparent)]" />
        <BlurFade>
          <AnimatedGradientText className="rounded-full border border-brand/20 px-4 py-1 text-sm font-medium">
            ✨ Customer Experience Platform
          </AnimatedGradientText>
        </BlurFade>
        <BlurFade delay={0.1}>
          <h1 className="mx-auto mt-6 max-w-3xl font-heading text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl">
            Talk to every customer, <AuroraText>everywhere.</AuroraText>
          </h1>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            One Salesforce-powered inbox for social, chat and phone — with AI that helps your team reply faster.
          </p>
        </BlurFade>
        <BlurFade delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          <ShimmerButton className="font-semibold">
            Get started <ArrowRight className="ml-2 size-4" />
          </ShimmerButton>
          <Button variant="outline" size="lg">
            See how it works
          </Button>
        </BlurFade>
      </section>

      <div className="border-y bg-muted/30 py-6">
        <Marquee pauseOnHover className="[--duration:30s] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {LOGOS.map((l) => (
            <span key={l} className="mx-8 font-heading text-lg font-semibold text-muted-foreground">
              {l}
            </span>
          ))}
        </Marquee>
      </div>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <BlurFade key={title} inView delay={i * 0.05}>
            <MagicCard className="h-full rounded-2xl p-6">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </MagicCard>
          </BlurFade>
        ))}
      </section>

      <section className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-6 pb-20 text-center">
        {[
          { v: 120, s: "+", l: "Brands" },
          { v: 98, s: "%", l: "SLA met" },
          { v: 4, s: "min", l: "First reply" },
        ].map((x) => (
          <div key={x.l}>
            <p className="flex items-baseline justify-center gap-1">
              <NumberTicker value={x.v} className="font-heading text-4xl font-bold text-brand dark:text-brand" />
              <span className="text-muted-foreground">{x.s}</span>
            </p>
            <p className="text-sm text-muted-foreground">{x.l}</p>
          </div>
        ))}
      </section>

      <section className="px-6 pb-24">
        <div
          className="mx-auto max-w-4xl rounded-3xl p-10 text-center text-white"
          style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-accent))" }}
        >
          <h2 className="font-heading text-3xl font-bold">Ready to see it with your data?</h2>
          <p className="mt-2 text-white/80">A 30-minute demo, tailored to your channels.</p>
          <Button size="lg" variant="secondary" className="mt-6">
            Book a demo
          </Button>
        </div>
      </section>
    </div>
  )
}
