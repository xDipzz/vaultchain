import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    if (type === "range") {
      return (
        <input
          type={type}
          className={cn(
            "h-2 w-full appearance-none rounded-lg bg-neutral-800 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-purple-600",
            "[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-500/30",
            "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-400",
            "[&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
            "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-purple-500 [&::-moz-range-thumb]:to-purple-600",
            "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:shadow-purple-500/30",
            "[&::-moz-range-thumb]:cursor-pointer",
            "[&::-webkit-slider-track]:bg-gradient-to-r [&::-webkit-slider-track]:from-neutral-700 [&::-webkit-slider-track]:to-neutral-600",
            "[&::-webkit-slider-track]:rounded-lg [&::-webkit-slider-track]:h-2",
            "[&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-neutral-700 [&::-moz-range-track]:to-neutral-600",
            "[&::-moz-range-track]:rounded-lg [&::-moz-range-track]:h-2 [&::-moz-range-track]:border-0",
            className
          )}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
