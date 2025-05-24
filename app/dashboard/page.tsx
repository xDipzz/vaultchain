"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpRight, CheckCircle, Clock, Send, Users, Shield, Wallet, RefreshCw } from "lucide-react"
import Link from "next/link"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ElegantCard } from "@/components/elegant-card"
import { SophisticatedButton } from "@/components/sophisticated-button"
import { TransactionList } from "@/components/transaction-list"
import { GuardianStatusPanel } from "@/components/guardian-status-panel"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { useSolana } from "@/components/solana-provider"
import { SolanaNetworkBadge } from "@/components/solana-network-badge"
import { SolanaAddressDisplay } from "@/components/solana-address-display"
import { SolanaBalanceDisplay } from "@/components/solana-balance-display"

export default function DashboardPage() {
  const { connected, publicKey, walletName, network } = useSolana()
  const [recoverySystemSetup, setRecoverySystemSetup] = useState(false)

  const handleSetupRecovery = () => {
    setRecoverySystemSetup(true)
  }

  if (!connected) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-8">
          <div>
            <Wallet className="w-16 h-16 text-neutral-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Connect Your Solana Wallet</h2>
            <p className="text-neutral-400 mb-6">
              Connect your Phantom or Solflare wallet to set up social recovery protection.
            </p>
            <WalletConnectButton size="lg" />
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (!recoverySystemSetup) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-8">
          <div>
            <Shield className="w-16 h-16 text-neutral-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Set Up Recovery Protection</h2>
            <p className="text-neutral-400 mb-6">
              Deploy a recovery Solana program and link it to your existing wallet. Add trusted guardians to protect
              your funds.
            </p>
            <Link href="/dashboard/setup-recovery">
              <SophisticatedButton size="lg" onClick={handleSetupRecovery}>
                Set Up Recovery System
                <ArrowRight className="w-4 h-4 ml-2" />
              </SophisticatedButton>
            </Link>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Wallet Protection Dashboard"
        text="Monitor your wallet recovery system and guardian status."
      >
        <div className="flex items-center gap-3">
          <SolanaNetworkBadge />
          <SophisticatedButton variant="secondary" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Check-in
          </SophisticatedButton>
          <SophisticatedButton size="sm">
            <Send className="mr-2 h-4 w-4" />
            Send
          </SophisticatedButton>
        </div>
      </DashboardHeader>

      {/* Wallet Status Card */}
      <div>
        <ElegantCard className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">{walletName?.charAt(0) || "W"}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{walletName || "Solana Wallet"}</h3>
                <p className="text-sm text-green-400">Protected by VaultChain Recovery</p>
                {publicKey && (
                  <SolanaAddressDisplay address={publicKey} showExplorer={false} className="text-xs text-neutral-400" />
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-400">Recovery Active</span>
              </div>
              <p className="text-xs text-neutral-400">Last check-in: 2 days ago</p>
            </div>
          </div>
        </ElegantCard>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Wallet Balance",
            value: <SolanaBalanceDisplay />,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5 text-neutral-400"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            ),
          },
          {
            title: "Recovery Guardians",
            value: "3/3 Active",
            change: "All guardians ready",
            icon: <Users className="h-5 w-5 text-neutral-400" />,
          },
          {
            title: "Recovery Threshold",
            value: "2 of 3",
            change: "Guardians needed",
            icon: <Shield className="h-5 w-5 text-neutral-400" />,
          },
          {
            title: "Next Check-in",
            value: "28 days",
            change: "Stay protected",
            icon: <Clock className="h-5 w-5 text-neutral-400" />,
          },
        ].map((card, index) => (
          <div key={index}>
            <ElegantCard className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-neutral-400">{card.title}</h3>
                {card.icon}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">
                  {typeof card.value === "string" ? card.value : card.value}
                </div>
                {card.change && <p className="text-xs text-neutral-500">{card.change}</p>}
              </div>
            </ElegantCard>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ElegantCard className="h-full">
            <div className="p-6 border-b border-neutral-800/50">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <p className="text-sm text-neutral-400">Your recent wallet activity from your protected wallet.</p>
            </div>
            <div className="p-6">
              <TransactionList />
            </div>
            <div className="p-6 border-t border-neutral-800/50">
              <SophisticatedButton variant="ghost" className="w-full">
                View All Transactions
                <ArrowRight className="ml-2 h-4 w-4" />
              </SophisticatedButton>
            </div>
          </ElegantCard>
        </div>

        <div className="col-span-3">
          <ElegantCard className="h-full">
            <div className="p-6 border-b border-neutral-800/50">
              <h3 className="text-lg font-semibold text-white">Recovery Guardians</h3>
              <p className="text-sm text-neutral-400">Trusted people who can help recover your wallet.</p>
            </div>
            <div className="p-6">
              <GuardianStatusPanel />
            </div>
            <div className="p-6 border-t border-neutral-800/50">
              <Link href="/dashboard/guardians">
                <SophisticatedButton variant="ghost" className="w-full">
                  Manage Guardians
                  <ArrowRight className="ml-2 h-4 w-4" />
                </SophisticatedButton>
              </Link>
            </div>
          </ElegantCard>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <ElegantCard>
          <div className="p-6 border-b border-neutral-800/50">
            <h3 className="text-lg font-semibold text-white">Recovery Actions</h3>
            <p className="text-sm text-neutral-400">Manage your wallet protection and recovery settings.</p>
          </div>
          <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Perform Check-in",
                description: "Confirm you have wallet access",
                icon: <CheckCircle className="h-6 w-6 text-neutral-300" />,
                action: "Check-in",
                href: "/dashboard",
              },
              {
                title: "Add Guardian",
                description: "Increase recovery security",
                icon: <Users className="h-6 w-6 text-neutral-300" />,
                action: "Add",
                href: "/dashboard/guardians",
              },
              {
                title: "Test Recovery",
                description: "Simulate recovery process",
                icon: <RefreshCw className="h-6 w-6 text-neutral-300" />,
                action: "Test",
                href: "/dashboard/recovery",
              },
              {
                title: "Recovery Settings",
                description: "Adjust thresholds & timing",
                icon: <Shield className="h-6 w-6 text-neutral-300" />,
                action: "Settings",
                href: "/dashboard/settings",
              },
            ].map((action, index) => (
              <div key={index}>
                <ElegantCard className="p-6 text-center space-y-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    {action.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">{action.title}</h4>
                    <p className="text-sm text-neutral-400">{action.description}</p>
                  </div>
                  <Link href={action.href}>
                    <SophisticatedButton variant="ghost" size="sm" className="w-full">
                      {action.action}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </SophisticatedButton>
                  </Link>
                </ElegantCard>
              </div>
            ))}
          </div>
        </ElegantCard>
      </div>
    </DashboardShell>
  )
}
