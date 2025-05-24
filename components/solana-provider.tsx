"use client"

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { solanaService, SolanaService } from '@/lib/solana-service'

require('@solana/wallet-adapter-react-ui/styles.css')

const network = WalletAdapterNetwork.Devnet
const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network)

interface SolanaContextType {
  balance: number
  loading: boolean
  service: SolanaService
  refreshBalance: () => Promise<void>
  connected: boolean
  publicKey: PublicKey | null
  connecting: boolean
  walletName: string | null
  disconnect: () => Promise<void>
  connect: () => Promise<void>
  network: string
}

const SolanaContext = createContext<SolanaContextType>({
  balance: 0,
  loading: false,
  service: solanaService,
  refreshBalance: async () => {},
  connected: false,
  publicKey: null,
  connecting: false,
  walletName: null,
  disconnect: async () => {},
  connect: async () => {},
  network: 'devnet',
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

  const handleConnect = async () => {
    try {
      await wallet.connect()
    } catch (error) {
      console.error('Error connecting wallet:', error)
      throw error
    }
  }

  const handleDisconnect = async () => {
    try {
      await wallet.disconnect()
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
      throw error
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

  // Debug wallet state changes
  useEffect(() => {
    console.log('Wallet state changed:', {
      connected: wallet.connected,
      connecting: wallet.connecting,
      publicKey: wallet.publicKey?.toString(),
      wallet: wallet.wallet?.adapter.name
    })
  }, [wallet.connected, wallet.connecting, wallet.publicKey, wallet.wallet])

  return (
    <SolanaContext.Provider value={{ 
      balance, 
      loading, 
      service: solanaService, 
      refreshBalance,
      connected: wallet.connected,
      publicKey: wallet.publicKey,
      connecting: wallet.connecting,
      walletName: wallet.wallet?.adapter.name || null,
      disconnect: handleDisconnect,
      connect: handleConnect,
      network: network.toLowerCase(),
    }}>
      {children}
    </SolanaContext.Provider>
  )
}

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  // Use useMemo to prevent recreating wallets on every render
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={(error) => {
          console.error('Wallet error:', error)
        }}
      >
        <WalletModalProvider>
          <SolanaServiceProvider>
            {children}
          </SolanaServiceProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
