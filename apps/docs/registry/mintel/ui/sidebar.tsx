"use client"

import * as React from "react"
import { PanelLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type SidebarContextValue = {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
  toggle: () => void
}
const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>")
  return ctx
}

const MOBILE = "(max-width: 767px)"

/**
 * App shell: a sidebar that collapses to an icon rail on desktop (⌘B / Ctrl+B) and becomes an
 * off-canvas panel on phones, next to <SidebarInset> for the page. Fills its parent's height.
 */
function SidebarProvider({
  defaultCollapsed = false,
  shortcut = true,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { defaultCollapsed?: boolean; shortcut?: boolean }) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const toggle = React.useCallback(() => {
    if (window.matchMedia(MOBILE).matches) setMobileOpen((o) => !o)
    else setCollapsed((c) => !c)
  }, [])

  React.useEffect(() => {
    if (!shortcut) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [shortcut, toggle])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen, toggle }}>
      <div
        data-slot="sidebar-wrapper"
        data-collapsed={collapsed || undefined}
        className={cn("group/shell relative flex h-full min-h-0 w-full overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({ className, children, ...props }: React.ComponentProps<"aside">) {
  const { mobileOpen, setMobileOpen } = useSidebar()
  // Escape closes the off-canvas panel on phones.
  React.useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen, setMobileOpen])
  return (
    <>
      {/* Phones: dim the page behind the open panel. */}
      <div
        aria-hidden
        onClick={() => setMobileOpen(false)}
        className={cn(
          "absolute inset-0 z-30 bg-black/40 transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        data-slot="sidebar"
        data-mobile-open={mobileOpen || undefined}
        className={cn(
          "z-40 flex h-full shrink-0 flex-col overflow-hidden border-r bg-sidebar text-sidebar-foreground",
          "transition-[width,translate,visibility] duration-500 ease-spring-smooth motion-reduce:transition-none",
          // Desktop: full width or icon rail.
          "md:relative md:w-60 md:group-data-[collapsed]/shell:w-14",
          // Phones: off-canvas.
          // `invisible` when closed, so the off-screen links leave the tab order and the accessibility tree.
          "absolute inset-y-0 left-0 w-[min(17rem,85%)] -translate-x-full max-md:invisible data-[mobile-open]:translate-x-0 max-md:data-[mobile-open]:visible md:translate-x-0",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex h-14 shrink-0 items-center gap-2 px-3", className)} {...props} />
}

function SidebarContent({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="sidebar-content" className={cn("min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-2 py-2", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn("shrink-0 border-t p-2", className)} {...props} />
}

function SidebarGroup({ label, className, children, ...props }: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  return (
    <div data-slot="sidebar-group" className={cn("grid grid-cols-[minmax(0,1fr)] gap-0.5 py-1", className)} {...props}>
      {label && (
        <p className="truncate px-2.5 pt-2 pb-1 text-[0.6875rem] font-semibold tracking-wider whitespace-nowrap text-muted-foreground uppercase transition-opacity duration-300 md:group-data-[collapsed]/shell:opacity-0">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

/** A nav link. In the icon rail only the icon shows; the label becomes its tooltip. */
function SidebarItem({
  icon,
  label,
  href,
  active,
  badge,
  onClick,
  linkComponent,
  className,
}: {
  icon: React.ReactNode
  label: string
  href?: string
  /** Rendered instead of <a> when `href` is set, e.g. your router's Link, so navigation stays client-side. */
  linkComponent?: React.ElementType
  active?: boolean
  badge?: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  const { collapsed, setMobileOpen } = useSidebar()
  const Comp: React.ElementType = href ? (linkComponent ?? "a") : "button"
  return (
    <Comp
      {...(href ? { href } : { type: "button" as const })}
      onClick={() => {
        onClick?.()
        setMobileOpen(false)
      }}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        "relative flex h-9 w-full items-center gap-3 rounded-lg px-2.5 text-sm font-medium whitespace-nowrap outline-none",
        "transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
        active && "bg-sidebar-accent text-brand",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
    >
      {active && <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-brand" />}
      {icon}
      <span className="min-w-0 flex-1 truncate text-left transition-opacity duration-300 md:group-data-[collapsed]/shell:opacity-0">{label}</span>
      {badge !== undefined && (
        <span className="rounded-full bg-brand px-1.5 text-[0.6875rem] font-semibold text-brand-foreground tabular-nums md:group-data-[collapsed]/shell:absolute md:group-data-[collapsed]/shell:top-1 md:group-data-[collapsed]/shell:right-1 md:group-data-[collapsed]/shell:size-2 md:group-data-[collapsed]/shell:p-0 md:group-data-[collapsed]/shell:text-[0px]">
          {badge}
        </span>
      )}
    </Comp>
  )
}

function SidebarTrigger({ className, label = "Toggle sidebar", ...props }: React.ComponentProps<"button"> & { label?: string }) {
  const { toggle } = useSidebar()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={`${label} (⌘B)`}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <PanelLeftIcon className="size-4" />
    </button>
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return <main data-slot="sidebar-inset" className={cn("flex min-w-0 flex-1 flex-col overflow-y-auto bg-background", className)} {...props} />
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
}
