import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Static export so the docs + registry JSON (public/r) can be hosted anywhere (GitHub Pages, Vercel, S3).
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
}

export default nextConfig
