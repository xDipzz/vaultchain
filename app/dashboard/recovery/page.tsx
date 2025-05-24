import { ArrowRight, CheckCircle, HelpCircle, Shield, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function RecoveryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Recovery Center" text="Manage wallet recovery processes and guardian voting.">
        <Button variant="outline" size="sm">
          <HelpCircle className="mr-2 h-4 w-4" />
          Recovery Guide
        </Button>
      </DashboardHeader>
      <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <CardTitle className="text-green-800 dark:text-green-300">Your Wallet is Secure</CardTitle>
          </div>
          <CardDescription className="text-green-700 dark:text-green-400">
            No recovery process is currently active. Your wallet is operating normally.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-green-800 dark:text-green-300">Last Check-in</div>
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">2 days ago</div>
              <div className="text-xs text-green-700 dark:text-green-400">Next check-in due in 28 days</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-green-800 dark:text-green-300">Guardian Status</div>
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">4/4 Active</div>
              <div className="text-xs text-green-700 dark:text-green-400">All guardians are ready to help</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-green-800 dark:text-green-300">Recovery Readiness</div>
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">100%</div>
              <div className="text-xs text-green-700 dark:text-green-400">
                Your recovery system is fully operational
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="border-green-300 bg-green-100 text-green-800 hover:bg-green-200 dark:border-green-800 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800"
          >
            Run Recovery Test
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Initiate Recovery</CardTitle>
            <CardDescription>Start the process to recover your wallet access.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <h4 className="font-medium">Lost Access Recovery</h4>
                    <p className="text-sm text-muted-foreground">
                      If you've lost access to your wallet, start the guardian-based recovery process.
                    </p>
                    <Button size="sm" className="mt-2">
                      Start Recovery
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-2">
                  <Users className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <h4 className="font-medium">Guardian Replacement</h4>
                    <p className="text-sm text-muted-foreground">
                      Replace guardians who are no longer available to help with recovery.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Replace Guardian
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recovery Timeline</CardTitle>
            <CardDescription>Estimated time for each recovery step.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      1
                    </div>
                    <span className="text-sm font-medium">Initiate Recovery</span>
                  </div>
                  <span className="text-xs text-muted-foreground">~5 minutes</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      2
                    </div>
                    <span className="text-sm font-medium">Guardian Approval</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1-24 hours</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      3
                    </div>
                    <span className="text-sm font-medium">Security Delay</span>
                  </div>
                  <span className="text-xs text-muted-foreground">3 days</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      4
                    </div>
                    <span className="text-sm font-medium">Wallet Access Restored</span>
                  </div>
                  <span className="text-xs text-muted-foreground">~10 minutes</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Total estimated time: 3-4 days depending on guardian response time.
            </p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Guardian Voting</CardTitle>
            <CardDescription>Track guardian approval for recovery requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <h4 className="font-medium">No Active Voting</h4>
                  <p className="text-sm text-muted-foreground">
                    There are currently no active recovery requests requiring guardian approval.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Recovery Threshold</h4>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">3 out of 4 guardians required</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  When recovery is initiated, at least 3 guardians must approve to restore wallet access.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recovery History</CardTitle>
          <CardDescription>Past recovery attempts and their outcomes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
              <TabsTrigger value="real">Real Recoveries</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 pt-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <h4 className="font-medium">Recovery Test</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Simulated recovery process completed successfully.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Feb 15, 2023</div>
                    <div className="text-xs text-muted-foreground">3/3 guardians approved</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-destructive" />
                      <h4 className="font-medium">Recovery Cancelled</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Recovery process was cancelled by the wallet owner.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Jan 8, 2023</div>
                    <div className="text-xs text-muted-foreground">2/3 guardians approved</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <h4 className="font-medium">Recovery Test</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Initial recovery system setup and testing.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Dec 20, 2022</div>
                    <div className="text-xs text-muted-foreground">3/3 guardians approved</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tests" className="space-y-4 pt-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <h4 className="font-medium">Recovery Test</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Simulated recovery process completed successfully.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Feb 15, 2023</div>
                    <div className="text-xs text-muted-foreground">3/3 guardians approved</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <h4 className="font-medium">Recovery Test</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Initial recovery system setup and testing.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Dec 20, 2022</div>
                    <div className="text-xs text-muted-foreground">3/3 guardians approved</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="real" className="space-y-4 pt-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-destructive" />
                      <h4 className="font-medium">Recovery Cancelled</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Recovery process was cancelled by the wallet owner.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Jan 8, 2023</div>
                    <div className="text-xs text-muted-foreground">2/3 guardians approved</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recovery FAQ</CardTitle>
          <CardDescription>Common questions about the wallet recovery process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">What happens if I lose access to my wallet?</h3>
            <p className="text-sm text-muted-foreground">
              If you lose access to your wallet, you can initiate the recovery process. Your guardians will be notified
              and asked to approve the recovery request. Once the required number of guardians approve, and after a
              security delay period, you'll regain access to your wallet.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">How long does the recovery process take?</h3>
            <p className="text-sm text-muted-foreground">
              The recovery process typically takes 3-4 days. This includes time for guardian approval (1-24 hours
              depending on guardian response time) and a mandatory security delay (3 days) to protect against
              unauthorized recovery attempts.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">What if my guardians are unavailable?</h3>
            <p className="text-sm text-muted-foreground">
              If some guardians are unavailable, you can still recover your wallet as long as you meet the threshold
              requirement (e.g., 3 out of 4). If you can't meet the threshold, contact support for alternative recovery
              options.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Can I cancel a recovery process?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, if you regain access to your wallet or initiated recovery by mistake, you can cancel the process at
              any time before it completes. Simply log in to your wallet and cancel the recovery from the Recovery
              Center.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Complete Recovery Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
