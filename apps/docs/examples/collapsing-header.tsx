import { ChevronLeftIcon, PlusIcon, SearchIcon } from "lucide-react"

import { Button } from "@/registry/mintel/ui/button"
import { CollapsingHeader } from "@/registry/mintel/ui/collapsing-header"
import { GroupedList, GroupedRow, GroupedSection } from "@/registry/mintel/ui/grouped-list"
import { Input } from "@/registry/mintel/ui/input"

const chats = [
  ["Acme Retail", "Where is my order?", "09:12"],
  ["Siam Foods", "Thanks, received!", "08:47"],
  ["Bangkok Motors", "Can I change the delivery date?", "Yesterday"],
  ["Chiang Mai Crafts", "Invoice attached", "Yesterday"],
  ["Phuket Travel", "Is the tour still available?", "Mon"],
  ["Thai Silk Co.", "Sample sizes please", "Mon"],
  ["Korat Steel", "Quote approved", "Sun"],
  ["Nimit Co.", "Call me back", "Sat"],
] as const

export default function CollapsingHeaderExample() {
  // A phone-sized scroll area; on a real page the header follows the window scroll the same way.
  return (
    <div className="h-[30rem] w-full max-w-sm overflow-y-auto rounded-3xl border bg-grouped">
      <CollapsingHeader
        title="Inbox"
        leading={
          <Button variant="ghost" size="sm" className="-ml-2 text-brand">
            <ChevronLeftIcon />
            Back
          </Button>
        }
        trailing={
          <Button variant="ghost" size="icon" aria-label="New chat" className="text-brand">
            <PlusIcon />
          </Button>
        }
      >
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" aria-label="Search chats" className="border-0 bg-secondary pl-9" />
        </div>
      </CollapsingHeader>
      <GroupedList className="pt-1">
        <GroupedSection header="Today and earlier">
          {chats.map(([name, text, time]) => (
            <GroupedRow key={name} title={name} description={text} value={<span className="text-xs">{time}</span>} href="#" />
          ))}
        </GroupedSection>
      </GroupedList>
    </div>
  )
}
