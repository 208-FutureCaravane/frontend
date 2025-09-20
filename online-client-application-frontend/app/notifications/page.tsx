"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Package,
  Truck,
  CheckCircle,
  Gift,
  Star,
  Clock,
  Trash2,
  Award as MarkAsRead,
  Settings,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "order",
    title: "Order Delivered!",
    message: "Your order from Bella Italia has been delivered. Enjoy your meal!",
    time: "2 minutes ago",
    read: false,
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    orderId: "SR-2024-001",
    restaurant: "Bella Italia",
    image: "/images/restaurants/bella-italia.jpg",
  },
  {
    id: 2,
    type: "promotion",
    title: "Special Offer!",
    message: "Get 20% off your next order at Spice Garden. Valid until tomorrow!",
    time: "1 hour ago",
    read: false,
    icon: Gift,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    restaurant: "Spice Garden",
    image: "/images/restaurants/spice-garden.jpg",
  },
  {
    id: 3,
    type: "order",
    title: "Order On The Way!",
    message: "Your order from Burger Palace is on the way. ETA: 15 minutes",
    time: "3 hours ago",
    read: true,
    icon: Truck,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    orderId: "SR-2024-002",
    restaurant: "Burger Palace",
    image: "/images/restaurants/burger-palace.jpg",
  },
  {
    id: 4,
    type: "review",
    title: "Rate Your Order",
    message: "How was your experience with Bella Italia? Leave a review!",
    time: "1 day ago",
    read: true,
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    restaurant: "Bella Italia",
    image: "/images/restaurants/bella-italia.jpg",
  },
  {
    id: 5,
    type: "order",
    title: "Order Confirmed",
    message: "Your order from Spice Garden has been confirmed. Preparing now!",
    time: "2 days ago",
    read: true,
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    orderId: "SR-2024-003",
    restaurant: "Spice Garden",
    image: "/images/restaurants/spice-garden.jpg",
  },
  {
    id: 6,
    type: "system",
    title: "Welcome to Smart Restaurant!",
    message: "Thanks for joining! Explore AI-powered food discovery and earn rewards.",
    time: "1 week ago",
    read: true,
    icon: Bell,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [selectedTab, setSelectedTab] = useState("all")

  const unreadCount = notificationList.filter((n) => !n.read).length
  const orderNotifications = notificationList.filter((n) => n.type === "order")
  const promotionNotifications = notificationList.filter((n) => n.type === "promotion")
  const systemNotifications = notificationList.filter((n) => n.type === "system" || n.type === "review")

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getFilteredNotifications = () => {
    switch (selectedTab) {
      case "orders":
        return orderNotifications
      case "promotions":
        return promotionNotifications
      case "system":
        return systemNotifications
      default:
        return notificationList
    }
  }

  const NotificationCard = ({ notification }: { notification: (typeof notifications)[0] }) => (
    <Card
      className={`transition-all duration-200 border-orange-100 dark:border-orange-900/30 ${!notification.read ? "border-l-4 border-l-orange-500 bg-orange-50/30 dark:bg-orange-900/10" : ""}`}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex gap-3 sm:gap-4">
          {notification.image ? (
            <Image
              src={notification.image || "/placeholder.svg"}
              alt={notification.restaurant || "Notification"}
              width={40}
              height={40}
              className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg flex-shrink-0"
            />
          ) : (
            <div
              className={`w-8 h-8 sm:w-12 sm:h-12 ${notification.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <notification.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${notification.color}`} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3
                className={`font-semibold text-xs sm:text-sm ${!notification.read ? "text-orange-800 dark:text-orange-200" : "text-muted-foreground"}`}
              >
                {notification.title}
              </h3>
              <div className="flex items-center gap-1 ml-2">
                {!notification.read && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full"></div>}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  className="h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">{notification.message}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{notification.time}</span>
                {notification.orderId && (
                  <Badge
                    variant="outline"
                    className="text-xs px-1 py-0 border-orange-200 text-orange-600 dark:border-orange-800 dark:text-orange-400"
                  >
                    #{notification.orderId.slice(-3)}
                  </Badge>
                )}
              </div>

              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs h-5 sm:h-6 px-2 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-lg sm:text-2xl font-heading font-bold text-orange-600 dark:text-orange-400">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20 text-xs sm:text-sm h-7 sm:h-8 bg-transparent"
                >
                  <MarkAsRead className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Mark all read</span>
                  <span className="sm:hidden">Read all</span>
                </Button>
              )}
              <Link href="/settings">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20 h-7 w-7 sm:h-8 sm:w-8 p-0 bg-transparent"
                >
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Notification Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-8 sm:h-10 bg-orange-50 dark:bg-orange-900/20">
              <TabsTrigger
                value="all"
                className="relative text-xs sm:text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                All
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-3 w-3 sm:h-5 sm:w-5 p-0 text-xs bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="text-xs sm:text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Orders
                {orderNotifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-3 w-3 sm:h-5 sm:w-5 p-0 text-xs bg-red-500">
                    {orderNotifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="promotions"
                className="text-xs sm:text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Offers
                {promotionNotifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-3 w-3 sm:h-5 sm:w-5 p-0 text-xs bg-red-500">
                    {promotionNotifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="text-xs sm:text-sm data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Other
              </TabsTrigger>
            </TabsList>

            {/* All Notifications */}
            <TabsContent value="all">
              <div className="space-y-2 sm:space-y-3">
                {getFilteredNotifications().length > 0 ? (
                  getFilteredNotifications().map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-orange-700 dark:text-orange-300">
                      No notifications
                    </h3>
                    <p className="text-muted-foreground text-sm">You're all caught up!</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Order Notifications */}
            <TabsContent value="orders">
              <div className="space-y-2 sm:space-y-3">
                {orderNotifications.length > 0 ? (
                  orderNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-muted rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No order updates</h3>
                    <p className="text-muted-foreground text-sm">Order notifications will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Promotion Notifications */}
            <TabsContent value="promotions">
              <div className="space-y-2 sm:space-y-3">
                {promotionNotifications.length > 0 ? (
                  promotionNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-muted rounded-full flex items-center justify-center">
                      <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No offers available</h3>
                    <p className="text-muted-foreground text-sm">Special offers and promotions will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* System Notifications */}
            <TabsContent value="system">
              <div className="space-y-2 sm:space-y-3">
                {systemNotifications.length > 0 ? (
                  systemNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-muted rounded-full flex items-center justify-center">
                      <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No system notifications</h3>
                    <p className="text-muted-foreground text-sm">
                      App updates and other notifications will appear here
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
