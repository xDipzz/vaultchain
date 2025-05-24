"use client"

import { useEffect, useState, useMemo } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { ProgramService } from "./program-service"
import type { RecoveryAccount, GuardianVote, Transaction } from "./types"

/**
 * Hook to interact with the recovery program
 */
export function useRecoveryProgram() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize program service
  const programService = useMemo(() => {
    return new ProgramService(connection, wallet)
  }, [connection, wallet])

  /**
   * Initialize a new recovery system
   */
  const initializeRecoverySystem = async (
    guardians: string[],
    threshold: number,
    checkinPeriod: number,
    recoveryDelay: number,
  ) => {
    setLoading(true)
    setError(null)
    try {
      const guardianPubkeys = guardians.map((g) => new PublicKey(g))
      const result = await programService.initializeRecoverySystem(
        guardianPubkeys,
        threshold,
        checkinPeriod,
        recoveryDelay,
      )
      return result
    } catch (err) {
      console.error("Error initializing recovery system:", err)
      setError("Failed to initialize recovery system")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Add a guardian to the recovery system
   */
  const addGuardian = async (recoveryAccount: string, guardian: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await programService.addGuardian(new PublicKey(recoveryAccount), new PublicKey(guardian))
      return result
    } catch (err) {
      console.error("Error adding guardian:", err)
      setError("Failed to add guardian")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Remove a guardian from the recovery system
   */
  const removeGuardian = async (recoveryAccount: string, guardian: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await programService.removeGuardian(new PublicKey(recoveryAccount), new PublicKey(guardian))
      return result
    } catch (err) {
      console.error("Error removing guardian:", err)
      setError("Failed to remove guardian")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Perform a check-in to confirm wallet access
   */
  const performCheckin = async (recoveryAccount: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await programService.performCheckin(new PublicKey(recoveryAccount))
      return result
    } catch (err) {
      console.error("Error performing check-in:", err)
      setError("Failed to perform check-in")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Initiate recovery process
   */
  const initiateRecovery = async (recoveryAccount: string, newOwner: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await programService.initiateRecovery(new PublicKey(recoveryAccount), new PublicKey(newOwner))
      return result
    } catch (err) {
      console.error("Error initiating recovery:", err)
      setError("Failed to initiate recovery")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Vote on a recovery process (as a guardian)
   */
  const voteOnRecovery = async (recoveryAccount: string, approve: boolean) => {
    setLoading(true)
    setError(null)
    try {
      const result = await programService.voteOnRecovery(new PublicKey(recoveryAccount), approve)
      return result
    } catch (err) {
      console.error("Error voting on recovery:", err)
      setError("Failed to vote on recovery")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Execute recovery (transfer funds to new wallet)
   */
  const executeRecovery = async (recoveryAccount: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await programService.executeRecovery(new PublicKey(recoveryAccount))
      return result
    } catch (err) {
      console.error("Error executing recovery:", err)
      setError("Failed to execute recovery")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * Cancel an active recovery process
   */
  const cancelRecovery = async (recoveryAccount: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await programService.cancelRecovery(new PublicKey(recoveryAccount))
      return result
    } catch (err) {
      console.error("Error canceling recovery:", err)
      setError("Failed to cancel recovery")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    initializeRecoverySystem,
    addGuardian,
    removeGuardian,
    performCheckin,
    initiateRecovery,
    voteOnRecovery,
    executeRecovery,
    cancelRecovery,
  }
}

/**
 * Hook to fetch recovery account data
 */
export function useRecoveryAccount(recoveryAccountId: string | null) {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recoveryAccount, setRecoveryAccount] = useState<RecoveryAccount | null>(null)

  // Initialize program service
  const programService = useMemo(() => {
    return new ProgramService(connection, wallet)
  }, [connection, wallet])

  // Fetch recovery account data
  useEffect(() => {
    if (!recoveryAccountId) return

    const fetchRecoveryAccount = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await programService.getRecoveryAccount(new PublicKey(recoveryAccountId))
        setRecoveryAccount(data as unknown as RecoveryAccount)
      } catch (err) {
        console.error("Error fetching recovery account:", err)
        setError("Failed to fetch recovery account data")
      } finally {
        setLoading(false)
      }
    }

    fetchRecoveryAccount()
  }, [recoveryAccountId, programService])

  return {
    loading,
    error,
    recoveryAccount,
  }
}

/**
 * Hook to fetch guardian votes
 */
export function useGuardianVotes(recoveryAccountId: string | null) {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [votes, setVotes] = useState<GuardianVote[]>([])

  // Initialize program service
  const programService = useMemo(() => {
    return new ProgramService(connection, wallet)
  }, [connection, wallet])

  // Fetch guardian votes
  useEffect(() => {
    if (!recoveryAccountId) return

    const fetchGuardianVotes = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await programService.getGuardianVotes(new PublicKey(recoveryAccountId))
        setVotes(data as unknown as GuardianVote[])
      } catch (err) {
        console.error("Error fetching guardian votes:", err)
        setError("Failed to fetch guardian votes")
      } finally {
        setLoading(false)
      }
    }

    fetchGuardianVotes()
  }, [recoveryAccountId, programService])

  return {
    loading,
    error,
    votes,
  }
}

/**
 * Hook to fetch wallet balance
 */
export function useWalletBalance(publicKeyStr: string | null) {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)

  // Initialize program service
  const programService = useMemo(() => {
    return new ProgramService(connection, wallet)
  }, [connection, wallet])

  // Fetch wallet balance
  useEffect(() => {
    if (!publicKeyStr) return

    const fetchBalance = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await programService.getBalance(new PublicKey(publicKeyStr))
        setBalance(data)
      } catch (err) {
        console.error("Error fetching balance:", err)
        setError("Failed to fetch wallet balance")
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
  }, [publicKeyStr, programService])

  return {
    loading,
    error,
    balance,
  }
}

/**
 * Hook to fetch transaction history
 */
export function useTransactionHistory(publicKeyStr: string | null) {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Initialize program service
  const programService = useMemo(() => {
    return new ProgramService(connection, wallet)
  }, [connection, wallet])

  // Fetch transaction history
  useEffect(() => {
    if (!publicKeyStr) return

    const fetchTransactions = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await programService.getTransactionHistory(new PublicKey(publicKeyStr))
        setTransactions(data as unknown as Transaction[])
      } catch (err) {
        console.error("Error fetching transactions:", err)
        setError("Failed to fetch transaction history")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [publicKeyStr, programService])

  return {
    loading,
    error,
    transactions,
  }
}
