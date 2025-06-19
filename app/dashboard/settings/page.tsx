import { Lock, Save, Shield, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your wallet settings and preferences.">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </DashboardHeader>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="recovery">Recovery</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Information</CardTitle>
              <CardDescription>
                Basic information about your wallet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet-name">Wallet Name</Label>
                <Input id="wallet-name" defaultValue="My Primary Wallet" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-description">Description</Label>
                <Input id="wallet-description" defaultValue="Main wallet for daily transactions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <div className="flex">
                  <Input id="wallet-address" defaultValue="7XSs3z4H...9qLCJUP" readOnly className="rounded-r-none" />
                  <Button variant="secondary" className="rounded-l-none">Copy</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is your public wallet address for receiving funds.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Your personal information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" defaultValue="Alex Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="alex@example.com" />
                <p className="text-xs text-muted-foreground">
                  Used for important notifications and recovery.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select id="timezone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Pacific Time (UTC-08:00)</option>
                  <option>Mountain Time (UTC-07:00)</option>
                  <option>Central Time (UTC-06:00)</option>
                  <option>Eastern Time (UTC-05:00)</option>
                  <option>UTC</option>
                  <option>India Standard Time (UTC+05:30)</option>
                </select>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize how your wallet appears.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="theme-light" name="theme" className="h-4 w-4" />
                    <label htmlFor="theme-light" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Light
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="theme-dark" name="theme" className="h-4 w-4" defaultChecked />
                    <label htmlFor="theme-dark" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Dark
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="theme-system" name="theme" className="h-4 w-4" />
                    <label htmlFor="theme-system" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      System
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Currency Display</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="currency-usd" name="currency" className="h-4 w-4" defaultChecked />
                    <label htmlFor="currency-usd" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      USD
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="currency-eur" name="currency" className="h-4 w-4" />
                    <label htmlFor="currency-eur" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      EUR
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="currency-gbp" name="currency" className="h-4 w-4" />
                    <label htmlFor="currency-gbp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      GBP
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your wallet's security features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-secondary" />
                      <span className="text-sm font-medium">2FA is enabled</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Using Authenticator App
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Transaction Signing</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="require-2fa" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                  <label htmlFor="require-2fa" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Require 2FA for all transactions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="require-confirmation" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                  <label htmlFor="require-confirmation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Require email confirmation for transactions over $1,000
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <select id="session-timeout" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option selected>1 hour</option>
                  <option>4 hours</option>
                  <option>8 hours</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Automatically log out after period of inactivity.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transaction Limits</CardTitle>
              <CardDescription>
                Set limits for daily transactions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="daily-limit">Daily Transaction Limit</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">$</span>
                  <Input id="daily-limit" type="number" defaultValue="5000" className="rounded-l-none" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum amount that can be sent in a 24-hour period.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transaction-limit">Single Transaction Limit</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">$</span>
                  <Input id="transaction-limit" type="number" defaultValue="2000" className="rounded-l-none" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum amount that can be sent in a single transaction.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Device Management</CardTitle>
              <CardDescription>
                Manage devices that have access to your wallet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">Current Device</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        MacBook Pro • Chrome • San Francisco, CA
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last active: Just now
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Current
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium">iPhone 13</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Safari • San Francisco, CA
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last active: 2 days ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium">Windows PC</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Firefox • New York, NY
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last active: 1 week ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Login History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="recovery" className="space-y-4 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recovery Settings</CardTitle>
              <CardDescription>
                Configure how your wallet can be recovered.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recovery-threshold" className="text-base font-medium">Guardian Recovery Threshold</Label>
                  <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg px-3 py-1">
                    <span className="text-sm font-medium text-purple-300">3 guardians</span>
                  </div>
                </div>
                <div className="relative">
                  <Input id="recovery-threshold" type="range" min="2" max="5" defaultValue="3" className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Number of guardians required to recover your wallet.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recovery-delay" className="text-base font-medium">Recovery Delay Period</Label>
                  <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg px-3 py-1">
                    <span className="text-sm font-medium text-orange-300">3d</span>
                  </div>
                </div>
                <div className="relative">
                  <Input id="recovery-delay" type="range" min="1" max="7" defaultValue="3" className="w-full" />
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
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="check-in-period" className="text-base font-medium">Check-in Period</Label>
                  <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-3 py-1">
                    <span className="text-sm font-medium text-blue-300">30d</span>
                  </div>
                </div>
                <div className="relative">
                  <Input id="check-in-period" type="range" min="7" max="90" defaultValue="30" className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>7d</span>
                    <span>30d</span>
                    <span>60d</span>
                    <span>90d</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  How often you need to check in to verify you still control your wallet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-transactions" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="email-transactions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Transaction notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-recovery" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="email-recovery" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Recovery attempts
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-security" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="email-security" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Security alerts
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
