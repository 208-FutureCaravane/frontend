"use client"

import { Home, Search, ShoppingCart, Clock, User, Calendar } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/orders", icon: Clock, label: "Orders" },
  { href: "/reservations", icon: Calendar, label: "Reservations" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-64 bg-card/95 backdrop-blur-sm border-r border-border hidden xl:block">
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center gap-2 mb-8 mt-4">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SR</span>
          </div>
          <span className="font-heading font-bold text-lg">Smart Restaurant</span>
        </div>

        <div className="space-y-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))

            return (
              <Link key={href} href={href}>
                <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-3 h-12">
                  <Icon className="h-5 w-5" />
                  {label}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
