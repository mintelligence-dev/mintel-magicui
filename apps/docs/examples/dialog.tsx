"use client"

import { Button } from "@/registry/mintel/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/mintel/ui/dialog"
import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"

export default function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">Add connector</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a social connector</DialogTitle>
          <DialogDescription>Connect a social channel to your Salesforce org.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="connector-name">Connector name</Label>
          <Input id="connector-name" placeholder="e.g. Main LINE OA" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
