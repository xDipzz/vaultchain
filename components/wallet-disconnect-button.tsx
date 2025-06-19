"use client"

import { LogOut } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { SophisticatedButton } from "./sophisticated-button"

export function WalletDisconnectButton() {
  const { disconnect, connected, publicKey } = useWallet()

  if (!connected || !publicKey) {
    return null
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-sm text-neutral-300">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </span>
      </div>
      
      <SophisticatedButton
        onClick={handleDisconnect}
        variant="ghost"
        size="sm"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Disconnect
      </SophisticatedButton>
    </div>
  )
} 