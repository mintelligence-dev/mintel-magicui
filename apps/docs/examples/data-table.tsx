"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/registry/mintel/ui/badge"
import { DataTable, DataTableColumnHeader } from "@/registry/mintel/ui/data-table"

type Case = { id: string; customer: string; channel: string; status: "New" | "Working" | "Escalated" | "Closed"; amount: number }

const STATUS_VARIANT = { New: "soft", Working: "secondary", Escalated: "destructive", Closed: "success" } as const

const columns: ColumnDef<Case>[] = [
  { accessorKey: "id", header: ({ column }) => <DataTableColumnHeader column={column} title="Case" />, cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span> },
  { accessorKey: "customer", header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" /> },
  { accessorKey: "channel", header: "Channel", enableSorting: false },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <Badge variant={STATUS_VARIANT[row.original.status]}>{row.original.status}</Badge>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order (THB)" className="ml-auto" />,
    cell: ({ row }) => <span className="block text-right tabular-nums">{row.original.amount.toLocaleString()}</span>,
  },
]

const customers = ["Acme Retail", "Siam Foods", "Bangkok Motors", "Chiang Mai Crafts", "Phuket Travel", "Thai Silk Co.", "Korat Steel"]
const channels = ["LINE", "Facebook", "TikTok", "WhatsApp"]
const statuses: Case["status"][] = ["New", "Working", "Escalated", "Closed"]
const data: Case[] = Array.from({ length: 23 }, (_, i) => ({
  id: `0001${(2300 + i * 7).toString()}`,
  customer: customers[i % customers.length],
  channel: channels[(i * 3) % channels.length],
  status: statuses[(i * 5) % statuses.length],
  amount: ((i * 7919) % 48000) + 1200,
}))

export default function DataTableExample() {
  return <DataTable className="w-full" columns={columns} data={data} selectable pageSize={5} />
}
