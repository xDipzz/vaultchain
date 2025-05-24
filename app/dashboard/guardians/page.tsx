import { ArrowRight, CheckCircle, Clock, Plus, Shield, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function GuardiansPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Guardian Management" text="Manage your recovery guardians and their permissions.">
        <Button>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>Sarah Johnson</span>
                      <span className="text-xs text-muted-foreground">sarah@example.com</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span>Active</span>
                    </div>
                  </TableCell>
                  <TableCell>Jan 12, 2023</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>Michael Chen</span>
                      <span className="text-xs text-muted-foreground">michael@example.com</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span>Active</span>
                    </div>
                  </TableCell>
                  <TableCell>Jan 14, 2023</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>Alex Rodriguez</span>
                      <span className="text-xs text-muted-foreground">alex@example.com</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span>Active</span>
                    </div>
                  </TableCell>
                  <TableCell>Jan 18, 2023</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>Emily Wilson</span>
                      <span className="text-xs text-muted-foreground">emily@example.com</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>Pending</span>
                    </div>
                  </TableCell>
                  <TableCell>Feb 3, 2023</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Recovery threshold: 3 out of 4 guardians required for wallet recovery.
            </p>
          </CardFooter>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Add New Guardian</CardTitle>
            <CardDescription>Invite a trusted contact to be your wallet recovery guardian.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Guardian's full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="guardian@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Input id="message" placeholder="Add a personal note to your invitation" />
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
              <div className="flex items-start gap-2">
                <Shield className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div className="space-y-1">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Only add people you trust completely. They will have the ability to help recover your wallet if you
                    lose access.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Guardian Settings</CardTitle>
          <CardDescription>Configure how your guardians help with wallet recovery.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="threshold">Recovery Threshold</Label>
              <div className="flex items-center gap-2">
                <Input id="threshold" type="range" min="2" max="5" defaultValue="3" />
                <span className="w-12 text-center">3</span>
              </div>
              <p className="text-xs text-muted-foreground">Number of guardians required to recover your wallet.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delay">Recovery Delay</Label>
              <div className="flex items-center gap-2">
                <Input id="delay" type="range" min="1" max="7" defaultValue="3" />
                <span className="w-12 text-center">3d</span>
              </div>
              <p className="text-xs text-muted-foreground">Waiting period before recovery is completed.</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notification">Guardian Notifications</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notify-login" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <label
                  htmlFor="notify-login"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Notify guardians of unusual login activity
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notify-transaction"
                  className="h-4 w-4 rounded border-gray-300"
                  defaultChecked
                />
                <label
                  htmlFor="notify-transaction"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Notify guardians of large transactions
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notify-recovery"
                  className="h-4 w-4 rounded border-gray-300"
                  defaultChecked
                />
                <label
                  htmlFor="notify-recovery"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Notify all guardians when recovery is initiated
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save Settings</Button>
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
              <Button>
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
