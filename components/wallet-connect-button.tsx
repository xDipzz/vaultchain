"use client"

import { useState, useEffect } from "react"
import { Wallet, AlertCircle, CheckCircle } from "lucide-react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { WalletName } from "@solana/wallet-adapter-base"
import { SophisticatedButton } from "./sophisticated-button"

export function WalletConnectButton() {
  const { select, wallet, connect, connecting, connected, disconnect, publicKey } = useWallet()
  const { connection } = useConnection()
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "selecting" | "connecting" | "connected" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (connected && publicKey) {
      setConnectionStatus("connected")
      setIsConnecting(false)
      setShowWalletOptions(false)
      setErrorMessage("")
    } else if (connecting) {
      setConnectionStatus("connecting")
    } else {
      setConnectionStatus("idle")
      setIsConnecting(false)
    }
  }, [connected, connecting, publicKey])

  const handleConnect = async () => {
    try {
      setErrorMessage("")
      setIsConnecting(true)
      setConnectionStatus("selecting")
      
      // If no wallet is selected, show wallet options
      if (!wallet) {
        setShowWalletOptions(true)
        return
      }

      // If wallet is selected but not connected, connect to it
      if (wallet && !connected) {
        setConnectionStatus("connecting")
        console.log("Connecting to wallet:", wallet.adapter.name)
        
        // Wait a bit for wallet adapter to be ready
        await new Promise(resolve => setTimeout(resolve, 500))
        
        await connect()
        console.log("Wallet connected successfully")
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)
      setErrorMessage(`Failed to connect wallet: ${error?.message || 'Unknown error'}`)
      setConnectionStatus("error")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleWalletSelect = async (walletName: WalletName) => {
    try {
      setErrorMessage("")
      setConnectionStatus("connecting")
      console.log("Selecting wallet:", walletName)
      
      // Select the wallet
      select(walletName)
      
      // Wait for wallet selection to complete
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // Attempt to connect
      console.log("Attempting to connect...")
      await connect()
      
      setShowWalletOptions(false)
      console.log("Wallet connected successfully")
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)
      setErrorMessage(`Failed to connect wallet: ${error?.message || 'Unknown error'}`)
      setConnectionStatus("error")
      setShowWalletOptions(false)
    }
  }

  const getButtonText = () => {
    switch (connectionStatus) {
      case "selecting":
        return "Select Wallet..."
      case "connecting":
        return "Connecting..."
      case "connected":
        return `Connected: ${publicKey?.toString().slice(0, 8)}...`
      case "error":
        return "Connection Failed"
      default:
        return "Connect Solana Wallet"
    }
  }

  const getButtonIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <CheckCircle className="mr-2 h-4 w-4" />
      case "error":
        return <AlertCircle className="mr-2 h-4 w-4" />
      default:
        return <Wallet className="mr-2 h-4 w-4" />
    }
  }

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-4">
        <button
          className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 border border-green-500/50 group"
          disabled
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-in-out" />
          
          <span className="relative z-10 flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            Connected: {publicKey.toString().slice(0, 8)}...
          </span>
        </button>
        <p className="text-sm text-green-400 transition-all duration-300 animate-pulse">
          ✓ Wallet connected successfully
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <SophisticatedButton
        onClick={handleConnect}
        disabled={isConnecting || connectionStatus === "connecting"}
        variant={connectionStatus === "error" ? "secondary" : "primary"}
      >
        {getButtonIcon()}
        {getButtonText()}
      </SophisticatedButton>

      {errorMessage && (
        <p className="text-sm text-red-400 transition-all duration-300">
          {errorMessage}
        </p>
      )}

      {showWalletOptions && (
        <div className="mt-4 p-4 border border-neutral-700 rounded-lg bg-neutral-800/50 backdrop-blur-sm transition-all duration-300">
          <h3 className="text-sm font-medium mb-3">Select a Wallet:</h3>
          <div className="grid gap-2">
            <button
              onClick={() => handleWalletSelect("Phantom" as WalletName)}
              className="p-3 text-left hover:bg-neutral-700/50 rounded border border-neutral-600/50 hover:border-neutral-500 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="font-medium">Phantom</div>
              <div className="text-xs text-neutral-400">Popular Solana wallet</div>
            </button>
            <button
              onClick={() => handleWalletSelect("Solflare" as WalletName)}
              className="p-3 text-left hover:bg-neutral-700/50 rounded border border-neutral-600/50 hover:border-neutral-500 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="font-medium">Solflare</div>
              <div className="text-xs text-neutral-400">Feature-rich Solana wallet</div>
            </button>
            <button
              onClick={() => handleWalletSelect("Backpack" as WalletName)}
              className="p-3 text-left hover:bg-neutral-700/50 rounded border border-neutral-600/50 hover:border-neutral-500 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="font-medium">Backpack</div>
              <div className="text-xs text-neutral-400">Modern Solana wallet</div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
