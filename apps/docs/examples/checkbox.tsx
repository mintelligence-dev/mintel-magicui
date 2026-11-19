import { Checkbox } from "@/registry/mintel/ui/checkbox"
import { Label } from "@/registry/mintel/ui/label"

export default function CheckboxExample() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">Accept the terms of use</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="some" checked="indeterminate" />
        <Label htmlFor="some">Some channels selected</Label>
      </div>
    </div>
  )
}
