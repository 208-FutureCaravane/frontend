"use client"

import { useState } from "react"
import { Home, Search, ShoppingCart, Clock, User, Coins } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/cart", icon: ShoppingCart, label: "Cart", badge: 2 },
  { href: "/orders", icon: Clock, label: "Orders" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function MobileNav() {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-b border-orange-200/50 dark:border-gray-700/50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">SR</span>
            </div>
            <span className="text-sm font-semibold">Smart Restaurant</span>
          </div>

          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-2 py-1 rounded-full">
            <Coins className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">1,250</span>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-t border-orange-200/50 dark:border-gray-700/50 transition-colors duration-300 md:hidden shadow-lg">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map(({ href, icon: Icon, label, badge }) => {
            const isActive = pathname === href
            const isClicked = activeItem === href

            return (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  setActiveItem(href)
                  setTimeout(() => setActiveItem(null), 200)
                }}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 transform min-w-0 flex-1",
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20",
                  isClicked && "scale-95",
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-500 hover:bg-red-500 animate-pulse border-0 flex items-center justify-center">
                      {badge}
                    </Badge>
                  )}
                </div>

                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-200",
                    isActive || isClicked ? "opacity-100 scale-100" : "opacity-0 scale-75 sr-only",
                  )}
                >
                  {label}
                </span>

                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
