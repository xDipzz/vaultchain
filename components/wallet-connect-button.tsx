"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Wallet, CheckCircle } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import type { WalletName } from "@solana/wallet-adapter-base"
import { useRouter } from "next/navigation"

import { SophisticatedButton } from "@/components/sophisticated-button"
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

  return (
    <div className="space-y-2">
      <SophisticatedButton 
        size={size} 
        className={cn(
          className,
          connected && "bg-green-600 hover:bg-green-700 border-green-500"
        )} 
        onClick={handleConnectClick} 
        disabled={isLoading || connected}
      >
        {isLoading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            Connecting...
          </>
        ) : connected ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Wallet Connected
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4 mr-2" />
            Connect Solana Wallet
          </>
        )}
      </SophisticatedButton>

      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

      <WalletModal
        open={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onWalletSelected={handleWalletSelected}
      />
    </div>
  )
}
