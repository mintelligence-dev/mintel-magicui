import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans_Thai, JetBrains_Mono, Manrope, Rubik } from "next/font/google"

import { Toaster } from "@/registry/mintel/ui/toast"

import "./globals.css"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" })
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
})
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Mintel UI",
  description:
    "M-Intelligence design system — brand tokens for React and Salesforce LWC, plus animated components via shadcn registry.",
}

// viewport-fit=cover enables env(safe-area-inset-*) for the notch / home indicator.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0E1E" },
  ],
}

// Applies the saved/system theme before paint to avoid a light flash in dark mode.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={`${manrope.variable} ${rubik.variable} ${plexThai.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        {/* keep toasts above the mobile tab bar */}
        <Toaster richColors={false} mobileOffset={{ bottom: "calc(env(safe-area-inset-bottom) + 84px)" }} />
      </body>
    </html>
  )
}
