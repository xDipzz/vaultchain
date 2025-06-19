"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface SophisticatedButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function SophisticatedButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled = false,
}: SophisticatedButtonProps) {
  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 rounded-lg group cursor-pointer hover:scale-105 hover:-translate-y-0.5 active:scale-[0.98]"

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white border border-purple-500/50 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:border-purple-400",
    secondary:
      "bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 text-neutral-200 hover:text-white border border-neutral-600/50 shadow-lg shadow-neutral-500/10 hover:shadow-xl hover:shadow-neutral-500/20 hover:border-neutral-500",
    ghost: "hover:bg-neutral-800/50 text-neutral-300 hover:text-white border border-transparent hover:border-neutral-600/30 hover:shadow-lg hover:shadow-neutral-500/10",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base font-semibold",
  }

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Enhanced shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-in-out" />

      {/* Subtle glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        variant === "primary" ? "bg-purple-400/20" : 
        variant === "secondary" ? "bg-neutral-400/10" : 
        "bg-neutral-400/5"
      )} />

      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}
