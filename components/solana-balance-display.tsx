import { useSolana } from "@/components/solana-provider"

interface SolanaBalanceDisplayProps {
  className?: string
  showUsd?: boolean
}

export function SolanaBalanceDisplay({ className = "", showUsd = true }: SolanaBalanceDisplayProps) {
  const { balance } = useSolana()

  // Mock SOL to USD conversion (in a real app, you would fetch this from an API)
  const solPrice = 100 // Assume 1 SOL = $100 USD
  const usdValue = balance ? balance * solPrice : null

  if (balance === null) {
    return <div className={className}>-- SOL</div>
  }

  return (
    <div className={className}>
      <div className="font-bold">{balance.toFixed(4)} SOL</div>
      {showUsd && usdValue !== null && <div className="text-xs text-neutral-400">${usdValue.toFixed(2)} USD</div>}
    </div>
  )
}
