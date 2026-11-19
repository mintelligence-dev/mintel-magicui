"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/registry/mintel/ui/button"

export function ThemeToggle({ label = "Toggle light/dark theme" }: { label?: string }) {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark")
    try {
      localStorage.setItem("theme", dark ? "dark" : "light")
    } catch {}
  }
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={label}>
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  )
}
