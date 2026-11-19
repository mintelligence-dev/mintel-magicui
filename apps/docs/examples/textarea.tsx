import { Label } from "@/registry/mintel/ui/label"
import { Textarea } from "@/registry/mintel/ui/textarea"

export default function TextareaExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="details">Details</Label>
      <Textarea id="details" placeholder="Describe the issue briefly — the field grows as you type." />
    </div>
  )
}
