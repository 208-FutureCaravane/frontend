"use client"

import { useState, useEffect } from "react"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  ChefHat,
  Package,
  Truck,
  CheckCircle,
  Star,
  RotateCcw,
  Bell,
  User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const orderDetails = {
  id: "SR-2024-001",
  restaurant: {
    name: "Bella Italia",
    phone: "+213 555 0123",
    address: "456 Restaurant Street, Algiers",
    image: "/italian-restaurant-food.png",
  },
  items: [
    {
      id: 1,
      name: "Margherita Pizza",
      quantity: 2,
      price: 1750,
      image: "/margherita-pizza.png",
      customizations: ["Large Size", "Extra Cheese"],
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      quantity: 1,
      price: 1600,
      image: "/spaghetti-carbonara.png",
      customizations: ["Medium Spice"],
    },
  ],
  status: "preparing",
  orderTime: "2024-01-15T14:30:00",
  estimatedDelivery: "2024-01-15T15:15:00",
  deliveryAddress: "123 Main Street, Algiers",
  paymentMethod: "Guiddini",
  subtotal: 5100,
  deliveryFee: 300,
  tax: 969,
  promoDiscount: 510,
  total: 5859,
  driver: {
    name: "Ahmed Benali",
    phone: "+213 555 0456",
    rating: 4.8,
    vehicle: "Honda Motorcycle - 123 ABC 16",
  },
  timeline: [
    {
      status: "confirmed",
      time: "2024-01-15T14:30:00",
      title: "Order Confirmed",
      description: "Your order has been confirmed by the restaurant",
      completed: true,
    },
    {
      status: "preparing",
      time: "2024-01-15T14:35:00",
      title: "Preparing Your Food",
      description: "The kitchen is preparing your delicious meal",
      completed: true,
    },
    {
      status: "ready",
      time: null,
      title: "Ready for Pickup",
      description: "Your order is ready and waiting for the driver",
      completed: false,
    },
    {
      status: "delivering",
      time: null,
      title: "On the Way",
      description: "Your order is being delivered to you",
      completed: false,
    },
    {
      status: "delivered",
      time: null,
      title: "Delivered",
      description: "Enjoy your meal!",
      completed: false,
    },
  ],
}

const statusIcons = {
  confirmed: CheckCircle,
  preparing: ChefHat,
  ready: Package,
  delivering: Truck,
  delivered: CheckCircle,
}

const statusColors = {
  confirmed: "text-blue-600 bg-blue-100",
  preparing: "text-orange-600 bg-orange-100",
  ready: "text-purple-600 bg-purple-100",
  delivering: "text-green-600 bg-green-100",
  delivered: "text-green-600 bg-green-100",
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState(orderDetails)
  const [currentProgress, setCurrentProgress] = useState(40)
  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate status progression
      if (order.status === "preparing" && Math.random() > 0.7) {
        setOrder((prev) => ({ ...prev, status: "ready" }))
        setCurrentProgress(60)
        toast({
          title: "Order Update",
          description: "Your order is ready for pickup!",
        })
      } else if (order.status === "ready" && Math.random() > 0.8) {
        setOrder((prev) => ({ ...prev, status: "delivering" }))
        setCurrentProgress(80)
        toast({
          title: "Order Update",
          description: "Your order is on the way!",
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [order.status, toast])

  const getStatusProgress = (status: string) => {
    const statusOrder = ["confirmed", "preparing", "ready", "delivering", "delivered"]
    const currentIndex = statusOrder.indexOf(status)
    return ((currentIndex + 1) / statusOrder.length) * 100
  }

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEstimatedTime = () => {
    const now = new Date()
    const estimated = new Date(order.estimatedDelivery)
    const diffMinutes = Math.ceil((estimated.getTime() - now.getTime()) / (1000 * 60))
    return diffMinutes > 0 ? `${diffMinutes} minutes` : "Any moment now"
  }

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />

      <main className="md:ml-64 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-heading font-bold">Order #{order.id}</h1>
              <p className="text-muted-foreground">Track your order in real-time</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Tracking */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Status */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Live Tracking
                    </CardTitle>
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Order Progress</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>ETA: {getEstimatedTime()}</span>
                      </div>
                    </div>
                    <Progress value={getStatusProgress(order.status)} className="h-3" />
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                    {order.timeline.map((step, index) => {
                      const Icon = statusIcons[step.status as keyof typeof statusIcons]
                      const isActive = order.status === step.status
                      const isCompleted = step.completed || isActive

                      return (
                        <div key={step.status} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                              } ${isActive ? "animate-pulse" : ""}`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            {index < order.timeline.length - 1 && (
                              <div className={`w-0.5 h-8 mt-2 ${isCompleted ? "bg-primary" : "bg-muted"}`} />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between mb-1">
                              <h3
                                className={`font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {step.title}
                              </h3>
                              {step.time && (
                                <span className="text-sm text-muted-foreground">{formatTime(step.time)}</span>
                              )}
                            </div>
                            <p
                              className={`text-sm ${
                                isCompleted ? "text-muted-foreground" : "text-muted-foreground/70"
                              }`}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Driver Info (when delivering) */}
              {order.status === "delivering" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Your Driver
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{order.driver.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{order.driver.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.driver.vehicle}</p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Restaurant Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Image
                      src={order.restaurant.image || "/placeholder.svg"}
                      alt={order.restaurant.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{order.restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{order.restaurant.address}</p>
                      <p className="text-sm text-muted-foreground">{order.restaurant.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        {item.customizations.length > 0 && (
                          <p className="text-xs text-muted-foreground">{item.customizations.join(", ")}</p>
                        )}
                      </div>
                      <span className="text-sm font-medium">{item.price} DA</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{order.subtotal} DA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>{order.deliveryFee} DA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{order.tax} DA</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Promo Discount</span>
                    <span>-{order.promoDiscount} DA</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Paid</span>
                    <span>{order.total} DA</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Paid via {order.paymentMethod}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{order.deliveryAddress}</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reorder Items
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
