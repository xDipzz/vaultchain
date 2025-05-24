import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { SolanaProvider } from "@/components/solana-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VaultChain - Self-Recoverable Solana Wallet",
  description: "Secure, non-custodial, and always accessible Solana wallet with social recovery features",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <SolanaProvider>{children}</SolanaProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
