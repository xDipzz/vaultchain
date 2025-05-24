"use client"

import { useState } from "react"
import { useRecoveryProgram, useRecoveryAccount, useGuardianVotes } from "@/lib/program-hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Shield, X } from "lucide-react"

interface RecoveryProcessProps {
  recoveryAccountId: string
  isGuardian?: boolean
}

export function RecoveryProcess({ recoveryAccountId, isGuardian = false }: RecoveryProcessProps) {
  const { recoveryAccount, loading: loadingAccount } = useRecoveryAccount(recoveryAccountId)
  const { votes, loading: loadingVotes } = useGuardianVotes(recoveryAccountId)
  const { initiateRecovery, voteOnRecovery, executeRecovery, cancelRecovery, loading, error } = useRecoveryProgram()

  const [newOwnerAddress, setNewOwnerAddress] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Clear success message after 5 seconds
  useState(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  })

  const handleInitiateRecovery = async () => {
    if (!recoveryAccountId || !newOwnerAddress.trim()) {
      return
    }

    try {
      setIsSubmitting(true)

      // Initiate recovery
      await initiateRecovery(recoveryAccountId, newOwnerAddress)

      setSuccessMessage("Recovery process initiated successfully")
      setNewOwnerAddress("")
    } catch (err) {
      console.error("Error initiating recovery:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVoteOnRecovery = async (approve: boolean) => {
    if (!recoveryAccountId) {
      return
    }

    try {
      setIsSubmitting(true)

      // Vote on recovery
      await voteOnRecovery(recoveryAccountId, approve)

      setSuccessMessage(`Vote ${approve ? "approved" : "rejected"} successfully`)
    } catch (err) {
      console.error("Error voting on recovery:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExecuteRecovery = async () => {
    if (!recoveryAccountId) {
      return
    }

    try {
      setIsSubmitting(true)

      // Execute recovery
      await executeRecovery(recoveryAccountId)

      setSuccessMessage("Recovery executed successfully")
    } catch (err) {
      console.error("Error executing recovery:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelRecovery = async () => {
    if (!recoveryAccountId) {
      return
    }

    try {
      setIsSubmitting(true)

      // Cancel recovery
      await cancelRecovery(recoveryAccountId)

      setSuccessMessage("Recovery cancelled successfully")
    } catch (err) {
      console.error("Error cancelling recovery:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loadingAccount || loadingVotes) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recovery Process</CardTitle>
          <CardDescription>Loading recovery data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!recoveryAccount) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recovery Process</CardTitle>
          <CardDescription>Recovery account not found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The recovery account ID provided is not valid or the account does not exist.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Calculate recovery progress
  const approveVotes = votes.filter((v) => v.vote).length
  const rejectVotes = votes.filter((v) => !v.vote).length
  const votingProgress = (approveVotes / recoveryAccount.threshold) * 100

  // Check if recovery is active
  const isRecoveryActive = recoveryAccount.isRecoveryActive

  // Calculate time since recovery initiated
  const now = Math.floor(Date.now() / 1000)
  const recoveryInitiatedAt = recoveryAccount.recoveryInitiatedAt || 0
  const recoveryDelay = recoveryAccount.recoveryDelay
  const timeElapsed = now - recoveryInitiatedAt
  const timeRemaining = recoveryDelay - timeElapsed
  const delayProgress = Math.min(100, (timeElapsed / recoveryDelay) * 100)

  // Check if recovery can be executed
  const canExecute = isRecoveryActive && approveVotes >= recoveryAccount.threshold && timeElapsed >= recoveryDelay

  // Format time remaining
  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return "Ready"

    const days = Math.floor(seconds / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))

    if (days > 0) {
      return `${days}d ${hours}h remaining`
    } else {
      const minutes = Math.floor((seconds % (60 * 60)) / 60)
      return `${hours}h ${minutes}m remaining`
    }
  }

  if (!isRecoveryActive) {
    // Show initiate recovery UI
    return (
      <Card>
        <CardHeader>
          <CardTitle>Initiate Wallet Recovery</CardTitle>
          <CardDescription>
            {isGuardian
              ? "Help recover a wallet that has lost access"
              : "Start the process to recover your wallet access"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isGuardian ? (
            <div className="rounded-lg border p-4">
              <div className="space-y-2">
                <h3 className="font-medium">Recovery Information</h3>
                <p className="text-sm text-muted-foreground">
                  As a guardian, you can initiate recovery for this wallet if the owner has lost access. This should
                  only be done if you've confirmed the owner has lost access to their wallet.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
              <div className="flex items-start gap-2">
                <Shield className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div className="space-y-1">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Only initiate recovery if you've lost access to your original wallet. This process will transfer
                    your funds to a new wallet address.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-owner">New Wallet Address</Label>
            <Input
              id="new-owner"
              placeholder="Enter new Solana wallet address"
              value={newOwnerAddress}
              onChange={(e) => setNewOwnerAddress(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              This is the wallet that will receive the funds after recovery.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
              {successMessage}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleInitiateRecovery}
            disabled={loading || isSubmitting || !newOwnerAddress.trim()}
            className="w-full"
          >
            <Shield className="mr-2 h-4 w-4" />
            {isSubmitting ? "Initiating..." : "Initiate Recovery Process"}
          </Button>
        </CardFooter>
      </Card>
    )
  } else {
    // Show active recovery UI
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Recovery Process</CardTitle>
          <CardDescription>A recovery process is currently in progress for this wallet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Guardian Voting</span>
              <span className="text-sm text-muted-foreground">
                {approveVotes}/{recoveryAccount.threshold} approvals
              </span>
            </div>
            <Progress value={votingProgress} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span>{approveVotes} approved</span>
              <span>{rejectVotes} rejected</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Security Delay</span>
              <span className="text-sm text-muted-foreground">{formatTimeRemaining(timeRemaining)}</span>
            </div>
            <Progress value={delayProgress} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span>Started {new Date(recoveryInitiatedAt * 1000).toLocaleString()}</span>
              <span>{timeRemaining <= 0 ? "Ready to execute" : "Waiting period"}</span>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="space-y-2">
              <h3 className="font-medium">Recovery Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">New wallet:</div>
                <div className="font-mono text-xs break-all">
                  {recoveryAccount.newOwner?.toString() || "Not specified"}
                </div>
                <div className="text-muted-foreground">Initiated by:</div>
                <div className="font-mono text-xs">{votes[0]?.guardian.toString().slice(0, 8)}...</div>
                <div className="text-muted-foreground">Status:</div>
                <div className="flex items-center gap-1">
                  {canExecute ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-500" />
                  )}
                  <span>{canExecute ? "Ready to execute" : "Waiting for approvals/delay"}</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
              {successMessage}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {isGuardian && (
            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                onClick={() => handleVoteOnRecovery(false)}
                disabled={loading || isSubmitting}
                className="w-full"
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button onClick={() => handleVoteOnRecovery(true)} disabled={loading || isSubmitting} className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          )}

          {canExecute && (
            <Button onClick={handleExecuteRecovery} disabled={loading || isSubmitting} className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              {isSubmitting ? "Executing..." : "Execute Recovery"}
            </Button>
          )}

          {!isGuardian && (
            <Button
              variant="outline"
              onClick={handleCancelRecovery}
              disabled={loading || isSubmitting}
              className="w-full text-red-500 hover:text-red-700"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel Recovery
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }
}
