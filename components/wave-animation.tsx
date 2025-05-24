"use client"

import { motion } from "framer-motion"

export function WaveAnimation() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
          fill="url(#wave-gradient-1)"
          animate={{
            d: [
              "M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z",
              "M0,450 C300,350 600,550 1200,450 L1200,800 L0,800 Z",
              "M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M0,500 C300,400 600,600 1200,500 L1200,800 L0,800 Z"
          fill="url(#wave-gradient-2)"
          animate={{
            d: [
              "M0,500 C300,400 600,600 1200,500 L1200,800 L0,800 Z",
              "M0,550 C300,450 600,650 1200,550 L1200,800 L0,800 Z",
              "M0,500 C300,400 600,600 1200,500 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.path
          d="M0,600 C300,500 600,700 1200,600 L1200,800 L0,800 Z"
          fill="url(#wave-gradient-3)"
          animate={{
            d: [
              "M0,600 C300,500 600,700 1200,600 L1200,800 L0,800 Z",
              "M0,650 C300,550 600,750 1200,650 L1200,800 L0,800 Z",
              "M0,600 C300,500 600,700 1200,600 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </svg>
    </div>
  )
}
