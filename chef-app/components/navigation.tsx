"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChefHat, Package, BarChart3 } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSelector } from "./language-selector"
import { useI18n } from "./i18n-provider"

export function Navigation() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useI18n()

  const navItems = [
    { href: "/", label: t.dashboard, icon: ChefHat },
    { href: "/stock", label: t.stock, icon: Package },
    { href: "/analytics", label: t.analytics, icon: BarChart3 },
  ]

  return (
    <nav className="bg-card border-b border-border p-4">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-orange-500">Kitchen Pro</div>
        <div className="flex gap-2 ml-auto items-center">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={
                    isActive
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
