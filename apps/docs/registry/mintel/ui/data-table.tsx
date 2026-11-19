"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/mintel/ui/checkbox"
import { Input } from "@/registry/mintel/ui/input"
import { Pagination } from "@/registry/mintel/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/mintel/ui/table"

const LABELS = {
  en: {
    search: "Search…",
    empty: "No results.",
    selected: (n: number, total: number) => `${n} of ${total} selected`,
    rows: (from: number, to: number, total: number) => `${from}–${to} of ${total}`,
    selectAll: "Select all",
    selectRow: "Select row",
  },
  th: {
    search: "ค้นหา…",
    empty: "ไม่พบข้อมูล",
    selected: (n: number, total: number) => `เลือก ${n} จาก ${total}`,
    rows: (from: number, to: number, total: number) => `${from}–${to} จาก ${total}`,
    selectAll: "เลือกทั้งหมด",
    selectRow: "เลือกแถว",
  },
}

/** Sortable column header: click to cycle ascending → descending → off. */
function DataTableColumnHeader<TData>({ column, title, className }: { column: Column<TData>; title: string; className?: string }) {
  if (!column.getCanSort()) return <span className={className}>{title}</span>
  const sorted = column.getIsSorted()
  const Icon = sorted === "asc" ? ArrowUpIcon : sorted === "desc" ? ArrowDownIcon : ArrowUpDownIcon
  return (
    <button
      type="button"
      onClick={column.getToggleSortingHandler()}
      className={cn("-ml-2 inline-flex h-8 items-center gap-1.5 rounded-md px-2 [font:inherit] [letter-spacing:inherit] [text-transform:inherit] transition-colors hover:bg-muted hover:text-foreground", sorted && "text-brand", className)}
    >
      {title}
      <Icon className={cn("size-3.5", !sorted && "opacity-50")} />
    </button>
  )
}

/**
 * Table with search, sortable columns, optional row selection and pagination, built on TanStack Table.
 * Define `columns` with TanStack's ColumnDef; use DataTableColumnHeader for sortable headers.
 */
function DataTable<TData, TValue>({
  columns,
  data,
  searchable = true,
  selectable = false,
  pageSize = 10,
  locale = "en",
  onSelectionChange,
  toolbar,
  className,
}: {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchable?: boolean
  selectable?: boolean
  pageSize?: number
  locale?: "en" | "th"
  onSelectionChange?: (rows: TData[]) => void
  /** Extra controls shown next to the search box (filters, buttons …). */
  toolbar?: React.ReactNode
  className?: string
}) {
  const t = LABELS[locale]
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const allColumns = React.useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!selectable) return columns
    const select: ColumnDef<TData, TValue> = {
      id: "__select",
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          aria-label={t.selectAll}
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => <Checkbox aria-label={t.selectRow} checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />,
    }
    return [select, ...columns]
  }, [columns, selectable, t])

  const table = useReactTable({
    data,
    columns: allColumns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: selectable,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })

  const selectedRows = table.getSelectedRowModel().rows
  React.useEffect(() => {
    onSelectionChange?.(selectedRows.map((r) => r.original))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection])

  const { pageIndex } = table.getState().pagination
  const total = table.getFilteredRowModel().rows.length
  const from = total === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min(total, (pageIndex + 1) * pageSize)

  return (
    <div data-slot="data-table" className={cn("grid gap-3", className)}>
      {(searchable || toolbar) && (
        <div className="flex flex-wrap items-center gap-2">
          {searchable && (
            <div className="relative w-full max-w-xs">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={globalFilter}
                onChange={(e) => {
                  setGlobalFilter(e.target.value)
                  table.setPageIndex(0)
                }}
                placeholder={t.search}
                aria-label={t.search}
                className="pl-9"
              />
            </div>
          )}
          {toolbar}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    aria-sort={
                      header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : undefined
                    }
                    className={header.column.id === "__select" ? "w-10" : undefined}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={allColumns.length} className="h-24 text-center text-muted-foreground">
                  {t.empty}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <span className="tabular-nums">{selectable && selectedRows.length > 0 ? t.selected(selectedRows.length, total) : t.rows(from, to, total)}</span>
        {table.getPageCount() > 1 && (
          <Pagination
            locale={locale}
            page={pageIndex + 1}
            pageCount={table.getPageCount()}
            onPageChange={(p) => table.setPageIndex(p - 1)}
          />
        )}
      </div>
    </div>
  )
}

export { DataTable, DataTableColumnHeader }
