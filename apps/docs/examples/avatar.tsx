import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/registry/mintel/ui/avatar"

// A tiny inline illustration so the demo does not depend on an external image host.
const PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#06B6D4"/><stop offset="1" stop-color="#7040F2"/></linearGradient></defs><rect width="96" height="96" fill="url(#g)"/><circle cx="48" cy="38" r="17" fill="#fff" fill-opacity=".9"/><path d="M16 96c4-20 17-30 32-30s28 10 32 30z" fill="#fff" fill-opacity=".9"/></svg>'
  )

export default function AvatarExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar size="lg" status="online" ring>
        <AvatarImage src={PHOTO} alt="Nina" />
        <AvatarFallback>NP</AvatarFallback>
      </Avatar>
      <Avatar status="away">
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar size="sm" status="busy">
        <AvatarFallback>TW</AvatarFallback>
      </Avatar>
      <AvatarGroup max={4}>
        {["AN", "BT", "CK", "DP", "EM", "FR"].map((x) => (
          <Avatar key={x}>
            <AvatarFallback>{x}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  )
}
