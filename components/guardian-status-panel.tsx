"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { useSolana } from "@/components/solana-provider"

interface Guardian {
  id: string
  address: string
  status: "active" | "pending"
  lastCheck: string
}

export function GuardianStatusPanel() {
  const { connected, publicKey } = useSolana()
  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGuardians = () => {
      if (connected && publicKey) {
        try {
          const guardiansData = localStorage.getItem(`guardians_${publicKey}`)
          if (guardiansData) {
            const guardianAddresses = JSON.parse(guardiansData) as string[]
            const guardiansList: Guardian[] = guardianAddresses.map((address, index) => ({
              id: (index + 1).toString(),
              address,
              status: "active" as const,
              lastCheck: "Recently", // TODO: Get actual last check from blockchain
            }))
            setGuardians(guardiansList)
          } else {
            setGuardians([])
          }
        } catch (error) {
          console.error("Error loading guardians:", error)
          setGuardians([])
        }
      } else {
        setGuardians([])
      }
      setLoading(false)
    }

    loadGuardians()
  }, [connected, publicKey])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Guardian Status</span>
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
      </div>
    )
  }

  if (!connected || guardians.length === 0) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Guardian Status</span>
            <span className="text-sm text-muted-foreground">
              {!connected ? "Wallet not connected" : "No guardians set up"}
            </span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            {!connected 
              ? "Connect your wallet to view guardians" 
              : "Set up your recovery system to add guardians"
            }
          </p>
        </div>
      </div>
    )
  }

  const activeGuardians = guardians.filter((guardian) => guardian.status === "active").length
  const totalGuardians = guardians.length
  const percentage = totalGuardians > 0 ? (activeGuardians / totalGuardians) * 100 : 0

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Guardian Status</span>
          <span className="text-sm text-muted-foreground">
            {activeGuardians}/{totalGuardians} Active
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
      <div className="space-y-3">
        {guardians.map((guardian) => (
          <div
            key={guardian.id}
            className="group flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  guardian.status === "active" ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-500",
                )}
              >
                <User className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-medium leading-none">Guardian #{guardian.id}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {guardian.address.slice(0, 8)}...{guardian.address.slice(-8)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {guardian.status === "active" ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Clock className="h-4 w-4 text-amber-500" />
              )}
              <span className="text-xs text-muted-foreground">{guardian.lastCheck}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
