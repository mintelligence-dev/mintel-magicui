"use client"

import * as React from "react"

import { Button } from "@/registry/mintel/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/registry/mintel/ui/dialog"

const LABELS = {
  th: { confirm: "ยืนยัน", cancel: "ยกเลิก", working: "กำลังดำเนินการ…", failed: "ทำรายการไม่สำเร็จ ลองอีกครั้ง" },
  en: { confirm: "Confirm", cancel: "Cancel", working: "Working…", failed: "That did not work. Please try again." },
}

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The question, e.g. "Delete this customer?". */
  title: React.ReactNode
  /** What will happen, and whether it can be undone. */
  description?: React.ReactNode
  /**
   * Runs when the user confirms. If it returns a promise, the buttons wait for it: the dialog closes
   * when it resolves and stays open with an error when it rejects.
   */
  onConfirm: () => void | Promise<void>
  confirmLabel?: string
  cancelLabel?: string
  /** Red confirm button, and focus starts on Cancel, for actions that cannot be undone. */
  destructive?: boolean
  locale?: "th" | "en"
}

/**
 * "Are you sure?" before an action. Controlled with `open` / `onOpenChange`, so one dialog can serve a whole
 * list. Announced as an alert dialog; Escape and the overlay cancel, except while the action is running.
 */
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel,
  cancelLabel,
  destructive = false,
  locale = "th",
}: ConfirmDialogProps) {
  const t = LABELS[locale]
  const [pending, setPending] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const confirmRef = React.useRef<HTMLButtonElement>(null)

  // A fresh dialog each time it opens.
  React.useEffect(() => {
    if (open) setFailed(false)
  }, [open])

  const confirm = async () => {
    if (pending) return
    setFailed(false)
    try {
      const result = onConfirm()
      if (result instanceof Promise) {
        setPending(true)
        await result
      }
      onOpenChange(false)
    } catch {
      setFailed(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !pending && onOpenChange(next)}>
      <DialogContent
        role="alertdialog"
        showCloseButton={false}
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => {
          // The safe choice gets focus for destructive actions, so Enter does not delete by reflex.
          e.preventDefault()
          ;(destructive ? cancelRef : confirmRef).current?.focus()
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {failed && (
          <p role="alert" className="text-sm text-destructive">
            {t.failed}
          </p>
        )}
        <DialogFooter>
          <Button ref={cancelRef} variant="outline" disabled={pending} onClick={() => onOpenChange(false)}>
            {cancelLabel ?? t.cancel}
          </Button>
          <Button ref={confirmRef} variant={destructive ? "destructive" : "default"} aria-busy={pending || undefined} disabled={pending} onClick={confirm}>
            {pending ? t.working : (confirmLabel ?? t.confirm)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ConfirmDialog }
