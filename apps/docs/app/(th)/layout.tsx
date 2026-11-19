import { RootShell, rootMetadata, rootViewport } from "@/components/root-shell"

export const metadata = rootMetadata("th")
export const viewport = rootViewport

export default function ThaiLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="th">{children}</RootShell>
}
