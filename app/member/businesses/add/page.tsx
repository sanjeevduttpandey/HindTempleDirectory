"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Clock, Plus, X, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = [
  "Restaurant",
  "Grocery",
  "Healthcare",
  "Education",
  "Services",
  "Retail",
  "Professional Services",
  "Beauty & Wellness",
  "Entertainment",
  "Other",
]

const subcategories = {
  Restaurant: ["North Indian", "South Indian", "Vegetarian", "Sweets & Snacks", "Fast Food", "Fine Dining"],
  Grocery: ["Indian Groceries", "Spices", "Fresh Produce", "Religious Items", "Ayurvedic Products"],
  Healthcare: ["Ayurveda", "General Practice", "Dental", "Physiotherapy", "Mental Health"],
  Education: ["Dance & Arts", "Music", "Language Classes", "Tutoring", "Religious Education"],
  Services: ["Catering", "Event Planning", "Astrology", "Photography", "Travel Agency"],
  Retail: ["Clothing & Jewelry", "Home Decor", "Books & Media", "Electronics", "Gifts"],
  "Professional Services": ["Legal", "Accounting", "Real Estate", "Insurance", "Consulting"],
  "Beauty & Wellness": ["Spa & Massage", "Hair & Beauty", "Fitness", "Yoga", "Meditation"],
  Entertainment: ["Event Venues", "DJ Services", "Entertainment", "Cultural Shows"],
  Other: ["Other Services"],
}

const cities = [
  "Auckland",
  "Wellington",
  "Christchurch",
  "Hamilton",
  "Tauranga",
  "Dunedin",
  "Palmerston North",
  "Other",
]

export default function AddBusinessPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    owner: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    website: "",
    established: "",
    specialties: [] as string[],
    services: [] as string[],
    facilities: [] as string[],
    hours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
  })

  const [currentSpecialty, setCurrentSpecialty] = useState("")
  const [currentService, setCurrentService] = useState("")
  const [currentFacility, setCurrentFacility] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleHoursChange = (day: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: value,
      },
    }))
  }

  const addSpecialty = () => {
    if (currentSpecialty.trim() && !formData.specialties.includes(currentSpecialty.trim())) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, currentSpecialty.trim()],
      }))
      setCurrentSpecialty("")
    }
  }

  const removeSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const addService = () => {
    if (currentService.trim() && !formData.services.includes(currentService.trim())) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, currentService.trim()],
      }))
      setCurrentService("")
    }
  }

  const removeService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }))
  }

  const addFacility = () => {
    if (currentFacility.trim() && !formData.facilities.includes(currentFacility.trim())) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, currentFacility.trim()],
      }))
      setCurrentFacility("")
    }
  }

  const removeFacility = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((f) => f !== facility),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Redirect after success
    setTimeout(() => {
      router.push("/member/businesses")
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your business listing has been submitted for review. You'll receive an email confirmation shortly.
            </p>
            <Button asChild>
              <Link href="/member/businesses">View Directory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/member/businesses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Business</h1>
            <p className="text-gray-600">
              Join our Hindu business directory and connect with the community across New Zealand
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Business Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your business name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="owner">Owner/Manager Name *</Label>
                    <Input
                      id="owner"
                      value={formData.owner}
                      onChange={(e) => handleInputChange("owner", e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value) => handleInputChange("subcategory", value)}
                      disabled={!formData.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.category &&
                          subcategories[formData.category as keyof typeof subcategories]?.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Business Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your business, what makes it special, and what you offer..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="established">Year Established</Label>
                  <Input
                    id="established"
                    value={formData.established}
                    onChange={(e) => handleInputChange("established", e.target.value)}
                    placeholder="e.g., 2015"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
                <CardDescription>How customers can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Full business address"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
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
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+64 9 123 4567"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="business@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="www.yourbusiness.co.nz"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Add specialties, services, and facilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specialties */}
                <div>
                  <Label>Specialties</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentSpecialty}
                      onChange={(e) => setCurrentSpecialty(e.target.value)}
                      placeholder="Add a specialty"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                    />
                    <Button type="button" onClick={addSpecialty} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                        {specialty}
                        <button type="button" onClick={() => removeSpecialty(specialty)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <Label>Services Offered</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentService}
                      onChange={(e) => setCurrentService(e.target.value)}
                      placeholder="Add a service"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
                    />
                    <Button type="button" onClick={addService} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.services.map((service) => (
                      <Badge key={service} variant="outline" className="flex items-center gap-1">
                        {service}
                        <button type="button" onClick={() => removeService(service)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <Label>Facilities & Amenities</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={currentFacility}
                      onChange={(e) => setCurrentFacility(e.target.value)}
                      placeholder="Add a facility"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFacility())}
                    />
                    <Button type="button" onClick={addFacility} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.facilities.map((facility) => (
                      <Badge key={facility} variant="outline" className="flex items-center gap-1">
                        {facility}
                        <button type="button" onClick={() => removeFacility(facility)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Operating Hours
                </CardTitle>
                <CardDescription>When is your business open?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(formData.hours).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-4">
                      <Label className="w-24 capitalize">{day}</Label>
                      <Input
                        value={hours}
                        onChange={(e) => handleHoursChange(day, e.target.value)}
                        placeholder="e.g., 9:00 AM - 6:00 PM or Closed"
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/member/businesses">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                {isSubmitting ? "Submitting..." : "Submit Business"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
