"use client"

import type React from "react"
import { motion } from "framer-motion"
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
  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 rounded-lg"

  const variants = {
    primary:
      "bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 text-white border border-neutral-600 hover:border-neutral-500",
    secondary:
      "bg-neutral-800/50 hover:bg-neutral-700/50 text-neutral-200 border border-neutral-700 hover:border-neutral-600",
    ghost: "hover:bg-neutral-800/30 text-neutral-300 hover:text-white",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }

  return (
    <motion.button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        animate={{ translateX: ["100%", "100%", "-100%", "-100%"] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
