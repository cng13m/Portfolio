"use client"

import { personalInfo } from "@/lib/data"
import { Terminal } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs">
            {personalInfo.name} &copy; {new Date().getFullYear()}
          </span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Built with Next.js, Tailwind CSS & Three.js
        </p>
      </div>
    </footer>
  )
}
