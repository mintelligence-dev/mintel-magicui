"use client"

import { useState } from "react"

import { Button } from "@/registry/mintel/ui/button"
import { ConfirmDialog } from "@/registry/mintel/ui/confirm-dialog"
import { toast } from "@/registry/mintel/ui/toast"

const CUSTOMERS = ["Acme Retail", "Siam Foods", "Lanna Travel"]

// One dialog for the whole list: remember which row asked.
export default function ConfirmDialogExample() {
  const [customers, setCustomers] = useState(CUSTOMERS)
  const [target, setTarget] = useState<string | null>(null)
  return (
    <div className="grid w-full max-w-sm gap-2">
      {customers.map((name) => (
        <div key={name} className="flex items-center justify-between rounded-lg border bg-card px-3 py-2 text-sm">
          {name}
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setTarget(name)}>
            Delete
          </Button>
        </div>
      ))}
      {!customers.length && (
        <Button variant="outline" onClick={() => setCustomers(CUSTOMERS)}>
          Restore the list
        </Button>
      )}
      <ConfirmDialog
        locale="en"
        destructive
        open={target !== null}
        onOpenChange={(open) => !open && setTarget(null)}
        title={`Delete ${target ?? "customer"}?`}
        description="Their cases and contacts are deleted too. This cannot be undone."
        confirmLabel="Delete"
        onConfirm={async () => {
          // Stand-in for your API call; the buttons wait for it.
          await new Promise((resolve) => setTimeout(resolve, 800))
          setCustomers((list) => list.filter((c) => c !== target))
          toast.success("Deleted")
        }}
      />
    </div>
  )
}
