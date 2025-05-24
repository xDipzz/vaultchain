"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useSolana } from "@/components/solana-provider"

interface Guardian {
  id: string
  address: string
  isValid: boolean
}

export default function SetupRecoveryPage() {
  const router = useRouter()
  const { connected, publicKey } = useSolana()
  const [currentStep, setCurrentStep] = useState("step1")
  const [isDeploying, setIsDeploying] = useState(false)
  
  // Form state
  const [recoveryName, setRecoveryName] = useState("")
  const [threshold, setThreshold] = useState(2)
  const [checkinPeriod, setCheckinPeriod] = useState(30) // days
  const [recoveryDelay, setRecoveryDelay] = useState(3) // days
  const [guardians, setGuardians] = useState<Guardian[]>([
    { id: '1', address: '', isValid: false },
    { id: '2', address: '', isValid: false },
    { id: '3', address: '', isValid: false },
  ])

  // Validation
  const isStep1Valid = recoveryName.trim().length > 0
  const isStep2Valid = threshold >= 2 && threshold <= guardians.length
  const isStep3Valid = guardians.filter(g => g.isValid).length >= threshold
  const isStep4Valid = isStep1Valid && isStep2Valid && isStep3Valid

  // Validate Solana address
  const validateSolanaAddress = (address: string) => {
    if (!address.trim()) return false
    try {
      // Basic validation - Solana addresses are base58 encoded and typically 32-44 characters
      return address.length >= 32 && address.length <= 44 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address)
    } catch {
      return false
    }
  }

  // Update guardian address
  const updateGuardianAddress = (id: string, address: string) => {
    setGuardians(prev => 
      prev.map(g => 
        g.id === id 
          ? { ...g, address, isValid: validateSolanaAddress(address) }
          : g
      )
    )
  }

  // Add guardian
  const addGuardian = () => {
    const newId = (guardians.length + 1).toString()
    setGuardians(prev => [...prev, { id: newId, address: '', isValid: false }])
  }

  // Remove guardian
  const removeGuardian = (id: string) => {
    if (guardians.length > 3) { // Keep minimum 3 guardians
      setGuardians(prev => prev.filter(g => g.id !== id))
    }
  }

  // Deploy recovery system
  const deployRecoverySystem = async () => {
    if (!connected || !publicKey) return
    
    setIsDeploying(true)
    try {
      // TODO: Replace with actual smart contract deployment
      // For now, we'll simulate the deployment and store in localStorage
      
      // Simulate deployment delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Store setup data in localStorage (this will be replaced with blockchain storage)
      localStorage.setItem(`recovery_setup_${publicKey}`, 'true')
      localStorage.setItem(`recovery_name_${publicKey}`, recoveryName)
      localStorage.setItem(`threshold_${publicKey}`, threshold.toString())
      localStorage.setItem(`checkin_period_${publicKey}`, (checkinPeriod * 24 * 60 * 60).toString()) // Convert to seconds
      localStorage.setItem(`recovery_delay_${publicKey}`, (recoveryDelay * 24 * 60 * 60).toString()) // Convert to seconds
      localStorage.setItem(`guardians_${publicKey}`, JSON.stringify(guardians.filter(g => g.isValid).map(g => g.address)))
      localStorage.setItem(`last_checkin_${publicKey}`, Math.floor(Date.now() / 1000).toString())
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to deploy recovery system:', error)
      alert('Failed to deploy recovery system. Please try again.')
    } finally {
      setIsDeploying(false)
    }
  }

  // Navigation functions
  const goToStep = (step: string) => {
    setCurrentStep(step)
  }

  const nextStep = () => {
    const steps = ["step1", "step2", "step3", "step4"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const steps = ["step1", "step2", "step3", "step4"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  // Redirect if not connected
  useEffect(() => {
    if (!connected) {
      router.push('/dashboard')
    }
  }, [connected, router])

  if (!connected) {
    return null
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Set Up Wallet Recovery"
        text="Protect your existing Solana wallet with social recovery in a few simple steps."
      >
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Recovery System Setup</CardTitle>
          <CardDescription>
            Follow these steps to protect your existing Solana wallet with VaultChain's recovery system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="step1" onClick={() => goToStep("step1")}>1. Connect</TabsTrigger>
              <TabsTrigger value="step2" onClick={() => goToStep("step2")} disabled={!isStep1Valid}>2. Security</TabsTrigger>
              <TabsTrigger value="step3" onClick={() => goToStep("step3")} disabled={!isStep2Valid}>3. Guardians</TabsTrigger>
              <TabsTrigger value="step4" onClick={() => goToStep("step4")} disabled={!isStep3Valid}>4. Confirm</TabsTrigger>
            </TabsList>
            
            <TabsContent value="step1" className="space-y-4 pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground">
                  First, let's set up the recovery system for your connected Solana wallet.
                </p>
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="wallet-address">Your Wallet Address</Label>
                  <Input 
                    id="wallet-address" 
                    value={publicKey ? `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}` : ""} 
                    readOnly 
                  />
                  <p className="text-xs text-muted-foreground">This is the wallet that will be protected.</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recovery-name">Recovery System Name</Label>
                  <Input 
                    id="recovery-name" 
                    placeholder="My Wallet Recovery" 
                    value={recoveryName}
                    onChange={(e) => setRecoveryName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Choose a name to help you identify this recovery system.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={nextStep} disabled={!isStep1Valid}>
                  Continue to Security
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="step2" className="space-y-4 pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure the security features for your recovery system.
                </p>
              </div>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recovery-threshold">Recovery Threshold</Label>
                    <span className="text-sm text-muted-foreground">{threshold} guardians</span>
                  </div>
                  <Input 
                    id="recovery-threshold" 
                    type="range" 
                    min="2" 
                    max="5" 
                    value={threshold}
                    onChange={(e) => setThreshold(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of guardians required to recover your wallet. We recommend at least 2 for optimal security.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="check-in-period">Check-in Period</Label>
                    <span className="text-sm text-muted-foreground">{checkinPeriod} days</span>
                  </div>
                  <Input 
                    id="check-in-period" 
                    type="range" 
                    min="7" 
                    max="90" 
                    value={checkinPeriod}
                    onChange={(e) => setCheckinPeriod(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    How often you need to check in to confirm wallet access. If you miss a check-in, recovery options
                    become available.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recovery-delay">Recovery Delay</Label>
                  <Input 
                    id="recovery-delay" 
                    type="range" 
                    min="1" 
                    max="7" 
                    value={recoveryDelay}
                    onChange={(e) => setRecoveryDelay(parseInt(e.target.value))}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Waiting period before recovery is completed. This gives you time to cancel if unauthorized.
                    </p>
                    <span className="text-sm text-muted-foreground">{recoveryDelay} days</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep} disabled={!isStep2Valid}>
                  Continue to Guardians
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="step3" className="space-y-4 pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Add Recovery Guardians</h3>
                <p className="text-sm text-muted-foreground">
                  Select trusted friends, family members, or DAOs who can help recover your wallet if needed.
                </p>
              </div>
              <div className="grid gap-6 py-4">
                <div className="grid gap-4">
                  {guardians.map((guardian, index) => (
                    <div key={guardian.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <h4 className="font-medium">Guardian #{index + 1}</h4>
                            {guardian.isValid && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                          <div className="grid gap-1">
                            <Label htmlFor={`guardian-${guardian.id}-address`}>Solana Address</Label>
                            <Input 
                              id={`guardian-${guardian.id}-address`} 
                              placeholder="Enter Solana wallet address" 
                              value={guardian.address}
                              onChange={(e) => updateGuardianAddress(guardian.id, e.target.value)}
                              className={guardian.address && !guardian.isValid ? "border-red-500" : ""}
                            />
                            {guardian.address && !guardian.isValid && (
                              <p className="text-xs text-red-500">Invalid Solana address</p>
                            )}
                          </div>
                        </div>
                        {guardians.length > 3 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeGuardian(guardian.id)}
                            className="ml-2"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {guardians.length < 5 && (
                    <Button variant="outline" className="w-full" onClick={addGuardian}>
                      <Users className="mr-2 h-4 w-4" />
                      Add Another Guardian
                    </Button>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  You need at least {threshold} valid guardian addresses to proceed.
                  Currently: {guardians.filter(g => g.isValid).length}/{threshold}
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep} disabled={!isStep3Valid}>
                  Continue to Confirm
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="step4" className="space-y-4 pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Confirm Recovery Setup</h3>
                <p className="text-sm text-muted-foreground">Review your recovery system settings before finalizing.</p>
              </div>
              <div className="grid gap-6 py-4">
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-medium">Wallet Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Protected Wallet:</div>
                      <div>{publicKey ? `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}` : ""}</div>
                      <div className="text-muted-foreground">Recovery Name:</div>
                      <div>{recoveryName}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Security Settings</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Recovery Threshold:</div>
                      <div>{threshold} guardians</div>
                      <div className="text-muted-foreground">Check-in Period:</div>
                      <div>{checkinPeriod} days</div>
                      <div className="text-muted-foreground">Recovery Delay:</div>
                      <div>{recoveryDelay} days</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Guardians ({guardians.filter(g => g.isValid).length})</h4>
                    <div className="grid gap-2 text-sm">
                      {guardians.filter(g => g.isValid).map((guardian, index) => (
                        <div key={guardian.id} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{guardian.address.slice(0, 8)}...{guardian.address.slice(-8)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                  <div className="flex items-start gap-2">
                    <Shield className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <div className="space-y-1">
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">Important Security Notice</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Once deployed, your recovery system will be secured by your guardians. Make sure they are people
                        or DAOs you trust completely. You will need their help if you ever lose access to your wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={deployRecoverySystem} disabled={!isStep4Valid || isDeploying}>
                  <Shield className="mr-2 h-4 w-4" />
                  {isDeploying ? "Deploying..." : "Deploy Recovery Program"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Solana-powered social recovery system</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Step {currentStep === "step1" ? "1" : currentStep === "step2" ? "2" : currentStep === "step3" ? "3" : "4"} of 4
            </p>
          </div>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
