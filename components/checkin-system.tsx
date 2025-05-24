"use client"

import { useState } from "react"
import { useRecoveryProgram, useRecoveryAccount } from "@/lib/program-hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock } from "lucide-react"

interface CheckinSystemProps {
  recoveryAccountId: string
}

export function CheckinSystem({ recoveryAccountId }: CheckinSystemProps) {
  const { recoveryAccount, loading: loadingAccount } = useRecoveryAccount(recoveryAccountId)
  const { performCheckin, loading, error } = useRecoveryProgram()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleCheckin = async () => {
    if (!recoveryAccountId) {
      return
    }

    try {
      setIsSubmitting(true)

      // Perform check-in
      await performCheckin(recoveryAccountId)

      setSuccessMessage("Check-in successful! Your recovery system has been updated.")

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (err) {
      console.error("Error performing check-in:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loadingAccount) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check-in System</CardTitle>
          <CardDescription>Loading recovery account data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!recoveryAccount) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check-in System</CardTitle>
          <CardDescription>Recovery account not found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The recovery account ID provided is not valid or the account does not exist.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Calculate time since last check-in
  const now = Math.floor(Date.now() / 1000)
  const lastCheckin = recoveryAccount.lastCheckin
  const checkinPeriod = recoveryAccount.checkinPeriod
  const timeSinceLastCheckin = now - lastCheckin
  const nextCheckinDue = lastCheckin + checkinPeriod
  const timeUntilNextCheckin = nextCheckinDue - now

  // Calculate progress percentage
  const progressPercentage = Math.min(100, (timeSinceLastCheckin / checkinPeriod) * 100)

  // Format time remaining
  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return "Overdue"

    const days = Math.floor(seconds / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))

    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""} ${hours} hour${hours !== 1 ? "s" : ""}`
    } else {
      const minutes = Math.floor((seconds % (60 * 60)) / 60)
      return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Check-in System</CardTitle>
        <CardDescription>Regularly check in to confirm you still have access to your wallet.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Check-in Status</span>
            <span className="text-sm text-muted-foreground">
              {timeUntilNextCheckin > 0 ? "Next check-in due in:" : "Check-in overdue by:"}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {timeUntilNextCheckin > 0 ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Clock className="h-4 w-4 text-amber-500" />
              )}
              <span className="text-sm">{timeUntilNextCheckin > 0 ? "Active" : "Needs check-in"}</span>
            </div>
            <span className="text-sm font-medium">{formatTimeRemaining(Math.abs(timeUntilNextCheckin))}</span>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            <h3 className="font-medium">Check-in Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Last check-in:</div>
              <div>{new Date(lastCheckin * 1000).toLocaleString()}</div>
              <div className="text-muted-foreground">Check-in period:</div>
              <div>{Math.floor(checkinPeriod / (24 * 60 * 60))} days</div>
              <div className="text-muted-foreground">Next check-in due:</div>
              <div>{new Date(nextCheckinDue * 1000).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
            {successMessage}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleCheckin} disabled={loading || isSubmitting} className="w-full">
          <CheckCircle className="mr-2 h-4 w-4" />
          {isSubmitting ? "Checking in..." : "Perform Check-in"}
        </Button>
      </CardFooter>
    </Card>
  )
}
