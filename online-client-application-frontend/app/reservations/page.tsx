"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  QrCode,
  Phone,
  Edit,
  Trash2,
  Plus,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns"

const upcomingReservations = [
  {
    id: "RES-2024-001",
    restaurant: {
      name: "Bella Italia",
      address: "456 Restaurant Street, Algiers",
      phone: "+213 555 0123",
      image: "/images/restaurants/bella-italia.jpg",
    },
    date: "2024-01-20",
    time: "19:30",
    guests: 4,
    tablePreference: "Window seat",
    status: "confirmed",
    qrCode: "QR123456789",
    specialRequests: "Birthday celebration",
  },
  {
    id: "RES-2024-002",
    restaurant: {
      name: "Spice Garden",
      address: "789 Spice Avenue, Algiers",
      phone: "+213 555 0456",
      image: "/images/restaurants/spice-garden.jpg",
    },
    date: "2024-01-25",
    time: "20:00",
    guests: 2,
    tablePreference: "Quiet corner",
    status: "pending",
    qrCode: "QR987654321",
    specialRequests: "",
  },
  {
    id: "RES-2024-003",
    restaurant: {
      name: "Burger Palace",
      address: "123 Burger Street, Algiers",
      phone: "+213 555 0789",
      image: "/images/restaurants/burger-palace.jpg",
    },
    date: "2024-01-28",
    time: "18:30",
    guests: 3,
    tablePreference: "Standard",
    status: "confirmed",
    qrCode: "QR456789123",
    specialRequests: "High chair needed",
  },
]

const pastReservations = [
  {
    id: "RES-2024-004",
    restaurant: {
      name: "Burger Palace",
      address: "123 Burger Street, Algiers",
      phone: "+213 555 0789",
      image: "/images/restaurants/burger-palace.jpg",
    },
    date: "2024-01-10",
    time: "18:00",
    guests: 3,
    status: "completed",
    rating: 5,
  },
]

