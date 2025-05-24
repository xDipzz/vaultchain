import { CheckCircle, Clock, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const guardians = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "active",
    lastCheck: "2 days ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    status: "active",
    lastCheck: "1 day ago",
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    email: "alex@example.com",
    status: "active",
    lastCheck: "3 days ago",
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily@example.com",
    status: "pending",
    lastCheck: "Invitation sent",
  },
]

export function GuardianStatusPanel() {
  const activeGuardians = guardians.filter((guardian) => guardian.status === "active").length
  const totalGuardians = guardians.length
  const percentage = (activeGuardians / totalGuardians) * 100

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
                <p className="font-medium leading-none">{guardian.name}</p>
                <p className="text-xs text-muted-foreground">{guardian.email}</p>
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
