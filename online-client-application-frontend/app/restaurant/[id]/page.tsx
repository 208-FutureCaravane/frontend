"use client"

import { useState } from "react"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Star,
  Clock,
  MapPin,
  Phone,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  Info,
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  User,
  CalendarIcon,
  Users,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

const restaurant = {
  id: 1,
  name: "Bella Italia",
  cuisine: "Italian",
  rating: 4.8,
  reviewCount: 324,
  deliveryTime: "25-35 min",
  distance: "1.2 km",
  phone: "+213 555 0123",
  address: "123 Main Street, Algiers",
  image: "/images/restaurants/bella-italia.jpg",
  description:
    "Authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations. Experience the taste of Italy in the heart of Algiers.",
  hours: "10:00 AM - 11:00 PM",
  tags: ["Popular", "Vegetarian Friendly", "Family Restaurant", "Free WiFi"],
  isOpen: true,
  deliveryFee: 150,
  minimumOrder: 1000,
}

const menuCategories = [
  {
    name: "Appetizers",
    items: [
      {
        id: 1,
        name: "Bruschetta Classica",
        description: "Toasted bread with fresh tomatoes, basil, and garlic",
        price: 850,
        image: "/images/dishes/bruschetta.jpg",
        isVegetarian: true,
        isPopular: true,
        customizations: ["Bread Type", "Extra Toppings"],
      },
      {
        id: 2,
        name: "Antipasto Platter",
        description: "Selection of cured meats, cheeses, and marinated vegetables",
        price: 1200,
        image: "/images/dishes/antipasto.jpg",
        isVegetarian: false,
        isPopular: false,
        customizations: ["Size", "Meat Selection"],
      },
      {
        id: 3,
        name: "Caprese Salad",
        description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic",
        price: 950,
        image: "/images/dishes/caprese-salad.jpg",
        isVegetarian: true,
        isPopular: true,
        customizations: ["Dressing", "Extra Cheese"],
      },
    ],
  },
  {
    name: "Pizza",
    items: [
      {
        id: 4,
        name: "Margherita",
        description: "Fresh mozzarella, tomato sauce, and basil",
        price: 1400,
        image: "/images/dishes/margherita-pizza.jpg",
        isVegetarian: true,
        isPopular: true,
        customizations: ["Size", "Extra Cheese", "Spice Level"],
      },
      {
        id: 5,
        name: "Quattro Stagioni",
        description: "Four seasons pizza with mushrooms, artichokes, ham, and olives",
        price: 1800,
        image: "/images/dishes/quattro-stagioni.jpg",
        isVegetarian: false,
        isPopular: false,
        customizations: ["Size", "Extra Toppings"],
      },
      {
        id: 6,
        name: "Pepperoni Supreme",
        description: "Loaded with pepperoni, cheese, and Italian herbs",
        price: 1650,
        image: "/images/dishes/diavola.jpg",
        isVegetarian: false,
        isPopular: true,
        customizations: ["Size", "Extra Pepperoni", "Cheese Type"],
      },
      {
        id: 7,
        name: "Vegetarian Deluxe",
        description: "Bell peppers, mushrooms, olives, onions, and fresh herbs",
        price: 1550,
        image: "/images/dishes/caprese-salad.jpg",
        isVegetarian: true,
        isPopular: false,
        customizations: ["Size", "Vegetable Selection"],
      },
    ],
  },
  {
    name: "Pasta",
    items: [
      {
        id: 8,
        name: "Spaghetti Carbonara",
        description: "Classic Roman pasta with eggs, cheese, and pancetta",
        price: 1600,
        image: "/images/dishes/carbonara.jpg",
        isVegetarian: false,
        isPopular: true,
        customizations: ["Pasta Type", "Cheese Level"],
      },
      {
        id: 9,
        name: "Fettuccine Alfredo",
        description: "Rich and creamy white sauce with parmesan cheese",
        price: 1450,
        image: "/images/dishes/risotto.jpg",
        isVegetarian: true,
        isPopular: true,
        customizations: ["Pasta Type", "Add Chicken", "Sauce Richness"],
      },
      {
        id: 10,
        name: "Penne Arrabbiata",
        description: "Spicy tomato sauce with garlic, red chili, and herbs",
        price: 1350,
        image: "/images/dishes/diavola.jpg",
        isVegetarian: true,
        isPopular: false,
        customizations: ["Spice Level", "Add Vegetables"],
      },
    ],
  },
  {
    name: "Main Courses",
    items: [
      {
        id: 11,
        name: "Chicken Parmigiana",
        description: "Breaded chicken breast with marinara sauce and mozzarella",
        price: 2200,
        image: "/images/dishes/osso-buco.jpg",
        isVegetarian: false,
        isPopular: true,
        customizations: ["Side Dish", "Sauce Level"],
      },
      {
        id: 12,
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with lemon butter and herbs",
        price: 2500,
        image: "/images/dishes/chicken-biryani.jpg",
        isVegetarian: false,
        isPopular: false,
        customizations: ["Cooking Style", "Side Vegetables"],
      },
    ],
  },
  {
    name: "Desserts",
    items: [
      {
        id: 13,
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee-soaked ladyfingers",
        price: 800,
        image: "/images/dishes/tiramisu.jpg",
        isVegetarian: true,
        isPopular: true,
        customizations: ["Size"],
      },
      {
        id: 14,
        name: "Gelato Selection",
        description: "Choice of vanilla, chocolate, or strawberry gelato",
        price: 650,
        image: "/images/dishes/gelato.jpg",
        isVegetarian: true,
        isPopular: true,
        customizations: ["Flavor", "Scoops"],
      },
    ],
  },
]

