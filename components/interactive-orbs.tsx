"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Orb {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export function InteractiveOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const initialOrbs: Orb[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 200 + 100,
      color: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"][i],
    }))
    setOrbs(initialOrbs)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full opacity-10 blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent)`,
          }}
          animate={{
            x: [orb.x, orb.x + 100, orb.x - 50, orb.x],
            y: [orb.y, orb.y - 100, orb.y + 50, orb.y],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse follower orb */}
      <motion.div
        className="absolute w-32 h-32 rounded-full opacity-5 blur-2xl pointer-events-none"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle, #3B82F6, transparent)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
