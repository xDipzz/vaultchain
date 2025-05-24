import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { AnchorProvider, Program, Idl, BN } from '@coral-xyz/anchor'
import { WalletContextState } from '@solana/wallet-adapter-react'

// Program IDs
export const PROGRAM_IDS = {
  recovery: new PublicKey('recSnKaWtBYGCSPEu3PmeQZbEa6cqaRjTMoqgofFcAm'),
  guardian: new PublicKey('grdkf4ikMWzZHZahCJsnZkpxW86VRPGejEBeTv4eAPd'),
  checkin: new PublicKey('chk4w69XLVVe4WHZhXtqvtUttfTqxRyPdVgW838DzNa'),
}

// Types
export interface RecoverySystemData {
  owner: PublicKey
  guardians: PublicKey[]
  threshold: number
  lastCheckin: number
  checkinPeriod: number
  recoveryDelay: number
  isRecoveryActive: boolean
  recoveryInitiatedAt?: number
  newOwner?: PublicKey
  guardianVotes: GuardianVote[]
}

export interface GuardianVote {
  guardian: PublicKey
  vote: boolean
  timestamp: number
}

export interface GuardianInfo {
  address: PublicKey
  name?: string
  email?: string
  status: 'Pending' | 'Active' | 'Inactive'
  addedAt: number
  lastActive?: number
}

export interface CheckinStatus {
  lastCheckin: number
  nextCheckin: number
  timeUntilNext: number
  isOverdue: boolean
  needsReminder: boolean
  missedCheckins: number
}

export class SolanaService {
  private connection: Connection
  private provider?: AnchorProvider

  constructor(connection: Connection) {
    this.connection = connection
  }

  setProvider(wallet: WalletContextState) {
    if (wallet.publicKey && wallet.signTransaction) {
      this.provider = new AnchorProvider(
        this.connection,
        wallet as any,
        { commitment: 'confirmed' }
      )
    }
  }

  // Recovery System Methods
  async initializeRecovery(
    guardians: PublicKey[],
    threshold: number,
    checkinPeriod: number,
    recoveryDelay: number
  ): Promise<string> {
    if (!this.provider) throw new Error('Wallet not connected')

    try {
      // For now, simulate the transaction and store in localStorage
      const recoveryData = {
        owner: this.provider.wallet.publicKey.toString(),
        guardians: guardians.map(g => g.toString()),
        threshold,
        checkinPeriod,
        recoveryDelay,
        lastCheckin: Date.now(),
        isRecoveryActive: false,
        guardianVotes: []
      }

      localStorage.setItem('vaultchain_recovery', JSON.stringify(recoveryData))
      
      // Return a mock transaction signature
      return 'mock_tx_' + Math.random().toString(36).substr(2, 9)
    } catch (error) {
      console.error('Error initializing recovery:', error)
      throw error
    }
  }

  async performCheckin(): Promise<string> {
    if (!this.provider) throw new Error('Wallet not connected')

    try {
      // Update localStorage with new checkin time
      const recoveryData = JSON.parse(localStorage.getItem('vaultchain_recovery') || '{}')
      if (recoveryData.owner) {
        recoveryData.lastCheckin = Date.now()
        recoveryData.isRecoveryActive = false // Cancel any active recovery
        localStorage.setItem('vaultchain_recovery', JSON.stringify(recoveryData))
      }

      // Return a mock transaction signature
      return 'checkin_tx_' + Math.random().toString(36).substr(2, 9)
    } catch (error) {
      console.error('Error performing checkin:', error)
      throw error
    }
  }

  async initiateRecovery(newOwner: PublicKey): Promise<string> {
    if (!this.provider || !this.provider.wallet.publicKey) throw new Error('Wallet not connected')

    try {
      const recoveryData = JSON.parse(localStorage.getItem('vaultchain_recovery') || '{}')
      if (!recoveryData.owner) throw new Error('No recovery system found')

      // Check if guardian
      const isGuardian = recoveryData.guardians.includes(this.provider.wallet.publicKey.toString())
      if (!isGuardian) throw new Error('Not a guardian')

      // Check if checkin period has passed
      const timeSinceLastCheckin = Date.now() - recoveryData.lastCheckin
      if (timeSinceLastCheckin < recoveryData.checkinPeriod) {
        throw new Error('Checkin period has not passed')
      }

      // Initiate recovery
      recoveryData.isRecoveryActive = true
      recoveryData.recoveryInitiatedAt = Date.now()
      recoveryData.newOwner = newOwner.toString()
      recoveryData.guardianVotes = [{
        guardian: this.provider.wallet.publicKey.toString(),
        vote: true,
        timestamp: Date.now()
      }]

      localStorage.setItem('vaultchain_recovery', JSON.stringify(recoveryData))
      
      return 'recovery_init_tx_' + Math.random().toString(36).substr(2, 9)
    } catch (error) {
      console.error('Error initiating recovery:', error)
      throw error
    }
  }

