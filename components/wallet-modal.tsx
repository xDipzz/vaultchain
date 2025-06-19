"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { X, Wallet, ExternalLink } from "lucide-react"
import { useState } from "react"

interface WalletModalProps {
  open: boolean
  onClose: () => void
}

export function WalletModal({ open, onClose }: WalletModalProps) {
  const { wallets, select, connect } = useWallet()
  const [connecting, setConnecting] = useState<string | null>(null)

  if (!open) return null

  const handleWalletClick = async (walletName: string) => {
    try {
      setConnecting(walletName)
      select(walletName as any)
      
      // Small delay to ensure wallet is selected
      await new Promise(resolve => setTimeout(resolve, 500))
      
      await connect()
      onClose()
    } catch (error) {
      console.error("Failed to connect to wallet:", error)
    } finally {
      setConnecting(null)
    }
  }

  const installedWallets = wallets.filter(wallet => wallet.readyState === "Installed")
  const notInstalledWallets = wallets.filter(wallet => wallet.readyState !== "Installed")

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl max-w-md w-full shadow-2xl shadow-black/40 transform transition-all duration-300 animate-in slide-in-from-bottom-4 scale-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Connect Wallet</h2>
              <p className="text-sm text-neutral-400">Choose your preferred Solana wallet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {/* Installed Wallets */}
          {installedWallets.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-300 mb-3">Installed Wallets</h3>
              <div className="space-y-2">
                {installedWallets.map((wallet) => (
                  <button
                    key={wallet.adapter.name}
                    onClick={() => handleWalletClick(wallet.adapter.name)}
                    disabled={connecting === wallet.adapter.name}
                    className="w-full p-4 bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 hover:from-neutral-700/50 hover:to-neutral-600/50 border border-neutral-600/50 hover:border-neutral-500/50 rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={wallet.adapter.icon} 
                        alt={wallet.adapter.name}
                        className="w-8 h-8 rounded-lg"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-white">{wallet.adapter.name}</div>
                        <div className="text-xs text-neutral-400">
                          {connecting === wallet.adapter.name ? "Connecting..." : "Ready to connect"}
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Not Installed Wallets */}
          {notInstalledWallets.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-neutral-300 mb-3">Available Wallets</h3>
              <div className="space-y-2">
                {notInstalledWallets.map((wallet) => (
                  <div
                    key={wallet.adapter.name}
                    className="w-full p-4 bg-neutral-800/30 border border-neutral-700/50 rounded-lg opacity-75"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={wallet.adapter.icon} 
                        alt={wallet.adapter.name}
                        className="w-8 h-8 rounded-lg opacity-75"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-neutral-300">{wallet.adapter.name}</div>
                        <div className="text-xs text-neutral-500">Not installed</div>
                      </div>
                      <a
                        href={wallet.adapter.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {installedWallets.length === 0 && notInstalledWallets.length === 0 && (
            <div className="text-center py-8">
              <Wallet className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-400">No wallets found</p>
              <p className="text-sm text-neutral-500">Please install a Solana wallet to continue</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-700/50">
          <p className="text-xs text-neutral-500 text-center">
            By connecting a wallet, you agree to VaultChain's Terms of Service
          </p>
        </div>
      </div>
    </div>
  )
}
