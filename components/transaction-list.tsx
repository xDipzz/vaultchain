import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

const transactions = [
  {
    id: "1",
    type: "receive",
    amount: "245.8",
    token: "SOL",
    value: "$24,580.00",
    from: "8xzt...3Pjm",
    to: "7XSs...JUP",
    date: "Today, 10:45 AM",
    status: "completed",
  },
  {
    id: "2",
    type: "send",
    amount: "12.5",
    token: "SOL",
    value: "$1,250.00",
    from: "7XSs...JUP",
    to: "9qLz...5Rtn",
    date: "Yesterday, 6:30 PM",
    status: "completed",
  },
  {
    id: "3",
    type: "receive",
    amount: "500",
    token: "USDC",
    value: "$500.00",
    from: "3mKB...7Lpt",
    to: "7XSs...JUP",
    date: "Feb 20, 2023",
    status: "completed",
  },
  {
    id: "4",
    type: "send",
    amount: "35.2",
    token: "SOL",
    value: "$3,520.00",
    from: "7XSs...JUP",
    to: "5xRt...9Kmn",
    date: "Feb 18, 2023",
    status: "completed",
  },
  {
    id: "5",
    type: "receive",
    amount: "1,000",
    token: "USDC",
    value: "$1,000.00",
    from: "2pQr...8Vbn",
    to: "7XSs...JUP",
    date: "Feb 15, 2023",
    status: "completed",
  },
]

export function TransactionList() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="group flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-accent/50"
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                transaction.type === "receive" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500",
              )}
            >
              {transaction.type === "receive" ? (
                <ArrowDownLeft className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </div>
            <div className="space-y-1">
              <p className="font-medium leading-none">
                {transaction.type === "receive" ? "Received" : "Sent"} {transaction.amount} {transaction.token}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.type === "receive" ? "From" : "To"}:{" "}
                {transaction.type === "receive" ? transaction.from : transaction.to}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{transaction.value}</p>
            <p className="text-xs text-muted-foreground">{transaction.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
