import { InboxIcon, PlusIcon } from "lucide-react"

import { Button } from "@/registry/mintel/ui/button"
import { EmptyState } from "@/registry/mintel/ui/empty-state"

export default function EmptyStateExample() {
  return (
    <EmptyState
      className="w-full max-w-md"
      icon={<InboxIcon />}
      title="No cases yet"
      description="When customers message you on LINE, Facebook or TikTok, their cases will show up here."
      action={
        <>
          <Button variant="brand">
            <PlusIcon />
            New case
          </Button>
          <Button variant="outline">Connect a channel</Button>
        </>
      }
    />
  )
}
