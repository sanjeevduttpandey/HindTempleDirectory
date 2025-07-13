"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react"
import Link from "next/link"
import StaticHeader from "@/components/static-header"

// Define BusinessCategory type and options
type BusinessCategory =
  | "Arts & Culture"
  | "Cleaning Services"
  | "Restaurants & Food"
  | "Grocery & Spices"
  | "Clothing & Jewelry"
  | "Health & Wellness"
  | "Education & Tutoring"
  | "Professional Services"
  | "Beauty & Salon"
  | "Travel & Tourism"
  | "Religious Items"
  | "Event Services"
  | "IT"
  | "Other"

const businessCategories: BusinessCategory[] = [
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
  "Other",
]

const cities = ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Dunedin", "Other"]

interface FormData {
  business_name: string
  category: BusinessCategory | ""
  description: string
  address: string
  city: string
  phone: string
  email: string
  website: string
  owner_name: string
  owner_email: string
  owner_phone: string
  services: string // Comma-separated string
  operating_hours: string // Free text
  special_offers: string // Free text
  social_media_facebook: string
  social_media_instagram: string
  social_media_x: string
  images: File[]
  agreeToDisclaimer: boolean
}

export default function RegisterBusinessPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    business_name: "",
    category: "",
    description: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    website: "",
    owner_name: "",
    owner_email: "",
    owner_phone: "",
    services: "",
    operating_hours: "",
    special_offers: "",
    social_media_facebook: "",
    social_media_instagram: "",
    social_media_x: "",
    images: [],
    agreeToDisclaimer: false,
  })
  const [loading, setLoading] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle")
  const [submissionMessage, setSubmissionMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, images: Array.from(e.target.files!) }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToDisclaimer: checked }))
  }

  const validateStep1 = () => {
    const { business_name, category, description, address, city, phone, email, website } = formData
    if (!business_name || !category || !description || !address || !city || !phone || !email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for Business Details.",
        variant: "destructive",
      })
      return false
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid business email address.",
        variant: "destructive",
      })
      return false
    }
    if (website && !/^https?:\/\/\S+/.test(website)) {
      toast({
        title: "Invalid Website URL",
        description: "Please enter a valid website URL (e.g., https://example.com).",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const validateStep2 = () => {
    const { owner_name, owner_email, owner_phone } = formData
    if (!owner_name || !owner_email || !owner_phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for Owner/Contact Details.",
        variant: "destructive",
      })
      return false
    }
    if (owner_email && !/\S+@\S+\.\S+/.test(owner_email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid owner email address.",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeToDisclaimer) {
      toast({
        title: "Disclaimer Required",
        description: "You must agree to the disclaimer before submitting your business.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setSubmissionStatus("idle")
    setSubmissionMessage("")

    try {
      const imageUrls: string[] = []
      // Handle image uploads first
      if (formData.images.length > 0) {
        for (const file of formData.images) {
          const uploadFormData = new FormData()
          uploadFormData.append("file", file)

          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: uploadFormData,
          })

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json()
            throw new Error(errorData.message || "Failed to upload image.")
          }
          const uploadResult = await uploadResponse.json()
          imageUrls.push(uploadResult.url)
        }
      }

      const submissionData = {
        business_name: formData.business_name,
        category: formData.category,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        website: formData.website || null,
        owner_name: formData.owner_name,
        owner_email: formData.owner_email,
        owner_phone: formData.owner_phone,
        services: formData.services
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean), // Convert to array
        operating_hours: formData.operating_hours || null,
        special_offers: formData.special_offers || null,
        social_media: {
          facebook: formData.social_media_facebook || null,
          instagram: formData.social_media_instagram || null,
          x: formData.social_media_x || null,
        },
        images: imageUrls,
      }

      const response = await fetch("/api/business/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit business registration.")
      }

      setSubmissionStatus("success")
      setSubmissionMessage(
        "Your business has been submitted for review successfully! We will notify you once it is approved.",
      )
      toast({
        title: "Submission Successful",
        description: "Your business is awaiting review.",
        variant: "default",
      })
      // Optionally reset form
      setFormData({
        business_name: "",
        category: "",
        description: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        website: "",
        owner_name: "",
        owner_email: "",
        owner_phone: "",
        services: "",
        operating_hours: "",
        special_media_facebook: "",
        social_media_instagram: "",
        social_media_x: "",
        special_offers: "",
        images: [],
        agreeToDisclaimer: false,
      })
      setStep(1) // Go back to first step or a success page
    } catch (error: any) {
      console.error("Submission error:", error)
      setSubmissionStatus("error")
      setSubmissionMessage(`Submission failed: ${error.message || "An unexpected error occurred."}`)
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">1. Business Details</h2>
            <p className="text-gray-600">Tell us about your business.</p>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="business_name">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input id="business_name" value={formData.business_name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: BusinessCategory) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input id="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.city} onValueChange={(value: string) => handleSelectChange("city", value)}>
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
                <Label htmlFor="phone">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input id="phone" value={formData.phone} onChange={handleInputChange} type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input id="email" value={formData.email} onChange={handleInputChange} type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  type="url"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
            <Button onClick={handleNext} className="w-full bg-orange-600 hover:bg-orange-700">
              Next
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">2. Owner & Additional Details</h2>
            <p className="text-gray-600">Provide contact information and other relevant details.</p>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner_name">
                  Your Name (Owner/Contact Person) <span className="text-red-500">*</span>
                </Label>
                <Input id="owner_name" value={formData.owner_name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner_email">
                  Your Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="owner_email"
                  value={formData.owner_email}
                  onChange={handleInputChange}
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner_phone">
                  Your Phone <span className="text-red-500">*</span>
                </Label>
                <Input id="owner_phone" value={formData.owner_phone} onChange={handleInputChange} type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services">Services Offered (Comma-separated, e.g., Catering, Event Planning)</Label>
                <Input
                  id="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  placeholder="e.g., Catering, Event Planning, Photography"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operating_hours">Operating Hours (e.g., Mon-Fri: 9 AM - 5 PM, Sat: 10 AM - 2 PM)</Label>
                <Input id="operating_hours" value={formData.operating_hours} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="special_offers">Special Offers/Promotions (Optional)</Label>
                <Textarea id="special_offers" value={formData.special_offers} onChange={handleInputChange} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Social Media Links (Optional)</Label>
                <Input
                  id="social_media_facebook"
                  value={formData.social_media_facebook}
                  onChange={handleInputChange}
                  placeholder="Facebook URL"
                />
                <Input
                  id="social_media_instagram"
                  value={formData.social_media_instagram}
                  onChange={handleInputChange}
                  placeholder="Instagram URL"
                />
                <Input
                  id="social_media_x"
                  value={formData.social_media_x}
                  onChange={handleInputChange}
                  placeholder="X (Twitter) URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Upload Images (Optional, Max 5)</Label>
                <Input id="images" type="file" multiple accept="image/*" onChange={handleFileChange} />
                {formData.images.length > 0 && (
                  <p className="text-sm text-gray-500">{formData.images.length} file(s) selected.</p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-orange-600 hover:bg-orange-700">
                Next
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">3. Review & Submit</h2>
            <p className="text-gray-600">Please review your submission before finalizing.</p>
            <Card className="bg-gray-50 p-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Business Details</h3>
              <p>
                <strong>Name:</strong> {formData.business_name}
              </p>
              <p>
                <strong>Category:</strong> {formData.category}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}, {formData.city}
              </p>
              <p>
                <strong>Contact:</strong> {formData.phone}, {formData.email}
              </p>
              {formData.website && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline"
                  >
                    {formData.website}
                  </a>
                </p>
              )}

              <h3 className="text-lg font-semibold text-gray-800 mt-6">Owner/Contact Details</h3>
              <p>
                <strong>Owner Name:</strong> {formData.owner_name}
              </p>
              <p>
                <strong>Owner Email:</strong> {formData.owner_email}
              </p>
              <p>
                <strong>Owner Phone:</strong> {formData.owner_phone}
              </p>

              {formData.services && (
                <p>
                  <strong>Services:</strong> {formData.services}
                </p>
              )}
              {formData.operating_hours && (
                <p>
                  <strong>Operating Hours:</strong> {formData.operating_hours}
                </p>
              )}
              {formData.special_offers && (
                <p>
                  <strong>Special Offers:</strong> {formData.special_offers}
                </p>
              )}
              {(formData.social_media_facebook || formData.social_media_instagram || formData.social_media_x) && (
                <p>
                  <strong>Social Media:</strong>
                  {formData.social_media_facebook && (
                    <span className="ml-2">
                      <a
                        href={formData.social_media_facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        Facebook
                      </a>
                    </span>
                  )}
                  {formData.social_media_instagram && (
                    <span className="ml-2">
                      <a
                        href={formData.social_media_instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        Instagram
                      </a>
                    </span>
                  )}
                  {formData.social_media_x && (
                    <span className="ml-2">
                      <a
                        href={formData.social_media_x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        X
                      </a>
                    </span>
                  )}
                </p>
              )}
              {formData.images.length > 0 && (
                <p>
                  <strong>Images:</strong> {formData.images.length} selected
                </p>
              )}
            </Card>

            <div className="flex items-start space-x-2 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <Info className="h-5 w-5 text-yellow-600 mt-1" />
              <p className="text-sm text-yellow-800">
                Your submission will be reviewed by our team. We will notify you via email once it has been approved and
                published in the directory.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToDisclaimer"
                checked={formData.agreeToDisclaimer}
                onCheckedChange={handleCheckboxChange}
                required
              />
              <Label
                htmlFor="agreeToDisclaimer"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the{" "}
                <Link href="/disclaimer" className="text-orange-600 hover:underline" target="_blank">
                  disclaimer and terms
                </Link>{" "}
                regarding business listings.
              </Label>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                disabled={loading || !formData.agreeToDisclaimer}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Business
              </Button>
            </div>

            {submissionStatus === "success" && (
              <div className="flex items-center space-x-2 text-green-600 mt-4">
                <CheckCircle className="h-5 w-5" />
                <span>{submissionMessage}</span>
              </div>
            )}
            {submissionStatus === "error" && (
              <div className="flex items-center space-x-2 text-red-600 mt-4">
                <XCircle className="h-5 w-5" />
                <span>{submissionMessage}</span>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Register Your Business</CardTitle>
            <CardDescription className="text-gray-600">
              List your Sanatan-owned business in our directory to connect with the community.
            </CardDescription>
            <div className="flex justify-center mt-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`flex items-center ${s <= step ? "text-orange-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${s === step ? "bg-orange-600 text-white" : "bg-gray-200"}`}
                  >
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-orange-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-6">{renderStep()}</CardContent>
        </Card>
      </main>
    </div>
  )
}
