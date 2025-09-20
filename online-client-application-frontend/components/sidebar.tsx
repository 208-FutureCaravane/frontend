"use client"

import { useState } from "react"
import { Home, Search, ShoppingCart, Clock, User, Sparkles, Menu, X, Settings, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function BottomNavigation() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const mainNavItems = [
    { href: "/", icon: Home, label: t("navigation.home") },
    { href: "/search", icon: Search, label: t("navigation.search"), hasAI: true },
    { href: "/cart", icon: ShoppingCart, label: t("navigation.cart"), badge: 2 },
    { href: "/orders", icon: Clock, label: t("navigation.orders") },
  ]

  const secondaryNavItems = [
    { href: "/profile", icon: User, label: t("navigation.profile") },
    { href: "/notifications", icon: Settings, label: "Notifications", badge: 3 },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav 
        className="sticky bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl"
      >
        <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
          {/* Main Navigation Items */}
          {mainNavItems.map(({ href, icon: Icon, label, hasAI, badge }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl transition-all duration-300 transform min-w-0 flex-1",
                  isActive
                    ? "text-primary-foreground bg-gradient-to-r from-primary to-secondary shadow-lg scale-105"
                    : "text-muted-foreground hover:text-primary hover:bg-accent hover:scale-105"
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {hasAI && (
                    <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-chart-5 animate-pulse" />
                  )}
                  {badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-destructive hover:bg-destructive animate-bounce border-0 flex items-center justify-center text-[10px] text-destructive-foreground">
                      {badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium text-center truncate max-w-full">
                  {label}
                </span>
                {isActive && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
                )}
              </Link>
            )
          })}

          {/* More Menu */}
          <Dialog open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl transition-all duration-300 transform min-w-0 flex-1",
                  "text-muted-foreground hover:text-primary hover:bg-accent hover:scale-105"
                )}
              >
                <MoreHorizontal className="h-5 w-5" />
                <span className="text-xs font-medium">More</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm mx-auto rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">More Options</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-4">
                <div className="grid grid-cols-1 gap-2">
                  {secondaryNavItems.map(({ href, icon: Icon, label, badge }) => {
                    const isActive = pathname === href
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsSheetOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg"
                            : "text-foreground hover:bg-accent hover:text-primary border border-border"
                        )}
                      >
                        <div className="relative">
                          <Icon className="h-5 w-5" />
                          {badge && (
                            <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-destructive hover:bg-destructive border-0 flex items-center justify-center text-[10px] text-destructive-foreground">
                              {badge}
                            </Badge>
                          )}
                        </div>
                        <span className="font-medium">{label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </>
  )
}
