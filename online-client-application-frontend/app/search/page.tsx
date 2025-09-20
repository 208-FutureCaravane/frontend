"use client"

import { useState, useEffect } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Mic,
  Pizza,
  Coffee,
  Salad,
  Utensils,
  Sparkles,
  Brain,
  Zap,
  ChefHat,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const restaurants = [
  {
    id: 1,
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "25-35 min",
    distance: "1.2 km",
    priceRange: 2,
    image: "/images/restaurants/bella-italia.jpg",
    tags: ["Popular", "Vegetarian Friendly"],
    isOpen: true,
  },
  {
    id: 2,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    distance: "2.1 km",
    priceRange: 2,
    image: "/images/restaurants/spice-garden.jpg",
    tags: ["Spicy", "Vegan Options"],
    isOpen: true,
  },
  {
    id: 3,
    name: "Burger Palace",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "20-30 min",
    distance: "0.8 km",
    priceRange: 1,
    image: "/images/restaurants/burger-palace.jpg",
    tags: ["Fast Delivery", "Family Friendly"],
    isOpen: true,
  },
  {
    id: 4,
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "35-45 min",
    distance: "3.2 km",
    priceRange: 3,
    image: "/images/restaurants/tokyo-sushi.jpg",
    tags: ["Premium", "Fresh Fish"],
    isOpen: true,
  },
  {
    id: 5,
    name: "Le Petit Café",
    cuisine: "French",
    rating: 4.5,
    deliveryTime: "40-50 min",
    distance: "2.8 km",
    priceRange: 2,
    image: "/images/restaurants/le-petit-cafe.jpg",
    tags: ["Authentic", "Coffee Specialist"],
    isOpen: true,
  },
  {
    id: 6,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "25-35 min",
    distance: "1.8 km",
    priceRange: 1,
    image: "/images/restaurants/taco-fiesta.jpg",
    tags: ["Spicy", "Late Night"],
    isOpen: true,
  },
  {
    id: 7,
    name: "Green Bowl",
    cuisine: "Healthy",
    rating: 4.3,
    deliveryTime: "15-25 min",
    distance: "1.5 km",
    priceRange: 2,
    image: "/images/restaurants/bella-italia.jpg",
    tags: ["Vegan", "Organic"],
    isOpen: true,
  },
  {
    id: 8,
    name: "Pizza Corner",
    cuisine: "Italian",
    rating: 4.2,
    deliveryTime: "20-30 min",
    distance: "2.2 km",
    priceRange: 1,
    image: "/images/restaurants/burger-palace.jpg",
    tags: ["Budget Friendly", "Quick Bites"],
    isOpen: false,
  },
]

const featuredDishes = [
  {
    id: 1,
    name: "Margherita Pizza",
    restaurant: "Bella Italia",
    price: 1400,
    image: "/images/dishes/margherita-pizza.jpg",
    rating: 4.9,
    prepTime: "15-20 min",
    description: "Classic Italian pizza with fresh mozzarella and basil",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    restaurant: "Spice Garden",
    price: 1800,
    image: "/images/dishes/chicken-biryani.jpg",
    rating: 4.7,
    prepTime: "25-30 min",
    description: "Aromatic basmati rice with tender chicken and spices",
  },
  {
    id: 3,
    name: "Classic Burger",
    restaurant: "Burger Palace",
    price: 1200,
    image: "/images/dishes/classic-burger.jpg",
    rating: 4.8,
    prepTime: "10-15 min",
    description: "Juicy beef patty with fresh lettuce and tomato",
  },
  {
    id: 4,
    name: "Salmon Sashimi",
    restaurant: "Sushi Zen",
    price: 2200,
    image: "/images/dishes/salmon-sashimi.jpg",
    rating: 4.9,
    prepTime: "5-10 min",
    description: "Fresh Atlantic salmon, expertly sliced",
  },
]

const cuisineFilters = [
  { name: "Italian", icon: Pizza },
  { name: "Indian", icon: Coffee },
  { name: "American", icon: Utensils },
  { name: "Japanese", icon: Salad },
]

