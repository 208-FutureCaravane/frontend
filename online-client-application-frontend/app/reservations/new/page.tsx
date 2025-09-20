"use client"

import type React from "react"

import { useState } from "react"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarIcon, Clock, Users, MapPin, Search } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

const restaurants = [
  {
    id: 1,
    name: "Bella Italia",
    cuisine: "Italian",
    address: "456 Restaurant Street, Algiers",
    phone: "+213 555 0123",
    image: "/italian-restaurant-food.png",
    rating: 4.8,
    priceRange: "$$",
    availableTimes: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
    tableTypes: ["Standard", "Window seat", "Private booth", "Outdoor terrace"],
  },
  {
    id: 2,
    name: "Spice Garden",
    cuisine: "Indian",
    address: "789 Spice Avenue, Algiers",
    phone: "+213 555 0456",
    image: "/indian-restaurant-curry.jpg",
    rating: 4.6,
    priceRange: "$$",
    availableTimes: ["17:30", "18:00", "19:00", "19:30", "20:00", "20:30"],
    tableTypes: ["Standard", "Quiet corner", "Family table"],
  },
]

export default function NewReservationPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<(typeof restaurants)[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [guestCount, setGuestCount] = useState("2")
  const [tablePreference, setTablePreference] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRestaurantSelect = (restaurant: (typeof restaurants)[0]) => {
    setSelectedRestaurant(restaurant)
    setSelectedTime("")
    setTablePreference("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle reservation submission
    console.log({
      restaurant: selectedRestaurant?.id,
      date: selectedDate,
      time: selectedTime,
      guests: guestCount,
      tablePreference,
      specialRequests,
    })
  }

  const isFormValid = selectedRestaurant && selectedDate && selectedTime && guestCount

  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />

      <main className="md:ml-64 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/reservations">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-heading font-bold">Make a Reservation</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Restaurant Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Select Restaurant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search restaurants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {filteredRestaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedRestaurant?.id === restaurant.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleRestaurantSelect(restaurant)}
                      >
                        <div className="flex gap-3">
                          <Image
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            width={60}
                            height={60}
                            className="w-15 h-15 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{restaurant.name}</h3>
                            <p className="text-sm text-muted-foreground mb-1">{restaurant.cuisine}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>★ {restaurant.rating}</span>
                              <span>•</span>
                              <span>{restaurant.priceRange}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reservation Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Reservation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
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
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "guest" : "guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Selection */}
                  {selectedRestaurant && (
                    <div className="space-y-2">
                      <Label>Available Times</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedRestaurant.availableTimes.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={selectedTime !== time ? "bg-transparent" : ""}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Table Preference */}
                  {selectedRestaurant && (
                    <div className="space-y-2">
                      <Label>Table Preference (Optional)</Label>
                      <Select value={tablePreference} onValueChange={setTablePreference}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select table preference" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedRestaurant.tableTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label>Special Requests (Optional)</Label>
                    <Textarea
                      placeholder="Birthday celebration, dietary restrictions, etc."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reservation Summary */}
            {selectedRestaurant && selectedDate && selectedTime && (
              <Card>
                <CardHeader>
                  <CardTitle>Reservation Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{selectedRestaurant.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{guestCount} guests</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{selectedRestaurant.address}</p>
                      {tablePreference && (
                        <div>
                          <span className="text-sm font-medium">Table: </span>
                          <Badge variant="secondary">{tablePreference}</Badge>
                        </div>
                      )}
                      {specialRequests && (
                        <div>
                          <span className="text-sm font-medium">Special requests: </span>
                          <span className="text-sm text-muted-foreground">{specialRequests}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={!isFormValid}>
                Confirm Reservation
              </Button>
            </div>
          </form>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