  async voteRecovery(approve: boolean): Promise<string> {
    if (!this.provider || !this.provider.wallet.publicKey) throw new Error('Wallet not connected')

    const walletPublicKey = this.provider.wallet.publicKey

    try {
      const recoveryData = JSON.parse(localStorage.getItem('vaultchain_recovery') || '{}')
      if (!recoveryData.isRecoveryActive) throw new Error('No active recovery')

      // Check if guardian
      const isGuardian = recoveryData.guardians.includes(walletPublicKey.toString())
      if (!isGuardian) throw new Error('Not a guardian')

      // Check if already voted
      const hasVoted = recoveryData.guardianVotes.some(
        (vote: any) => vote.guardian === walletPublicKey.toString()
      )
      if (hasVoted) throw new Error('Already voted')

      // Add vote
      recoveryData.guardianVotes.push({
        guardian: walletPublicKey.toString(),
        vote: approve,
        timestamp: Date.now()
      })

      localStorage.setItem('vaultchain_recovery', JSON.stringify(recoveryData))
      
      return 'vote_tx_' + Math.random().toString(36).substr(2, 9)
    } catch (error) {
      console.error('Error voting on recovery:', error)
      throw error
    }
  }

  async executeRecovery(): Promise<string> {
    if (!this.provider) throw new Error('Wallet not connected')

    try {
      const recoveryData = JSON.parse(localStorage.getItem('vaultchain_recovery') || '{}')
      if (!recoveryData.isRecoveryActive) throw new Error('No active recovery')

      // Check if recovery delay has passed
      const timeSinceInitiation = Date.now() - recoveryData.recoveryInitiatedAt
      if (timeSinceInitiation < recoveryData.recoveryDelay) {
        throw new Error('Recovery delay has not passed')
      }

      // Check if threshold is met
      const approveVotes = recoveryData.guardianVotes.filter((vote: any) => vote.vote).length
      if (approveVotes < recoveryData.threshold) {
        throw new Error('Threshold not met')
      }

      // Execute recovery (in real implementation, this would transfer funds)
      recoveryData.isRecoveryActive = false
      recoveryData.owner = recoveryData.newOwner
      delete recoveryData.newOwner
      delete recoveryData.recoveryInitiatedAt
      recoveryData.guardianVotes = []

      localStorage.setItem('vaultchain_recovery', JSON.stringify(recoveryData))
      
      return 'execute_recovery_tx_' + Math.random().toString(36).substr(2, 9)
    } catch (error) {
      console.error('Error executing recovery:', error)
      throw error
    }
  }

  // Guardian Management Methods
  async addGuardian(address: PublicKey, name?: string, email?: string): Promise<string> {
    if (!this.provider) throw new Error('Wallet not connected')

    try {
      const guardianData = JSON.parse(localStorage.getItem('vaultchain_guardians') || '[]')
      
      // Check if guardian already exists
      const exists = guardianData.some((g: any) => g.address === address.toString())
      if (exists) throw new Error('Guardian already exists')

      guardianData.push({
        address: address.toString(),
        name,
        email,
        status: 'Pending',
        addedAt: Date.now(),
        lastActive: null
      })

      localStorage.setItem('vaultchain_guardians', JSON.stringify(guardianData))
      
      return 'add_guardian_tx_' + Math.random().toString(36).substr(2, 9)
    } catch (error) {
      console.error('Error adding guardian:', error)
      throw error
    }
  }

