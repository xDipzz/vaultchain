"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, Home, LogOut, RefreshCw, Settings, Shield, Users } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Setup Recovery",
      icon: Shield,
      href: "/dashboard/setup-recovery",
    },
    {
      title: "Guardians",
      icon: Users,
      href: "/dashboard/guardians",
    },
    {
      title: "Recovery",
      icon: RefreshCw,
      href: "/dashboard/recovery",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ]

  return (
    <>
      {/* Mobile sidebar */}
      <div className="fixed inset-0 z-50 flex md:hidden">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="fixed left-0 top-0 h-full w-72 bg-card shadow-lg">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Logo />
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <motion.div
        className="hidden border-r bg-card md:flex md:w-[var(--sidebar-width)] md:flex-col"
        animate={{ width: expanded ? 240 : 70 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ "--sidebar-width": expanded ? "240px" : "70px" } as React.CSSProperties}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          {expanded ? (
            <Logo />
          ) : (
            <div className="flex w-full justify-center">
              <Logo withText={false} />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {expanded && <span>{item.title}</span>}
                {!expanded && (
                  <div className="absolute left-full ml-6 hidden rounded-md bg-accent px-2 py-1 text-sm font-medium text-accent-foreground shadow-md group-hover:block">
                    {item.title}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t p-4">
          <div className="flex items-center justify-between">
            {expanded && <span className="text-xs font-medium text-muted-foreground">Theme</span>}
            <ThemeToggle />
          </div>
          <Button
            variant="outline"
            className={cn("justify-start", !expanded && "flex w-full items-center justify-center p-0 px-0")}
          >
            <LogOut className={cn("h-4 w-4", expanded && "mr-2")} />
            {expanded && "Logout"}
          </Button>
        </div>
      </motion.div>
    </>
  )
}
