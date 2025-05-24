"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  duration?: number
  gradientColors?: string[]
}

export function AnimatedGradientBorder({
  children,
  className = "",
  borderWidth = 1,
  duration = 8,
  gradientColors = ["#1E40AF", "#059669", "#7C3AED"],
}: AnimatedGradientBorderProps) {
  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const gradientStyle = {
    background: `linear-gradient(${rotate}deg, ${gradientColors.join(", ")})`,
    padding: borderWidth,
  }

  return (
    <div className={`relative rounded-lg ${className}`} style={gradientStyle}>
      <div className="relative h-full w-full rounded-lg bg-background">{children}</div>
    </div>
  )
}
