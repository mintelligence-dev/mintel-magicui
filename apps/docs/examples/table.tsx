import { Badge } from "@/registry/mintel/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/mintel/ui/table"

const rows = [
  { channel: "LINE", messages: 842, status: "Online" },
  { channel: "Facebook", messages: 311, status: "Online" },
  { channel: "TikTok", messages: 96, status: "Syncing" },
  { channel: "Pantip", messages: 35, status: "Error" },
] as const

export default function TableExample() {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead className="text-right">Messages</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.channel}>
              <TableCell className="font-medium">{r.channel}</TableCell>
              <TableCell className="text-right tabular-nums">{r.messages}</TableCell>
              <TableCell>
                <Badge variant={r.status === "Online" ? "success" : r.status === "Syncing" ? "warning" : "destructive"}>
                  {r.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
