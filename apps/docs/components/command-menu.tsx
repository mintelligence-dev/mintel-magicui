"use client"

import { useEffect, useState } from "react"
import { ItemBadge } from "@/components/item-badge"
import { SF_INDEX, sfTag } from "@/lib/sf-index"
import { SF_LABELS } from "@/lib/sf-labels"
import { Command } from "cmdk"
import { BookOpen, Palette, Cloud, Component, Home, LayoutTemplate, Search } from "lucide-react"

import { CATEGORY_LABEL, ITEMS } from "@/lib/component-docs"
import { getDict, langPath, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/registry/mintel/ui/dialog"

/** ⌘K / Ctrl+K search over docs pages and every component. */
export function CommandMenu({ lang }: { lang: Lang }) {
  const t = getDict(lang)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = (path: string) => {
    setOpen(false)
    window.location.assign(langPath(lang, path))
  }

  const pages = [
    { label: "Mintel UI", path: "/", icon: Home },
    { label: t.docs.gettingStarted, path: "/getting-started", icon: BookOpen },
    { label: t.docs.themes, path: "/themes", icon: Palette },
    { label: t.docs.allComponents, path: "/components", icon: Component },
    { label: t.docs.templates, path: "/templates", icon: LayoutTemplate },
    { label: "Salesforce", path: "/salesforce", icon: Cloud },
  ]

  const itemClass =
    "flex cursor-default items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground pointer-coarse:py-3"

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "relative inline-flex h-9 items-center gap-2 rounded-full border bg-muted/50 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          "size-9 justify-center xl:w-56 xl:justify-start xl:px-3",
          "after:absolute after:-inset-1 pointer-fine:after:hidden"
        )}
      >
        <Search className="size-4 shrink-0" />
        <span className="sr-only xl:hidden">{t.docs.searchShort}</span>
        <span className="hidden flex-1 text-left xl:inline">{t.docs.search}</span>
        <kbd aria-hidden className="hidden rounded border bg-background px-1.5 font-mono text-[10px] xl:inline">⌘K</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="top-[15%] translate-y-0 overflow-hidden p-0 sm:max-w-xl">
          <DialogTitle className="sr-only">{t.docs.searchShort}</DialogTitle>
          <Command loop className="flex flex-col">
            <div className="flex items-center gap-2 border-b px-4">
              <Search className="size-4 shrink-0 opacity-50" />
              <Command.Input
                autoFocus
                placeholder={t.docs.search}
                className="h-12 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Command.List className="max-h-[60svh] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="py-8 text-center text-sm text-muted-foreground">{t.docs.noResults}</Command.Empty>
              <Command.Group heading={t.docs.pages} className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground">
                {pages.map(({ label, path, icon: Icon }) => (
                  <Command.Item key={path} value={`${label} ${path}`} onSelect={() => go(path)} className={itemClass}>
                    <Icon className="size-4 text-muted-foreground" />
                    {label}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading={t.docs.components} className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground">
                {ITEMS.filter((i) => i.name !== "mintel-theme").map((item) => (
                  <Command.Item
                    key={item.name}
                    value={item.name}
                    keywords={[item.title, CATEGORY_LABEL[item.category][lang]]}
                    onSelect={() => go(`/components/${item.name}`)}
                    className={itemClass}
                  >
                    <Component className="size-4 text-muted-foreground" />
                    <span className="flex flex-1 items-center gap-2">
                      {item.title}
                      <ItemBadge name={item.name} lang={lang} />
                    </span>
                    <span className="text-xs text-muted-foreground">{CATEGORY_LABEL[item.category][lang]}</span>
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Salesforce" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground">
                {SF_INDEX.map((c) => (
                  <Command.Item
                    key={c.name}
                    value={`sf ${c.name}`}
                    keywords={[c.label, `Mintel ${c.label}`, sfTag(c.name), "lwc", "salesforce", SF_LABELS[lang].groups[c.group]]}
                    onSelect={() => go(`/salesforce/${c.name}`)}
                    className={itemClass}
                  >
                    <Cloud className="size-4 text-muted-foreground" />
                    <span className="flex flex-1 items-center gap-2">
                      {c.label}
                      <ItemBadge name={`sf:${c.name}`} lang={lang} />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{sfTag(c.name)}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
