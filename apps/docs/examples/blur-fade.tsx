import { BlurFade } from "@/registry/mintel/effects/blur-fade"

export default function BlurFadeExample() {
  return (
    <div className="grid gap-2 text-center">
      {["Fades in", "as you", "scroll"].map((word, i) => (
        <BlurFade key={word} inView delay={0.1 + i * 0.12}>
          <p className="font-heading text-2xl font-semibold">{word}</p>
        </BlurFade>
      ))}
    </div>
  )
}
