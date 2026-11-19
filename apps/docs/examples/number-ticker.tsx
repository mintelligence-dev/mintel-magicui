import { NumberTicker } from "@/registry/mintel/effects/number-ticker"

export default function NumberTickerExample() {
  return (
    <p className="flex items-baseline gap-2">
      <NumberTicker value={98765} className="font-heading text-5xl font-bold text-brand dark:text-brand" />
      <span className="text-muted-foreground">messages</span>
    </p>
  )
}
