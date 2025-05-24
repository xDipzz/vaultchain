"use client"

import { motion } from "framer-motion"

export function MeshGradient() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
          `,
        }}
        animate={{
          background: [
            `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `,
            `
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 60% 60%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `,
            `
              radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 60% 40%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `,
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
