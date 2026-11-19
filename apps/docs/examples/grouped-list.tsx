"use client"

import { useState } from "react"
import { BellIcon, GlobeIcon, LockIcon, LogOutIcon, MessageCircleIcon, MoonIcon, UserRoundIcon } from "lucide-react"

import { GroupedList, GroupedRow, GroupedSection } from "@/registry/mintel/ui/grouped-list"
import { Switch } from "@/registry/mintel/ui/switch"

export default function GroupedListExample() {
  const [notify, setNotify] = useState(true)
  const [dark, setDark] = useState(false)
  return (
    <GroupedList className="w-full max-w-md rounded-2xl">
      <GroupedSection>
        <GroupedRow icon={<UserRoundIcon />} title="Nina Park" description="Admin · Mintel Desk" href="#" />
      </GroupedSection>

      <GroupedSection header="Preferences" footer="Notifications are sent to the Mintel app and LINE.">
        <GroupedRow
          icon={<BellIcon />}
          iconTone="red"
          title="Notifications"
          trailing={<Switch checked={notify} onCheckedChange={setNotify} aria-label="Notifications" />}
        />
        <GroupedRow
          icon={<MoonIcon />}
          iconTone="purple"
          title="Dark mode"
          trailing={<Switch checked={dark} onCheckedChange={setDark} aria-label="Dark mode" />}
        />
        <GroupedRow icon={<GlobeIcon />} iconTone="blue" title="Language" value="English" onClick={() => {}} />
      </GroupedSection>

      <GroupedSection header="Account">
        <GroupedRow icon={<MessageCircleIcon />} iconTone="green" title="Connected channels" value="3" href="#" />
        <GroupedRow icon={<LockIcon />} iconTone="gray" title="Privacy & security" href="#" />
      </GroupedSection>

      <GroupedSection>
        <GroupedRow icon={<LogOutIcon />} iconTone="red" title="Sign out" destructive onClick={() => {}} />
      </GroupedSection>
    </GroupedList>
  )
}
