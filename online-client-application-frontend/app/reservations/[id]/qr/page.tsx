"use client"

import { useState } from "react"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share, Calendar, Clock, Users, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const reservationDetails = {
  id: "RES-2024-001",
  restaurant: {
    name: "Bella Italia",
    address: "456 Restaurant Street, Algiers",
    phone: "+213 555 0123",
    image: "/italian-restaurant-food.png",
  },
  date: "2024-01-20",
  time: "19:30",
  guests: 4,
  tablePreference: "Window seat",
  status: "confirmed",
  qrCode: "QR123456789",
  specialRequests: "Birthday celebration",
}

export default function ReservationQRPage({ params }: { params: { id: string } }) {
  const [reservation] = useState(reservationDetails)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDownload = () => {
    // Generate and download QR code
    console.log("Downloading QR code...")
  }

  const handleShare = () => {
    // Share reservation details
    if (navigator.share) {
      navigator.share({
        title: `Reservation at ${reservation.restaurant.name}`,
        text: `My reservation for ${reservation.guests} guests on ${formatDate(reservation.date)} at ${reservation.time}`,
        url: window.location.href,
      })
    }
  }

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
                Back to Reservations
              </Button>
            </Link>
            <h1 className="text-2xl font-heading font-bold">Reservation QR Code</h1>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            {/* QR Code Card */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Show this QR code at the restaurant</CardTitle>
                <p className="text-sm text-muted-foreground">Present this code to your server for quick check-in</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code Placeholder */}
                <div className="w-64 h-64 mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 bg-black mx-auto mb-2 rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-1 p-4">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-white" : "bg-black"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">QR Code: {reservation.qrCode}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="flex-1 bg-transparent">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reservation Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Reservation Details</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Image
                    src={reservation.restaurant.image || "/placeholder.svg"}
                    alt={reservation.restaurant.name}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{reservation.restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground">#{reservation.id}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(reservation.date)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.restaurant.phone}</span>
                  </div>
                </div>

                {reservation.tablePreference && (
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Table preference:</span> {reservation.tablePreference}
                    </p>
                  </div>
                )}

                {reservation.specialRequests && (
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Special requests:</span> {reservation.specialRequests}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Important Notes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Please arrive 10 minutes before your reservation time</li>
                  <li>• Show this QR code to the host upon arrival</li>
                  <li>• Contact the restaurant if you need to modify your reservation</li>
                  <li>• Cancellations must be made at least 2 hours in advance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
