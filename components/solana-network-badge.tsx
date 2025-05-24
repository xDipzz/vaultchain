import { useSolana } from "@/components/solana-provider"

export function SolanaNetworkBadge() {
  const { network } = useSolana()

  const getBadgeColor = () => {
    switch (network) {
      case "Mainnet":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "Devnet":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30"
      case "Testnet":
        return "bg-amber-500/20 text-amber-500 border-amber-500/30"
      default:
        return "bg-neutral-500/20 text-neutral-500 border-neutral-500/30"
    }
  }

  return <div className={`px-2 py-1 text-xs font-medium rounded-full border ${getBadgeColor()}`}>{network}</div>
}
