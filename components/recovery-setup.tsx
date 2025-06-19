"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useRecoveryProgram } from "@/lib/program-hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSolana } from "@/components/solana-provider"
import { ArrowRight, Shield } from "lucide-react"
import { SophisticatedButton } from "@/components/sophisticated-button"

interface RecoverySetupProps {
  onSetupComplete?: (recoveryAccountId: string) => void
}

export function RecoverySetup({ onSetupComplete }: RecoverySetupProps) {
  const { publicKey } = useSolana()
  const { initializeRecoverySystem, loading, error } = useRecoveryProgram()
  const router = useRouter()

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
          <SophisticatedButton onClick={() => router.push("/dashboard")} className="w-full" size="lg">
            <ArrowRight className="mr-2 h-4 w-4" />
            Go to Dashboard
          </SophisticatedButton>
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
              <Input id="wallet-address" value={publicKey?.toString() || ""} readOnly className="font-mono text-sm" />
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="threshold" className="text-base font-medium">Recovery Threshold</Label>
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-purple-300">{threshold} guardians</span>
                </div>
              </div>
              <div className="relative">
                <Input
                  id="threshold"
                  type="range"
                  min={1}
                  max={Math.max(guardians.length, 1)}
                  value={threshold}
                  onChange={(e) => setThreshold(Number.parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1</span>
                  {guardians.length > 2 && <span>{Math.ceil(guardians.length/2)}</span>}
                  {guardians.length > 1 && <span>{guardians.length}</span>}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Number of guardians required to recover your wallet.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="checkin-period" className="text-base font-medium">Check-in Period</Label>
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-blue-300">{checkinPeriod} days</span>
                </div>
              </div>
              <div className="relative">
                <Input
                  id="checkin-period"
                  type="range"
                  min={7}
                  max={90}
                  value={checkinPeriod}
                  onChange={(e) => setCheckinPeriod(Number.parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>7d</span>
                  <span>30d</span>
                  <span>60d</span>
                  <span>90d</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">How often you need to check in to confirm wallet access.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="recovery-delay" className="text-base font-medium">Recovery Delay</Label>
                <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-orange-300">{recoveryDelay} days</span>
                </div>
              </div>
              <div className="relative">
                <Input
                  id="recovery-delay"
                  type="range"
                  min={1}
                  max={7}
                  value={recoveryDelay}
                  onChange={(e) => setRecoveryDelay(Number.parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1d</span>
                  <span>3d</span>
                  <span>5d</span>
                  <span>7d</span>
                </div>
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
        <SophisticatedButton onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)} disabled={loading || isSubmitting || !publicKey} className="w-full" size="lg">
          <Shield className="mr-2 h-4 w-4" />
          {isSubmitting ? "Setting Up..." : "Deploy Recovery System"}
        </SophisticatedButton>
      </CardFooter>
    </Card>
  )
}
