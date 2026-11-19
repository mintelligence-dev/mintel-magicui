"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { VirtualTable } from "@/registry/mintel/ui/virtual-table"

type Case = { no: string; subject: string; channel: string; status: string; amount: number }

const SUBJECTS = ["LINE OA message not syncing", "Refund request", "Change delivery address", "Invoice copy", "Login problem", "Upgrade plan"]
const CHANNELS = ["LINE", "Facebook", "Email", "Phone", "Web"]
const STATUSES = ["New", "Working", "Escalated", "Closed"]

// 10,000 rows, generated from the index (no randomness, so every render is the same).
const DATA: Case[] = Array.from({ length: 10_000 }, (_, i) => ({
  no: String(10_000 + i).padStart(8, "0"),
  subject: SUBJECTS[(i * 7) % SUBJECTS.length],
  channel: CHANNELS[(i * 3) % CHANNELS.length],
  status: STATUSES[(i * 5) % STATUSES.length],
  amount: ((i * 7919) % 50_000) + 500,
}))

const baht = new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 })

const COLUMNS: ColumnDef<Case>[] = [
  { accessorKey: "no", header: "Case" },
  { accessorKey: "subject", header: "Subject", enableSorting: false },
  { accessorKey: "channel", header: "Channel" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => <span className="tabular-nums">{baht.format(getValue<number>())}</span> },
]

export default function VirtualTableExample() {
  return <VirtualTable label="Cases (10,000)" columns={COLUMNS} data={DATA} height={420} className="w-full" />
}
