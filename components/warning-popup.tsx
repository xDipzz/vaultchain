"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SophisticatedButton } from "./sophisticated-button"

interface WarningPopupProps {
  show: boolean
  onClose: () => void
}

export function WarningPopup({ show, onClose }: WarningPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div
            className="bg-neutral-900 border border-yellow-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-900/30 border border-yellow-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  Important Warning
                </h3>
                <div className="text-yellow-200/90 text-sm leading-relaxed space-y-2">
                  <p>
                    ⚠️ <strong>VaultChain is currently in the building phase.</strong>
                  </p>
                  <p>
                    Please only experiment with small amounts you can afford to lose. This is an educational project and not production-ready software.
                  </p>
                  <p className="text-yellow-300/80">
                    By continuing, you acknowledge the experimental nature of this software and the associated risks.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <SophisticatedButton 
                onClick={onClose}
                size="sm"
                className="w-full"
              >
                I Understand the Risks
              </SophisticatedButton>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white text-sm transition-colors duration-200"
              >
                Continue to VaultChain
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function useWarningPopup() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Check if user has already seen the warning
    const hasSeenWarning = localStorage.getItem('vaultchain-warning-seen')
    if (!hasSeenWarning) {
      // Show warning after a short delay
      const timer = setTimeout(() => {
        setShowWarning(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const closeWarning = () => {
    setShowWarning(false)
    // Remember that user has seen the warning
    localStorage.setItem('vaultchain-warning-seen', 'true')
  }

  return {
    showWarning,
    closeWarning
  }
} 