import { Shield } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  className?: string
}

export function Logo({ size = "md", withText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neutral-600/80 to-neutral-800/80 opacity-70 blur-[1px]" />
        <div className="relative rounded-xl bg-gradient-to-br from-neutral-600 to-neutral-800 p-2 shadow-lg ring-1 ring-neutral-500/20">
          <Shield className={`${sizeClasses[size]} text-white`} />
        </div>
      </div>
      {withText && <span className={`font-bold tracking-tight ${textSizeClasses[size]} text-white`}>VaultChain</span>}
    </Link>
  )
}
