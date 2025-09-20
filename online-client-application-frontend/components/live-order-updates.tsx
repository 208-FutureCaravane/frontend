"use client"

import { useState, useEffect, useCallback } from "react"
import { OrderNotification } from "./order-notification"
import { useToast } from "@/hooks/use-toast"

interface LiveOrder {
  id: string
  restaurant: string
  status: "confirmed" | "preparing" | "ready" | "delivering" | "delivered"
  estimatedTime?: string
}

export function LiveOrderUpdates() {
  const [activeOrders, setActiveOrders] = useState<LiveOrder[]>([])
  const [notifications, setNotifications] = useState<LiveOrder[]>([])
  const { toast } = useToast()

  const showToast = useCallback(
    (order: LiveOrder) => {
      const messages = {
        ready: `Your order from ${order.restaurant} is ready for pickup!`,
        delivering: `Your order from ${order.restaurant} is on the way!`,
        delivered: `Your order from ${order.restaurant} has been delivered. Enjoy your meal!`,
      }

      const titles = {
        ready: "Order Ready! 📦",
        delivering: "On the Way! 🚚",
        delivered: "Delivered! 🎉",
      }

      if (order.status in messages) {
        requestAnimationFrame(() => {
          toast({
            title: titles[order.status as keyof typeof titles],
            description: messages[order.status as keyof typeof messages],
            duration: 5000,
          })
        })
      }
    },
    [toast],
  )

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setActiveOrders([
        {
          id: "SR-2024-001",
          restaurant: "Bella Italia",
          status: "preparing",
          estimatedTime: "20 minutes",
        },
      ])
    }, 2000)

    return () => clearTimeout(initTimer)
  }, [])

  useEffect(() => {
    if (activeOrders.length === 0) return

    const interval = setInterval(() => {
      setActiveOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (order.status === "preparing" && Math.random() > 0.985) {
            const updatedOrder = { ...order, status: "ready" as const }
            requestAnimationFrame(() => {
              setNotifications((prev) => [...prev, updatedOrder])
              showToast(updatedOrder)
            })
            return updatedOrder
          } else if (order.status === "ready" && Math.random() > 0.99) {
            const updatedOrder = { ...order, status: "delivering" as const }
            requestAnimationFrame(() => {
              setNotifications((prev) => [...prev, updatedOrder])
              showToast(updatedOrder)
            })
            return updatedOrder
          } else if (order.status === "delivering" && Math.random() > 0.995) {
            const updatedOrder = { ...order, status: "delivered" as const }
            requestAnimationFrame(() => {
              setNotifications((prev) => [...prev, updatedOrder])
              showToast(updatedOrder)
            })
            return updatedOrder
          }
          return order
        })

        return updatedOrders
      })
    }, 45000) // Increased interval to 45 seconds for better performance

    return () => clearInterval(interval)
  }, [showToast, activeOrders.length])

  const dismissNotification = useCallback((orderId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== orderId))
  }, [])

  return (
    <>
      {notifications.map((notification, index) => (
        <OrderNotification
          key={`${notification.id}-${notification.status}`}
          orderId={notification.id}
          restaurant={notification.restaurant}
          status={notification.status}
          estimatedTime={notification.estimatedTime}
          onDismiss={() => dismissNotification(notification.id)}
          className={index > 0 ? `mt-${index * 4}` : ""}
        />
      ))}
    </>
  )
}