  async removeGuardian(address: PublicKey): Promise<string> {
    if (!this.provider) throw new Error('Wallet not connected')

    try {
      const guardianData = JSON.parse(localStorage.getItem('vaultchain_guardians') || '[]')
      const filteredData = guardianData.filter((g: any) => g.address !== address.toString())
      
      localStorage.setItem('vaultchain_guardians', JSON.stringify(filteredData))
      
      return 'remove_guardian_tx_' + Math.random().toString(36).substr(2, 9)
    } catch (error) {
      console.error('Error removing guardian:', error)
      throw error
    }
  }

  // Data Fetching Methods
  async getRecoverySystemData(): Promise<RecoverySystemData | null> {
    try {
      const data = localStorage.getItem('vaultchain_recovery')
      if (!data) return null

      const parsed = JSON.parse(data)
      return {
        owner: new PublicKey(parsed.owner),
        guardians: parsed.guardians.map((g: string) => new PublicKey(g)),
        threshold: parsed.threshold,
        lastCheckin: parsed.lastCheckin,
        checkinPeriod: parsed.checkinPeriod,
        recoveryDelay: parsed.recoveryDelay,
        isRecoveryActive: parsed.isRecoveryActive,
        recoveryInitiatedAt: parsed.recoveryInitiatedAt,
        newOwner: parsed.newOwner ? new PublicKey(parsed.newOwner) : undefined,
        guardianVotes: parsed.guardianVotes || []
      }
    } catch (error) {
      console.error('Error fetching recovery data:', error)
      return null
    }
  }

  async getGuardianData(): Promise<GuardianInfo[]> {
    try {
      const data = localStorage.getItem('vaultchain_guardians')
      if (!data) return []

      const parsed = JSON.parse(data)
      return parsed.map((g: any) => ({
        address: new PublicKey(g.address),
        name: g.name,
        email: g.email,
        status: g.status,
        addedAt: g.addedAt,
        lastActive: g.lastActive
      }))
    } catch (error) {
      console.error('Error fetching guardian data:', error)
      return []
    }
  }

  async getCheckinStatus(): Promise<CheckinStatus | null> {
    try {
      const recoveryData = await this.getRecoverySystemData()
      if (!recoveryData) return null

      const now = Date.now()
      const nextCheckin = recoveryData.lastCheckin + recoveryData.checkinPeriod
      const timeUntilNext = nextCheckin - now
      const isOverdue = timeUntilNext < 0
      const needsReminder = timeUntilNext <= (recoveryData.checkinPeriod * 0.1) // 10% of period

      return {
        lastCheckin: recoveryData.lastCheckin,
        nextCheckin,
        timeUntilNext,
        isOverdue,
        needsReminder,
        missedCheckins: isOverdue ? Math.floor(Math.abs(timeUntilNext) / recoveryData.checkinPeriod) : 0
      }
    } catch (error) {
      console.error('Error getting checkin status:', error)
      return null
    }
  }

  // Utility Methods
  async getBalance(publicKey: PublicKey): Promise<number> {
    try {
      const balance = await this.connection.getBalance(publicKey)
      return balance / LAMPORTS_PER_SOL
    } catch (error) {
      console.error('Error fetching balance:', error)
      return 0
    }
  }

  async getTransactionHistory(publicKey: PublicKey, limit: number = 10) {
    try {
      const signatures = await this.connection.getSignaturesForAddress(publicKey, { limit })
      const transactions = []

      for (const sig of signatures) {
        try {
          const tx = await this.connection.getTransaction(sig.signature, {
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0
          })

          if (tx) {
            const preBalance = tx.meta?.preBalances[0] || 0
            const postBalance = tx.meta?.postBalances[0] || 0
            const balanceChange = (postBalance - preBalance) / LAMPORTS_PER_SOL

            transactions.push({
              signature: sig.signature,
              timestamp: sig.blockTime ? sig.blockTime * 1000 : Date.now(),
              balanceChange,
              status: sig.err ? 'failed' : 'success',
              fee: tx.meta?.fee ? tx.meta.fee / LAMPORTS_PER_SOL : 0
            })
          }
        } catch (error) {
          console.error('Error fetching transaction:', error)
        }
      }

      return transactions
    } catch (error) {
      console.error('Error fetching transaction history:', error)
      return []
    }
  }
}

// Export singleton instance
export const solanaService = new SolanaService(
  new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com')
) 