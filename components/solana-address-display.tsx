"use client"

import { Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SolanaAddressDisplayProps {
  address: string
  showCopy?: boolean
  showExplorer?: boolean
  truncate?: boolean
  className?: string
}

export function SolanaAddressDisplay({
  address,
  showCopy = true,
  showExplorer = true,
  truncate = true,
  className = "",
}: SolanaAddressDisplayProps) {
  const [copied, setCopied] = useState(false)

  const displayAddress = truncate ? `${address.slice(0, 4)}...${address.slice(-4)}` : address

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openExplorer = () => {
    // Use the appropriate Solana explorer URL based on the network
    // For demo purposes, we'll use Solana Explorer
    window.open(`https://explorer.solana.com/address/${address}`, "_blank")
  }

  return (
    <div className={`flex items-center gap-2 font-mono text-sm ${className}`}>
      <span>{displayAddress}</span>

      {showCopy && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full"
          onClick={copyToClipboard}
          title={copied ? "Copied!" : "Copy address"}
        >
          <Copy className="h-3 w-3" />
          <span className="sr-only">Copy address</span>
        </Button>
      )}

      {showExplorer && (
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={openExplorer}>
          View on Explorer
        </Button>
      )}
    </div>
  )
}
