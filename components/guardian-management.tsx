"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRecoveryProgram, useRecoveryAccount } from "@/lib/program-hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Trash2, Users } from "lucide-react"

interface GuardianManagementProps {
  recoveryAccountId: string
}

export function GuardianManagement({ recoveryAccountId }: GuardianManagementProps) {
  const { recoveryAccount, loading: loadingAccount } = useRecoveryAccount(recoveryAccountId)
  const { addGuardian, removeGuardian, loading, error } = useRecoveryProgram()

  const [newGuardian, setNewGuardian] = useState("")
  const [newGuardianName, setNewGuardianName] = useState("")
  const [newGuardianEmail, setNewGuardianEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const handleAddGuardian = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recoveryAccountId || !newGuardian.trim()) {
      return
    }

    try {
      setIsSubmitting(true)

      // Add guardian
      await addGuardian(recoveryAccountId, newGuardian)

      setSuccessMessage(`Guardian ${newGuardian} added successfully`)
      setNewGuardian("")
      setNewGuardianName("")
      setNewGuardianEmail("")
    } catch (err) {
      console.error("Error adding guardian:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveGuardian = async (guardianAddress: string) => {
    if (!recoveryAccountId) {
      return
    }

    try {
      setIsSubmitting(true)

      // Remove guardian
      await removeGuardian(recoveryAccountId, guardianAddress)

      setSuccessMessage(`Guardian removed successfully`)
    } catch (err) {
      console.error("Error removing guardian:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loadingAccount) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Guardian Management</CardTitle>
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
          <CardTitle>Guardian Management</CardTitle>
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

  return (
    <div className="space-y-6">
      <Card>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recoveryAccount.guardians.map((guardian, index) => (
                <TableRow key={guardian.toString()}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs">{guardian.toString()}</span>
                      <span className="text-xs text-muted-foreground">Guardian #{index + 1}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span>Active</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemoveGuardian(guardian.toString())}
                      disabled={isSubmitting}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Recovery threshold: {recoveryAccount.threshold} out of {recoveryAccount.guardians.length} guardians required
            for wallet recovery.
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Guardian</CardTitle>
          <CardDescription>Invite a trusted contact to be your wallet recovery guardian.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              placeholder="Guardian's full name"
              value={newGuardianName}
              onChange={(e) => setNewGuardianName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="guardian@example.com"
              value={newGuardianEmail}
              onChange={(e) => setNewGuardianEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Solana Wallet Address</Label>
            <Input
              id="address"
              placeholder="Enter Solana wallet address"
              value={newGuardian}
              onChange={(e) => setNewGuardian(e.target.value)}
              className="font-mono text-sm"
            />
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
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleAddGuardian} disabled={loading || isSubmitting || !newGuardian.trim()}>
            <Users className="mr-2 h-4 w-4" />
            {isSubmitting ? "Adding..." : "Add Guardian"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
