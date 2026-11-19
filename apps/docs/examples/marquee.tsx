import { Marquee } from "@/registry/mintel/effects/marquee"

const channels = ["LINE", "Facebook", "TikTok", "Instagram", "X", "Pantip"]

export default function MarqueeExample() {
  return (
    <Marquee
      pauseOnHover
      className="w-full [--duration:20s] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
    >
      {channels.map((c) => (
        <span key={c} className="mx-1 rounded-full border bg-background px-4 py-1.5 text-sm font-semibold">
          {c}
        </span>
      ))}
    </Marquee>
  )
}
