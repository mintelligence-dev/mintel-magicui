import { ArrowRight, Mail } from "lucide-react"

import { Button } from "@/registry/mintel/ui/button"

export default function ButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button>Default</Button>
      <Button variant="brand">
        Get started <ArrowRight />
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">
        <Mail /> Email
      </Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
