"use client"

import { useState } from "react"
import { FileTextIcon, FolderIcon, ImageIcon } from "lucide-react"

import { TreeView, type TreeNode } from "@/registry/mintel/ui/tree-view"

const folder = <FolderIcon />
const file = <FileTextIcon />

const ITEMS: TreeNode[] = [
  {
    id: "contracts",
    label: "Contracts",
    icon: folder,
    children: [
      { id: "2569", label: "2569", icon: folder, children: [
        { id: "c-001", label: "Acme Retail – MSA.pdf", icon: file },
        { id: "c-002", label: "Acme Retail – SOW 2.pdf", icon: file },
      ] },
      { id: "templates", label: "Templates", icon: folder, children: [{ id: "t-001", label: "NDA (Thai).docx", icon: file }] },
    ],
  },
  { id: "invoices", label: "Invoices", icon: folder, children: [{ id: "i-001", label: "INV-2569-0042.pdf", icon: file }] },
  { id: "logo", label: "Logo.png", icon: <ImageIcon /> },
  { id: "archive", label: "Archive (read only)", icon: folder, disabled: true },
]

export default function TreeViewExample() {
  const [selected, setSelected] = useState<string | null>("c-001")
  return (
    <div className="grid w-full max-w-sm gap-3">
      <TreeView items={ITEMS} defaultExpanded={["contracts", "2569"]} selected={selected} onSelect={setSelected} aria-label="Documents" />
      <p className="text-xs text-muted-foreground">
        Selected: <code className="font-mono">{selected ?? "none"}</code>
      </p>
    </div>
  )
}
