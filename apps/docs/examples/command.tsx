"use client"

import { useState } from "react"
import { BarChart3, FilePlus2, Inbox, Moon, Search, Settings, UserRound } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/mintel/ui/command"

export default function CommandExample() {
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState<string>()
  const run = (label: string) => {
    setLast(label)
    setOpen(false)
  }
  return (
    <div className="grid justify-items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-72 items-center gap-2 rounded-full border bg-background px-4 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-muted"
      >
        <Search className="size-4" />
        Search or jump to…
        <kbd className="ml-auto rounded border bg-muted px-1.5 font-mono text-xs">⌘K</kbd>
      </button>
      <p className="h-5 text-sm text-muted-foreground">{last && `Ran: ${last}`}</p>
      {/* shortcut={false} only because this docs site already uses ⌘K for search */}
      <CommandDialog open={open} onOpenChange={setOpen} shortcut={false}>
        <CommandInput placeholder="Type a command or search… (ไทยก็ได้)" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Go to">
            <CommandItem onSelect={() => run("Inbox")} keywords={["กล่องข้อความ", "แชต"]}>
              <Inbox /> Inbox <CommandShortcut>G I</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => run("Customers")} keywords={["ลูกค้า"]}>
              <UserRound /> Customers
            </CommandItem>
            <CommandItem onSelect={() => run("Reports")} keywords={["รายงาน"]}>
              <BarChart3 /> Reports
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => run("New case")} keywords={["เคสใหม่"]}>
              <FilePlus2 /> New case <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => run("Toggle dark mode")} keywords={["โหมดมืด"]}>
              <Moon /> Toggle dark mode
            </CommandItem>
            <CommandItem onSelect={() => run("Settings")} keywords={["ตั้งค่า"]}>
              <Settings /> Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
