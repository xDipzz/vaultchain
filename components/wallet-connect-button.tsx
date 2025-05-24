"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
import type { WalletName } from "@solana/wallet-adapter-base"
import { useRouter } from "next/navigation"

import { useSolana } from "@/components/solana-provider"
import { WalletModal } from "@/components/wallet-modal"
import { cn } from "@/lib/utils"

interface WalletConnectButtonProps {
  size?: "sm" | "md" | "lg"
  className?: string
  onConnect?: () => void
  redirectToDashboard?: boolean
}

export function WalletConnectButton({ size = "md", className = "", onConnect, redirectToDashboard = false }: WalletConnectButtonProps) {
  const { connected, connecting } = useSolana()
  const { wallet, connect } = useWallet()
  const router = useRouter()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectClick = () => {
    if (connected) return
    setError(null)
    setShowWalletModal(true)
  }

  const handleWalletSelected = async (_walletName: WalletName) => {
    try {
      setIsConnecting(true)
      setError(null)

      // Wait for the wallet to be properly selected
      let attempts = 0
      const maxAttempts = 10

      while (!wallet && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        attempts++
      }

      if (!wallet) {
        throw new Error("Wallet selection failed")
      }

      // Now attempt to connect
      await connect()

      // Wait a bit for connection to fully establish
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (onConnect) {
        onConnect()
      }

      // Redirect to dashboard if requested
      if (redirectToDashboard) {
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Connection error:", err)
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  // Reset connecting state when wallet connection changes
  useEffect(() => {
    if (connected) {
      setIsConnecting(false)
      setError(null)
    }
  }, [connected])

  const isLoading = connecting || isConnecting

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm"
      case "lg":
        return "px-8 py-4 text-base font-semibold"
      default:
        return "px-6 py-3 text-sm font-medium"
    }
  }

  return (
    <div className="space-y-2">
      <motion.button
        className={cn(
          "relative overflow-hidden rounded-lg transition-all duration-300 group",
          getSizeClasses(),
          connected 
            ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white border border-green-500 shadow-lg shadow-green-500/20" 
            : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white border border-purple-500 shadow-lg shadow-purple-500/20",
          className
        )}
        onClick={handleConnectClick}
        disabled={isLoading || connected}
        whileHover={!isLoading && !connected ? { scale: 1.02, y: -2 } : undefined}
        whileTap={!isLoading && !connected ? { scale: 0.98 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{ translateX: ["100%", "100%", "-100%", "-100%"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          connected ? "bg-green-400/20" : "bg-purple-400/20"
        )} />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              Connecting...
            </>
          ) : connected ? (
            <>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Wallet Connected
            </>
          ) : (
            "Connect Solana Wallet"
          )}
        </span>
      </motion.button>

      {error && (
        <motion.p 
          className="text-sm text-red-400 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      <WalletModal
        open={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onWalletSelected={handleWalletSelected}
      />
    </div>
  )
}
