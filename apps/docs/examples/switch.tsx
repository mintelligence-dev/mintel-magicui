import { Label } from "@/registry/mintel/ui/label"
import { Switch } from "@/registry/mintel/ui/switch"

export default function SwitchExample() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Switch id="notify" defaultChecked />
        <Label htmlFor="notify">Notify me about new cases</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="compact" size="sm" />
        <Label htmlFor="compact">Compact mode</Label>
      </div>
    </div>
  )
}
