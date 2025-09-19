"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { Home, UtensilsCrossed, Clock, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNavigation() {
  const { state } = useCart()
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/menu",
      icon: UtensilsCrossed,
      label: "Menu",
      active: pathname === "/menu",
    },
    {
      href: "/orders",
      icon: Clock,
      label: "Orders",
      active: pathname === "/orders",
    },
    {
      href: "/cart",
      icon: ShoppingBag,
      label: "Cart",
      active: pathname === "/cart",
      // badge: state.items.length,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-30">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.active

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
