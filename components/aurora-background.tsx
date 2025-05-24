"use client"

import { motion } from "framer-motion"

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent),
            linear-gradient(-45deg, transparent, rgba(139, 92, 246, 0.1), transparent),
            linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent)
          `,
          filter: "blur(40px)",
        }}
        animate={{
          background: [
            `
              linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent),
              linear-gradient(-45deg, transparent, rgba(139, 92, 246, 0.1), transparent),
              linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent)
            `,
            `
              linear-gradient(135deg, transparent, rgba(139, 92, 246, 0.1), transparent),
              linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.1), transparent),
              linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.1), transparent)
            `,
            `
              linear-gradient(225deg, transparent, rgba(16, 185, 129, 0.1), transparent),
              linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent),
              linear-gradient(270deg, transparent, rgba(139, 92, 246, 0.1), transparent)
            `,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
