"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function SophisticatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles.length = 0
      const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 20000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid
      ctx.strokeStyle = "rgba(100, 100, 100, 0.03)"
      ctx.lineWidth = 1
      const gridSize = 50

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw and update particles
      particles.forEach((particle, i) => {
        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(120, 120, 120, ${0.1 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(140, 140, 140, ${particle.opacity})`
        ctx.fill()

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
      })

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Subtle gradient overlays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(100, 100, 100, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(120, 120, 120, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(90, 90, 90, 0.02) 0%, transparent 50%)
          `,
        }}
        animate={{
          background: [
            `
              radial-gradient(circle at 20% 20%, rgba(100, 100, 100, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(120, 120, 120, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(90, 90, 90, 0.02) 0%, transparent 50%)
            `,
            `
              radial-gradient(circle at 80% 20%, rgba(110, 110, 110, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(130, 130, 130, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 60% 40%, rgba(95, 95, 95, 0.03) 0%, transparent 50%)
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
