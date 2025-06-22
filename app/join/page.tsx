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
import { Users, Mail, MapPin, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    interests: [] as string[],
    bio: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const cities = [
    "Auckland",
    "Wellington",
    "Christchurch",
    "Hamilton",
    "Tauranga",
    "Dunedin",
    "Palmerston North",
    "Napier",
    "Rotorua",
    "New Plymouth",
    "Other",
  ]

  const interestOptions = [
    "Temple Activities",
    "Cultural Events",
    "Festivals",
    "Yoga & Meditation",
    "Sanskrit Learning",
    "Classical Music",
    "Dance",
    "Cooking",
    "Philosophy",
    "Community Service",
    "Youth Programs",
    "Senior Activities",
  ]

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, interests: [...formData.interests, interest] })
    } else {
      setFormData({ ...formData, interests: formData.interests.filter((i) => i !== interest) })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Sanatan New Zealand!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for joining our community. You'll receive a welcome email shortly with next steps.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/community">Explore Community</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/temples">Find Temples</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Join Our Community</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-600">
              Connect with fellow Hindus across New Zealand and be part of our vibrant spiritual community
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Find Local Events</h3>
              <p className="text-sm text-gray-600">Discover festivals, pujas, and cultural events near you</p>
            </Card>
            <Card className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Connect & Share</h3>
              <p className="text-sm text-gray-600">Join discussions and connect with like-minded devotees</p>
            </Card>
            <Card className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Community Support</h3>
              <p className="text-sm text-gray-600">Get help and support from our caring community</p>
            </Card>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create Your Profile</CardTitle>
              <CardDescription>Tell us about yourself to help us connect you with the right community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
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
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Select required onValueChange={(value) => setFormData({ ...formData, city: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Interests */}
                <div className="space-y-3">
                  <Label>Interests (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        />
                        <Label htmlFor={interest} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Tell us about yourself (Optional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Share a bit about your spiritual journey, interests, or what you hope to gain from the community..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      required
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-orange-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-orange-600 hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, subscribeNewsletter: checked as boolean })
                      }
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      Subscribe to our newsletter for community updates and event notifications
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Join Community
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Already a member */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already a member?{" "}
              <Link href="/login" className="text-orange-600 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
