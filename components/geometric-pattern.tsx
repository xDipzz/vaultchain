"use client"

import { motion } from "framer-motion"

export function GeometricPattern() {
  const patterns = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    duration: Math.random() * 30 + 20,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      {patterns.map((pattern) => (
        <motion.div
          key={pattern.id}
          className="absolute border border-primary/20"
          style={{
            width: pattern.size,
            height: pattern.size,
            left: `${pattern.x}%`,
            top: `${pattern.y}%`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
          animate={{
            rotate: [pattern.rotation, pattern.rotation + 360],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: pattern.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
