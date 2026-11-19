import { Button } from "@/registry/mintel/ui/button"
import { Input } from "@/registry/mintel/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/mintel/mobile/drawer"

export default function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="brand">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Message the customer</DrawerTitle>
          <DrawerDescription>Sent through LINE OA · drag the handle down to close</DrawerDescription>
        </DrawerHeader>
        <Input placeholder="Type a message..." />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Send</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
