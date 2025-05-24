"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MouseTracker() {
  const [isVisible, setIsVisible] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Subtle mouse shadow effect */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 0.15 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-40 h-40 bg-gradient-to-r from-neutral-400/10 via-neutral-300/5 to-neutral-400/10 rounded-full blur-xl" />
      </motion.div>

      {/* Subtle focus point */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 0.3 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-4 h-4 bg-neutral-300/20 rounded-full blur-sm" />
      </motion.div>
    </>
  )
}
