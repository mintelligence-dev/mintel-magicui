import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"

export default function LabelExample() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@company.com" />
    </div>
  )
}
