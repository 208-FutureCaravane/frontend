"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChefHat, Package, Truck, CheckCircle, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderNotificationProps {
  orderId: string
  restaurant: string
  status: "confirmed" | "preparing" | "ready" | "delivering" | "delivered"
  estimatedTime?: string
  onDismiss?: () => void
  className?: string
}

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    color: "bg-blue-500",
    borderColor: "border-l-blue-500",
    message: "Order confirmed!",
  },
  preparing: {
    icon: ChefHat,
    color: "bg-orange-500",
    borderColor: "border-l-orange-500",
    message: "Your food is being prepared",
  },
  ready: {
    icon: Package,
    color: "bg-purple-500",
    borderColor: "border-l-purple-500",
    message: "Order ready for pickup",
  },
  delivering: {
    icon: Truck,
    color: "bg-green-500",
    borderColor: "border-l-green-500",
    message: "Your order is on the way!",
  },
  delivered: {
    icon: CheckCircle,
    color: "bg-green-500",
    borderColor: "border-l-green-500",
    message: "Order delivered! Enjoy your meal",
  },
}

export function OrderNotification({
  orderId,
  restaurant,
  status,
  estimatedTime,
  onDismiss,
  className,
}: OrderNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const config = statusConfig[status]
  const Icon = config.icon

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [status])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss()
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss?.(), 300) // Wait for animation
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 top-16 z-50 flex justify-center px-2 pointer-events-none">
      <Card
        className={cn(
          "w-full max-w-xs sm:max-w-sm shadow-lg border-l-4 transition-all duration-300 animate-in slide-in-from-top-full pointer-events-auto",
          config.borderColor,
          isAnimating && "animate-pulse",
          "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
          className,
        )}
      >
        <CardContent className="p-2">
          <div className="flex items-start gap-2">
            <div className={cn("p-1 rounded-full shadow-sm", config.color)}>
              <Icon className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <Badge variant="secondary" className="text-xs font-mono px-1 py-0 h-4">
                  #{orderId.slice(-3)}
                </Badge>
                <Bell className="h-2 w-2 text-muted-foreground animate-pulse" />
              </div>
              <h4 className="font-medium text-xs text-foreground leading-tight mb-0.5">{config.message}</h4>
              <p className="text-xs text-muted-foreground font-medium truncate">{restaurant}</p>
              {estimatedTime && (
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                  ETA: {estimatedTime}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="h-3 w-3 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
            >
              <X className="h-2 w-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
