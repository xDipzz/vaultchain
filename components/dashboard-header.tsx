import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headerVariants = cva("flex flex-col gap-1", {
  variants: {
    size: {
      default: "",
      sm: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof headerVariants> {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children, size, className, ...props }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4" {...props}>
      <div className={cn(headerVariants({ size, className }))}>
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
