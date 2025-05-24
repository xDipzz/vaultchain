import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { SolanaRecoveryService } from "./solana-programs"

export function useSolanaRecovery() {
  const { connection } = useConnection()
  const { wallet, publicKey } = useWallet()

  // This would initialize the actual program integration
  const recoveryService = new SolanaRecoveryService(
    connection,
    // program instance would be created here
    null as any,
    wallet,
  )

  return {
    deployRecovery: recoveryService.deployRecoverySystem.bind(recoveryService),
    performCheckin: recoveryService.performCheckin.bind(recoveryService),
    initiateRecovery: recoveryService.initiateRecovery.bind(recoveryService),
    voteOnRecovery: recoveryService.voteOnRecovery.bind(recoveryService),
    executeRecovery: recoveryService.executeRecovery.bind(recoveryService),
    cancelRecovery: recoveryService.cancelRecovery.bind(recoveryService),
    getRecoveryAccount: recoveryService.getRecoveryAccount.bind(recoveryService),
    getBalance: recoveryService.getBalance.bind(recoveryService),
    getTransactionHistory: recoveryService.getTransactionHistory.bind(recoveryService),
  }
}
