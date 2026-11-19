import { useId } from "react"

/** Thailand flag (Trairanga): red, white, blue (double), white, red. */
export function FlagTH(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="9" height="6" fill="#A51931" />
      <rect y="1" width="9" height="4" fill="#F4F5F8" />
      <rect y="2" width="9" height="2" fill="#2D2A4A" />
    </svg>
  )
}

/** United Kingdom flag (Union Jack), used for English. */
export function FlagGB(props: React.ComponentProps<"svg">) {
  const id = useId().replace(/:/g, "")
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <clipPath id={`${id}-s`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}-t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}-s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}-t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

/** Round flag badge (flag cropped to a circle). */
export function RoundFlag({ lang, className }: { lang: "th" | "en"; className?: string }) {
  const Flag = lang === "th" ? FlagTH : FlagGB
  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)] ${className ?? "size-7"}`}
    >
      <Flag className="size-full" />
    </span>
  )
}
