"use client"

import Link from "next/link"
import { ArrowRight, Shield, Users, Lock, CheckCircle, Zap, Globe, Eye, RefreshCw, Clock, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

import { SophisticatedBackground } from "@/components/sophisticated-background"
import { PremiumHeader } from "@/components/premium-header"
import { MouseTracker } from "@/components/mouse-tracker"
import { ElegantCard } from "@/components/elegant-card"
import { SophisticatedButton } from "@/components/sophisticated-button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Logo } from "@/components/logo"
import { useSolana } from "@/components/solana-provider"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function LandingPage() {
  const { connect, connected } = useSolana()
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleProtectWallet = async () => {
    if (!connected) {
      await connect()
    } else {
      setIsRedirecting(true)
      // Navigation will be handled by the Link component wrapping this button
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <SophisticatedBackground />
      <MouseTracker />
      <PremiumHeader />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="space-y-6">
                  <motion.div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 border border-purple-700/50 text-sm text-purple-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2 text-purple-400" />
                    Solana Wallet Recovery Technology
                  </motion.div>

                  <motion.h1
                    className="text-5xl lg:text-7xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <span className="text-white">Recover Your</span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                      Lost Solana Wallet
                    </span>
                    <br />
                    <span className="text-white">Forever</span>
                  </motion.h1>

                  <motion.p
                    className="text-xl text-neutral-400 leading-relaxed max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Never lose access to your Phantom, Solflare, or any Solana wallet again. VaultChain creates a social
                    recovery system for your existing wallet.
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {connected ? (
                    <Link href="/dashboard">
                      <SophisticatedButton
                        size="lg"
                        className="group"
                        onClick={handleProtectWallet}
                        disabled={isRedirecting}
                      >
                        {isRedirecting ? "Redirecting..." : "Go to Dashboard"}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </SophisticatedButton>
                    </Link>
                  ) : (
                    <WalletConnectButton size="lg" redirectToDashboard={true} />
                  )}
                  <a href="#features">
                  <SophisticatedButton variant="secondary" size="lg">
                    See How It Works
                  </SophisticatedButton>
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="relative">
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl backdrop-blur-sm border border-purple-700/30"
                    animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-700/20 to-purple-900/20 rounded-3xl backdrop-blur-sm border border-purple-600/30"
                    animate={{ y: [10, -10, 10], rotate: [0, -3, 0] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />

                  {/* Main card */}
                  <ElegantCard className="p-8 max-w-md mx-auto" glow>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">P</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Phantom Wallet</h3>
                            <p className="text-sm text-green-400">Protected by VaultChain</p>
                          </div>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">Total Balance</span>
                          <span className="text-white font-semibold">245.8 SOL</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">Recovery Guardians</span>
                          <span className="text-green-400 font-semibold">3/3 Active</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-400">Last Check-in</span>
                          <span className="text-white font-semibold">2 days ago</span>
                        </div>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

                      <div className="text-center">
                        <div className="text-sm text-green-400 font-medium">✓ Recovery System Active</div>
                        <div className="text-xs text-neutral-400 mt-1">Your wallet is protected</div>
                      </div>
                    </div>
                  </ElegantCard>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="features" className="py-24 px-6 bg-gradient-to-b from-transparent to-neutral-950/30">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center space-y-6 mb-16">
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/20 border border-purple-800/30 text-sm text-purple-300"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  How VaultChain Recovery Works
                </motion.div>
                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">Never Lose Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                    Existing Solana Wallet
                  </span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  VaultChain doesn&apos;t replace your Phantom or Solflare wallet - it protects it with social recovery.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Link Your Wallet",
                  description:
                    "Connect your existing Phantom/Solflare wallet. A recovery Solana program is deployed and linked to your wallet.",
                  icon: Lock,
                },
                {
                  step: "02",
                  title: "Add Guardians",
                  description:
                    "Choose trusted relatives' wallets (mom, brother, friend). Set threshold (e.g., 2 out of 3 must approve).",
                  icon: Users,
                },
                {
                  step: "03",
                  title: "Regular Check-ins",
                  description:
                    "Check in every 30 days to prove you have access. If you stop checking in, guardians can start recovery.",
                  icon: CheckCircle,
                },
                {
                  step: "04",
                  title: "Automatic Recovery",
                  description:
                    "Lost your wallet? Guardians vote to recover. Solana program transfers all SOL to your new wallet.",
                  icon: RefreshCw,
                },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <ElegantCard className="p-8 space-y-6 group">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl font-bold text-neutral-600">{item.step}</div>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-6 h-6 text-neutral-300" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                    </div>
                  </ElegantCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Recovery Scenario Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center space-y-6 mb-16">
                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">Recovery</span>
                  <br />
                  <span className="text-neutral-400">Scenario</span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  Here's exactly what happens when you lose access to your Solana wallet.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div className="space-y-8">
                  {[
                    {
                      step: "1",
                      title: "You Lose Access",
                      description: "Your phone breaks, you forget your password, or lose your private key.",
                      color: "text-red-400",
                    },
                    {
                      step: "2",
                      title: "Guardians Notice",
                      description: "After 90 days of no check-ins, your guardians can start the recovery process.",
                      color: "text-yellow-400",
                    },
                    {
                      step: "3",
                      title: "Guardians Vote",
                      description: "Your trusted relatives visit VaultChain and vote to approve your recovery.",
                      color: "text-blue-400",
                    },
                    {
                      step: "4",
                      title: "Final Check-in",
                      description: "You check in one last time to prove you still have access to your wallet.",
                      color: "text-purple-400",
                    },
                    {
                      step: "5",
                      title: "Funds Transferred",
                      description: "Solana program automatically transfers all SOL from old wallet to new one.",
                      color: "text-green-400",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div
                        className={`w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold ${item.color}`}
                      >
                        {item.step}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <ElegantCard className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Behind the Scenes</h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-neutral-300">
                        Your original Phantom wallet gives the recovery program limited transfer rights during setup.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-neutral-300">
                        Solana program holds no funds - just has permission to transfer if recovery conditions are met.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-neutral-300">
                        You can cancel recovery if it's malicious and you still have access to your wallet.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-neutral-300">
                        Time delays and multiple guardian approvals prevent unauthorized access.
                      </p>
                    </div>
                  </div>
                </ElegantCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center space-y-6 mb-16">
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-red-900/20 border border-red-800/30 text-sm text-red-300"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  The Reality of Crypto Loss
                </motion.div>
                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">$4 Billion</span>
                  <br />
                  <span className="text-neutral-400">Lost Forever</span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  Over $4 billion worth of cryptocurrency has been permanently lost due to misplaced private keys.
                  VaultChain ensures this never happens to your existing Solana wallet.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lock,
                  title: "Lost Private Keys",
                  description:
                    "20% of all Bitcoin is estimated to be permanently inaccessible due to lost private keys.",
                  stat: "20%",
                },
                {
                  icon: Users,
                  title: "No Recovery Options",
                  description: "Traditional wallets like Phantom offer no recovery if you lose your private key.",
                  stat: "0",
                },
                {
                  icon: Shield,
                  title: "Single Point of Failure",
                  description: "One lost device or forgotten password means permanent loss of all your SOL.",
                  stat: "100%",
                },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <ElegantCard className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-2xl flex items-center justify-center mx-auto">
                      <item.icon className="w-8 h-8 text-neutral-300" />
                    </div>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-red-400">{item.stat}</div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                    </div>
                  </ElegantCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center space-y-6 mb-16">
                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">Why Choose</span>
                  <br />
                  <span className="text-neutral-400">VaultChain</span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  The most secure and user-friendly wallet recovery system built specifically for Solana.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, title: "Social Recovery", description: "Trusted family & friends protect your wallet" },
                {
                  icon: CheckCircle,
                  title: "Check-in System",
                  description: "Regular verification keeps your wallet secure",
                },
                {
                  icon: Globe,
                  title: "Works with Any Solana Wallet",
                  description: "Phantom, Solflare - all supported",
                },
                { icon: Lock, title: "Non-Custodial", description: "You maintain full control of your assets" },
                {
                  icon: Shield,
                  title: "Solana Program Security",
                  description: "Audited Solana programs protect your funds",
                },
                { icon: Zap, title: "Instant Recovery", description: "Get your funds back in minutes, not days" },
                { icon: Eye, title: "Transparent Process", description: "All recovery actions are visible on-chain" },
                { icon: RefreshCw, title: "Cancel Anytime", description: "Stop malicious recovery attempts instantly" },
              ].map((feature, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <ElegantCard className="p-6 space-y-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-neutral-300" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </ElegantCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center space-y-6 mb-16">
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/20 border border-green-800/30 text-sm text-green-300"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Security First
                </motion.div>
                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">Bank-Grade</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
                    Security
                  </span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  VaultChain uses audited Solana programs and multi-signature authentication to protect your assets.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div className="space-y-8">
                  {[
                    {
                      title: "Audited Solana Programs",
                      description: "All our smart contracts have been independently audited by top security firms.",
                      icon: Shield,
                    },
                    {
                      title: "Multi-Signature Protection",
                      description: "Requires multiple guardian approvals before any recovery action can be executed.",
                      icon: Users,
                    },
                    {
                      title: "Time-Locked Recovery",
                      description: "Built-in delays give you time to cancel malicious recovery attempts.",
                      icon: Clock,
                    },
                    {
                      title: "Non-Custodial Design",
                      description: "VaultChain never holds your private keys or has access to your funds.",
                      icon: Lock,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <ElegantCard className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Security Guarantees</h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Smart Contract Audits</span>
                      <span className="text-green-400 font-semibold">✓ Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Multi-Sig Protection</span>
                      <span className="text-green-400 font-semibold">✓ Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Time-Lock Delays</span>
                      <span className="text-green-400 font-semibold">✓ 48-72 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Penetration Testing</span>
                      <span className="text-green-400 font-semibold">✓ Quarterly</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Bug Bounty Program</span>
                      <span className="text-green-400 font-semibold">✓ Active</span>
                    </div>
                  </div>
                </ElegantCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Supported Wallets Section */}
        <section id="wallets" className="py-24 px-6 bg-gradient-to-b from-transparent to-neutral-950/30">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="text-center space-y-6 mb-16">
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/20 border border-blue-800/30 text-sm text-blue-300"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Universal Compatibility
                </motion.div>
                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">Supported</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                    Wallets
                  </span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  VaultChain works with all major Solana wallets. Protect your existing wallet without switching.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Phantom",
                  description: "Most popular Solana wallet",
                  logo: "P",
                  color: "from-purple-600 to-purple-700",
                  status: "Fully Supported",
                },
                {
                  name: "Solflare",
                  description: "Feature-rich Solana wallet",
                  logo: "S",
                  color: "from-orange-600 to-orange-700",
                  status: "Fully Supported",
                },
                {
                  name: "Backpack",
                  description: "Modern multi-chain wallet",
                  logo: "B",
                  color: "from-green-600 to-green-700",
                  status: "Coming Soon",
                },
                {
                  name: "Glow",
                  description: "Mobile-first Solana wallet",
                  logo: "G",
                  color: "from-yellow-600 to-yellow-700",
                  status: "Coming Soon",
                },
              ].map((wallet, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <ElegantCard className="p-6 space-y-4 text-center group">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${wallet.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-white font-bold text-xl">{wallet.logo}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">{wallet.name}</h3>
                      <p className="text-sm text-neutral-400">{wallet.description}</p>
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          wallet.status === "Fully Supported"
                            ? "bg-green-900/20 text-green-300 border border-green-800/30"
                            : "bg-yellow-900/20 text-yellow-300 border border-yellow-800/30"
                        }`}
                      >
                        {wallet.status}
                      </div>
                    </div>
                  </ElegantCard>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.5}>
              <div className="mt-12 text-center">
                <p className="text-neutral-400 mb-4">Don't see your wallet?</p>
                <SophisticatedButton variant="secondary">
                  Request Wallet Support
                </SophisticatedButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center space-y-6 mb-16">
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/20 border border-purple-800/30 text-sm text-purple-300"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Frequently Asked Questions
                </motion.div>
                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">Got</span>
                  <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                    {" "}Questions?
                  </span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              {[
                {
                  question: "How does VaultChain work with my existing wallet?",
                  answer:
                    "VaultChain doesn't replace your wallet. Instead, it creates a recovery system that can transfer your funds to a new wallet if you lose access. Your existing Phantom or Solflare wallet remains your primary wallet.",
                },
                {
                  question: "What happens if I lose access to my wallet?",
                  answer:
                    "If you stop checking in for 90 days, your guardians can initiate recovery. They'll vote to approve transferring your funds to a new wallet you control. You can cancel this process if it's malicious and you still have access.",
                },
                {
                  question: "Who should I choose as guardians?",
                  answer:
                    "Choose trusted family members or friends who own Solana wallets. We recommend 3-5 guardians with a 2-3 signature threshold. Don't choose people who live together or might collude.",
                },
                {
                  question: "Is VaultChain safe? Can guardians steal my funds?",
                  answer:
                    "VaultChain is designed with multiple security layers. Guardians can only initiate recovery after you've been inactive for 90 days, and there's a 48-72 hour delay where you can cancel malicious attempts.",
                },
                {
                  question: "What if my guardians lose access to their wallets?",
                  answer:
                    "You can update your guardian list anytime through the dashboard. We recommend regularly checking that your guardians still have access to their wallets and replacing them if needed.",
                },
                {
                  question: "How much does VaultChain cost?",
                  answer:
                    "VaultChain is currently free to use. We only charge small transaction fees for on-chain operations (recovery setup, guardian votes, etc.) which go to the Solana network.",
                },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <ElegantCard className="p-6">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center group-open:bg-purple-600 transition-colors duration-300">
                          <span className="text-sm font-bold group-open:rotate-45 transition-transform duration-300">
                            +
                          </span>
                        </div>
                      </summary>
                      <div className="mt-4 text-neutral-400 leading-relaxed">{item.answer}</div>
                    </details>
                  </ElegantCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-neutral-950/30 to-black">
          <div className="container mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-white">Protect Your Solana Wallet</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                    Today
                  </span>
                </h2>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                  Don't wait until it's too late. Set up social recovery for your existing Solana wallet in just 5
                  minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {connected ? (
                    <Link href="/dashboard">
                      <SophisticatedButton
                        size="lg"
                        className="group"
                        onClick={handleProtectWallet}
                        disabled={isRedirecting}
                      >
                        {isRedirecting ? "Redirecting..." : "Protect My Solana Wallet Now"}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </SophisticatedButton>
                    </Link>
                  ) : (
                    <WalletConnectButton size="lg" redirectToDashboard={true} />
                  )}
                  <SophisticatedButton variant="secondary" size="lg">
                    Learn More
                  </SophisticatedButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/50 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-neutral-400 leading-relaxed">
                Social recovery system for existing Solana wallets. Never lose access to your Phantom, Solflare, or any
                Solana wallet again.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["How It Works", "Security", "Supported Wallets", "Pricing"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Blog", "Recovery Guide", "FAQ"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Support"],
              },
            ].map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} VaultChain. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "GitHub", "Discord"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
