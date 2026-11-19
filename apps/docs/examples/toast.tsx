"use client"

import { Button } from "@/registry/mintel/ui/button"
import { toast } from "@/registry/mintel/ui/toast"

// Render <Toaster /> once in your root layout, then call toast() anywhere.
export default function ToastExample() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast.success("Saved", { description: "Customer record updated" })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Couldn't connect", { description: "Check the Pantip token" })}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "Syncing...",
            success: "Sync complete",
            error: "Sync failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}
