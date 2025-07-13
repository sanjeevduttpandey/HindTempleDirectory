"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Loader2, PlusCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Event {
  id: number
  title: string
  description: string
  event_type: string
  start_date: string
  end_date?: string
  start_time?: string
  end_time?: string
  location: string
  city: string
  image_url?: string
  image_urls?: string[]
  is_featured?: boolean
  registration_fee?: number
  is_free: boolean
  current_participants?: number
  max_participants?: number
  temple_name?: string
  features?: string[] // Added features field
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/events")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.success) {
          setEvents(data.events)
        } else {
          setError(data.error || "Failed to fetch events.")
        }
      } catch (e: any) {
        console.error("Error fetching events:", e)
        setError("Failed to load events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕉</span>
              </div>
              {/* Link to homepage */}
              <Link href="/" className="text-gray-900 hover:text-orange-600 transition-colors">
                <div>
                  <h1 className="text-xl font-bold">Sanatan New Zealand</h1>
                  <p className="text-sm text-gray-600">Community Events</p>
                </div>
              </Link>
            </div>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/events/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Event
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
          <p className="text-gray-600">Discover and participate in Sanatan community gatherings across New Zealand.</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <p className="ml-2 text-gray-600">Loading events...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 py-8">
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500 mb-6">Check back soon or create your own event!</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/events/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create First Event
              </Link>
            </Button>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/events/${event.id}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={
                        event.image_url || event.image_urls?.[0] || "/placeholder.svg?height=200&width=400&query=event"
                      }
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {event.is_featured && <Badge className="absolute top-3 left-3 bg-orange-600">Featured</Badge>}
                    <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900">{event.event_type}</Badge>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{event.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-3">
                      {event.description}
                    </CardDescription>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          {formatDate(event.start_date)}
                          {event.end_date && event.start_date !== event.end_date && ` - ${formatDate(event.end_date)}`}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          {event.start_time} {event.end_time ? `- ${event.end_time}` : ""}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          {event.location}, {event.city}
                        </span>
                      </div>
                      {event.features && event.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t mt-3">
                      <span className="text-base font-bold text-orange-600">
                        {event.is_free ? "Free" : `NZD $${event.registration_fee?.toFixed(2)}`}
                      </span>
                      {event.max_participants && (
                        <span className="text-sm text-gray-500">
                          {event.current_participants || 0}/{event.max_participants} attending
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
