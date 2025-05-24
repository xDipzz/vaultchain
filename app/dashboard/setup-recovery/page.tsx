import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function SetupRecoveryPage() {
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
          <Tabs defaultValue="step1" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="step1">1. Connect</TabsTrigger>
              <TabsTrigger value="step2">2. Security</TabsTrigger>
              <TabsTrigger value="step3">3. Guardians</TabsTrigger>
              <TabsTrigger value="step4">4. Confirm</TabsTrigger>
            </TabsList>
            <TabsContent value="step1" className="space-y-4 pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground">
                  First, let's connect your existing Solana wallet to set up the recovery system.
                </p>
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="wallet-address">Your Wallet Address</Label>
                  <Input id="wallet-address" value="7XSs3z4H...9qLCJUP" readOnly />
                  <p className="text-xs text-muted-foreground">This is the wallet that will be protected.</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recovery-name">Recovery System Name</Label>
                  <Input id="recovery-name" placeholder="My Wallet Recovery" />
                  <p className="text-xs text-muted-foreground">
                    Choose a name to help you identify this recovery system.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
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
                    <span className="text-sm text-muted-foreground">3 guardians</span>
                  </div>
                  <Input id="recovery-threshold" type="range" min="2" max="5" defaultValue="3" />
                  <p className="text-xs text-muted-foreground">
                    Number of guardians required to recover your wallet. We recommend at least 3 for optimal security.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="check-in-period">Check-in Period</Label>
                    <span className="text-sm text-muted-foreground">30 days</span>
                  </div>
                  <Input id="check-in-period" type="range" min="7" max="90" defaultValue="30" />
                  <p className="text-xs text-muted-foreground">
                    How often you need to check in to confirm wallet access. If you miss a check-in, recovery options
                    become available.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recovery-delay">Recovery Delay</Label>
                  <Input id="recovery-delay" type="range" min="1" max="7" defaultValue="3" />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Waiting period before recovery is completed. This gives you time to cancel if unauthorized.
                    </p>
                    <span className="text-sm text-muted-foreground">3 days</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button>
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
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Guardian #1</h4>
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor="guardian-1-address">Solana Address</Label>
                          <Input id="guardian-1-address" placeholder="Enter Solana wallet address" />
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Guardian #2</h4>
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor="guardian-2-address">Solana Address</Label>
                          <Input id="guardian-2-address" placeholder="Enter Solana wallet address" />
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Guardian #3</h4>
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor="guardian-3-address">Solana Address</Label>
                          <Input id="guardian-3-address" placeholder="Enter Solana wallet address" />
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Add Another Guardian (Optional)
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button>
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
                      <div>7XSs...JUP (Phantom)</div>
                      <div className="text-muted-foreground">Recovery Name:</div>
                      <div>My Wallet Recovery</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Security Settings</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Recovery Threshold:</div>
                      <div>3 guardians</div>
                      <div className="text-muted-foreground">Check-in Period:</div>
                      <div>30 days</div>
                      <div className="text-muted-foreground">Recovery Delay:</div>
                      <div>3 days</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">Guardians (3)</h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>7XSs...JUP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>9qLz...5Rtn</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span>3mKB...7Lpt</span>
                      </div>
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
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  Deploy Recovery Program
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
            <p className="text-sm text-muted-foreground">Step 1 of 4</p>
          </div>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
