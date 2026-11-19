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

const places = ["Siam Paragon", "CentralWorld", "ICONSIAM", "EmQuartier", "Mega Bangna", "Central Ladprao", "The Mall Bangkapi", "Terminal 21"]

export default function DrawerExample() {
  return (
    <div className="flex flex-wrap gap-3">
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

    {/* Rests at 40% or 90% of the screen: drag the handle, or press it to step between heights */}
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Pick a store</Button>
      </DrawerTrigger>
      <DrawerContent snapPoints={[0.4, 0.9]}>
        <DrawerHeader>
          <DrawerTitle>Nearby stores</DrawerTitle>
          <DrawerDescription>Drag up for the full list</DrawerDescription>
        </DrawerHeader>
        <ul className="grid gap-1 pb-4">
          {places.map((p, i) => (
            <li key={p} className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-muted">
              <span className="font-medium">{p}</span>
              <span className="text-sm text-muted-foreground tabular-nums">{(0.6 + i * 0.7).toFixed(1)} km</span>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
    </div>
  )
}
