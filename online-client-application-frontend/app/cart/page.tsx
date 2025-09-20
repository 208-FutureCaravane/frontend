"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  ArrowLeft,
  Gift,
  Percent,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const cartItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    restaurant: "Bella Italia",
    price: 1400,
    quantity: 2,
    image: "/images/dishes/margherita-pizza.jpg", // Updated image path
    customizations: [
      { name: "Size", value: "Large", extraCost: 200 },
      { name: "Extra Cheese", value: "Yes", extraCost: 150 },
    ],
    specialInstructions: "Extra crispy crust",
  },
  {
    id: 2,
    name: "Spaghetti Carbonara",
    restaurant: "Bella Italia",
    price: 1600,
    quantity: 1,
    image: "/images/dishes/spaghetti-carbonara.jpg", // Updated image path
    customizations: [{ name: "Spice Level", value: "Medium", extraCost: 0 }],
    specialInstructions: "",
  },
]

const deliveryAddresses = [
  { id: 1, label: "Home", address: "123 Main Street, Algiers", isDefault: true },
  { id: 2, label: "Work", address: "456 Business Ave, Algiers", isDefault: false },
]

const paymentMethods = [
  { id: "guiddini", name: "Guiddini", icon: CreditCard, description: "Pay with Guiddini wallet" },
  { id: "cib", name: "CIB Bank", icon: CreditCard, description: "Credit/Debit card" },
  { id: "edahabia", name: "Edahabia", icon: CreditCard, description: "Edahabia card" },
  { id: "wallet", name: "App Wallet", icon: Wallet, description: "Use your app balance" },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [selectedAddress, setSelectedAddress] = useState("1")
  const [selectedPayment, setSelectedPayment] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== itemId))
    } else {
      setItems(items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setIsPromoApplied(true)
    }
  }

  const calculateItemTotal = (item: (typeof cartItems)[0]) => {
    const basePrice = item.price
    const customizationCost = item.customizations.reduce((sum, custom) => sum + custom.extraCost, 0)
    return (basePrice + customizationCost) * item.quantity
  }

  const subtotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  const deliveryFee = 300
  const tax = Math.round(subtotal * 0.19) // 19% tax
  const promoDiscount = isPromoApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + deliveryFee + tax - promoDiscount

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-md md:max-w-none">
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some delicious items to get started</p>
              <Link href="/search">
                <Button>Browse Restaurants</Button>
              </Link>
            </div>
          </div>
        </main>
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-md md:max-w-none">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/search">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <h1 className="text-2xl font-heading font-bold text-orange-600 dark:text-orange-400">Your Cart</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border-orange-100 dark:border-orange-900/30">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-orange-800 dark:text-orange-200">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Customizations */}
                        {item.customizations.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2">
                              {item.customizations.map((custom, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {custom.name}: {custom.value}
                                  {custom.extraCost > 0 && ` (+${custom.extraCost} DA)`}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Special Instructions */}
                        {item.specialInstructions && (
                          <div className="mb-3">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Note:</span> {item.specialInstructions}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium min-w-[2rem] text-center text-orange-700 dark:text-orange-300">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-orange-700 dark:text-orange-300">
                              {calculateItemTotal(item)} DA
                            </p>
                            {item.customizations.some((c) => c.extraCost > 0) && (
                              <p className="text-xs text-muted-foreground">Base: {item.price * item.quantity} DA</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Promo Code */}
              <Card className="border-orange-100 dark:border-orange-900/30">
                <CardContent className="p-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={isPromoApplied}
                        className="border-orange-200 focus:border-orange-400 dark:border-orange-800"
                      />
                    </div>
                    <Button
                      onClick={applyPromoCode}
                      disabled={!promoCode || isPromoApplied}
                      className={
                        isPromoApplied ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
                      }
                    >
                      {isPromoApplied ? (
                        <>
                          <Gift className="h-4 w-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <div className="flex items-center gap-2 mt-2 text-green-600">
                      <Percent className="h-4 w-4" />
                      <span className="text-sm">10% discount applied!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Checkout */}
            <div className="space-y-6">
              {/* Delivery Address */}
              <Card className="border-orange-100 dark:border-orange-900/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedAddress} onValueChange={setSelectedAddress}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryAddresses.map((address) => (
                        <SelectItem key={address.id} value={address.id.toString()}>
                          <div>
                            <div className="font-medium">{address.label}</div>
                            <div className="text-sm text-muted-foreground">{address.address}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="e.g., Ring the doorbell, Leave at door..."
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-orange-100 dark:border-orange-900/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <method.icon className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="border-orange-100 dark:border-orange-900/30">
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal} DA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee} DA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (19%)</span>
                    <span>{tax} DA</span>
                  </div>
                  {isPromoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-{promoDiscount} DA</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{total} DA</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <Clock className="h-4 w-4" />
                    <span>Estimated delivery: 25-35 minutes</span>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <div className="space-y-3">
                {!selectedPayment && (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Please select a payment method</span>
                  </div>
                )}
                <Link href="/checkout">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    size="lg"
                    disabled={!selectedPayment}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
