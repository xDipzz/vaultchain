"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import type { WalletName } from "@solana/wallet-adapter-base"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface WalletModalProps {
  open: boolean
  onClose: () => void
  onWalletSelected: (walletName: WalletName) => void
}

export function WalletModal({ open, onClose, onWalletSelected }: WalletModalProps) {
  const { wallets, select } = useWallet()
  const [mounted, setMounted] = useState(false)
  const [selecting, setSelecting] = useState<string | null>(null)

  // Handle wallet selection
  const handleWalletSelect = async (walletName: WalletName) => {
    try {
      setSelecting(walletName)
      select(walletName)

      // Wait a bit for the selection to process
      await new Promise((resolve) => setTimeout(resolve, 200))

      onWalletSelected(walletName)
      onClose()
    } catch (error) {
      console.error("Failed to select wallet:", error)
    } finally {
      setSelecting(null)
    }
  }

  // Only render the modal on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.adapter.name}
              variant="outline"
              className="flex items-center justify-between w-full p-4"
              onClick={() => handleWalletSelect(wallet.adapter.name)}
              disabled={selecting === wallet.adapter.name}
            >
              <span>{wallet.adapter.name}</span>
              <div className="flex items-center gap-2">
                {selecting === wallet.adapter.name && (
                  <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                )}
                {wallet.adapter.icon && (
                  <img
                    src={wallet.adapter.icon || "/placeholder.svg"}
                    alt={`${wallet.adapter.name} icon`}
                    className="h-6 w-6"
                  />
                )}
              </div>
            </Button>
          ))}
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
