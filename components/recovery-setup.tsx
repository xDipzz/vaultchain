"use client"

import type React from "react"

import { useState } from "react"
import { useRecoveryProgram } from "@/lib/program-hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSolana } from "@/components/solana-provider"

interface RecoverySetupProps {
  onSetupComplete?: (recoveryAccountId: string) => void
}

export function RecoverySetup({ onSetupComplete }: RecoverySetupProps) {
  const { publicKey } = useSolana()
  const { initializeRecoverySystem, loading, error } = useRecoveryProgram()

  const [guardians, setGuardians] = useState<string[]>(["", "", ""])
  const [threshold, setThreshold] = useState(2)
  const [checkinPeriod, setCheckinPeriod] = useState(30) // days
  const [recoveryDelay, setRecoveryDelay] = useState(3) // days
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [setupComplete, setSetupComplete] = useState(false)
  const [recoveryAccountId, setRecoveryAccountId] = useState<string | null>(null)

  const updateGuardian = (index: number, value: string) => {
    const newGuardians = [...guardians]
    newGuardians[index] = value
    setGuardians(newGuardians)
  }

  const addGuardian = () => {
    setGuardians([...guardians, ""])
  }

  const removeGuardian = (index: number) => {
    const newGuardians = [...guardians]
    newGuardians.splice(index, 1)
    setGuardians(newGuardians)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!publicKey) {
      return
    }

    try {
      setIsSubmitting(true)

      // Filter out empty guardian addresses
      const validGuardians = guardians.filter((g) => g.trim() !== "")

      if (validGuardians.length < threshold) {
        throw new Error(`You need at least ${threshold} valid guardian addresses`)
      }

      // Convert days to seconds
      const checkinPeriodSeconds = checkinPeriod * 24 * 60 * 60
      const recoveryDelaySeconds = recoveryDelay * 24 * 60 * 60

      // Initialize recovery system
      const result = await initializeRecoverySystem(
        validGuardians,
        threshold,
        checkinPeriodSeconds,
        recoveryDelaySeconds,
      )

      setRecoveryAccountId(result.recoveryAccountId)
      setSetupComplete(true)

      if (onSetupComplete) {
        onSetupComplete(result.recoveryAccountId)
      }
    } catch (err) {
      console.error("Error setting up recovery:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (setupComplete && recoveryAccountId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recovery System Setup Complete</CardTitle>
          <CardDescription>Your wallet is now protected by the VaultChain recovery system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-900/20">
              <p className="text-green-700 dark:text-green-300">
                Recovery system successfully deployed! Your recovery account ID is:
              </p>
              <p className="font-mono text-sm mt-2 break-all">{recoveryAccountId}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Your wallet is now protected by {guardians.filter((g) => g.trim() !== "").length} guardians with a
              threshold of {threshold}. Remember to check in every {checkinPeriod} days to confirm you still have access
              to your wallet.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => (window.location.href = "/dashboard")} className="w-full">
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Up Recovery System</CardTitle>
        <CardDescription>Protect your Solana wallet with social recovery.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="wallet-address">Your Wallet Address</Label>
              <Input id="wallet-address" value={publicKey || ""} readOnly className="font-mono text-sm" />
              <p className="text-xs text-muted-foreground mt-1">This is the wallet that will be protected.</p>
            </div>

            <div>
              <Label>Guardian Addresses</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Add Solana wallet addresses of trusted friends or family who can help recover your wallet.
              </p>

              {guardians.map((guardian, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder={`Guardian ${index + 1} Solana address`}
                    value={guardian}
                    onChange={(e) => updateGuardian(index, e.target.value)}
                    className="font-mono text-sm"
                  />
                  {guardians.length > 2 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeGuardian(index)}>
                      ✕
                    </Button>
                  )}
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addGuardian} className="w-full mt-2">
                Add Another Guardian
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="threshold">Recovery Threshold</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="threshold"
                  type="range"
                  min={1}
                  max={Math.max(guardians.length, 1)}
                  value={threshold}
                  onChange={(e) => setThreshold(Number.parseInt(e.target.value))}
                />
                <span className="w-8 text-center">{threshold}</span>
              </div>
              <p className="text-xs text-muted-foreground">Number of guardians required to recover your wallet.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkin-period">Check-in Period (days)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="checkin-period"
                  type="range"
                  min={7}
                  max={90}
                  value={checkinPeriod}
                  onChange={(e) => setCheckinPeriod(Number.parseInt(e.target.value))}
                />
                <span className="w-8 text-center">{checkinPeriod}</span>
              </div>
              <p className="text-xs text-muted-foreground">How often you need to check in to confirm wallet access.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recovery-delay">Recovery Delay (days)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="recovery-delay"
                  type="range"
                  min={1}
                  max={7}
                  value={recoveryDelay}
                  onChange={(e) => setRecoveryDelay(Number.parseInt(e.target.value))}
                />
                <span className="w-8 text-center">{recoveryDelay}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Waiting period before recovery is completed. This gives you time to cancel if unauthorized.
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {error}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={loading || isSubmitting || !publicKey} className="w-full">
          {isSubmitting ? "Setting Up..." : "Deploy Recovery System"}
        </Button>
      </CardFooter>
    </Card>
  )
}
