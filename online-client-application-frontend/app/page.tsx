"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Clock,
  MapPin,
  Utensils,
  Pizza,
  Coffee,
  Salad,
  Sparkles,
  Mic,
  TrendingUp,
  ChefHat,
  Heart,
  Flame,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

const featuredRestaurants = [
  {
    id: 1,
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "25-35 min",
    distance: "1.2 km",
    image: "/images/restaurants/bella-italia.jpg",
    badge: "Popular",
    specialties: ["Pizza", "Pasta", "Wine"],
    priceRange: "$$",
    isOpen: true,
    deliveryFee: 150,
  },
  {
    id: 2,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    distance: "2.1 km",
    image: "/images/restaurants/spice-garden.jpg",
    badge: "New",
    specialties: ["Biryani", "Curry", "Naan"],
    priceRange: "$",
    isOpen: true,
    deliveryFee: 200,
  },
  {
    id: 3,
    name: "Burger Palace",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "20-30 min",
    distance: "0.8 km",
    image: "/images/restaurants/burger-palace.jpg",
    badge: "Fast Delivery",
    specialties: ["Burgers", "Fries", "Shakes"],
    priceRange: "$$",
    isOpen: true,
    deliveryFee: 100,
  },
]

const featuredDishes = [
  {
    id: 1,
    name: "Margherita Pizza",
    restaurant: "Bella Italia",
    price: 1400,
    originalPrice: 1600,
    image: "/images/dishes/margherita-pizza.jpg",
    rating: 4.9,
    prepTime: "15-20 min",
    calories: 280,
    isVegetarian: true,
    isPopular: true,
    discount: 13,
  },
  {
    id: 2,
    name: "Chicken Biryani",
    restaurant: "Spice Garden",
    price: 1800,
    originalPrice: 2000,
    image: "/images/dishes/chicken-biryani.jpg",
    rating: 4.7,
    prepTime: "25-30 min",
    calories: 450,
    isVegetarian: false,
    isPopular: true,
    discount: 10,
  },
  {
    id: 3,
    name: "Classic Burger",
    restaurant: "Burger Palace",
    price: 1200,
    originalPrice: 1400,
    image: "/images/dishes/classic-burger.jpg",
    rating: 4.8,
    prepTime: "10-15 min",
    calories: 520,
    isVegetarian: false,
    isPopular: false,
    discount: 14,
  },
]

export default function HomePage() {
  const { t } = useTranslation()

  const cuisineTypes = [
    { name: "Pizza", icon: Pizza, color: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" },
    { name: "Coffee", icon: Coffee, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" },
    { name: "Healthy", icon: Salad, color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" },
    { name: "All", icon: Utensils, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16 pb-24 md:pt-4 md:pb-8">
        {/* Hero Section with AI Features */}
        <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl mx-2 sm:mx-4 mt-2 sm:mt-4 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-4 sm:px-6 py-8 sm:py-12">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-4">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium">AI-Powered Food Discovery</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-3 text-balance leading-tight">
                {t("restaurant.tagline")}
              </h1>
              <p className="text-base sm:text-lg mb-6 text-white/90 text-pretty px-2">
                Order from your favorite restaurants with smart recommendations and real-time tracking
              </p>

              <div className="flex flex-col gap-3 justify-center max-w-sm mx-auto">
                <Link href="/search" className="w-full">
                  <Button
                    size="lg"
                    className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold shadow-lg"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    Try Voice Search
                  </Button>
                </Link>
                <Link href="/search" className="w-full">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
                  >
                    {t("restaurant.findRestaurants")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-heading font-bold">Smart Picks for You</h2>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              AI Curated
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {featuredRestaurants.slice(0, 3).map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg active:scale-[0.98] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800">
                  <div className="relative">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      width={300}
                      height={140}
                      className="w-full h-28 sm:h-32 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1">AI Pick</Badge>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 rounded-full px-2 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge
                        className={`text-xs px-2 py-1 ${restaurant.isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                      >
                        {restaurant.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{restaurant.name}</h3>
                        <p className="text-xs text-muted-foreground mb-1">
                          {restaurant.cuisine} • {restaurant.priceRange}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {restaurant.specialties.slice(0, 2).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="font-medium text-green-600">
                          {restaurant.deliveryFee === 0 ? "Free" : `${restaurant.deliveryFee} DA`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-3">
              Based on your preferences: Italian cuisine, vegetarian options, under 2000 DA
            </p>
          </div>
        </section>

        <section className="px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-xl flex items-center justify-center">
                <ChefHat className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-heading font-bold">Popular Dishes</h2>
            </div>
            <Link href="/search">
              <Button variant="outline" size="sm" className="rounded-full bg-transparent text-xs sm:text-sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {featuredDishes.map((dish) => (
              <Card
                key={dish.id}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg active:scale-[0.98]"
              >
                <div className="relative">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    width={300}
                    height={140}
                    className="w-full h-28 sm:h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{dish.rating}</span>
                  </div>
                  {dish.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1">
                      -{dish.discount}%
                    </Badge>
                  )}
                  {dish.isPopular && (
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-orange-500 text-white text-xs px-2 py-1 flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  {dish.isVegetarian && (
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-green-500 text-white text-xs px-2 py-1">🌱 Veg</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1">{dish.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{dish.restaurant}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{dish.prepTime}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{dish.calories} cal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-orange-600">{dish.price} DA</span>
                      {dish.originalPrice > dish.price && (
                        <span className="text-xs text-muted-foreground line-through">{dish.originalPrice} DA</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="h-7 px-3 text-xs bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Heart className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Cuisine Categories with Enhanced Design */}
        <section className="px-2 sm:px-4 py-4 sm:py-6">
          <h2 className="text-lg sm:text-xl font-heading font-bold mb-4">Browse by Cuisine</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {cuisineTypes.map(({ name, icon: Icon, color }) => (
              <Card
                key={name}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg active:scale-95"
              >
                <CardContent className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6">
                  <div className={`p-3 sm:p-4 rounded-2xl ${color} shadow-lg`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="font-medium text-center text-sm sm:text-base">{name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Restaurants with Enhanced Cards */}
        <section className="px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-heading font-bold">Featured {t("common.restaurants")}</h2>
            <Link href="/search">
              <Button variant="outline" size="sm" className="rounded-full bg-transparent text-xs sm:text-sm">
                {t("common.view")} {t("common.all")}
              </Button>
            </Link>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {featuredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg active:scale-[0.98]">
                  <div className="flex">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover rounded-l-lg"
                      />
                      <Badge className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-primary text-primary-foreground text-xs px-1.5 sm:px-2 py-0.5">
                        {restaurant.badge}
                      </Badge>
                    </div>

                    <CardContent className="flex-1 p-3 sm:p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading font-semibold text-base sm:text-lg leading-tight">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm font-medium">{restaurant.rating}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3">
                        {restaurant.cuisine} • {restaurant.priceRange}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{restaurant.distance}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {restaurant.specialties.slice(0, 2).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs font-medium text-green-600">
                          {restaurant.deliveryFee === 0 ? "Free delivery" : `${restaurant.deliveryFee} DA`}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Gamification Teaser */}
        <section className="px-2 sm:px-4 py-4 sm:py-6">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-xl">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg mb-2">Earn Rewards!</h3>
              <p className="text-white/90 text-xs sm:text-sm mb-4 px-2">
                Order more, earn points, and unlock exclusive discounts
              </p>
              <Link href="/profile">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs sm:text-sm"
                >
                  View Rewards
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
