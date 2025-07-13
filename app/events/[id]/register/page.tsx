"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function RegisterEventPage() {
  const params = useParams()
  const eventId = Number.parseInt(params.id as string)

  // Mock event data - in a real app, this would come from an API
  const event = {
    id: eventId,
    title: "Diwali Celebration 2024",
    date: "November 12, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Auckland Town Hall",
    price: "Free",
    isFree: true,
    maxAttendees: 500,
    currentAttendees: 450,
  }

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required fields.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions.")
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call for registration
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Registration submitted:", { name, email, phone, eventId })
      setIsRegistered(true)
    } catch (err) {
      setError("Failed to register for the event. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
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

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              You are successfully registered for "{event.title}". We look forward to seeing you there!
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href={`/events/${event.id}`}>View Event Details</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/events">Browse More Events</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/events/${event.id}`} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Event Registration</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Register for {event.title}</CardTitle>
              <CardDescription>Fill out the form below to secure your spot for this event.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Event Details:</h3>
                <p className="text-sm text-gray-700">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Price:</strong> {event.price}
                </p>
                {event.maxAttendees && (
                  <p className="text-sm text-gray-700">
                    <strong>Attendees:</strong> {event.currentAttendees}/{event.maxAttendees}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+64 21 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    required
                  />
                  <Label htmlFor="terms">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-600 hover:underline">
                      terms and conditions
                    </Link>{" "}
                    of this event. *
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...
                    </>
                  ) : (
                    "Confirm Registration"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Questions about this event?{" "}
              <Link href="/help" className="text-orange-600 hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
