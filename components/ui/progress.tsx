"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "success" | "warning" | "danger"
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-purple-600 to-purple-700",
    success: "bg-gradient-to-r from-green-600 to-green-700", 
    warning: "bg-gradient-to-r from-yellow-600 to-yellow-700",
    danger: "bg-gradient-to-r from-red-600 to-red-700"
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-neutral-800 border border-neutral-700",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-500 ease-out shadow-lg relative overflow-hidden",
          variants[variant]
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
        
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 opacity-50",
          variant === "default" ? "bg-purple-400/30" :
          variant === "success" ? "bg-green-400/30" :
          variant === "warning" ? "bg-yellow-400/30" :
          "bg-red-400/30"
        )} />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