export default function ReservationsPage() {
  const [selectedTab, setSelectedTab] = useState("upcoming")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getReservationsForDate = (date: Date) => {
    return upcomingReservations.filter((reservation) => isSameDay(new Date(reservation.date), date))
  }

  const hasReservations = (date: Date) => {
    return getReservationsForDate(date).length > 0
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const CalendarView = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return (
      <div className="space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day) => {
            const dayReservations = getReservationsForDate(day)
            const isSelected = selectedDate && isSameDay(day, selectedDate)

            return (
              <div
                key={day.toISOString()}
                className={`min-h-[80px] p-2 border rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : hasReservations(day)
                      ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20 hover:border-orange-300"
                      : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="text-sm font-medium mb-1">{format(day, "d")}</div>
                <div className="space-y-1">
                  {dayReservations.slice(0, 2).map((reservation) => (
                    <div key={reservation.id} className="text-xs p-1 rounded bg-primary/20 text-primary truncate">
                      {reservation.time} - {reservation.restaurant.name}
                    </div>
                  ))}
                  {dayReservations.length > 2 && (
                    <div className="text-xs text-muted-foreground">+{dayReservations.length - 2} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Reservations for {format(selectedDate, "EEEE, MMMM d, yyyy")}</h4>
              {getReservationsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getReservationsForDate(selectedDate).map((reservation) => (
                    <div key={reservation.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Image
                        src={reservation.restaurant.image || "/placeholder.svg"}
                        alt={reservation.restaurant.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium">{reservation.restaurant.name}</h5>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{reservation.time}</span>
                          <span>{reservation.guests} guests</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No reservations for this date</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-2xl font-heading font-bold">My Reservations</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-7 px-2"
                >
                  <List className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                  <span className="hidden sm:inline">List</span>
                </Button>
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className="h-7 px-2"
                >
                  <Grid className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Calendar</span>
                </Button>
              </div>
              <Link href="/reservations/new">
                <Button size="sm">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">New Reservation</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </Link>
            </div>
          </div>

          {viewMode === "calendar" ? (
            <CalendarView />
          ) : (
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 h-8 sm:h-10">
                <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
                  Upcoming ({upcomingReservations.length})
                </TabsTrigger>
                <TabsTrigger value="past" className="text-xs sm:text-sm">
                  Past ({pastReservations.length})
                </TabsTrigger>
              </TabsList>

              {/* Upcoming Reservations */}
              <TabsContent value="upcoming">
                {upcomingReservations.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {upcomingReservations.map((reservation) => (
                      <Card key={reservation.id} className="overflow-hidden">
                        <CardContent className="p-3 sm:p-6">
                          <div className="flex gap-2 sm:gap-4">
                            <Image
                              src={reservation.restaurant.image || "/placeholder.svg"}
                              alt={reservation.restaurant.name}
                              width={80}
                              height={80}
                              className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2 sm:mb-3">
                                <div>
                                  <h3 className="text-base sm:text-xl font-heading font-semibold mb-1">
                                    {reservation.restaurant.name}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                                    Reservation #{reservation.id}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(reservation.status)}>
                                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                                <div className="space-y-1 sm:space-y-2">
                                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                                    <span>{formatDate(reservation.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                                    <span>{reservation.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                                    <span>{reservation.guests} guests</span>
                                  </div>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                                    <span className="truncate">{reservation.restaurant.address}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                                    <span>{reservation.restaurant.phone}</span>
                                  </div>
                                  {reservation.tablePreference && (
                                    <div className="text-xs sm:text-sm">
                                      <span className="font-medium">Table:</span> {reservation.tablePreference}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {reservation.specialRequests && (
                                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-muted/30 rounded-lg">
                                  <p className="text-xs sm:text-sm">
                                    <span className="font-medium">Special requests:</span> {reservation.specialRequests}
                                  </p>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2 sm:gap-3">
                                <Link href={`/reservations/${reservation.id}/qr`}>
                                  <Button size="sm" className="text-xs sm:text-sm h-7 sm:h-8">
                                    <QrCode className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                    <span className="hidden sm:inline">Show QR Code</span>
                                    <span className="sm:hidden">QR</span>
                                  </Button>
                                </Link>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-transparent text-xs sm:text-sm h-7 sm:h-8"
                                >
                                  <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="hidden sm:inline">Modify</span>
                                  <span className="sm:hidden">Edit</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-transparent text-xs sm:text-sm h-7 sm:h-8"
                                >
                                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="hidden sm:inline">Call Restaurant</span>
                                  <span className="sm:hidden">Call</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-destructive hover:text-destructive bg-transparent text-xs sm:text-sm h-7 sm:h-8"
                                >
                                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="hidden sm:inline">Cancel</span>
                                  <span className="sm:hidden">Cancel</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-muted rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">No upcoming reservations</h3>
                    <p className="text-muted-foreground mb-4 sm:mb-6 text-sm">
                      Book a table at your favorite restaurant
                    </p>
                    <Link href="/reservations/new">
                      <Button>Make a Reservation</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              {/* Past Reservations */}
              <TabsContent value="past">
                <div className="space-y-3 sm:space-y-4">
                  {pastReservations.map((reservation) => (
                    <Card key={reservation.id}>
                      <CardContent className="p-3 sm:p-6">
                        <div className="flex gap-2 sm:gap-4">
                          <Image
                            src={reservation.restaurant.image || "/placeholder.svg"}
                            alt={reservation.restaurant.name}
                            width={60}
                            height={60}
                            className="w-12 h-12 sm:w-20 sm:h-20 object-cover rounded-lg"
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-sm sm:text-base">{reservation.restaurant.name}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  Reservation #{reservation.id}
                                </p>
                              </div>
                              <Badge variant="secondary">Completed</Badge>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                              <span>{formatDate(reservation.date)}</span>
                              <span>{reservation.time}</span>
                              <span>{reservation.guests} guests</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-xs sm:text-sm text-muted-foreground">
                                <p className="truncate">{reservation.restaurant.address}</p>
                              </div>
                              <div className="flex gap-1 sm:gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-transparent text-xs sm:text-sm h-7 sm:h-8"
                                >
                                  Book Again
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-transparent text-xs sm:text-sm h-7 sm:h-8"
                                >
                                  Rate Experience
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}
