"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Clock, Phone, Star, RotateCcw, MessageCircle, ChefHat, Package, Truck, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const activeOrders = [
  {
    id: "SR-2024-001",
    restaurant: "Bella Italia",
    items: ["Margherita Pizza", "Spaghetti Carbonara", "Tiramisu"],
    total: 5859,
    status: "preparing",
    estimatedTime: "15 minutes",
    progress: 60,
    orderTime: "2024-01-15 14:30",
    address: "123 Main Street, Algiers",
    phone: "+213 555 0123",
    image: "/images/restaurants/bella-italia.jpg",
  },
  {
    id: "SR-2024-004",
    restaurant: "Sushi Zen",
    items: ["Dragon Roll", "Miso Soup"],
    total: 3200,
    status: "on_the_way",
    estimatedTime: "8 minutes",
    progress: 85,
    orderTime: "2024-01-15 13:45",
    address: "123 Main Street, Algiers",
    phone: "+213 555 0123",
    image: "/images/restaurants/tokyo-sushi.jpg",
  },
]

const pastOrders = [
  {
    id: "SR-2024-002",
    restaurant: "Burger Palace",
    items: ["Classic Burger", "Fries", "Coke"],
    total: 2400,
    status: "delivered",
    orderTime: "2024-01-12 19:45",
    deliveredTime: "2024-01-12 20:15",
    rating: 5,
    image: "/images/restaurants/burger-palace.jpg",
  },
  {
    id: "SR-2024-003",
    restaurant: "Spice Garden",
    items: ["Chicken Curry", "Naan Bread", "Basmati Rice"],
    total: 3200,
    status: "delivered",
    orderTime: "2024-01-10 13:20",
    deliveredTime: "2024-01-10 14:05",
    rating: 4,
    image: "/images/restaurants/spice-garden.jpg",
  },
  {
    id: "SR-2024-005",
    restaurant: "Le Petit Café",
    items: ["Croissant", "Cappuccino", "Chocolate Croissant"],
    total: 1800,
    status: "delivered",
    orderTime: "2024-01-08 08:30",
    deliveredTime: "2024-01-08 09:10",
    rating: 5,
    image: "/images/restaurants/le-petit-cafe.jpg",
  },
  {
    id: "SR-2024-006",
    restaurant: "Taco Fiesta",
    items: ["Beef Tacos (3pcs)", "Guacamole", "Nachos"],
    total: 2100,
    status: "delivered",
    orderTime: "2024-01-05 18:15",
    deliveredTime: "2024-01-05 18:50",
    rating: 4,
    image: "/images/restaurants/taco-fiesta.jpg",
  },
  {
    id: "SR-2024-007",
    restaurant: "Bella Italia",
    items: ["Fettuccine Alfredo", "Caesar Salad"],
    total: 2950,
    status: "delivered",
    orderTime: "2024-01-03 20:00",
    deliveredTime: "2024-01-03 20:35",
    rating: 5,
    image: "/images/restaurants/bella-italia.jpg",
  },
]

const orderStatuses = [
  { key: "confirmed", label: "Confirmed", icon: CheckCircle, color: "text-blue-600" },
  { key: "preparing", label: "Preparing", icon: ChefHat, color: "text-orange-600" },
  { key: "ready", label: "Ready", icon: Package, color: "text-purple-600" },
  { key: "delivering", label: "On the way", icon: Truck, color: "text-green-600" },
  { key: "delivered", label: "Delivered", icon: CheckCircle, color: "text-green-600" },
]

export default function OrdersPage() {
  const [selectedTab, setSelectedTab] = useState("active")

  const getStatusInfo = (status: string) => {
    return orderStatuses.find((s) => s.key === status) || orderStatuses[0]
  }

  const getProgressPercentage = (status: string) => {
    const statusIndex = orderStatuses.findIndex((s) => s.key === status)
    return ((statusIndex + 1) / orderStatuses.length) * 100
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-md md:max-w-none">
          <h1 className="text-2xl font-heading font-bold mb-6 text-orange-600 dark:text-orange-400">My Orders</h1>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-orange-50 dark:bg-orange-900/20">
              <TabsTrigger value="active" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Active Orders ({activeOrders.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Order History ({pastOrders.length})
              </TabsTrigger>
            </TabsList>

            {/* Active Orders */}
            <TabsContent value="active">
              {activeOrders.length > 0 ? (
                <div className="space-y-6">
                  {activeOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status)
                    return (
                      <Card key={order.id} className="overflow-hidden border-orange-100 dark:border-orange-900/30">
                        <CardHeader className="pb-4 bg-orange-50/50 dark:bg-orange-900/10">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg text-orange-800 dark:text-orange-200">
                                {order.restaurant}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <Badge className="bg-orange-500 text-white hover:bg-orange-600">{statusInfo.label}</Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          {/* Order Progress */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                Order Progress
                              </span>
                              <span className="text-sm text-muted-foreground">ETA: {order.estimatedTime}</span>
                            </div>
                            <Progress value={order.progress} className="h-2 bg-orange-100 dark:bg-orange-900/30" />
                            <div className="flex justify-between">
                              {orderStatuses.slice(0, 4).map((status, index) => (
                                <div key={status.key} className="flex flex-col items-center">
                                  <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full mb-1 ${
                                      order.progress >= ((index + 1) / 4) * 100
                                        ? "bg-orange-500 text-white"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                                  >
                                    <status.icon className="h-4 w-4" />
                                  </div>
                                  <span className="text-xs text-center">{status.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium text-orange-700 dark:text-orange-300">Items Ordered</h4>
                              <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium text-orange-700 dark:text-orange-300">Delivery Address</h4>
                              <p className="text-sm text-muted-foreground">{order.address}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20 bg-transparent"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call Restaurant
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20 bg-transparent"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Chat Support
                            </Button>
                            <Link href={`/orders/${order.id}`}>
                              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-orange-700 dark:text-orange-300">No active orders</h3>
                  <p className="text-muted-foreground mb-6">When you place an order, it will appear here</p>
                  <Link href="/search">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Restaurants</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            {/* Past Orders */}
            <TabsContent value="past">
              <div className="space-y-4">
                {pastOrders.map((order) => (
                  <Card key={order.id} className="border-orange-100 dark:border-orange-900/30">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt={order.restaurant}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-orange-800 dark:text-orange-200">{order.restaurant}</h3>
                              <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            >
                              Delivered
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">{order.items.join(", ")}</p>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              <p>Ordered: {new Date(order.orderTime).toLocaleDateString()}</p>
                              <p>Delivered: {new Date(order.deliveredTime).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-orange-700 dark:text-orange-300">{order.total} DA</p>
                              <div className="flex items-center gap-1 mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < order.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20 bg-transparent"
                            >
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Reorder
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20 bg-transparent"
                            >
                              <Star className="h-4 w-4 mr-2" />
                              Rate & Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
