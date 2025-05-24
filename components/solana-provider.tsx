"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { solanaService, SolanaService } from '@/lib/solana-service'

require('@solana/wallet-adapter-react-ui/styles.css')

const network = WalletAdapterNetwork.Devnet
const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network)

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
]

interface SolanaContextType {
  balance: number
  loading: boolean
  service: SolanaService
  refreshBalance: () => Promise<void>
}

const SolanaContext = createContext<SolanaContextType>({
  balance: 0,
  loading: false,
  service: solanaService,
  refreshBalance: async () => {},
})

export const useSolana = () => useContext(SolanaContext)

function SolanaServiceProvider({ children }: { children: React.ReactNode }) {
  const wallet = useWallet()
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const refreshBalance = async () => {
    if (!wallet.publicKey) {
      setBalance(0)
      return
    }

    setLoading(true)
    try {
      const newBalance = await solanaService.getBalance(wallet.publicKey)
      setBalance(newBalance)
    } catch (error) {
      console.error('Error fetching balance:', error)
      setBalance(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Set up the service provider when wallet changes
    if (wallet.publicKey && wallet.signTransaction) {
      solanaService.setProvider(wallet)
    }
    
    // Refresh balance when wallet connects/disconnects
    refreshBalance()
  }, [wallet.publicKey, wallet.connected])

  return (
    <SolanaContext.Provider value={{ balance, loading, service: solanaService, refreshBalance }}>
      {children}
    </SolanaContext.Provider>
  )
}

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanaServiceProvider>
            {children}
          </SolanaServiceProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
