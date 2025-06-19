import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-purple-700 text-primary-foreground shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:from-purple-500 hover:to-purple-600 border border-purple-500/50",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-destructive-foreground shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:from-red-500 hover:to-red-600 border border-red-500/50",
        outline:
          "border border-neutral-600 bg-neutral-800/50 hover:bg-neutral-700/50 hover:border-neutral-500 text-neutral-200 hover:text-white shadow-sm backdrop-blur-sm",
        secondary:
          "bg-gradient-to-r from-neutral-700 to-neutral-800 text-secondary-foreground shadow-lg shadow-neutral-500/10 hover:shadow-xl hover:shadow-neutral-500/20 hover:from-neutral-600 hover:to-neutral-700 border border-neutral-600/50",
        ghost: "hover:bg-neutral-800/50 hover:text-neutral-100 text-neutral-300",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
