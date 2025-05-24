import type { PublicKey } from "@solana/web3.js"

/**
 * Recovery account data structure
 */
export interface RecoveryAccount {
  owner: PublicKey
  guardians: PublicKey[]
  threshold: number
  lastCheckin: number
  checkinPeriod: number
  recoveryDelay: number
  isRecoveryActive: boolean
  recoveryInitiatedAt: number | null
  newOwner: PublicKey | null
  guardianVotes: GuardianVote[]
}

/**
 * Guardian vote data structure
 */
export interface GuardianVote {
  guardian: PublicKey
  vote: boolean
  timestamp: number
}

/**
 * Transaction data structure
 */
export interface Transaction {
  signature: string
  timestamp: number | null
  status: "confirmed" | "failed"
  type?: "send" | "receive" | "checkin" | "recovery" | "other"
  amount?: number
  token?: string
  from?: string
  to?: string
}

/**
 * Guardian data structure
 */
export interface Guardian {
  address: PublicKey
  name?: string
  email?: string
  status: "active" | "pending"
  lastChecked?: number
}

/**
 * Recovery system settings
 */
export interface RecoverySettings {
  threshold: number
  checkinPeriod: number
  recoveryDelay: number
  notifyGuardians: boolean
  notifyLargeTransactions: boolean
  notifyRecovery: boolean
}

/**
 * Recovery process status
 */
export interface RecoveryStatus {
  isActive: boolean
  initiatedAt: number | null
  initiatedBy: PublicKey | null
  newOwner: PublicKey | null
  votes: GuardianVote[]
  canExecute: boolean
  executionTime: number | null
}
