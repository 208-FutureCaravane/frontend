"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/lib/i18n"
import {
  User,
  Heart,
  Clock,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Star,
  Edit,
  Utensils,
  Trophy,
  Gift,
  Zap,
  Crown,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  Flame,
  MapPin,
  Plus,
  Trash2,
  Camera,
  LogOut,
  Smartphone,
  Mail,
  ChefHat,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const userProfile = {
  name: "Ahmed Benali",
  email: "ahmed.benali@email.com",
  phone: "+213 555 0123",
  avatar: "/placeholder-user.jpg",
  joinDate: "January 2024",
  totalOrders: 87,
  loyaltyPoints: 2450,
  tier: "Platinum",
  nextTier: "Diamond",
  pointsToNextTier: 550,
  totalSpent: 89400,
  bio: "Food enthusiast who loves trying new cuisines and discovering hidden gems in Algiers. Pizza lover and coffee addict!",
  favoriteRestaurants: [
    { id: 1, name: "Bella Italia", cuisine: "Italian", image: "/images/restaurants/bella-italia.jpg" },
    { id: 2, name: "Spice Garden", cuisine: "Indian", image: "/images/restaurants/spice-garden.jpg" },
    { id: 3, name: "Burger Palace", cuisine: "American", image: "/images/restaurants/burger-palace.jpg" },
  ],
  recentOrders: [
    {
      id: 1,
      restaurant: "Bella Italia",
      items: ["Margherita Pizza", "Caesar Salad", "Tiramisu"],
      total: 3200,
      date: "2024-01-15",
      status: "delivered",
      pointsEarned: 32,
    },
    {
      id: 2,
      restaurant: "Sushi Zen",
      items: ["Dragon Roll", "Miso Soup"],
      total: 2800,
      date: "2024-01-14",
      status: "delivered",
      pointsEarned: 28,
    },
    {
      id: 3,
      restaurant: "Burger Palace",
      items: ["Classic Burger", "Fries", "Milkshake"],
      total: 2100,
      date: "2024-01-12",
      status: "delivered",
      pointsEarned: 21,
    },
    {
      id: 4,
      restaurant: "Taco Fiesta",
      items: ["Beef Tacos", "Guacamole"],
      total: 1600,
      date: "2024-01-10",
      status: "delivered",
      pointsEarned: 16,
    },
  ],
  preferences: {
    favoriteCuisine: "Italian",
    spiceLevel: "Medium",
    budget: "$$",
    dietaryRestrictions: [],
  },
  allergies: [],
  addresses: [
    {
      id: 1,
      label: "Home",
      address: "123 Rue Didouche Mourad, Algiers",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      address: "456 Avenue des Martyrs, Algiers",
      isDefault: false,
    },
    {
      id: 3,
      label: "University",
      address: "789 Boulevard Krim Belkacem, Algiers",
      isDefault: false,
    },
  ],
  achievements: [
    {
      id: 1,
      name: "First Order",
      description: "Completed your first order",
      icon: Trophy,
      earned: true,
      date: "2024-01-15",
    },
    { id: 2, name: "Loyal Customer", description: "Made 10 orders", icon: Heart, earned: true, date: "2024-01-20" },
    {
      id: 3,
      name: "Explorer",
      description: "Tried 5 different cuisines",
      icon: Target,
      earned: true,
      date: "2024-01-25",
    },
    { id: 4, name: "Big Spender", description: "Spent over 50,000 DA", icon: Crown, earned: true, progress: 100 },
    { id: 5, name: "Speed Demon", description: "Order 5 times in one week", icon: Zap, earned: false, progress: 80 },
    { id: 6, name: "Review Master", description: "Write 20 reviews", icon: Star, earned: false, progress: 65 },
  ],
  availableRewards: [
    { id: 1, name: "Free Delivery", cost: 200, description: "Free delivery on your next order", icon: Gift },
    { id: 2, name: "10% Off", cost: 500, description: "10% discount on orders over 2000 DA", icon: Trophy },
    {
      id: 3,
      name: "Free Appetizer",
      cost: 300,
      description: "Free appetizer at participating restaurants",
      icon: Utensils,
    },
    { id: 4, name: "Double Points", cost: 800, description: "Earn 2x points on your next 3 orders", icon: Sparkles },
  ],
}

const loyaltyTiers = [
  { name: "Bronze", minPoints: 0, color: "bg-amber-600", benefits: ["1 point per 100 DA spent"] },
  { name: "Silver", minPoints: 500, color: "bg-gray-400", benefits: ["1.2x points", "Free delivery once/month"] },
  {
    name: "Gold",
    minPoints: 1000,
    color: "bg-yellow-500",
    benefits: ["1.5x points", "Priority support", "Exclusive offers"],
  },
  {
    name: "Platinum",
    minPoints: 2000,
    color: "bg-purple-500",
    benefits: ["2x points", "VIP treatment", "Early access"],
  },
]

export default function ProfilePage() {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(userProfile)
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newRestaurants: false,
    smsNotifications: false,
    emailNotifications: true,
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic would go here
  }

  const currentTier = loyaltyTiers.find((tier) => tier.name === profile.tier)
  const nextTierIndex = loyaltyTiers.findIndex((tier) => tier.name === profile.nextTier)
  const progressToNextTier =
    ((profile.loyaltyPoints - (loyaltyTiers[nextTierIndex - 1]?.minPoints || 0)) /
      (loyaltyTiers[nextTierIndex]?.minPoints - (loyaltyTiers[nextTierIndex - 1]?.minPoints || 0))) *
    100

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 md:pb-8">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-4xl">
          {/* Enhanced Profile Header with Loyalty Status */}
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-amber-500 to-red-500 text-white border-0 shadow-xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12 sm:h-20 sm:w-20 border-4 border-white/30">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-sm sm:text-xl bg-white/20 text-white">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 ${currentTier?.color} rounded-full flex items-center justify-center border-2 border-white`}
                  >
                    <Crown className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-4 w-4 sm:h-6 sm:w-6 p-0 rounded-full bg-white/20 hover:bg-white/30"
                  >
                    <Camera className="h-2 w-2 sm:h-3 sm:w-3" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-base sm:text-xl font-heading font-bold mb-1 truncate">{profile.name}</h1>
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 flex-wrap">
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">{profile.tier} Member</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-300 text-yellow-300" />
                      <span className="text-xs sm:text-sm font-medium">{profile.loyaltyPoints} pts</span>
                    </div>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm mb-1 sm:mb-3">Member since {profile.joinDate}</p>

                  {/* Progress to Next Tier */}
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-white/80">Progress to {profile.nextTier}</span>
                      <span className="font-medium">{profile.pointsToNextTier} pts to go</span>
                    </div>
                    <Progress value={progressToNextTier} className="h-1.5 sm:h-2 bg-white/20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-3 sm:p-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{profile.totalOrders}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-3 sm:p-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-green-600">
                  {(profile.totalSpent / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-muted-foreground">DA Spent</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-3 sm:p-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">
                  {profile.achievements.filter((a) => a.earned).length}
                </p>
                <p className="text-xs text-muted-foreground">Badges</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-4 sm:mb-6 border-0 shadow-lg">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
                <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{order.restaurant}</h4>
                      <p className="text-xs text-muted-foreground">{order.items.join(", ")}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{order.total} DA</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">+{order.pointsEarned} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="personal" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-8 sm:h-10">
              <TabsTrigger value="personal" className="text-xs sm:text-sm">
                Profile
              </TabsTrigger>
              <TabsTrigger value="rewards" className="text-xs sm:text-sm">
                Rewards
              </TabsTrigger>
              <TabsTrigger value="addresses" className="text-xs sm:text-sm">
                Addresses
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal" className="space-y-3 sm:space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2 sm:pb-6">
                  <CardTitle className="flex items-center justify-between text-sm sm:text-lg">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 sm:h-5 sm:w-5" />
                      Personal Information
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      size="sm"
                      onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                      className="h-7 sm:h-8 text-xs"
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="name" className="text-xs sm:text-sm">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      className="h-8 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      className="h-8 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      className="h-8 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="bio" className="text-xs sm:text-sm">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      disabled={!isEditing}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="text-xs sm:text-sm"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
                    Food Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Favorite Cuisine</Label>
                      <Select value={profile.preferences.favoriteCuisine} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Italian">Italian</SelectItem>
                          <SelectItem value="Indian">Indian</SelectItem>
                          <SelectItem value="American">American</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                          <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Spice Level</Label>
                      <Select value={profile.preferences.spiceLevel} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mild">Mild</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hot">Hot</SelectItem>
                          <SelectItem value="Extra Hot">Extra Hot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Dietary Restrictions</Label>
                    <div className="flex flex-wrap gap-2">
                      {profile.preferences.dietaryRestrictions.map((restriction, index) => (
                        <Badge key={index} variant="secondary">
                          {restriction}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="h-6 bg-transparent">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Allergies</Label>
                    <div className="flex flex-wrap gap-2">
                      {profile.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive" className="bg-red-100 text-red-700">
                          {allergy}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="h-6 bg-transparent">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    Favorite Restaurants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    {profile.favoriteRestaurants.map((restaurant) => (
                      <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors">
                          <Image
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{restaurant.name}</h4>
                            <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
                          </div>
                          <Heart className="h-3 w-3 sm:h-4 sm:w-4 fill-red-500 text-red-500 flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rewards & Loyalty */}
            <TabsContent value="rewards" className="space-y-6">
              {/* Available Rewards */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                    Available Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.availableRewards.map((reward) => (
                      <div
                        key={reward.id}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <reward.icon className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{reward.name}</h4>
                            <p className="text-xs text-muted-foreground">{reward.description}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          disabled={profile.loyaltyPoints < reward.cost}
                          className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600"
                        >
                          {reward.cost} pts
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          achievement.earned
                            ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                              achievement.earned ? "bg-yellow-100" : "bg-gray-100"
                            }`}
                          >
                            <achievement.icon
                              className={`h-6 w-6 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`}
                            />
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>

                          {achievement.earned ? (
                            <Badge className="bg-yellow-500 text-white text-xs">
                              <Trophy className="h-3 w-3 mr-1" />
                              Earned
                            </Badge>
                          ) : (
                            <div className="space-y-1">
                              <Progress value={achievement.progress} className="h-1" />
                              <p className="text-xs text-muted-foreground">{achievement.progress}%</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Loyalty Tiers */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                    Loyalty Tiers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loyaltyTiers.map((tier, index) => (
                      <div
                        key={tier.name}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          tier.name === profile.tier
                            ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${tier.color} rounded-full flex items-center justify-center`}>
                              <Crown className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{tier.name}</h4>
                              <p className="text-xs text-muted-foreground">{tier.minPoints}+ points</p>
                            </div>
                          </div>
                          {tier.name === profile.tier && (
                            <Badge className="bg-purple-500 text-white">
                              <Flame className="h-3 w-3 mr-1" />
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1">
                          {tier.benefits.map((benefit, i) => (
                            <p key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              {benefit}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses */}
            <TabsContent value="addresses" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      Delivery Addresses
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          address.isDefault
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{address.label}</h4>
                              {address.isDefault && <Badge className="bg-blue-500 text-white text-xs">Default</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{address.address}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-4 sm:space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center justify-between text-sm sm:text-lg">
                    <div className="flex items-center gap-2">
                      <Bell className="h-3 w-3 sm:h-5 sm:w-5" />
                      Notifications
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <Label className="text-sm font-medium">Order Updates</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Get notified about order status</p>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, orderUpdates: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <Label className="text-sm font-medium">Promotions</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Receive offers and discounts</p>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, promotions: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <Label className="text-sm font-medium">New Restaurants</Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Know when new restaurants join</p>
                    </div>
                    <Switch
                      checked={notifications.newRestaurants}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newRestaurants: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <Label className="text-sm font-medium flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        SMS Notifications
                      </Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Receive SMS updates</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, smsNotifications: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <Label className="text-sm font-medium flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Email Notifications
                      </Label>
                      <p className="text-xs sm:text-sm text-muted-foreground">Receive email updates</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
                    <Shield className="h-3 w-3 sm:h-5 sm:w-5" />
                    Account & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent h-10 sm:h-11">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent h-10 sm:h-11">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent h-10 sm:h-11">
                    <Settings className="h-4 w-4 mr-2" />
                    Privacy Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-lg text-red-600">
                    <LogOut className="h-3 w-3 sm:h-5 sm:w-5" />
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent h-10 sm:h-11 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent h-10 sm:h-11 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
