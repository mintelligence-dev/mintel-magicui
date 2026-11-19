import { Info } from "lucide-react"

import { Button } from "@/registry/mintel/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/mintel/ui/tooltip"

export default function TooltipExample() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="SLA info">
          <Info />
        </Button>
      </TooltipTrigger>
      <TooltipContent>SLA: reply within 15 minutes</TooltipContent>
    </Tooltip>
  )
}
