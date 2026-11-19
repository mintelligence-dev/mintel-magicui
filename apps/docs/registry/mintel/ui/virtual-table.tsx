"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { ArrowUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type VirtualTableProps<TData> = {
  columns: ColumnDef<TData, any>[] // eslint-disable-line @typescript-eslint/no-explicit-any
  data: TData[]
  /** Height of the scroll area in px. */
  height?: number
  /** Estimated row height in px (rows may be taller; they are measured). */
  rowHeight?: number
  /** Accessible name of the table. */
  label: string
  onRowClick?: (row: TData) => void
  className?: string
}

/**
 * Table for thousands of rows: only the rows in view are rendered (TanStack Virtual), with a sticky
 * header and sortable columns. Stays a real <table> with aria-rowcount / aria-rowindex for screen readers.
 */
function VirtualTable<TData>({ columns, data, height = 480, rowHeight = 44, label, onRowClick, className }: VirtualTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  const rows = table.getRowModel().rows
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan: 8,
  })
  const items = virtualizer.getVirtualItems()
  const before = items[0]?.start ?? 0
  const after = items.length ? virtualizer.getTotalSize() - items[items.length - 1].end : 0
  const colCount = table.getVisibleLeafColumns().length

  return (
    <div
      ref={scrollRef}
      tabIndex={0}
      role="region"
      aria-label={label}
      style={{ height }}
      data-slot="virtual-table"
      className={cn("relative overflow-auto rounded-xl border bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring/40", className)}
    >
      <table aria-label={label} aria-rowcount={rows.length + 1} className="w-full caption-bottom border-separate border-spacing-0 text-sm">
        <thead className="sticky top-0 z-10 bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/75">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id} aria-rowindex={1}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                const canSort = header.column.getCanSort()
                return (
                  <th
                    key={header.id}
                    aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    className="h-10 border-b px-3 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-muted-foreground uppercase"
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn("-ml-2 inline-flex h-8 items-center gap-1.5 rounded-md px-2 [font:inherit] [letter-spacing:inherit] [text-transform:inherit] transition-colors hover:bg-muted hover:text-foreground", sorted && "text-brand")}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpIcon
                          aria-hidden
                          className={cn(
                            "size-3.5 transition-[rotate,opacity] duration-500 ease-spring-snappy motion-reduce:transition-none",
                            !sorted && "opacity-0",
                            sorted === "desc" && "rotate-180"
                          )}
                        />
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {before > 0 && (
            <tr aria-hidden>
              <td colSpan={colCount} style={{ height: before, padding: 0 }} />
            </tr>
          )}
          {items.map((v) => {
            const row = rows[v.index]
            return (
              <tr
                key={row.id}
                data-index={v.index}
                ref={virtualizer.measureElement}
                aria-rowindex={v.index + 2}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                // Clickable rows must work from the keyboard too.
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.target !== e.currentTarget || (e.key !== "Enter" && e.key !== " ")) return
                        e.preventDefault()
                        onRowClick(row.original)
                      }
                    : undefined
                }
                className={cn("transition-colors hover:bg-muted/60", onRowClick && "cursor-pointer outline-none focus-visible:bg-muted/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring")}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border-b px-3 py-2.5 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
          {after > 0 && (
            <tr aria-hidden>
              <td colSpan={colCount} style={{ height: after, padding: 0 }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export { VirtualTable }
