"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, Search, Filter, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const events = [
  {
    id: 1,
    title: "Diwali Celebration 2024",
    date: "2024-11-12",
    time: "6:00 PM - 10:00 PM",
    location: "Auckland Town Hall",
    city: "Auckland",
    organizer: "Auckland Hindu Society",
    attendees: 450,
    maxAttendees: 500,
    price: "Free",
    category: "Festival",
    description:
      "Join us for the grandest Diwali celebration in Auckland with cultural performances, traditional food, and fireworks.",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "Hanuman Jayanti Celebration",
    date: "2024-11-15",
    time: "7:00 AM - 12:00 PM",
    location: "Wellington Hindu Temple",
    city: "Wellington",
    organizer: "Wellington Hindu Temple",
    attendees: 120,
    maxAttendees: 200,
    price: "Free",
    category: "Religious",
    description: "Special puja and bhajan session to celebrate the birth of Lord Hanuman.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Bhagavad Gita Study Circle",
    date: "2024-11-18",
    time: "2:00 PM - 4:00 PM",
    location: "Christchurch Community Center",
    city: "Christchurch",
    organizer: "Christchurch Hindu Mandir",
    attendees: 25,
    maxAttendees: 40,
    price: "Free",
    category: "Educational",
    description: "Weekly study session exploring the teachings of the Bhagavad Gita with discussion and Q&A.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Classical Indian Dance Workshop",
    date: "2024-11-20",
    time: "10:00 AM - 3:00 PM",
    location: "Hamilton Arts Centre",
    city: "Hamilton",
    organizer: "Natya Kala Academy",
    attendees: 15,
    maxAttendees: 30,
    price: "$25",
    category: "Cultural",
    description: "Learn the basics of Bharatanatyam dance with professional instructor Priya Nair.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Yoga and Meditation Retreat",
    date: "2024-11-25",
    time: "9:00 AM - 5:00 PM",
    location: "Tauranga Wellness Center",
    city: "Tauranga",
    organizer: "Yoga Dharma NZ",
    attendees: 35,
    maxAttendees: 50,
    price: "$75",
    category: "Wellness",
    description: "Day-long retreat focusing on traditional yoga practices and meditation techniques.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Karthik Purnima Celebration",
    date: "2024-11-27",
    time: "6:30 PM - 9:00 PM",
    location: "Dunedin Hindu Temple",
    city: "Dunedin",
    organizer: "Dunedin Hindu Temple",
    attendees: 80,
    maxAttendees: 120,
    price: "Free",
    category: "Religious",
    description: "Special evening prayers and cultural program to celebrate Karthik Purnima.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const cities = ["all", ...Array.from(new Set(events.map((event) => event.city)))]
  const categories = ["all", ...Array.from(new Set(events.map((event) => event.category)))]

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCity = selectedCity === "all" || event.city === selectedCity
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
      return matchesSearch && matchesCity && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "popularity":
          return b.attendees - a.attendees
        case "city":
          return a.city.localeCompare(b.city)
        default:
          return a.title.localeCompare(b.title)
      }
    })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕉</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
                <p className="text-sm text-gray-600">Community Events</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium">
                Home
              </Link>
              <Link href="/temples" className="text-gray-700 hover:text-orange-600 font-medium">
                Temples
              </Link>
              <Link href="/events" className="text-orange-600 font-medium">
                Events
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-orange-600 font-medium">
                Community
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Community Events</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover and join Hindu cultural events, festivals, and gatherings across New Zealand
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <Button className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                <Link href="/events/create">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Event
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city === "all" ? "All Cities" : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="title">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredEvents.length} Event{filteredEvents.length !== 1 ? "s" : ""} Found
            </h3>
            <p className="text-gray-600">
              {selectedCity !== "all" ? `in ${selectedCity}` : "across New Zealand"}
              {selectedCategory !== "all" ? ` • ${selectedCategory}` : ""}
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  {event.featured && <Badge className="absolute top-4 left-4 bg-orange-600">Featured</Badge>}
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">{event.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(event.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>
                        {event.location}, {event.city}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">by {event.organizer}</span>
                    </div>
                    <div className="text-lg font-semibold text-orange-600">{event.price}</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                      <Link href={`/events/${event.id}/register`}>Register</Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href={`/events/${event.id}`}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all events.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCity("all")
                  setSelectedCategory("all")
                }}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Create Event CTA */}
      <section className="py-12 px-4 bg-orange-50">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Organizing an event?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Share your Hindu cultural events, festivals, or community gatherings with the wider community. Help bring
            people together through shared celebrations and learning.
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700" asChild>
            <Link href="/events/create">
              <Plus className="mr-2 h-5 w-5" />
              Create Event
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
