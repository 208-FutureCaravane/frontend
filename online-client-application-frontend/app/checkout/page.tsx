"use client"

import { useState } from "react"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Clock,
  Percent,
  Loader2,
  Smartphone,
  Building2,
  Wallet,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const checkoutSteps = [
  { id: 1, name: "Cart", icon: ShoppingCart },
  { id: 2, name: "Address", icon: MapPin },
  { id: 3, name: "Payment", icon: CreditCard },
  { id: 4, name: "Confirmation", icon: CheckCircle },
]

const orderSummary = {
  items: [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Bella Italia",
      quantity: 2,
      price: 1750,
      image: "/margherita-pizza.png",
      customizations: ["Large Size", "Extra Cheese"],
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      restaurant: "Bella Italia",
      quantity: 1,
      price: 1600,
      image: "/spaghetti-carbonara.png",
      customizations: [],
    },
  ],
  subtotal: 5100,
  deliveryFee: 300,
  serviceFee: 255,
  tax: 969,
  promoDiscount: 510,
  total: 6114,
  address: "123 Main Street, Algiers 16000",
  paymentMethod: "Dahabia",
  estimatedTime: "25-35 minutes",
  orderNumber: "SR-2024-001",
  restaurantPhone: "+213 555 0123",
}

const paymentMethods = [
  {
    id: "dahabia",
    name: "Dahabia",
    description: "Pay with your Dahabia card",
    icon: CreditCard,
    color: "bg-blue-500",
  },
  {
    id: "baridimob",
    name: "BaridiMob",
    description: "Mobile payment via BaridiMob",
    icon: Smartphone,
    color: "bg-green-500",
  },
  {
    id: "guiddini",
    name: "Guiddini",
    description: "Digital wallet payment",
    icon: Wallet,
    color: "bg-purple-500",
  },
  {
    id: "cib",
    name: "CIB Bank",
    description: "Pay with CIB online banking",
    icon: Building2,
    color: "bg-orange-500",
  },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(4)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(true)
  const [selectedPayment, setSelectedPayment] = useState("dahabia")

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOrderPlaced(true)
    setIsProcessing(false)
  }

  const progressPercentage = (currentStep / checkoutSteps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />

      <main className="md:ml-64 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/cart">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
            <h1 className="text-2xl font-heading font-bold">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="mb-4">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <div className="flex justify-between">
                {checkoutSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                        currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {orderPlaced ? (
            /* Order Confirmation */
            <div className="max-w-4xl mx-auto">
              <Card className="text-center mb-6">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Order Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your order has been placed successfully. You'll receive updates via SMS and push notifications.
                  </p>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Order #{orderSummary.orderNumber}</span>
                      <Badge className="bg-green-500">Confirmed</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Estimated delivery: {orderSummary.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Link href="/orders">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">Track Your Order</Button>
                    </Link>
                    <Link href="/search">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Need help? Contact us at support@smartrestaurant.com or call {orderSummary.restaurantPhone}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orderSummary.items.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                            {item.customizations.length > 0 && (
                              <p className="text-xs text-orange-600">{item.customizations.join(", ")}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.quantity}x</p>
                            <p className="text-sm text-muted-foreground">{item.price} DA</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Invoice Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{orderSummary.subtotal} DA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>{orderSummary.deliveryFee} DA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Fee</span>
                        <span>{orderSummary.serviceFee} DA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (TVA 19%)</span>
                        <span>{orderSummary.tax} DA</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <Percent className="h-4 w-4" />
                          Promo Discount
                        </span>
                        <span>-{orderSummary.promoDiscount} DA</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Paid</span>
                        <span>{orderSummary.total} DA</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div>
                        <p className="font-medium mb-1">Delivery Address</p>
                        <p className="text-sm text-muted-foreground">{orderSummary.address}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Payment Method</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                            <CreditCard className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm text-muted-foreground">{orderSummary.paymentMethod}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Order Date</p>
                        <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString("en-GB")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Enhanced Payment Selection */
            <div className="max-w-2xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Select Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-border hover:border-orange-300"
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                          <method.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{method.name}</h4>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPayment === method.id ? "border-orange-500 bg-orange-500" : "border-gray-300"
                          }`}
                        >
                          {selectedPayment === method.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  </div>
                  <h2 className="text-xl font-heading font-bold mb-2">Processing Your Order</h2>
                  <p className="text-muted-foreground mb-6">Please wait while we confirm your order...</p>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ${orderSummary.total} DA with ${paymentMethods.find((p) => p.id === selectedPayment)?.name}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
