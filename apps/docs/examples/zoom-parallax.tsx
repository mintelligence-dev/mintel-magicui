import { ZoomParallax } from "@/registry/mintel/motion/zoom-parallax"

export default function ZoomParallaxExample() {
  return (
    <ZoomParallax
      height="160svh"
      overlay={<p className="font-heading text-4xl font-bold text-white">Customer Experience</p>}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, var(--brand), var(--brand-accent))" }}
      />
    </ZoomParallax>
  )
}
