"use client"
import { useState } from "react"
import { LogOut } from "lucide-react"
import { motion } from "framer-motion"

import { SophisticatedButton } from "@/components/sophisticated-button"
import { useSolana } from "@/components/solana-provider"
import { cn } from "@/lib/utils"

interface WalletDisconnectButtonProps {
  size?: "sm" | "md" | "lg"
  className?: string
  onDisconnect?: () => void
}

export function WalletDisconnectButton({ size = "md", className = "", onDisconnect }: WalletDisconnectButtonProps) {
  const { connected, walletName, publicKey, disconnect } = useSolana()
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  if (!connected) return null

  const handleDisconnect = async () => {
    try {
      setIsDisconnecting(true)
      await disconnect()
      if (onDisconnect) {
        onDisconnect()
      }
    } catch (error) {
      console.error("Disconnect failed:", error)
    } finally {
      setIsDisconnecting(false)
    }
  }

  const truncatedAddress = publicKey 
    ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`
    : ""

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-2 bg-green-600/20 border border-green-500/30 rounded-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm text-green-400 font-medium">
          {walletName || "Wallet"}
        </span>
        <span className="text-xs text-green-300/70">
          {truncatedAddress}
        </span>
      </div>
      
      <SophisticatedButton 
        variant="secondary"
        size={size} 
        className={cn("group", className)} 
        onClick={handleDisconnect} 
        disabled={isDisconnecting}
      >
        {isDisconnecting ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            Disconnecting...
          </>
        ) : (
          <>
            <LogOut className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Disconnect
          </>
        )}
      </SophisticatedButton>
    </div>
  )
} 