import { ScrollRevealText } from "@/registry/mintel/motion/scroll-reveal-text"

export default function ScrollRevealTextExample() {
  return (
    <ScrollRevealText
      as="h3"
      locale="en"
      className="max-w-xl font-heading text-3xl leading-tight font-semibold"
      text="Every tap and every scroll responds naturally, like a real object with weight."
    />
  )
}
