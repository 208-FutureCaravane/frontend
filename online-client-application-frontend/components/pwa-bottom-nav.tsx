"use client"

import { Home, Search, ShoppingCart, Clock, User, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n"
import { useState } from "react"

export function PWABottomNav() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [clickedButton, setClickedButton] = useState<string | null>(null)

  const navItems = [
    { href: "/", icon: Home, label: t("navigation.home") },
    { href: "/search", icon: Search, label: t("navigation.search"), hasAI: true },
    { href: "/cart", icon: ShoppingCart, label: t("navigation.cart"), badge: 2 },
    { href: "/orders", icon: Clock, label: t("navigation.orders") },
    { href: "/profile", icon: User, label: t("navigation.profile") },
  ]

  const handleButtonClick = (href: string) => {
    setClickedButton(href)
    setTimeout(() => setClickedButton(null), 1500)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-t border-orange-200/50 dark:border-gray-700/50 transition-all duration-300 shadow-lg">
      <div className="max-w-md mx-auto px-1 py-1.5">
        <div className="flex items-center justify-around">
          {navItems.map(({ href, icon: Icon, label, hasAI, badge }) => {
            const isActive = pathname === href
            const showText = isActive || clickedButton === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => handleButtonClick(href)}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-300 transform min-w-0 flex-1",
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:scale-105",
                )}
              >
                <div className="relative">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {hasAI && (
                    <Sparkles className="absolute -top-0.5 -right-0.5 h-2 w-2 sm:h-2.5 sm:w-2.5 text-green-500 animate-pulse" />
                  )}
                  {badge && (
                    <Badge className="absolute -top-1.5 -right-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 p-0 text-xs bg-red-500 hover:bg-red-500 animate-bounce border-0 flex items-center justify-center text-[8px] sm:text-[10px]">
                      {badge}
                    </Badge>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium truncate max-w-full transition-all duration-200",
                    showText ? "opacity-100 scale-100" : "opacity-0 scale-75 sm:opacity-100 sm:scale-100",
                  )}
                >
                  {label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
