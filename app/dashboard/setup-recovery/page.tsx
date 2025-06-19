"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle, Shield, Users } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useSolana } from "@/components/solana-provider"
import { SophisticatedButton } from "@/components/sophisticated-button"

interface Guardian {
  id: string
  address: string
  isValid: boolean
}

export default function SetupRecoveryPage() {
  const router = useRouter()
  const { connected, publicKey } = useWallet()
  const { service } = useSolana()
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
      localStorage.setItem(`recovery_setup_${publicKey.toString()}`, 'true')
      localStorage.setItem(`recovery_name_${publicKey.toString()}`, recoveryName)
      localStorage.setItem(`threshold_${publicKey.toString()}`, threshold.toString())
      localStorage.setItem(`checkin_period_${publicKey.toString()}`, (checkinPeriod * 24 * 60 * 60).toString()) // Convert to seconds
      localStorage.setItem(`recovery_delay_${publicKey.toString()}`, (recoveryDelay * 24 * 60 * 60).toString()) // Convert to seconds
      localStorage.setItem(`guardians_${publicKey.toString()}`, JSON.stringify(guardians.filter(g => g.isValid).map(g => g.address)))
      localStorage.setItem(`last_checkin_${publicKey.toString()}`, Math.floor(Date.now() / 1000).toString())
      
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
              <div className="space-y-2 transform transition-all duration-300 animate-in slide-in-from-right-4">
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
                    value={publicKey?.toString() || ""} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">This is the wallet that will be protected.</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recovery-name">Recovery System Name</Label>
                  <Input 
                    id="recovery-name"
                    placeholder="e.g., My Main Wallet Recovery"
                    value={recoveryName}
                    onChange={(e) => setRecoveryName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Give your recovery system a memorable name.</p>
                </div>
              </div>
              <div className="flex justify-end">
                <SophisticatedButton 
                  onClick={nextStep} 
                  disabled={!isStep1Valid}
                >
                  Continue to Security
                  <ArrowRight className="ml-2 h-4 w-4" />
                </SophisticatedButton>
              </div>
            </TabsContent>

            <TabsContent value="step2" className="space-y-4 pt-6">
              <div className="space-y-2 transform transition-all duration-300 animate-in slide-in-from-right-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how many guardians you need and your check-in frequency.
                </p>
              </div>
              <div className="grid gap-6 py-4">
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
                      min={2}
                      max={5}
                      value={threshold}
                      onChange={(e) => setThreshold(Number.parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
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
              <div className="flex justify-between">
                <SophisticatedButton 
                  onClick={prevStep} 
                  variant="ghost"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </SophisticatedButton>
                <SophisticatedButton 
                  onClick={nextStep} 
                  disabled={!isStep2Valid}
                >
                  Continue to Guardians
                  <ArrowRight className="ml-2 h-4 w-4" />
                </SophisticatedButton>
              </div>
            </TabsContent>

            <TabsContent value="step3" className="space-y-4 pt-6">
              <div className="space-y-2 transform transition-all duration-300 animate-in slide-in-from-right-4">
                <h3 className="text-lg font-medium">Guardian Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Add trusted contacts who can help recover your wallet. You need at least {threshold} guardians.
                </p>
              </div>
              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  {guardians.map((guardian, index) => (
                    <div key={guardian.id} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder={`Guardian ${index + 1} Solana address`}
                          value={guardian.address}
                          onChange={(e) => updateGuardianAddress(guardian.id, e.target.value)}
                          className={`font-mono text-sm ${guardian.address && !guardian.isValid ? 'border-red-500' : guardian.isValid ? 'border-green-500' : ''}`}
                        />
                        {guardian.address && !guardian.isValid && (
                          <p className="text-xs text-red-400 mt-1">Invalid Solana address</p>
                        )}
                      </div>
                      {guardians.length > 3 && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeGuardian(guardian.id)}
                        >
                          ✕
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {guardians.length < 10 && (
                    <SophisticatedButton 
                      onClick={addGuardian} 
                      variant="secondary" 
                      className="w-full"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Add Another Guardian
                    </SophisticatedButton>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <SophisticatedButton 
                  onClick={prevStep} 
                  variant="ghost"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </SophisticatedButton>
                <SophisticatedButton 
                  onClick={nextStep} 
                  disabled={!isStep3Valid}
                >
                  Review & Deploy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </SophisticatedButton>
              </div>
            </TabsContent>

            <TabsContent value="step4" className="space-y-4 pt-6">
              <div className="space-y-2 transform transition-all duration-300 animate-in slide-in-from-right-4">
                <h3 className="text-lg font-medium">Review & Deploy</h3>
                <p className="text-sm text-muted-foreground">
                  Review your recovery system configuration before deployment.
                </p>
              </div>
              <div className="grid gap-4 py-4">
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Recovery Name:</span>
                    <span className="text-sm">{recoveryName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Wallet:</span>
                    <span className="text-sm font-mono">{publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Threshold:</span>
                    <span className="text-sm">{threshold} of {guardians.filter(g => g.isValid).length} guardians</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Check-in Period:</span>
                    <span className="text-sm">{checkinPeriod} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Recovery Delay:</span>
                    <span className="text-sm">{recoveryDelay} days</span>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium mb-2">Guardians ({guardians.filter(g => g.isValid).length})</h4>
                  <div className="space-y-2">
                    {guardians.filter(g => g.isValid).map((guardian, index) => (
                      <div key={guardian.id} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-mono">{guardian.address}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <SophisticatedButton 
                  onClick={prevStep} 
                  variant="ghost"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </SophisticatedButton>
                <SophisticatedButton 
                  onClick={deployRecoverySystem} 
                  disabled={!isStep4Valid || isDeploying}
                  size="lg"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  {isDeploying ? "Deploying..." : "Deploy Recovery System"}
                </SophisticatedButton>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
