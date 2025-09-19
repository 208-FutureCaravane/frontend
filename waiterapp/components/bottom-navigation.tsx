"use client"
import { Button } from "@/components/ui/button"
import { Home, QrCode, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

const navItems = [
  { id: "tables", icon: Home, href: "/" },
  { id: "scanner", icon: QrCode, href: "/scanner" },
  { id: "orders", icon: ClipboardList, href: "/orders" },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const getActiveTab = () => {
    if (pathname === "/") return "tables"
    if (pathname === "/scanner") return "scanner"
    if (pathname === "/orders") return "orders"
    return "tables"
  }

  const activeTab = getActiveTab()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all",
                  isActive ? "bg-gradient-primary text-white shadow-lg" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", isActive && "animate-pulse")} />
                <span className="text-xs font-medium">{t(item.id)}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
