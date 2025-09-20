"use client"

import { useState, useEffect } from "react"
import { Bell, Globe, Moon, Sun, Sparkles, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import Link from "next/link"
import Image from "next/image"

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage: setLang, t } = useTranslation()
  const [notifications] = useState(3)
  const [mounted, setMounted] = useState(false)
  const [loyaltyPoints] = useState(2450)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo & AI Badge */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/LogoOnline.svg"
                alt="Logo"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Loyalty Points */}
            <div className="hidden sm:flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-2 rounded-full">
              <Coins className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {loyaltyPoints.toLocaleString()}
              </span>
            </div>

            {/* Notifications */}
            <Link href="/notifications">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 rounded-xl hover:bg-accent text-foreground relative"
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-destructive hover:bg-destructive border-0 flex items-center justify-center text-[10px] text-destructive-foreground">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg hover:bg-accent text-foreground"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                  onClick={() => setLang("en")}
                  className={cn(language === "en" && "bg-accent")}
                >
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLang("fr")}
                  className={cn(language === "fr" && "bg-accent")}
                >
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLang("ar")}
                  className={cn(language === "ar" && "bg-accent")}
                >
                  🇩🇿 العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-8 w-8 p-0 rounded-lg hover:bg-accent text-foreground"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
