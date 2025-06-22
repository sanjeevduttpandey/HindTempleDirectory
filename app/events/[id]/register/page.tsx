"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Clock, Users, CheckCircle, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock event data - in a real app, this would come from an API
const eventData = {
  1: {
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
    priceAmount: 0,
    category: "Festival",
    description:
      "Join us for the grandest Diwali celebration in Auckland with cultural performances, traditional food, and fireworks.",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  2: {
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
    priceAmount: 0,
    category: "Religious",
    description: "Special puja and bhajan session to celebrate the birth of Lord Hanuman.",
    image: "/placeholder.svg?height=200&width=400",
  },
  3: {
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
    priceAmount: 0,
    category: "Educational",
    description: "Weekly study session exploring the teachings of the Bhagavad Gita with discussion and Q&A.",
    image: "/placeholder.svg?height=200&width=400",
  },
  4: {
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
    priceAmount: 25,
    category: "Cultural",
    description: "Learn the basics of Bharatanatyam dance with professional instructor Priya Nair.",
    image: "/placeholder.svg?height=200&width=400",
  },
  5: {
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
    priceAmount: 75,
    category: "Wellness",
    description: "Day-long retreat focusing on traditional yoga practices and meditation techniques.",
    image: "/placeholder.svg?height=200&width=400",
  },
}

export default function EventRegistrationPage() {
  const params = useParams()
  const eventId = Number.parseInt(params.id as string)
  const event = eventData[eventId as keyof typeof eventData]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    attendees: "1",
    dietaryRequirements: "",
    emergencyContact: "",
    agreeToTerms: false,
    subscribeUpdates: true,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // If it's a paid event, redirect to payment
    if (event && event.priceAmount > 0) {
      const totalAmount = event.priceAmount * Number.parseInt(formData.attendees)
      const params = new URLSearchParams({
        type: "event",
        eventId: event.id.toString(),
        amount: totalAmount.toString(),
        attendees: formData.attendees,
        ...formData,
      })

      window.location.href = `/payment/process?${params.toString()}`
      return
    }

    // For free events, just show success
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
            <p className="text-gray-600 mb-6">The event you're trying to register for doesn't exist.</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/events">Browse Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              You've successfully registered for {event.title}. You'll receive a confirmation email shortly with event
              details.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/events">Browse More Events</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/events/${event.id}`}>View Event Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-NZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const totalAmount = event.priceAmount * Number.parseInt(formData.attendees || "1")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/events/${event.id}`} className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Event Registration</h1>
              <p className="text-sm text-gray-600">{event.title}</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Event Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{formatDate(event.date)}</span>
                    </div>
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

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Price per person:</span>
                      <span className="text-lg font-semibold text-orange-600">{event.price}</span>
                    </div>
                    {event.priceAmount > 0 && (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Attendees:</span>
                          <span className="text-sm">{formData.attendees}</span>
                        </div>
                        <div className="flex justify-between items-center font-semibold">
                          <span>Total Amount:</span>
                          <span className="text-lg text-orange-600">${totalAmount}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Register for Event</CardTitle>
                  <CardDescription>
                    Please fill out the form below to register for this event. All fields marked with * are required.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Event Details</h3>

                      <div className="space-y-2">
                        <Label htmlFor="attendees">Number of Attendees *</Label>
                        <Select
                          value={formData.attendees}
                          onValueChange={(value) => setFormData({ ...formData, attendees: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of attendees" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 person</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="3">3 people</SelectItem>
                            <SelectItem value="4">4 people</SelectItem>
                            <SelectItem value="5">5+ people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dietaryRequirements">Dietary Requirements (Optional)</Label>
                        <Textarea
                          id="dietaryRequirements"
                          placeholder="Please specify any dietary requirements or allergies..."
                          value={formData.dietaryRequirements}
                          onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                        <Input
                          id="emergencyContact"
                          required
                          placeholder="Name and phone number"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Terms & Preferences</h3>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            required
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, agreeToTerms: checked as boolean })
                            }
                          />
                          <Label htmlFor="terms" className="text-sm">
                            I agree to the event terms and conditions and understand the cancellation policy *
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="updates"
                            checked={formData.subscribeUpdates}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, subscribeUpdates: checked as boolean })
                            }
                          />
                          <Label htmlFor="updates" className="text-sm">
                            Subscribe to event updates and future community events
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                      {event.priceAmount > 0 ? (
                        <>
                          <CreditCard className="mr-2 h-5 w-5" />
                          Proceed to Payment - ${totalAmount}
                        </>
                      ) : (
                        "Complete Registration"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
