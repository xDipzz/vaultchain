"use client"

import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full hover:bg-muted/50 relative overflow-hidden transition-all duration-300 hover:scale-105"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentTheme}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {currentTheme === "dark" ? (
                <Moon className="h-4 w-4 text-blue-400" />
              ) : (
                <Sun className="h-4 w-4 text-amber-500" />
              )}
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-56 bg-card/95 backdrop-blur-md border-border/50"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <div className="flex-1">
            <div className="font-medium">Light</div>
            <div className="text-xs text-muted-foreground">Bright and clean interface</div>
          </div>
          {theme === "light" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <Moon className="h-4 w-4 text-blue-400" />
          <div className="flex-1">
            <div className="font-medium">Dark</div>
            <div className="text-xs text-muted-foreground">Easy on the eyes</div>
          </div>
          {theme === "dark" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <Monitor className="h-4 w-4 text-neutral-500" />
          <div className="flex-1">
            <div className="font-medium">System</div>
            <div className="text-xs text-muted-foreground">Follows your device</div>
          </div>
          {theme === "system" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