const dietaryFilters = ["Vegetarian Friendly", "Vegan Options", "Gluten Free", "Halal", "Keto Friendly"]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([1, 3])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"restaurants" | "dishes">("restaurants")

  useEffect(() => {
    if (searchQuery.length > 2) {
      const suggestions = [
        `"${searchQuery}" under 1500DA`,
        `"${searchQuery}" with fast delivery`,
        `"${searchQuery}" vegetarian options`,
        `"${searchQuery}" highly rated nearby`,
      ]
      setAiSuggestions(suggestions)
    } else {
      setAiSuggestions([])
    }
  }, [searchQuery])

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // Voice search implementation would go here
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = restaurant.priceRange >= priceRange[0] && restaurant.priceRange <= priceRange[1]
    const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine)
    const matchesDietary =
      selectedDietary.length === 0 || selectedDietary.some((diet) => restaurant.tags.includes(diet))

    return matchesSearch && matchesPrice && matchesCuisine && matchesDietary
  })

  const filteredDishes = featuredDishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16 pb-24 md:pt-4 md:pb-8">
        {/* Enhanced Search Header with AI Features */}
        <div className="sticky top-16 md:top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-amber-200/50 dark:border-gray-700/50">
          <div className="px-3 sm:px-4 py-3 sm:py-4">
            {/* AI-Powered Search Bar */}
            <div className="relative mb-3 sm:mb-4">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <div className="w-px h-4 bg-border hidden sm:block" />
                <Brain className="h-4 w-4 text-green-500 animate-pulse hidden sm:block" />
              </div>
              <Input
                placeholder="Search restaurants or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-20 pr-12 h-10 sm:h-12 text-sm sm:text-base rounded-xl sm:rounded-2xl border-2 border-amber-200 focus:border-amber-400"
              />
              <Button
                size="sm"
                variant={isListening ? "default" : "ghost"}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-lg sm:rounded-xl ${
                  isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""
                }`}
                onClick={handleVoiceSearch}
              >
                <Mic className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            {/* Search Tabs */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Button
                variant={activeTab === "restaurants" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("restaurants")}
                className="rounded-full text-xs sm:text-sm h-8 sm:h-9"
              >
                <Utensils className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Restaurants
              </Button>
              <Button
                variant={activeTab === "dishes" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("dishes")}
                className="rounded-full text-xs sm:text-sm h-8 sm:h-9"
              >
                <ChefHat className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Dishes
              </Button>
            </div>

            {/* AI Smart Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                    AI Suggestions
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-green-100 hover:text-green-700 transition-colors bg-green-50 text-green-600 border border-green-200 text-xs"
                      onClick={() => setSearchQuery(suggestion.replace(/"/g, ""))}
                    >
                      <Zap className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full border-amber-200 hover:border-amber-400 text-xs sm:text-sm h-8 sm:h-9"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Filters
                {(selectedCuisines.length > 0 || selectedDietary.length > 0) && (
                  <Badge className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs bg-amber-500">
                    {selectedCuisines.length + selectedDietary.length}
                  </Badge>
                )}
              </Button>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {activeTab === "restaurants" ? filteredRestaurants.length : filteredDishes.length} results
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Panel */}
        {showFilters && (
          <div className="border-b border-border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
            <div className="px-3 sm:px-4 py-4 sm:py-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    Price Range
                  </h3>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={3} min={1} step={1} className="mb-2" />
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>$ Budget</span>
                    <span>$$$ Premium</span>
                  </div>
                </div>

                {/* Cuisine Type */}
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Cuisine Type
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {cuisineFilters.map(({ name, icon: Icon }) => (
                      <div key={name} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50">
                        <Checkbox
                          id={name}
                          checked={selectedCuisines.includes(name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCuisines([...selectedCuisines, name])
                            } else {
                              setSelectedCuisines(selectedCuisines.filter((c) => c !== name))
                            }
                          }}
                        />
                        <label htmlFor={name} className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
                          <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                          {name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Preferences */}
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Dietary Preferences
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {dietaryFilters.map((diet) => (
                      <div key={diet} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50">
                        <Checkbox
                          id={diet}
                          checked={selectedDietary.includes(diet)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDietary([...selectedDietary, diet])
                            } else {
                              setSelectedDietary(selectedDietary.filter((d) => d !== diet))
                            }
                          }}
                        />
                        <label htmlFor={diet} className="text-xs sm:text-sm cursor-pointer">
                          {diet}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 sm:mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPriceRange([1, 3])
                    setSelectedCuisines([])
                    setSelectedDietary([])
                  }}
                  className="rounded-full text-xs sm:text-sm"
                >
                  Clear All
                </Button>
                <Button size="sm" onClick={() => setShowFilters(false)} className="rounded-full text-xs sm:text-sm">
                  Show Results
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Results */}
        <div className="px-3 sm:px-4 py-4 sm:py-6">
          {activeTab === "restaurants" ? (
            <div className="space-y-3 sm:space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                  <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg active:scale-[0.98]">
                    <div className="flex">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                        <Image
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-col gap-1">
                          {restaurant.tags.slice(0, 1).map((tag) => (
                            <Badge key={tag} className="bg-primary text-primary-foreground text-xs px-1 sm:px-2 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {!restaurant.isOpen && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="destructive" className="text-xs">
                              Closed
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="flex-1 p-4 sm:p-5">
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <h3 className="font-heading font-semibold text-sm sm:text-lg leading-tight">
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs sm:text-sm font-medium">{restaurant.rating}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3">{restaurant.cuisine}</p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{restaurant.deliveryTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{restaurant.distance}</span>
                          </div>
                          <div className="flex">
                            {Array.from({ length: restaurant.priceRange }).map((_, i) => (
                              <span key={i} className="text-amber-500 font-bold">
                                $
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {filteredDishes.map((dish) => (
                <Card
                  key={dish.id}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg active:scale-[0.98]"
                >
                  <div className="relative">
                    <Image
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      width={300}
                      height={120}
                      className="w-full h-24 sm:h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 rounded-full px-2 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{dish.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-5">
                    <h3 className="font-semibold text-sm sm:text-base mb-1.5">{dish.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">{dish.restaurant}</p>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{dish.prepTime}</span>
                      </div>
                      <span className="font-semibold text-sm sm:text-base text-orange-600">{dish.price} DA</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {((activeTab === "restaurants" && filteredRestaurants.length === 0) ||
            (activeTab === "dishes" && filteredDishes.length === 0)) && (
            <div className="text-center py-12">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">No {activeTab} found</h3>
              <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setPriceRange([1, 3])
                  setSelectedCuisines([])
                  setSelectedDietary([])
                }}
                className="rounded-full text-xs sm:text-sm"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
