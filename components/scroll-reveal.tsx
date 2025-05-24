"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once })

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      })
    }
  }, [controls, inView, delay, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ ...directionOffset[direction], opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  )
}
