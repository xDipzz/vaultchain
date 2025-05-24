"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { ConnectionProvider, WalletProvider, useWallet as useSolanaWallet } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

interface SolanaContextType {
  connected: boolean
  connecting: boolean
  publicKey: string | null
  walletName: string | null
  network: string
  balance: number | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const SolanaContext = createContext<SolanaContextType>({
  connected: false,
  connecting: false,
  publicKey: null,
  walletName: null,
  network: "devnet",
  balance: null,
  connect: async () => {},
  disconnect: async () => {},
})

export const useSolana = () => useContext(SolanaContext)

export function SolanaProvider({ children }: { children: ReactNode }) {
  // You can change this to mainnet-beta, devnet, or testnet
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <SolanaContextWrapper networkName={network}>{children}</SolanaContextWrapper>
      </WalletProvider>
    </ConnectionProvider>
  )
}

function SolanaContextWrapper({ children, networkName }: { children: ReactNode; networkName: string }) {
  const { publicKey, connected, connecting, wallet, connect, disconnect } = useSolanaWallet()
  const [balance, setBalance] = useState<number | null>(null)

  // Format network name for display
  const formattedNetwork =
    networkName === WalletAdapterNetwork.Devnet
      ? "Devnet"
      : networkName === WalletAdapterNetwork.Mainnet
        ? "Mainnet"
        : "Testnet"

  // Simulate fetching balance
  useEffect(() => {
    if (connected && publicKey) {
      // In a real app, you would fetch the actual balance from the Solana blockchain
      // For demo purposes, we'll use a mock balance
      const mockBalance = Math.random() * 100
      setBalance(Number.parseFloat(mockBalance.toFixed(4)))
    } else {
      setBalance(null)
    }
  }, [connected, publicKey])

  const value = {
    connected,
    connecting,
    publicKey: publicKey ? publicKey.toString() : null,
    walletName: wallet?.adapter.name || null,
    network: formattedNetwork,
    balance,
    connect: async () => {
      try {
        if (!wallet) {
          throw new Error("No wallet selected. Please select a wallet first.")
        }

        // The wallet should already be selected by the WalletModal
        await connect()
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        throw error
      }
    },
    disconnect: async () => {
      try {
        await disconnect()
      } catch (error) {
        console.error("Failed to disconnect wallet:", error)
      }
    },
  }

  return <SolanaContext.Provider value={value}>{children}</SolanaContext.Provider>
}
