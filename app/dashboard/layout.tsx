import type React from "react"
import { BackgroundWrapper } from "@/components/background-wrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BackgroundWrapper variant="dashboard">{children}</BackgroundWrapper>
}
