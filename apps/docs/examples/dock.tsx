import { Calendar, Cloud, Home, Inbox, Settings } from "lucide-react"

import { Dock, DockItem } from "@/registry/mintel/motion/dock"

export default function DockExample() {
  return (
    <Dock>
      <DockItem label="Home"><Home /></DockItem>
      <DockItem label="Inbox"><Inbox /></DockItem>
      <DockItem label="Calendar"><Calendar /></DockItem>
      <DockItem label="Cloud"><Cloud /></DockItem>
      <DockItem label="Settings"><Settings /></DockItem>
    </Dock>
  )
}
