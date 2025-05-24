"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { WalletDisconnectButton } from "@/components/wallet-disconnect-button"
import { useSolana } from "@/components/solana-provider"

export function PremiumHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { connected } = useSolana()

  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "How It Works", href: "#features" },
    { name: "Security", href: "#security" },
    { name: "Supported Wallets", href: "#wallets" },
    { name: "FAQ", href: "#faq" },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: `blur(${headerBlur}px)`,
      }}
    >
      <motion.div
        className="absolute inset-0 border-b border-neutral-200/10"
        style={{
          background: `linear-gradient(135deg, 
            rgba(15, 15, 15, ${headerOpacity.get()}) 0%, 
            rgba(25, 25, 25, ${headerOpacity.get() * 0.8}) 100%)`,
        }}
        animate={{
          background: isScrolled
            ? "linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.9) 100%)"
            : "linear-gradient(135deg, rgba(15, 15, 15, 0.8) 0%, rgba(25, 25, 25, 0.7) 100%)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Logo size="md" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-neutral-300 hover:text-white transition-all duration-300 text-sm font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neutral-400 to-neutral-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {connected ? (
              <>
                <WalletDisconnectButton size="sm" />
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white border border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <WalletConnectButton size="sm" />
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 text-white border border-neutral-600 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/20">
                    Protect My Wallet
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-neutral-300 hover:text-white transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4 border-t border-neutral-700/50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-neutral-300 hover:text-white transition-colors duration-300 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-neutral-700/50">
              {connected ? (
                <>
                  <div className="px-3">
                    <WalletDisconnectButton size="sm" className="w-full" />
                  </div>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-3">
                    <WalletConnectButton size="sm" className="w-full" />
                  </div>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700">
                      Protect My Wallet
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
