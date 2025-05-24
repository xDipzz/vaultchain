"use client"

import { useEffect, useState } from "react"
import { ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react"
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { useWallet } from "@solana/wallet-adapter-react"

import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  type: "receive" | "send"
  amount: string
  token: string
  signature: string
  date: string
  status: "completed" | "pending" | "failed"
}

export function TransactionList() {
  const { connected, publicKey } = useWallet()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!connected || !publicKey) {
        setTransactions([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const connection = new Connection(clusterApiUrl('devnet'))
        
        // Fetch recent transaction signatures
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 5 })
        
        if (signatures.length === 0) {
          setTransactions([])
          setLoading(false)
          return
        }

        // Fetch transaction details
        const transactionPromises = signatures.map(async (sigInfo) => {
          try {
            const transaction = await connection.getTransaction(sigInfo.signature, {
              maxSupportedTransactionVersion: 0,
            })
            
            if (!transaction || !transaction.meta) {
              return null
            }

            // Calculate balance change
            const preBalance = transaction.meta.preBalances[0] || 0
            const postBalance = transaction.meta.postBalances[0] || 0
            const balanceChange = (postBalance - preBalance) / 1000000000 // Convert lamports to SOL

            // Determine transaction type
            const type = balanceChange > 0 ? "receive" : "send"
            const amount = Math.abs(balanceChange).toFixed(4)

            return {
              id: sigInfo.signature,
              type,
              amount,
              token: "SOL",
              signature: sigInfo.signature,
              date: sigInfo.blockTime 
                ? new Date(sigInfo.blockTime * 1000).toLocaleDateString()
                : "Unknown",
              status: transaction.meta.err ? "failed" : "completed" as const,
            }
          } catch (error) {
            console.error(`Error fetching transaction ${sigInfo.signature}:`, error)
            return null
          }
        })

        const transactionResults = await Promise.all(transactionPromises)
        const validTransactions = transactionResults.filter((tx): tx is Transaction => tx !== null)
        
        setTransactions(validTransactions)
      } catch (error) {
        console.error("Error fetching transactions:", error)
        setError("Failed to load transactions")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [connected, publicKey])

  if (!connected) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Connect your wallet to view transaction history
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Loading transactions...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            No transactions found for this wallet
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="group flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent/50"
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                transaction.type === "receive" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500",
                transaction.status === "failed" && "bg-red-500/10 text-red-500",
              )}
            >
              {transaction.type === "receive" ? (
                <ArrowDownLeft className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </div>
            <div className="space-y-1">
              <p className="font-medium leading-none">
                {transaction.type === "receive" ? "Received" : "Sent"} {transaction.amount} {transaction.token}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {transaction.signature.slice(0, 8)}...{transaction.signature.slice(-8)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={cn(
              "font-medium",
              transaction.status === "failed" && "text-red-500",
              transaction.type === "receive" && transaction.status === "completed" && "text-green-600",
            )}>
              {transaction.type === "receive" ? "+" : "-"}{transaction.amount} SOL
            </p>
            <p className="text-xs text-muted-foreground">{transaction.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
