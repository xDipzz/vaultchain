"use client"

import type React from "react"

import { AnimatedBackground } from "./animated-background"
import { FloatingShapes } from "./floating-shapes"
import { MeshGradient } from "./mesh-gradient"
import { AuroraBackground } from "./aurora-background"
import { InteractiveOrbs } from "./interactive-orbs"
import { GeometricPattern } from "./geometric-pattern"
import { WaveAnimation } from "./wave-animation"

interface BackgroundWrapperProps {
  children: React.ReactNode
  variant?: "default" | "hero" | "dashboard" | "minimal"
}

export function BackgroundWrapper({ children, variant = "default" }: BackgroundWrapperProps) {
  const renderBackground = () => {
    switch (variant) {
      case "hero":
        return (
          <>
            <MeshGradient />
            <AuroraBackground />
            <FloatingShapes />
            <InteractiveOrbs />
            <AnimatedBackground />
          </>
        )
      case "dashboard":
        return (
          <>
            <GeometricPattern />
            <MeshGradient />
            <AnimatedBackground />
          </>
        )
      case "minimal":
        return (
          <>
            <MeshGradient />
            <WaveAnimation />
          </>
        )
      default:
        return (
          <>
            <AuroraBackground />
            <FloatingShapes />
            <AnimatedBackground />
          </>
        )
    }
  }

  return (
    <div className="relative min-h-screen">
      {renderBackground()}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
