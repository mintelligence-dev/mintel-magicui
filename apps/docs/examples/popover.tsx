import { Button } from "@/registry/mintel/ui/button"
import { Label } from "@/registry/mintel/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/mintel/ui/popover"
import { Switch } from "@/registry/mintel/ui/switch"

export default function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Quick settings</Button>
      </PopoverTrigger>
      <PopoverContent className="grid gap-3">
        <p className="font-heading text-sm font-semibold">Notifications</p>
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="sound">Notification sound</Label>
          <Switch id="sound" size="sm" defaultChecked />
        </div>
      </PopoverContent>
    </Popover>
  )
}
