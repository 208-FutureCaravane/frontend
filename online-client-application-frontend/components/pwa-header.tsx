"use client"

import { useState, useEffect } from "react"
import { Bell, Globe, Moon, Sun, Sparkles, Mic, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import { MobileBurgerMenu } from "@/components/mobile-burger-menu"
import Link from "next/link"

export function PWAHeader() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage: setLang, t } = useTranslation()
  const [notifications] = useState(3)
  const [mounted, setMounted] = useState(false)
  const [loyaltyPoints] = useState(1250)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-orange-200/50 dark:border-gray-700/50 transition-all duration-300 safe-top">
      <div className="px-2 py-2 max-w-md mx-auto md:max-w-none md:mx-0 md:px-6 md:py-2.5 bg-white/90 dark:bg-gray-900/90 transition-colors duration-300">
        <div className="flex items-center justify-between">
          {/* Logo & AI Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden">
              <MobileBurgerMenu />
            </div>

            <div className="relative">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border border-white dark:border-gray-900 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-heading font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent leading-tight">
                {t("restaurant.name")}
              </h1>
              <div className="flex items-center gap-1">
                <Badge
                  variant="secondary"
                  className="text-xs px-1 py-0 sm:px-1.5 sm:py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-0"
                >
                  <Mic className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5 sm:mr-1" />
                  AI
                </Badge>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-2 py-1 rounded-full mr-1">
              <Coins className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-xs sm:text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                {loyaltyPoints.toLocaleString()}
              </span>
            </div>

            {/* Language Selector - Hidden on small screens */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/20 hidden sm:flex text-gray-700 dark:text-gray-300"
                >
                  <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                  onClick={() => setLang("en")}
                  className={cn(language === "en" && "bg-orange-50 dark:bg-orange-900/20")}
                >
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLang("fr")}
                  className={cn(language === "fr" && "bg-orange-50 dark:bg-orange-900/20")}
                >
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLang("ar")}
                  className={cn(language === "ar" && "bg-orange-50 dark:bg-orange-900/20")}
                >
                  🇩🇿 العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle - Hidden on small screens */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/20 hidden sm:flex text-gray-700 dark:text-gray-300"
              >
                <Sun className="h-3 w-3 sm:h-3.5 sm:w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-3 w-3 sm:h-3.5 sm:w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            )}

            {/* Notifications */}
            <Link href="/notifications">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-lg relative hover:bg-orange-100 dark:hover:bg-orange-900/20 text-gray-700 dark:text-gray-300"
              >
                <Bell className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 p-0 text-xs bg-red-500 hover:bg-red-500 animate-bounce border-0 flex items-center justify-center text-[8px] sm:text-[10px]">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