const restaurantReviews = [
  {
    id: 1,
    user: "Ahmed M.",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing authentic Italian food! The pizza was perfect and the service was excellent. Highly recommend the Margherita pizza!",
    helpful: 12,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    user: "Fatima K.",
    rating: 4,
    date: "1 week ago",
    comment: "Great atmosphere and delicious pasta. The Fettuccine Alfredo was creamy and perfectly cooked. Will definitely come back!",
    helpful: 8,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    user: "Yacine B.",
    rating: 5,
    date: "2 weeks ago",
    comment: "Best Italian restaurant in Algiers. The carbonara is to die for! Fast delivery and food arrived hot.",
    helpful: 15,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 4,
    user: "Salma D.",
    rating: 4,
    date: "3 weeks ago",
    comment: "Love the vegetarian options here. The Caprese salad was fresh and the Tiramisu was heavenly!",
    helpful: 6,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 5,
    user: "Omar H.",
    rating: 5,
    date: "1 month ago",
    comment: "Excellent food quality and presentation. The Chicken Parmigiana was outstanding. Great value for money!",
    helpful: 9,
    avatar: "/placeholder-user.jpg",
  },
]

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const [selectedCategory, setSelectedCategory] = useState("Appetizers")
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [favorites, setFavorites] = useState<number[]>([])
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const [showReservationDialog, setShowReservationDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [guestCount, setGuestCount] = useState("2")
  const [tablePreference, setTablePreference] = useState("")
  const [reservationSuccess, setReservationSuccess] = useState(false)

  const availableTimes = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
  const tableTypes = ["Standard", "Window seat", "Private booth", "Outdoor terrace"]

  const addToCart = (itemId: number) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const submitReview = () => {
    if (newReview.trim() && newRating > 0) {
      console.log("Review submitted:", { rating: newRating, comment: newReview })
      setNewReview("")
      setNewRating(0)
      setShowReviewForm(false)
    }
  }

  const handleReservationSubmit = () => {
    if (selectedDate && selectedTime && guestCount) {
      console.log("Reservation submitted:", {
        restaurant: restaurant.id,
        date: selectedDate,
        time: selectedTime,
        guests: guestCount,
        tablePreference,
      })
      setReservationSuccess(true)
      setTimeout(() => {
        setShowReservationDialog(false)
        setReservationSuccess(false)
        setSelectedDate(undefined)
        setSelectedTime("")
        setGuestCount("2")
        setTablePreference("")
      }, 2000)
    }
  }

  const cartItemsCount = Object.values(cart).reduce((sum, count) => sum + count, 0)

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />

      <main className="md:ml-64 pb-20 md:pb-8">
        {/* Header */}
        <div className="relative">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            width={800}
            height={300}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>

          <Link href="/search">
            <Button size="sm" variant="secondary" className="absolute top-4 left-4 z-10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{restaurant.name}</h1>
                  <p className="text-lg mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {restaurant.rating} ({restaurant.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>
                </div>
                <Badge className={restaurant.isOpen ? "bg-green-500" : "bg-red-500"}>
                  {restaurant.isOpen ? "Open" : "Closed"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="container mx-auto px-4 py-6">
          <Card className="mb-6">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">{restaurant.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Hours: {restaurant.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{restaurant.address}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Dialog open={showReservationDialog} onOpenChange={setShowReservationDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Make Reservation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Reserve a Table
                      </DialogTitle>
                    </DialogHeader>

                    {reservationSuccess ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Reservation Confirmed!</h3>
                        <p className="text-muted-foreground">
                          Your table for {guestCount} guests on {selectedDate && format(selectedDate, "MMM d")} at{" "}
                          {selectedTime} has been reserved.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Date Selection */}
                        <div className="space-y-2">
                          <Label>Select Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-transparent"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : "Choose date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Guest Count */}
                        <div className="space-y-2">
                          <Label>Number of Guests</Label>
                          <Select value={guestCount} onValueChange={setGuestCount}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {num} {num === 1 ? "guest" : "guests"}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Time Selection */}
                        {selectedDate && (
                          <div className="space-y-2">
                            <Label>Available Times</Label>
                            <div className="grid grid-cols-3 gap-2">
                              {availableTimes.map((time) => (
                                <Button
                                  key={time}
                                  type="button"
                                  variant={selectedTime === time ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedTime(time)}
                                  className="text-xs"
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Table Preference */}
                        {selectedTime && (
                          <div className="space-y-2">
                            <Label>Table Preference (Optional)</Label>
                            <Select value={tablePreference} onValueChange={setTablePreference}>
                              <SelectTrigger>
                                <SelectValue placeholder="Any table" />
                              </SelectTrigger>
                              <SelectContent>
                                {tableTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Reservation Summary */}
                        {selectedDate && selectedTime && (
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Reservation Summary</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p>{format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
                              <p>
                                {selectedTime} • {guestCount} guests
                              </p>
                              {tablePreference && <p>Table: {tablePreference}</p>}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={handleReservationSubmit}
                            disabled={!selectedDate || !selectedTime}
                            className="flex-1 bg-orange-500 hover:bg-orange-600"
                          >
                            Confirm Reservation
                          </Button>
                          <Button variant="outline" onClick={() => setShowReservationDialog(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Link href="/reservations">
                  <Button variant="outline">View My Reservations</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Menu and Reviews Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {menuCategories.map((category) => (
                <TabsTrigger key={category.name} value={category.name}>
                  {category.name}
                </TabsTrigger>
              ))}
              <TabsTrigger value="Reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Menu Content */}
            {menuCategories.map((category) => (
              <TabsContent key={category.name} value={category.name}>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                {item.isPopular && <Badge className="bg-orange-500 text-white">Popular</Badge>}
                                {item.isVegetarian && (
                                  <Badge variant="outline" className="text-green-600 border-green-600">
                                    Vegetarian
                                  </Badge>
                                )}
                              </div>
                              <Button size="sm" variant="ghost" onClick={() => toggleFavorite(item.id)} className="p-2">
                                <Heart
                                  className={`h-4 w-4 ${
                                    favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                                  }`}
                                />
                              </Button>
                            </div>

                            <p className="text-muted-foreground mb-4">{item.description}</p>

                            {item.customizations && (
                              <div className="flex items-center gap-2 mb-4">
                                <Info className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Customizable: {item.customizations.join(", ")}
                                </span>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold">{item.price} DA</span>

                              <div className="flex items-center gap-2">
                                {cart[item.id] ? (
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => removeFromCart(item.id)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="font-medium min-w-[2rem] text-center">{cart[item.id]}</span>
                                    <Button size="sm" onClick={() => addToCart(item.id)} className="h-8 w-8 p-0">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button onClick={() => addToCart(item.id)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add to Cart
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="w-32 md:w-40">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={160}
                              height={160}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}

            <TabsContent value="Reviews">
              <div className="space-y-6">
                {/* Review Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Customer Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{restaurant.rating}</div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= restaurant.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{restaurant.reviewCount} reviews</div>
                      </div>
                      <div className="flex-1">
                        <Button
                          onClick={() => setShowReviewForm(!showReviewForm)}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          Write a Review
                        </Button>
                      </div>
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                      <Card className="mb-6">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">Write Your Review</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Rating</label>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button key={star} onClick={() => setNewRating(star)} className="p-1">
                                    <Star
                                      className={`h-6 w-6 ${
                                        star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">Your Review</label>
                              <Textarea
                                placeholder="Share your experience..."
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={submitReview} className="bg-orange-500 hover:bg-orange-600">
                                Submit Review
                              </Button>
                              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                  {restaurantReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{review.user}</h4>
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-3 w-3 ${
                                          star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-3">{review.comment}</p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="text-muted-foreground">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Helpful ({review.helpful})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Cart Button */}
        {cartItemsCount > 0 && (
          <div className="fixed bottom-20 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-auto z-40">
            <Link href="/cart">
              <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 shadow-lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart ({cartItemsCount})
              </Button>
            </Link>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  )
}
