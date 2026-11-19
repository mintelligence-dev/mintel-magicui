"use client"

import { useState } from "react"
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/registry/mintel/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/mintel/ui/dropdown-menu"

export default function DropdownMenuExample() {
  const [showClosed, setShowClosed] = useState(true)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Case options">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Manage case</DropdownMenuLabel>
        <DropdownMenuItem>
          <Pencil /> Edit <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy /> Copy link
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem checked={showClosed} onCheckedChange={setShowClosed}>
          Show closed cases
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
