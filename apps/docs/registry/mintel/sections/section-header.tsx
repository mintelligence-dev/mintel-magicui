"use client"

import * as React from "react"
import { MenuIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type NavLink = { label: string; href: string }

/**
 * Site header: brand, links, call to action. Sticky with a frosted background once the page scrolls;
 * on phones the links fold into a menu panel. Put it first inside your page (it is `sticky`, not `fixed`).
 */
export function SectionHeader({
  brand = "Mintel",
  links = [
    { label: "Product", href: "#product" },
    { label: "Customers", href: "#customers" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ],
  cta = { label: "Get started", href: "#start" },
  secondary = { label: "Sign in", href: "#signin" },
  className,
}: {
  brand?: React.ReactNode
  links?: NavLink[]
  cta?: NavLink
  secondary?: NavLink
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    // Works with the window or a scrolling ancestor (e.g. a preview frame).
    const onScroll = () => {
      const el = ref.current
      if (el) setScrolled(el.getBoundingClientRect().top <= 0 && (window.scrollY > 4 || (el.parentElement?.scrollTop ?? 0) > 4))
    }
    // A page restored part-way down has no scroll event yet.
    onScroll()
    window.addEventListener("scroll", onScroll, { capture: true, passive: true })
    return () => window.removeEventListener("scroll", onScroll, { capture: true })
  }, [])

  return (
    <header
      ref={ref}
      data-slot="section-header"
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent transition-[background-color,border-color,box-shadow] duration-300",
        (scrolled || open) && "border-border bg-background/80 shadow-sm backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)]",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-heading text-lg font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[image:var(--brand-gradient)] text-sm text-brand-foreground">M</span>
          {brand}
        </a>
        <nav aria-label="Main" className="hidden flex-1 md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <a href={secondary.href} className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted">
            {secondary.label}
          </a>
          <a
            href={cta.href}
            className="rounded-full bg-[image:var(--brand-gradient)] px-4 py-2 text-sm font-semibold text-brand-foreground shadow-md shadow-brand/20 transition-transform duration-300 ease-spring-snappy hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-none"
          >
            {cta.label}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="section-header-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted md:hidden"
        >
          {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>
      {open && (
        <nav id="section-header-menu" aria-label="Main" className="border-t px-4 pb-4 md:hidden motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-2">
          <ul className="grid gap-1 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium transition-colors hover:bg-muted">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="grid gap-2">
            <a href={secondary.href} onClick={() => setOpen(false)} className="rounded-full border px-4 py-2.5 text-center font-medium">
              {secondary.label}
            </a>
            <a href={cta.href} onClick={() => setOpen(false)} className="rounded-full bg-[image:var(--brand-gradient)] px-4 py-2.5 text-center font-semibold text-brand-foreground">
              {cta.label}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
