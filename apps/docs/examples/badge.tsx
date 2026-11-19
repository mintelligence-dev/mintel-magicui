import { Badge } from "@/registry/mintel/ui/badge"

export default function BadgeExample() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="success">Online</Badge>
      <Badge variant="warning">Syncing</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}
