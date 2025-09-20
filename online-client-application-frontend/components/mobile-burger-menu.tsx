"use client"

import { useState } from "react"
import { Menu, Home, Search, ShoppingCart, Clock, User, Calendar, Settings, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { useTranslation } from "@/lib/i18n"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/orders", icon: Clock, label: "Orders" },
  { href: "/reservations", icon: Calendar, label: "Reservations" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function MobileBurgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useTranslation()

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇩🇿" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/20 md:hidden"
        >
          <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 sm:w-72 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-3 sm:p-4 border-b">
            <SheetTitle className="flex items-center gap-2 text-left text-sm sm:text-base">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs sm:text-sm">SR</span>
              </div>
              Smart Restaurant
            </SheetTitle>
          </SheetHeader>

          {/* Navigation Items */}
          <div className="flex-1 p-3 sm:p-4">
            <div className="space-y-1">
              {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))

                return (
                  <Link key={href} href={href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-2 sm:gap-3 h-8 sm:h-10 text-xs sm:text-sm"
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {label}
                    </Button>
                  </Link>
                )
              })}
            </div>

            <Separator className="my-3 sm:my-4" />

            {/* Theme & Language Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">Theme</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                >
                  <Sun className="h-3 w-3 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-3 w-3 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <span className="text-xs sm:text-sm font-medium">Language</span>
                <div className="grid grid-cols-1 gap-1">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setLanguage(lang.code)}
                      className="justify-start gap-1.5 sm:gap-2 h-6 sm:h-8 text-xs"
                    >
                      <span className="text-xs sm:text-sm">{lang.flag}</span>
                      <span className="text-xs sm:text-sm">{lang.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
