"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle, Clock, Plus, Shield, Trash2, Users, Wallet, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useSolana } from "@/components/solana-provider"
import { WalletConnectButton } from "@/components/wallet-connect-button"

interface Guardian {
  address: string
  addedDate: string
  status: "active" | "pending"
}

export default function GuardiansPage() {
  const { connected, publicKey } = useSolana()
  const router = useRouter()
  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [threshold, setThreshold] = useState(2)
  const [recoveryDelay, setRecoveryDelay] = useState(3)
  const [isLoading, setIsLoading] = useState(true)
  const [newGuardianAddress, setNewGuardianAddress] = useState("")
  const [isAddingGuardian, setIsAddingGuardian] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load guardian data
  useEffect(() => {
    const loadGuardianData = () => {
      if (connected && publicKey) {
        try {
          // Load existing guardians
          const guardiansData = localStorage.getItem(`guardians_${publicKey.toString()}`)
          const thresholdData = localStorage.getItem(`threshold_${publicKey.toString()}`)
          const recoveryDelayData = localStorage.getItem(`recovery_delay_${publicKey.toString()}`)

          if (guardiansData) {
            const guardianAddresses = JSON.parse(guardiansData) as string[]
            const guardiansWithStatus: Guardian[] = guardianAddresses.map((address, index) => ({
              address,
              addedDate: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toLocaleDateString(),
              status: "active" as const,
            }))
            setGuardians(guardiansWithStatus)
          }

          if (thresholdData) {
            setThreshold(parseInt(thresholdData))
          }

          if (recoveryDelayData) {
            setRecoveryDelay(Math.floor(parseInt(recoveryDelayData) / (24 * 60 * 60))) // Convert seconds to days
          }
        } catch (error) {
          console.error("Error loading guardian data:", error)
          setError("Failed to load guardian data")
        }
      }
      setIsLoading(false)
    }

    loadGuardianData()
  }, [connected, publicKey])

  // Validate Solana address
  const validateSolanaAddress = (address: string) => {
    if (!address.trim()) return false
    try {
      return address.length >= 32 && address.length <= 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address)
    } catch {
      return false
    }
  }

  // Add new guardian
  const handleAddGuardian = () => {
    if (!connected || !publicKey) return
    
    setError(null)

    if (!validateSolanaAddress(newGuardianAddress)) {
      setError("Invalid Solana address")
      return
    }

    if (guardians.some(g => g.address === newGuardianAddress)) {
      setError("This guardian is already added")
      return
    }

    if (newGuardianAddress === publicKey?.toString()) {
      setError("You cannot add yourself as a guardian")
      return
    }

    setIsAddingGuardian(true)

    try {
      const newGuardian: Guardian = {
        address: newGuardianAddress,
        addedDate: new Date().toLocaleDateString(),
        status: "active"
      }

      const updatedGuardians = [...guardians, newGuardian]
      setGuardians(updatedGuardians)

      // Save to localStorage
      const guardianAddresses = updatedGuardians.map(g => g.address)
      localStorage.setItem(`guardians_${publicKey.toString()}`, JSON.stringify(guardianAddresses))

      setNewGuardianAddress("")
      setError(null)
    } catch (error) {
      console.error("Error adding guardian:", error)
      setError("Failed to add guardian")
    } finally {
      setIsAddingGuardian(false)
    }
  }

  // Remove guardian
  const handleRemoveGuardian = (addressToRemove: string) => {
    if (!connected || !publicKey) return

    const updatedGuardians = guardians.filter(g => g.address !== addressToRemove)
    setGuardians(updatedGuardians)

    // Save to localStorage
    const guardianAddresses = updatedGuardians.map(g => g.address)
    localStorage.setItem(`guardians_${publicKey.toString()}`, JSON.stringify(guardianAddresses))

    // Update threshold if it's higher than remaining guardians
    if (threshold > updatedGuardians.length) {
      const newThreshold = Math.max(2, updatedGuardians.length)
      setThreshold(newThreshold)
      localStorage.setItem(`threshold_${publicKey.toString()}`, newThreshold.toString())
    }
  }

  // Update threshold
  const handleThresholdChange = (newThreshold: number) => {
    if (!connected || !publicKey) return
    
    setThreshold(newThreshold)
    localStorage.setItem(`threshold_${publicKey.toString()}`, newThreshold.toString())
  }

  // Update recovery delay
  const handleRecoveryDelayChange = (newDelay: number) => {
    if (!connected || !publicKey) return
    
    setRecoveryDelay(newDelay)
    // Convert days to seconds for storage
    localStorage.setItem(`recovery_delay_${publicKey.toString()}`, (newDelay * 24 * 60 * 60).toString())
  }

  // Redirect to setup if not connected
  if (!connected) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-8">
          <div>
            <Wallet className="w-16 h-16 text-neutral-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Connect Your Solana Wallet</h2>
            <p className="text-neutral-400 mb-6">
              Connect your wallet to manage your recovery guardians.
            </p>
            <WalletConnectButton />
          </div>
        </div>
      </DashboardShell>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-8">
          <div>
            <RefreshCw className="w-16 h-16 text-neutral-400 mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Loading Guardians</h2>
            <p className="text-neutral-400 mb-6">
              Loading your recovery guardian information...
            </p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Guardian Management" text="Manage your recovery guardians and their permissions.">
        <Button onClick={() => setNewGuardianAddress("")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Guardian
        </Button>
      </DashboardHeader>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Your Guardians</CardTitle>
            <CardDescription>These trusted contacts can help you recover your wallet if needed.</CardDescription>
          </CardHeader>
          <CardContent>
            {guardians.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Guardians Added</h3>
                <p className="text-neutral-400 mb-4">
                  Add trusted contacts who can help you recover your wallet if you lose access.
                </p>
                <Button variant="outline" onClick={() => router.push('/dashboard/setup-recovery')}>
                  Set Up Recovery System
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guardian Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guardians.map((guardian, index) => (
                    <TableRow key={guardian.address}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="font-mono text-sm">
                            {guardian.address.slice(0, 8)}...{guardian.address.slice(-8)}
                          </span>
                          <span className="text-xs text-muted-foreground">Guardian #{index + 1}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {guardian.status === "active" ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-amber-500" />
                              <span>Pending</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{guardian.addedDate}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleRemoveGuardian(guardian.address)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Recovery threshold: {threshold} out of {guardians.length} guardians required for wallet recovery.
            </p>
          </CardFooter>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Add New Guardian</CardTitle>
            <CardDescription>Add a trusted contact with their Solana wallet address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Solana Wallet Address</Label>
              <Input 
                id="address" 
                placeholder="Enter guardian's Solana address"
                value={newGuardianAddress}
                onChange={(e) => setNewGuardianAddress(e.target.value)}
                className={error && newGuardianAddress ? "border-red-500" : ""}
              />
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
              <div className="flex items-start gap-2">
                <Shield className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div className="space-y-1">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Only add people you trust completely. They will have the ability to help recover your wallet if you
                    lose access. Make sure they have a Solana wallet.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setNewGuardianAddress("")}>
              Clear
            </Button>
            <Button 
              onClick={handleAddGuardian}
              disabled={!newGuardianAddress || isAddingGuardian || !validateSolanaAddress(newGuardianAddress)}
            >
              {isAddingGuardian ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Users className="mr-2 h-4 w-4" />
                  Add Guardian
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Guardian Settings</CardTitle>
          <CardDescription>Configure how your guardians help with wallet recovery.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
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
                  min="2" 
                  max={Math.max(2, guardians.length)} 
                  value={threshold}
                  onChange={(e) => handleThresholdChange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>2</span>
                  {guardians.length > 2 && <span>{Math.ceil(guardians.length/2)}</span>}
                  {guardians.length > 3 && <span>{guardians.length}</span>}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Number of guardians required to recover your wallet (out of {guardians.length}).
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="delay" className="text-base font-medium">Recovery Delay</Label>
                <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-orange-300">{recoveryDelay}d</span>
                </div>
              </div>
              <div className="relative">
                <Input 
                  id="delay" 
                  type="range" 
                  min="1" 
                  max="7" 
                  value={recoveryDelay}
                  onChange={(e) => handleRecoveryDelayChange(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1d</span>
                  <span>3d</span>
                  <span>5d</span>
                  <span>7d</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Waiting period before recovery is completed.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-green-600">Settings are automatically saved</p>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Guardian Recovery Testing</CardTitle>
          <CardDescription>Verify your recovery process works by running a test.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Recovery Simulation</h4>
                <p className="text-sm text-muted-foreground">
                  Run a simulated recovery process to ensure your guardians understand how to help you recover your
                  wallet.
                </p>
              </div>
              <Button onClick={() => router.push('/dashboard/recovery')}>
                Start Test Recovery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Last test: Never. We recommend testing your recovery process at least once every 6 months.
          </p>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
