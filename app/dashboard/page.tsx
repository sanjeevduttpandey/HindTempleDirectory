"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Heart,
  Star,
  Plus,
  BookOpen,
  Flame,
  Gift,
  Clock,
  MessageCircle,
  Building2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import HinduTimeWidget from "@/components/hindu-time-widget"
import { StaticHeader } from "@/components/static-header"

// Static data for dashboard
const staticUser = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  avatar: "/placeholder.svg?height=40&width=40",
  spiritualName: "Bhakti Priya",
  favoriteDeity: "Krishna",
  joinedDate: "2023-06-15",
  city: "Auckland",
  stats: {
    templesVisited: 12,
    eventsAttended: 28,
    pujasPerformed: 45,
    donationsGiven: 8,
    mantrasChanted: 1250,
    fastingDays: 24,
  },
}

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const upcomingEvents = [
    {
      id: 1,
      title: "Janmashtami Celebration",
      date: "2024-08-26",
      time: "18:00",
      temple: "Shri Krishna Mandir",
      type: "Festival",
      image: "/placeholder.svg?height=60&width=60&text=Krishna",
    },
    {
      id: 2,
      title: "Ganesha Chaturthi Puja",
      date: "2024-09-07",
      time: "10:00",
      temple: "Ganesh Temple Auckland",
      type: "Puja",
      image: "/placeholder.svg?height=60&width=60&text=Ganesha",
    },
    {
      id: 3,
      title: "Bhagavad Gita Study Circle",
      date: "2024-08-20",
      time: "19:00",
      temple: "Sanatan Dharm Mandir",
      type: "Satsang",
      image: "/placeholder.svg?height=60&width=60&text=Gita",
    },
  ]

  const recentActivity = [
    {
      type: "puja",
      description: "Performed morning Surya Namaskara",
      time: "6 hours ago",
      icon: Flame,
    },
    {
      type: "donation",
      description: "Donated to Annadaan program",
      time: "2 days ago",
      icon: Gift,
    },
    {
      type: "event",
      description: "Attended Hanuman Jayanti celebration",
      time: "1 week ago",
      icon: Calendar,
    },
    {
      type: "temple",
      description: "Visited Shiva Temple in Hamilton",
      time: "2 weeks ago",
      icon: Building2,
    },
  ]

  const recommendedTemples = [
    {
      name: "ISKCON Auckland",
      deity: "Krishna",
      distance: "5.2 km",
      rating: 4.9,
      image: "/placeholder.svg?height=80&width=80&text=ISKCON",
      speciality: "Daily Bhagavatam classes",
    },
    {
      name: "Shiva Vishnu Temple",
      deity: "Shiva & Vishnu",
      distance: "8.1 km",
      rating: 4.7,
      image: "/placeholder.svg?height=80&width=80&text=Shiva",
      speciality: "Monday Shiva Abhishek",
    },
    {
      name: "Durga Mata Mandir",
      deity: "Durga",
      distance: "12.3 km",
      rating: 4.8,
      image: "/placeholder.svg?height=80&width=80&text=Durga",
      speciality: "Navratri celebrations",
    },
  ]

  const todaysPanchang = {
    tithi: "Saptami (7th day)",
    nakshatra: "Rohini",
    yoga: "Shiva",
    karana: "Bava",
    sunrise: "06:42",
    sunset: "19:08",
    moonrise: "23:45",
    moonset: "11:30",
  }

  const spiritualQuote = {
    text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    translation: "You have the right to perform your actions, but never to the fruits of action.",
    source: "Bhagavad Gita 2.47",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                नमस्ते, {staticUser.spiritualName || staticUser.name}! 🙏
              </h1>
              <p className="text-gray-600 mt-1">
                May Lord {staticUser.favoriteDeity} bless your spiritual journey today
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Today's Tithi</div>
              <div className="font-semibold text-amber-700">{todaysPanchang.tithi}</div>
            </div>
          </div>

          {/* Spiritual Quote */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-amber-800 mb-2">{spiritualQuote.text}</p>
                <p className="text-gray-700 mb-1">{spiritualQuote.translation}</p>
                <p className="text-sm text-amber-600">— {spiritualQuote.source}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Building2 className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{staticUser.stats.templesVisited}</div>
                  <div className="text-sm text-gray-600">Temples Visited</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Flame className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{staticUser.stats.pujasPerformed}</div>
                  <div className="text-sm text-gray-600">Pujas Performed</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{staticUser.stats.mantrasChanted}</div>
                  <div className="text-sm text-gray-600">Mantras Chanted</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{staticUser.stats.eventsAttended}</div>
                  <div className="text-sm text-gray-600">Satsangs Attended</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Gift className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{staticUser.stats.donationsGiven}</div>
                  <div className="text-sm text-gray-600">Daan Given</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{staticUser.stats.fastingDays}</div>
                  <div className="text-sm text-gray-600">Vrat Days</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Spiritual Actions</CardTitle>
                <CardDescription>Continue your devotional journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col bg-orange-600 hover:bg-orange-700" asChild>
                    <Link href="/events/create">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">Create Satsang</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/temples">
                      <Building2 className="h-6 w-6 mb-2" />
                      <span className="text-sm">Find Mandirs</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/community">
                      <MessageCircle className="h-6 w-6 mb-2" />
                      <span className="text-sm">Join Discussions</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/donate">
                      <Gift className="h-6 w-6 mb-2" />
                      <span className="text-sm">Give Daan</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Upcoming Spiritual Events</span>
                  <Link href="/events" className="text-sm text-orange-600 hover:underline">
                    View all
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.temple}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/events/${event.id}`}>Join</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommended Temples */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Mandirs Near You</CardTitle>
                <CardDescription>Based on your devotional preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedTemples.map((temple, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <Image
                      src={temple.image || "/placeholder.svg"}
                      alt={temple.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{temple.name}</h4>
                      <p className="text-sm text-gray-600">Dedicated to {temple.deity}</p>
                      <p className="text-sm text-amber-600">{temple.speciality}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {temple.distance}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          {temple.rating}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Visit
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hindu Time Widget */}
            <div className="max-w-sm">
              <HinduTimeWidget />
            </div>

            {/* Today's Panchang */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Panchang</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tithi:</span>
                  <span className="font-medium">{todaysPanchang.tithi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nakshatra:</span>
                  <span className="font-medium">{todaysPanchang.nakshatra}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yoga:</span>
                  <span className="font-medium">{todaysPanchang.yoga}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Karana:</span>
                  <span className="font-medium">{todaysPanchang.karana}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sunrise:</span>
                    <span>{todaysPanchang.sunrise}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sunset:</span>
                    <span>{todaysPanchang.sunset}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Spiritual Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <activity.icon className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Mantra */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg text-amber-800">Daily Mantra</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-lg font-semibold text-amber-900 mb-2">ॐ गं गणपतये नमः</p>
                  <p className="text-sm text-amber-700">Om Gam Ganapataye Namaha</p>
                  <p className="text-xs text-amber-600 mt-2">Chant for removing obstacles</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
