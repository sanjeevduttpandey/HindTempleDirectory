"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, CheckCircle, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock group data
const groupData = {
  1: {
    id: 1,
    name: "Auckland Hindu Families",
    members: 245,
    city: "Auckland",
    description: "Connect with Hindu families in Auckland for playdates, cultural events, and community support.",
    category: "Family",
    organizer: "Priya Sharma",
    established: "2019",
  },
  2: {
    id: 2,
    name: "Wellington Young Professionals",
    members: 89,
    city: "Wellington",
    description: "Networking and social group for young Hindu professionals in the capital.",
    category: "Professional",
    organizer: "Raj Kumar",
    established: "2020",
  },
  3: {
    id: 3,
    name: "Christchurch Cultural Society",
    members: 156,
    city: "Christchurch",
    description: "Preserving and celebrating Hindu culture through events, workshops, and festivals.",
    category: "Cultural",
    organizer: "Meera Patel",
    established: "2018",
  },
  4: {
    id: 4,
    name: "Hamilton Bhajan Group",
    members: 67,
    city: "Hamilton",
    description: "Weekly bhajan sessions and spiritual discussions for devotees in Hamilton.",
    category: "Spiritual",
    organizer: "Anita Singh",
    established: "2021",
  },
}

export default function JoinGroupPage() {
  const params = useParams()
  const groupId = Number.parseInt(params.id as string)
  const group = groupData[groupId as keyof typeof groupData]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    introduction: "",
    agreeToGuidelines: false,
    allowContact: true,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Group Not Found</h2>
            <p className="text-gray-600 mb-6">The group you're trying to join doesn't exist.</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/community?tab=groups">Browse Groups</Link>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h2>
            <p className="text-gray-600 mb-6">
              Your request to join {group.name} has been sent to the group organizer. You'll receive an email once your
              request is approved.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/community?tab=groups">Browse More Groups</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/community">Back to Community</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/community?tab=groups" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Join Group</h1>
              <p className="text-sm text-gray-600">{group.name}</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Group Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Group Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{group.city}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <strong>Organizer:</strong> {group.organizer}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Established:</strong> {group.established}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Category:</strong> {group.category}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Join Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Join {group.name}</CardTitle>
                  <CardDescription>
                    Please fill out the form below to request to join this group. The group organizer will review your
                    request.
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
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Introduction */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Introduction</h3>

                      <div className="space-y-2">
                        <Label htmlFor="introduction">Tell us about yourself *</Label>
                        <Textarea
                          id="introduction"
                          required
                          placeholder="Please introduce yourself and explain why you'd like to join this group..."
                          value={formData.introduction}
                          onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Terms and Preferences */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Terms & Preferences</h3>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="guidelines"
                            required
                            checked={formData.agreeToGuidelines}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, agreeToGuidelines: checked as boolean })
                            }
                          />
                          <Label htmlFor="guidelines" className="text-sm">
                            I agree to follow the group guidelines and community standards *
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="contact"
                            checked={formData.allowContact}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, allowContact: checked as boolean })
                            }
                          />
                          <Label htmlFor="contact" className="text-sm">
                            Allow group members to contact me for group activities and events
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                      <Users className="mr-2 h-5 w-5" />
                      Request to Join Group
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
