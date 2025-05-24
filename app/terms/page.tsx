"use client"

import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

import { SophisticatedBackground } from "@/components/sophisticated-background"
import { PremiumHeader } from "@/components/premium-header"
import { ElegantCard } from "@/components/elegant-card"
import { SophisticatedButton } from "@/components/sophisticated-button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <SophisticatedBackground />
      <PremiumHeader />

      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Terms and</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>
            
            <p className="text-xl text-neutral-400 leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          {/* Important Warning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ElegantCard className="p-6 mb-8 border-yellow-700/50 bg-yellow-900/10">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-300 mb-2">Important Notice</h3>
                  <p className="text-yellow-200/90 leading-relaxed">
                    ⚠️ VaultChain is currently in the building phase. Please only experiment with small amounts you can afford to lose. This is an educational project and not production-ready software.
                  </p>
                </div>
              </div>
            </ElegantCard>
          </motion.div>

          {/* Terms Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ElegantCard className="p-8">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  By accessing and using VaultChain ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-white mb-4">2. Experimental Nature</h2>
                <p className="text-neutral-300 leading-relaxed mb-4">
                  VaultChain is an experimental project in active development. The service is provided "as is" without any warranties, expressed or implied. You acknowledge that:
                </p>
                <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-6 pl-4">
                  <li>The software is in beta/testing phase and may contain bugs or vulnerabilities</li>
                  <li>Features may change, break, or become unavailable without notice</li>
                  <li>This is an educational project designed for learning and experimentation</li>
                  <li>You should only use small amounts of cryptocurrency that you can afford to lose</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mb-4">3. Use License</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Permission is granted to temporarily use VaultChain for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-6 pl-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                  <li>use the service for any illegal activities</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mb-4">4. Financial Risks</h2>
                <p className="text-neutral-300 leading-relaxed mb-4">
                  Using VaultChain involves significant financial risks. You understand and accept that:
                </p>
                <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-6 pl-4">
                  <li>Cryptocurrency transactions are irreversible</li>
                  <li>Smart contracts may have bugs that could result in loss of funds</li>
                  <li>Guardian systems may fail or be compromised</li>
                  <li>You are solely responsible for the security of your private keys</li>
                  <li>No recovery mechanism is 100% guaranteed to work</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, VaultChain excludes all representations, warranties, conditions and terms whether express or implied or statutory including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement.
                </p>

                <h2 className="text-2xl font-bold text-white mb-4">6. Limitations</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  In no event shall VaultChain or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use VaultChain, even if VaultChain or its representatives have been notified orally or in writing of the possibility of such damage.
                </p>

                <h2 className="text-2xl font-bold text-white mb-4">7. Guardian Responsibilities</h2>
                <p className="text-neutral-300 leading-relaxed mb-4">
                  If you act as a guardian for another user, you acknowledge that:
                </p>
                <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-6 pl-4">
                  <li>You have a responsibility to act in good faith</li>
                  <li>You should only approve recovery requests when you believe they are legitimate</li>
                  <li>You are not liable for the consequences of your guardian decisions</li>
                  <li>You may remove yourself as a guardian at any time</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mb-4">8. Privacy and Data</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  VaultChain operates on blockchain technology. All transactions and smart contract interactions are public and permanent. We do not collect or store personal information, but blockchain data is inherently transparent and immutable.
                </p>

                <h2 className="text-2xl font-bold text-white mb-4">9. Modifications</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  VaultChain may revise these terms of service at any time without notice. By using this service, you are agreeing to be bound by the then current version of these terms of service.
                </p>

                <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where VaultChain operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>

                <h2 className="text-2xl font-bold text-white mb-4">11. Age Restriction</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  You must be at least 18 years old to use VaultChain. By using this service, you represent and warrant that you are at least 18 years of age.
                </p>

                <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  If you have any questions about these Terms and Conditions, please contact us through our GitHub repository or community channels.
                </p>
              </div>
            </ElegantCard>
          </motion.div>

          {/* Footer Actions */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/">
              <SophisticatedButton variant="secondary" size="lg">
                Back to VaultChain
              </SophisticatedButton>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 