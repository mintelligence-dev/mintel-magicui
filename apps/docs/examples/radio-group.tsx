import { Label } from "@/registry/mintel/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/mintel/ui/radio-group"

export default function RadioGroupExample() {
  return (
    <RadioGroup defaultValue="normal">
      {[
        ["low", "Low"],
        ["normal", "Normal"],
        ["high", "Urgent"],
      ].map(([value, label]) => (
        <div key={value} className="flex items-center gap-3">
          <RadioGroupItem value={value} id={`priority-${value}`} />
          <Label htmlFor={`priority-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
