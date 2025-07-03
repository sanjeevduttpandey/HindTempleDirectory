"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, Heart, Share2, ArrowLeft, Phone, Mail, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Mock event data - in a real app, this would come from an API
// Dates are assumed to be in NZ local time for simplicity of this mock.
const eventData = {
  1: {
    id: 1,
    title: "Diwali Celebration 2024",
    date: "2024-11-12",
    time: "6:00 PM - 10:00 PM",
    location: "Auckland Town Hall",
    address: "301-305 Queen Street, Auckland Central, Auckland 1010",
    city: "Auckland",
    organizer: "Auckland Sanatan Society",
    organizerPhone: "+64 9 123 4567",
    organizerEmail: "events@aucklandsanatan.org.nz",
    organizerWebsite: "https://www.aucklandsanatan.org.nz",
    attendees: 450,
    maxAttendees: 500,
    price: "Free",
    category: "Festival",
    description:
      "Join us for the grandest Diwali celebration in Auckland with cultural performances, traditional food, and fireworks. This year's celebration promises to be bigger and better than ever, featuring renowned artists, authentic Indian cuisine, and spectacular fireworks display.",
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
    fullDescription: `
      Celebrate the Festival of Lights with the Auckland Sanatan community in this grand Diwali celebration. This year's event will feature:
      
      • Traditional Diwali prayers and ceremonies
      • Cultural performances including classical dance and music
      • Authentic Indian food stalls and sweets
      • Children's activities and games
      • Spectacular fireworks display
      • Community market with traditional items
      
      The event is family-friendly and welcomes people of all backgrounds to experience the joy and warmth of Diwali. Come dressed in your finest traditional attire and join us in celebrating the victory of light over darkness.
    `,
    schedule: [
      { time: "6:00 PM", activity: "Registration and Welcome" },
      { time: "6:30 PM", activity: "Traditional Diwali Prayers" },
      { time: "7:00 PM", activity: "Cultural Performances Begin" },
      { time: "8:00 PM", activity: "Dinner Service" },
      { time: "9:00 PM", activity: "Community Activities" },
      { time: "9:45 PM", activity: "Fireworks Display" },
    ],
    requirements: [
      "No registration required - open to all",
      "Family-friendly event",
      "Traditional attire encouraged",
      "Parking available nearby",
      "Food will be provided",
    ],
  },
  2: {
    id: 2,
    title: "Hanuman Jayanti Celebration",
    date: "2024-11-15",
    time: "7:00 AM - 12:00 PM",
    location: "Wellington Sanatan Mandir",
    address: "23 Hanson Street, Newtown, Wellington 6021",
    city: "Wellington",
    organizer: "Wellington Sanatan Mandir",
    organizerPhone: "+64 4 389 4397",
    organizerEmail: "info@wellingtonsanatan.org.nz",
    attendees: 120,
    maxAttendees: 200,
    price: "Free",
    category: "Religious",
    description:
      "Special puja and bhajan session to celebrate the birth of Lord Hanuman with traditional ceremonies and community gathering.",
    image: "/placeholder.svg?height=400&width=800",
    fullDescription: `
      Join us for a sacred celebration of Hanuman Jayanti, commemorating the birth of Lord Hanuman. This spiritual gathering will include:
      
      • Special Hanuman Chalisa recitation
      • Traditional puja ceremonies
      • Devotional bhajan singing
      • Prasadam distribution
      • Community prayers and blessings
      
      Lord Hanuman is revered for his strength, devotion, and protection. This celebration is an opportunity for the community to come together in prayer and devotion.
    `,
    schedule: [
      { time: "7:00 AM", activity: "Morning Prayers" },
      { time: "8:00 AM", activity: "Hanuman Chalisa Recitation" },
      { time: "9:00 AM", activity: "Special Puja Ceremony" },
      { time: "10:30 AM", activity: "Bhajan Session" },
      { time: "11:30 AM", activity: "Prasadam Distribution" },
      { time: "12:00 PM", activity: "Closing Prayers" },
    ],
    requirements: [
      "Open to all devotees",
      "Please arrive on time for prayers",
      "Modest dress code requested",
      "Prasadam will be provided",
    ],
  },
  3: {
    id: 3,
    title: "Bhagavad Gita Study Circle",
    date: "2024-11-18",
    time: "2:00 PM - 4:00 PM",
    location: "Christchurch Community Center",
    address: "20 Ombersley Terrace, Opawa, Christchurch 8023",
    city: "Christchurch",
    organizer: "Christchurch Sanatan Mandir Society",
    organizerPhone: "+64 3 332 1952",
    organizerEmail: "study@christchurchsanatan.org.nz",
    attendees: 25,
    maxAttendees: 40,
    price: "Free",
    category: "Educational",
    description: "Weekly study session exploring the teachings of the Bhagavad Gita with discussion and Q&A.",
    image: "/placeholder.svg?height=400&width=800",
    fullDescription: `
      Join our weekly Bhagavad Gita study circle where we explore the timeless wisdom of this sacred text. Each session includes:
      
      • Verse-by-verse study and commentary
      • Group discussions and interpretations
      • Practical applications in daily life
      • Q&A sessions with experienced teachers
      • Take-home study materials
      
      This study circle is suitable for beginners and advanced students alike. All are welcome regardless of background or experience with Sanatan scriptures.
    `,
    schedule: [
      { time: "2:00 PM", activity: "Welcome and Opening Prayer" },
      { time: "2:15 PM", activity: "Verse Study and Commentary" },
      { time: "3:00 PM", activity: "Group Discussion" },
      { time: "3:30 PM", activity: "Q&A Session" },
      { time: "3:50 PM", activity: "Closing and Next Week Preview" },
    ],
    requirements: [
      "No prior knowledge required",
      "Bring a notebook for taking notes",
      "Study materials provided",
      "Regular attendance encouraged",
    ],
  },
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = Number.parseInt(params.id as string)
  const event = eventData[eventId as keyof typeof eventData]

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
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                {event.featured && <Badge className="absolute top-4 left-4 bg-orange-600">Featured Event</Badge>}
                <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">{event.category}</Badge>
              </div>
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
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">
                      {event.location}, {event.city}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">
                      {event.attendees}/{event.maxAttendees} attending
                    </span>
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
                      <div className="text-2xl font-bold text-orange-600">{event.price}</div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                      <Link href={`/events/${event.id}/register`}>Register Now</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`} target="_blank">
                        Get Directions
                      </Link>
                    </Button>
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
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    {event.fullDescription?.split("\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-600 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              {event.schedule && (
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
              )}

              {/* Requirements */}
              {event.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>What to Know</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {event.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
                          <span className="text-sm text-gray-600">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organizer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Organizer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.organizer}</h4>
                    <p className="text-sm text-gray-600">Community Organization</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a href={`tel:${event.organizerPhone}`} className="text-sm text-orange-600 hover:underline">
                        {event.organizerPhone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a href={`mailto:${event.organizerEmail}`} className="text-sm text-orange-600 hover:underline">
                        {event.organizerEmail}
                      </a>
                    </div>
                    {event.organizerWebsite && (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <a
                          href={event.organizerWebsite}
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

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.location}</h4>
                    <p className="text-sm text-gray-600">{event.address}</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`} target="_blank">
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Map
                    </Link>
                  </Button>
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
