"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, CheckCircle, Upload } from "lucide-react"
import Link from "next/link"

export default function AddTemplePage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    mainDeity: "",
    established: "",
    timings: "",
    services: [] as string[],
    facilities: [] as string[],
    contactPerson: "",
    contactRole: "",
    agreeToTerms: false,
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

  const deities = [
    "Multi-deity",
    "Shiva",
    "Vishnu",
    "Krishna",
    "Rama",
    "Ganesha",
    "Durga",
    "Hanuman",
    "Lakshmi",
    "Saraswati",
    "Other",
  ]

  const serviceOptions = [
    "Daily Aarti",
    "Weekly Bhajan",
    "Festival Celebrations",
    "Wedding Ceremonies",
    "Naming Ceremonies",
    "Thread Ceremonies",
    "Funeral Services",
    "Sanskrit Classes",
    "Yoga Classes",
    "Cultural Programs",
    "Community Kitchen",
    "Religious Counseling",
  ]

  const facilityOptions = [
    "Parking Available",
    "Wheelchair Accessible",
    "Community Hall",
    "Kitchen Facilities",
    "Library",
    "Bookstore",
    "Audio/Visual Equipment",
    "Air Conditioning",
    "Shoe Storage",
    "Restrooms",
    "Children's Area",
    "Garden/Outdoor Space",
  ]

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, services: [...formData.services, service] })
    } else {
      setFormData({ ...formData, services: formData.services.filter((s) => s !== service) })
    }
  }

  const handleFacilityChange = (facility: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, facilities: [...formData.facilities, facility] })
    } else {
      setFormData({ ...formData, facilities: formData.facilities.filter((f) => f !== facility) })
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Temple Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contributing to our temple directory. We'll review the information and add it to our
              listings within 2-3 business days.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/temples">Browse Temples</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/temples/add">Add Another Temple</Link>
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
          <Link href="/temples" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Add Temple</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Add a Hindu Temple</h2>
            <p className="text-xl text-gray-600">
              Help fellow devotees discover sacred spaces by adding temple information to our directory
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Temple Information</CardTitle>
              <CardDescription>
                Please provide accurate and complete information about the temple. All submissions are reviewed before
                being published.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Temple Name *</Label>
                    <Input
                      id="name"
                      required
                      placeholder="e.g., Shri Sanatan Dharm Mandir"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      required
                      placeholder="e.g., 98 Balmoral Road, Mount Eden"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select required onValueChange={(value) => setFormData({ ...formData, city: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
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
                    <div className="space-y-2">
                      <Label htmlFor="established">Year Established</Label>
                      <Input
                        id="established"
                        type="number"
                        min="1800"
                        max="2024"
                        placeholder="e.g., 1992"
                        value={formData.established}
                        onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainDeity">Main Deity *</Label>
                    <Select required onValueChange={(value) => setFormData({ ...formData, mainDeity: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select main deity" />
                      </SelectTrigger>
                      <SelectContent>
                        {deities.map((deity) => (
                          <SelectItem key={deity} value={deity}>
                            {deity}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      required
                      placeholder="Provide a brief description of the temple, its history, and significance..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+64 9 630 5540"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="info@temple.org.nz"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.temple.org.nz"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timings">Opening Hours *</Label>
                    <Input
                      id="timings"
                      required
                      placeholder="e.g., 6:00 AM - 8:00 PM"
                      value={formData.timings}
                      onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                    />
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Services Offered</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                        />
                        <Label htmlFor={service} className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Facilities Available</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {facilityOptions.map((facility) => (
                      <div key={facility} className="flex items-center space-x-2">
                        <Checkbox
                          id={facility}
                          checked={formData.facilities.includes(facility)}
                          onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                        />
                        <Label htmlFor={facility} className="text-sm">
                          {facility}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Person */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Your Name *</Label>
                      <Input
                        id="contactPerson"
                        required
                        placeholder="Your full name"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactRole">Your Role/Relationship to Temple *</Label>
                      <Input
                        id="contactRole"
                        required
                        placeholder="e.g., Committee Member, Priest, Regular Devotee"
                        value={formData.contactRole}
                        onChange={(e) => setFormData({ ...formData, contactRole: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Temple Photos (Optional)</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload photos of the temple</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB each. Maximum 5 photos.</p>
                    <Button type="button" variant="outline" className="mt-4">
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      required
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I confirm that the information provided is accurate and I have permission to submit this temple's
                      details. I understand that all submissions are reviewed before publication and may be edited for
                      clarity. *
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  <MapPin className="mr-2 h-5 w-5" />
                  Submit Temple Information
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Need help?{" "}
              <Link href="/contact" className="text-orange-600 hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
