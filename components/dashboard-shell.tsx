import type React from "react"
import { Sidebar } from "@/components/sidebar"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden bg-gradient-to-b from-background to-background/95 px-4 py-6 md:px-6 md:py-8 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
