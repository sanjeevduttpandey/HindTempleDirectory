"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Loader2, CheckCircle } from "lucide-react"
import StaticHeader from "@/components/static-header"
import { useToast } from "@/hooks/use-toast"

const businessCategories = [
  "Arts & Culture",
  "Beauty & Salon",
  "Cleaning Services",
  "Clothing & Jewelry",
  "Education & Tutoring",
  "Event Services",
  "Grocery & Spices",
  "Health & Wellness",
  "IT",
  "Professional Services",
  "Religious Items",
  "Restaurants & Food",
  "Travel & Tourism",
]

const cities = [
  "Auckland",
  "Wellington",
  "Christchurch",
  "Hamilton",
  "Tauranga",
  "Dunedin",
  "Palmerston North",
  "Nelson",
  "Rotorua",
  "New Plymouth",
  "Other",
]

interface FormData {
  businessName: string
  category: string
  description: string
  address: string
  city: string
  phone: string
  email: string
  website: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  services: string[]
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
  }
  operatingHours: string
  specialOffers: string
  agreeToTerms: boolean
}

export default function BusinessRegisterPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentService, setCurrentService] = useState("")

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    category: "",
    description: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    website: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    services: [],
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
    operatingHours: "",
    specialOffers: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
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

  const validateForm = () => {
    const required = [
      "businessName",
      "category",
      "description",
      "address",
      "city",
      "phone",
      "email",
      "ownerName",
      "ownerEmail",
      "ownerPhone",
    ]

    for (const field of required) {
      if (!formData[field as keyof FormData]) {
        toast({
          title: "Validation Error",
          description: `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`,
          variant: "destructive",
        })
        return false
      }
    }

    if (formData.services.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one service or product.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Validation Error",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch("/api/business/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitted(true)
        toast({
          title: "Registration Successful!",
          description: "Your business has been submitted for review. We'll contact you within 2-3 business days.",
        })
      } else {
        throw new Error(result.message || "Registration failed")
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-8 pb-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for registering your business with the Sanatan New Zealand directory. Our team will review
                  your submission and contact you within 2-3 business days.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                  <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
                    <li>• Our team will review your business information</li>
                    <li>• We may contact you for additional details or verification</li>
                    <li>• Once approved, your business will appear in our directory</li>
                    <li>• You'll receive an email confirmation when your listing goes live</li>
                  </ul>
                </div>
                <Button
                  onClick={() => (window.location.href = "/business/directory")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Browse Business Directory
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Register Your Business</h1>
            <p className="text-xl text-gray-600">
              Join the Sanatan New Zealand business directory and connect with our community
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Business Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                    <CardDescription>Tell us about your business and what you offer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          placeholder="Enter your business name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
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
                        placeholder="Describe your business, what you offer, and what makes you unique..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Business address"
                          required
                        />
                      </div>
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
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>How customers can reach your business</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Business Phone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+64 9 123 4567"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="business@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://www.yourbusiness.com"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Owner Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Owner Information</CardTitle>
                    <CardDescription>Information about the business owner</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ownerName">Owner Name *</Label>
                        <Input
                          id="ownerName"
                          value={formData.ownerName}
                          onChange={(e) => handleInputChange("ownerName", e.target.value)}
                          placeholder="Full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="ownerPhone">Owner Phone *</Label>
                        <Input
                          id="ownerPhone"
                          value={formData.ownerPhone}
                          onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                          placeholder="+64 21 123 4567"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ownerEmail">Owner Email *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                        placeholder="owner@example.com"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Services & Products */}
                <Card>
                  <CardHeader>
                    <CardTitle>Services & Products</CardTitle>
                    <CardDescription>What services or products do you offer?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={currentService}
                        onChange={(e) => setCurrentService(e.target.value)}
                        placeholder="Enter a service or product"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
                      />
                      <Button type="button" onClick={addService} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {formData.services.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {service}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeService(service)} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Additional Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="operatingHours">Operating Hours</Label>
                      <Textarea
                        id="operatingHours"
                        value={formData.operatingHours}
                        onChange={(e) => handleInputChange("operatingHours", e.target.value)}
                        placeholder="Mon-Fri: 9AM-5PM&#10;Sat: 10AM-3PM&#10;Sun: Closed"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialOffers">Special Offers</Label>
                      <Textarea
                        id="specialOffers"
                        value={formData.specialOffers}
                        onChange={(e) => handleInputChange("specialOffers", e.target.value)}
                        placeholder="Any special offers for the Sanatan community..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                    <CardDescription>Optional social media links</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={formData.socialMedia.facebook}
                        onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                        placeholder="Facebook page URL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={formData.socialMedia.instagram}
                        onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                        placeholder="Instagram handle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.socialMedia.linkedin}
                        onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
                        placeholder="LinkedIn page URL"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Submit */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-2 mb-4">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                      />
                      <Label htmlFor="terms" className="text-sm leading-5">
                        I agree to the terms and conditions and confirm that all information provided is accurate.
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Registration"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
