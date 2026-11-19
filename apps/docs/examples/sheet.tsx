import { Button } from "@/registry/mintel/ui/button"
import { Input } from "@/registry/mintel/ui/input"
import { Label } from "@/registry/mintel/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/mintel/ui/sheet"

export default function SheetExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Sheet>
        <SheetTrigger className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">
          Edit contact
        </SheetTrigger>
        <SheetContent closeLabel="Close">
          <SheetHeader>
            <SheetTitle>Edit contact</SheetTitle>
            <SheetDescription>Changes sync to Salesforce when you save.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sheet-name">Name</Label>
              <Input id="sheet-name" defaultValue="Nina Park" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-phone">Phone</Label>
              <Input id="sheet-phone" defaultValue="081 234 5678" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-semibold">Cancel</SheetClose>
            <Button variant="brand">Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger className="inline-flex h-9 items-center rounded-md border px-4 text-sm font-semibold">Bottom sheet</SheetTrigger>
        <SheetContent side="bottom" closeLabel="Close">
          <SheetHeader>
            <SheetTitle>Share case</SheetTitle>
            <SheetDescription>Great for mobile: it rises from the bottom and respects the safe area.</SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-3 gap-2">
            {["LINE", "Email", "Copy link"].map((x) => (
              <Button key={x} variant="secondary">
                {x}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
