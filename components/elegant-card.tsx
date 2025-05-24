"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ElegantCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function ElegantCard({ children, className, hover = true, glow = false }: ElegantCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm",
        hover && "transition-all duration-500 hover:border-neutral-700/50 hover:shadow-2xl hover:shadow-neutral-900/20",
        glow && "shadow-lg shadow-neutral-900/10",
        className,
      )}
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Hover effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-400/[0.02] to-neutral-600/[0.02] opacity-0 transition-opacity duration-500"
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.div>
  )
}
