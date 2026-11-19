"use client"

import * as React from "react"
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

// Follows the `dark` class / data-theme on <html> (no next-themes dependency).
function useDocumentTheme(): "light" | "dark" {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  React.useEffect(() => {
    const el = document.documentElement
    const read = () =>
      setTheme(el.classList.contains("dark") || el.dataset.theme === "dark" ? "dark" : "light")
    read()
    const observer = new MutationObserver(read)
    observer.observe(el, { attributes: true, attributeFilter: ["class", "data-theme"] })
    return () => observer.disconnect()
  }, [])
  return theme
}

function Toaster({ ...props }: ToasterProps) {
  const theme = useDocumentTheme()

  return (
    <Sonner
      theme={theme}
      // Sonner animates with its own transitions; re-time them with the brand spring (reduced motion is handled by Sonner).
      className="toaster group [&_[data-sonner-toast]]:![transition-timing-function:var(--ease-spring-snappy)] [&_[data-sonner-toast]]:![transition-duration:500ms]"
      icons={{
        success: <CircleCheckIcon className="size-4 text-success" />,
        info: <InfoIcon className="size-4 text-info" />,
        warning: <TriangleAlertIcon className="size-4 text-warning" />,
        error: <OctagonXIcon className="size-4 text-destructive" />,
        loading: <Loader2Icon className="size-4 animate-spin text-brand" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "font-sans shadow-lg shadow-brand/10",
          description: "!text-muted-foreground",
          actionButton: "!bg-primary !text-primary-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
