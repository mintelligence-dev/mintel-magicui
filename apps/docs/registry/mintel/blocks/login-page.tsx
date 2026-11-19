"use client"

import { Cloud, Sparkles } from "lucide-react"

import { AuroraText } from "@/registry/mintel/effects/aurora-text"
import { DotPattern } from "@/registry/mintel/effects/dot-pattern"
import { GlassCard } from "@/registry/mintel/glass/glass-card"
import { Button } from "@/registry/mintel/ui/button"
import { Checkbox } from "@/registry/mintel/ui/checkbox"
import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"
import { toast } from "@/registry/mintel/ui/toast"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      {/* Brand panel */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex"
        style={{
          background:
            "radial-gradient(120% 120% at 10% 0%, var(--brand-cyan), transparent 55%), radial-gradient(120% 120% at 100% 100%, var(--brand-accent), transparent 55%), var(--brand)",
        }}
      >
        <DotPattern className="text-white/15" />
        <span className="relative flex items-center gap-2 font-heading text-lg font-semibold">
          <Sparkles className="size-5" /> Mintel
        </span>
        <div className="relative space-y-6">
          <h1 className="font-heading text-5xl leading-tight font-bold">
            Every customer,
            <br />
            <AuroraText colors={["#ffffff", "#c1dbff", "#d4ceff", "#ffffff"]}>one view.</AuroraText>
          </h1>
          <GlassCard className="max-w-sm p-5 text-sm text-glass-foreground">
            “Our agents answer LINE and Facebook in Salesforce without switching apps.”
            <p className="mt-3 text-xs text-muted-foreground">Head of Customer Service</p>
          </GlassCard>
        </div>
        <p className="relative text-xs text-white/70">© M Intelligence Co., Ltd.</p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-6 py-12 pb-[max(env(safe-area-inset-bottom),3rem)]">
        <form
          className="grid w-full max-w-sm gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            toast.success("Signed in")
          }}
        >
          <div className="space-y-1">
            <h2 className="font-heading text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Sign in to your workspace</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" placeholder="name@company.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-brand hover:underline">
                Forgot password?
              </a>
            </div>
            <Input id="password" type="password" autoComplete="current-password" required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" defaultChecked />
            <Label htmlFor="remember">Keep me signed in</Label>
          </div>
          <Button type="submit" variant="brand" size="lg">
            Sign in
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
          <Button type="button" variant="outline" size="lg">
            <Cloud /> Continue with Salesforce
          </Button>
        </form>
      </div>
    </div>
  )
}
