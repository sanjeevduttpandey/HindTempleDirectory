"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  Loader2,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface EventDetail {
  id: number
  title: string
  description: string
  full_description?: string
  event_type: string
  start_date: string
  end_date?: string
  start_time?: string
  end_time?: string
  location: string
  address?: string
  city: string
  organizer_name?: string
  organizer_email?: string
  organizer_phone?: string
  organizer_website?: string
  max_participants?: number
  current_participants?: number
  registration_fee?: number
  is_free: boolean
  image_url?: string
  image_urls?: string[]
  requirements?: string
  features?: string[]
  is_featured?: boolean
  temple_name?: string // From join
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = Number.parseInt(params.id as string)
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/events/${eventId}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError("Event not found or not yet approved.")
          } else {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
        }
        const data = await response.json()
        if (data.success) {
          setEvent(data.event)
        } else {
          setError(data.error || "Failed to fetch event details.")
        }
      } catch (e: any) {
        console.error("Error fetching event:", e)
        setError("Failed to load event details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (eventId) {
      fetchEvent()
    }
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        <p className="ml-2 text-gray-600">Loading event details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/events">Browse Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/events">Browse Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Formats date to New Zealand locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const displayPrice = event.is_free ? "Free" : `NZD $${event.registration_fee?.toFixed(2)}`
  const displayAttendees = event.max_participants
    ? `${event.current_participants || 0}/${event.max_participants} attending`
    : `${event.current_participants || 0} attending`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/events" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Event Details</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Event Image */}
            <div className="space-y-4">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={event.image_url || event.image_urls?.[0] || "/placeholder.svg?height=400&width=800&query=event"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                {event.is_featured && <Badge className="absolute top-4 left-4 bg-orange-600">Featured Event</Badge>}
                <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">{event.event_type}</Badge>
              </div>
              {event.image_urls && event.image_urls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {event.image_urls.map((url, index) => (
                    <div key={index} className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`${event.title} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Event Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">
                      {formatDate(event.start_date)}
                      {event.end_date && event.start_date !== event.end_date && ` - ${formatDate(event.end_date)}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">
                      {event.start_time} {event.end_time ? `- ${event.end_time}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">
                      {event.location}, {event.city}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">{displayAttendees}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Registration */}
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Registration</h3>
                      <p className="text-sm text-gray-600">Secure your spot at this event</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{displayPrice}</div>
                      {!event.is_free && <div className="text-sm text-gray-500">per person</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                      <Link href={`/events/${event.id}/register`}>Register Now</Link>
                    </Button>
                    {event.address && (
                      <Button variant="outline" asChild>
                        <Link href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`} target="_blank">
                          Get Directions
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Event */}
              {event.full_description && (
                <Card>
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      {event.full_description.split("\n").map((paragraph, index) => (
                        <p key={index} className="text-gray-600 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Schedule (Placeholder - assuming schedule data would be part of full_description or a separate field) */}
              {/* {event.schedule && (
                <Card>
                  <CardHeader>
                    <CardTitle>Event Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.schedule.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-orange-600 min-w-[80px]">{item.time}</div>
                          <div className="text-sm text-gray-700">{item.activity}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )} */}

              {/* Requirements */}
              {event.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>What to Know</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {event.requirements.split("\n").map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
                          <span className="text-sm text-gray-600">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Features */}
              {event.features && event.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Event Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {event.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizer Info */}
              {(event.organizer_name || event.organizer_email || event.organizer_phone || event.organizer_website) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Event Organizer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {event.organizer_name && (
                      <div>
                        <h4 className="font-medium text-gray-900">{event.organizer_name}</h4>
                        <p className="text-sm text-gray-600">Community Organization</p>
                      </div>
                    )}

                    <div className="space-y-3">
                      {event.organizer_phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <a href={`tel:${event.organizer_phone}`} className="text-sm text-orange-600 hover:underline">
                            {event.organizer_phone}
                          </a>
                        </div>
                      )}
                      {event.organizer_email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <a
                            href={`mailto:${event.organizer_email}`}
                            className="text-sm text-orange-600 hover:underline"
                          >
                            {event.organizer_email}
                          </a>
                        </div>
                      )}
                      {event.organizer_website && (
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a
                            href={event.organizer_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-orange-600 hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.location}</h4>
                    {event.address && <p className="text-sm text-gray-600">{event.address}</p>}
                  </div>
                  {event.address && (
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`} target="_blank">
                        <MapPin className="mr-2 h-4 w-4" />
                        View on Map
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Share Event */}
              <Card>
                <CardHeader>
                  <CardTitle>Share This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share on Social Media
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="mr-2 h-4 w-4" />
                      Email to Friends
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
