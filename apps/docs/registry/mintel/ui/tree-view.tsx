"use client"

import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type TreeNode = {
  id: string
  label: React.ReactNode
  /** Shown before the label, e.g. a folder or file icon. */
  icon?: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

type Flat = { node: TreeNode; level: number; parent?: string; index: number; size: number }

/** Visible rows in order: a node's children only when it is expanded. */
function flatten(nodes: TreeNode[], expanded: Set<string>, level = 1, parent?: string, out: Flat[] = []) {
  nodes.forEach((node, index) => {
    out.push({ node, level, parent, index, size: nodes.length })
    if (node.children?.length && expanded.has(node.id)) flatten(node.children, expanded, level + 1, node.id, out)
  })
  return out
}

type TreeViewProps = Omit<React.ComponentProps<"ul">, "onSelect"> & {
  items: TreeNode[]
  /** Ids open at first (uncontrolled). */
  defaultExpanded?: string[]
  expanded?: string[]
  onExpandedChange?: (ids: string[]) => void
  selected?: string | null
  defaultSelected?: string | null
  onSelect?: (id: string, node: TreeNode) => void
}

/**
 * Hierarchical list (files, org units, categories) following the WAI-ARIA tree pattern: arrow keys move
 * and open/close, Home/End jump, Enter or Space selects, typing a letter jumps to the next match.
 * Children open with a height spring; the chevron turns.
 */
function TreeView({
  items,
  defaultExpanded = [],
  expanded: expandedProp,
  onExpandedChange,
  selected: selectedProp,
  defaultSelected = null,
  onSelect,
  className,
  ...props
}: TreeViewProps) {
  const [expandedState, setExpandedState] = React.useState(() => new Set(defaultExpanded))
  const expanded = React.useMemo(() => (expandedProp ? new Set(expandedProp) : expandedState), [expandedProp, expandedState])
  const [selectedState, setSelectedState] = React.useState<string | null>(defaultSelected)
  const selected = selectedProp !== undefined ? selectedProp : selectedState
  const rows = React.useMemo(() => flatten(items, expanded), [items, expanded])
  const [focused, setFocused] = React.useState<string | undefined>(undefined)
  // The tab stop must be a visible row: a selected node inside a collapsed branch cannot take it.
  const visible = (id: string | null | undefined) => id != null && rows.some((r) => r.node.id === id)
  const focusId = visible(focused) ? focused : visible(selected) ? selected! : rows[0]?.node.id
  const refs = React.useRef(new Map<string, HTMLLIElement>())

  const setExpanded = (next: Set<string>) => {
    if (!expandedProp) setExpandedState(next)
    onExpandedChange?.([...next])
  }
  const toggle = (id: string, open?: boolean) => {
    const next = new Set(expanded)
    const willOpen = open ?? !next.has(id)
    if (willOpen) next.add(id)
    else next.delete(id)
    setExpanded(next)
  }
  const select = (node: TreeNode) => {
    if (node.disabled) return
    if (selectedProp === undefined) setSelectedState(node.id)
    onSelect?.(node.id, node)
  }
  const focus = (id: string | undefined) => {
    if (!id) return
    setFocused(id)
    refs.current.get(id)?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent, row: Flat) => {
    const i = rows.findIndex((r) => r.node.id === row.node.id)
    const hasChildren = !!row.node.children?.length
    const open = expanded.has(row.node.id)
    switch (e.key) {
      case "ArrowDown":
        focus(rows[i + 1]?.node.id)
        break
      case "ArrowUp":
        focus(rows[i - 1]?.node.id)
        break
      case "ArrowRight":
        if (hasChildren && !open) toggle(row.node.id, true)
        else if (hasChildren) focus(rows[i + 1]?.node.id)
        break
      case "ArrowLeft":
        if (hasChildren && open) toggle(row.node.id, false)
        else focus(row.parent)
        break
      case "Home":
        focus(rows[0]?.node.id)
        break
      case "End":
        focus(rows[rows.length - 1]?.node.id)
        break
      case "Enter":
      case " ":
        select(row.node)
        if (hasChildren && e.key === "Enter") toggle(row.node.id)
        break
      default: {
        if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return
        const ch = e.key.toLowerCase()
        const order = [...rows.slice(i + 1), ...rows.slice(0, i + 1)]
        const hit = order.find((r) => typeof r.node.label === "string" && r.node.label.toLowerCase().startsWith(ch))
        if (!hit) return
        focus(hit.node.id)
      }
    }
    e.preventDefault()
  }

  const renderLevel = (nodes: TreeNode[], level: number, parent?: string): React.ReactNode =>
    nodes.map((node, index) => {
      const row: Flat = { node, level, parent, index, size: nodes.length }
      const hasChildren = !!node.children?.length
      const open = expanded.has(node.id)
      const isSelected = selected === node.id
      return (
        <li
          key={node.id}
          ref={(el) => {
            if (el) refs.current.set(node.id, el)
            else refs.current.delete(node.id)
          }}
          role="treeitem"
          aria-level={level}
          aria-setsize={nodes.length}
          aria-posinset={index + 1}
          aria-expanded={hasChildren ? open : undefined}
          aria-selected={isSelected}
          aria-disabled={node.disabled || undefined}
          tabIndex={node.id === focusId ? 0 : -1}
          onKeyDown={(e) => {
            if (e.target === e.currentTarget) onKeyDown(e, row)
          }}
          onFocus={(e) => {
            if (e.target === e.currentTarget) setFocused(node.id)
          }}
          className="outline-none [&:focus-visible>div]:ring-2 [&:focus-visible>div]:ring-ring/50"
        >
          <div
            onClick={() => {
              focus(node.id)
              select(node)
              if (hasChildren) toggle(node.id)
            }}
            style={{ paddingInlineStart: `${(level - 1) * 1.25 + 0.5}rem` }}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg py-1.5 pr-2 text-sm transition-colors duration-200 select-none",
              isSelected ? "bg-brand/10 font-medium text-brand" : "hover:bg-muted",
              node.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent"
            )}
          >
            <ChevronRightIcon
              aria-hidden
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-spring-snappy motion-reduce:transition-none",
                open && "rotate-90",
                !hasChildren && "invisible"
              )}
            />
            {node.icon && <span className="flex shrink-0 text-muted-foreground [&_svg]:size-4">{node.icon}</span>}
            <span className="min-w-0 truncate">{node.label}</span>
          </div>
          {hasChildren && (
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-spring-smooth motion-reduce:transition-none",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              {/* Kept mounted so closing animates too; inert keeps hidden rows out of focus and the a11y tree. */}
              <ul role="group" inert={!open || undefined} className="min-h-0 overflow-hidden">
                {renderLevel(node.children!, level + 1, node.id)}
              </ul>
            </div>
          )}
        </li>
      )
    })

  return (
    <ul role="tree" data-slot="tree-view" className={cn("grid gap-0.5", className)} {...props}>
      {renderLevel(items, 1)}
    </ul>
  )
}

export { TreeView }
