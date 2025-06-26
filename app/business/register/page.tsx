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
import { Upload, X, CheckCircle, AlertCircle, Loader2, Camera } from "lucide-react"
import StaticHeader from "@/components/static-header"
import { Alert, AlertDescription } from "@/components/ui/alert"

const businessCategories = [
  "Arts & Culture",
  "Cleaning Services",
  "Restaurants & Food",
  "Grocery & Spices",
  "Clothing & Jewelry",
  "Health & Wellness",
  "Education & Tutoring",
  "Professional Services",
  "Beauty & Salon",
  "Travel & Tourism",
  "Religious Items",
  "Event Services",
  "Other",
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

interface UploadedImage {
  url: string
  filename: string
  originalName: string
}

export default function RegisterBusiness() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const [formData, setFormData] = useState({
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
    services: [] as string[],
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    operatingHours: "",
    specialOffers: "",
    certifications: [] as string[],
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadError("")

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file before upload
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if (!allowedTypes.includes(file.type)) {
          throw new Error(`Invalid file type: ${file.name}. Only JPEG, PNG, and WebP are allowed.`)
        }

        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
          throw new Error(`File too large: ${file.name}. Maximum 5MB allowed.`)
        }

        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Upload response error:", errorText)
          throw new Error(`Upload failed for ${file.name}: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || `Upload failed for ${file.name}`)
        }

        return {
          url: result.data.url,
          filename: result.data.filename,
          originalName: result.data.originalName,
        }
      })

      const newImages = await Promise.all(uploadPromises)
      setUploadedImages((prev) => [...prev, ...newImages])

      // Clear the input so the same files can be selected again if needed
      event.target.value = ""
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError(error instanceof Error ? error.message : "Failed to upload images")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (filename: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.filename !== filename))
  }

  const [newService, setNewService] = useState("")

  const handleInputChange = (field: string, value: any) => {
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

  const addService = (service: string) => {
    if (service && !formData.services.includes(service)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }))
      setNewService("")
    }
  }

  const removeService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/business/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          images: uploadedImages.map((img) => img.url), // Send image URLs
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Registration response error:", errorText)
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        setSubmitMessage(result.message)
        // Reset form or redirect
        setTimeout(() => {
          window.location.href = "/business/directory"
        }, 3000)
      } else {
        throw new Error(result.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setSubmitStatus("error")
      setSubmitMessage(error instanceof Error ? error.message : "Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.category && formData.description && formData.address && formData.city
      case 2:
        return formData.phone && formData.email && formData.ownerName && formData.ownerEmail && formData.ownerPhone
      case 3:
        return true // Optional fields
      case 4:
        return formData.agreeToTerms
      default:
        return false
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <StaticHeader />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
              <p className="text-lg text-gray-600 mb-6">{submitMessage}</p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Your business will be reviewed within 2-3 business days</li>
                  <li>• You'll receive an email confirmation once approved</li>
                  <li>• Your business will appear in our directory</li>
                  <li>• You can update your listing anytime by contacting us</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">Redirecting to directory in 3 seconds...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <StaticHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Register Your Business</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the Hindu Business Directory and connect with our community across New Zealand
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-orange-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error/Success Messages */}
        {submitStatus === "error" && (
          <Alert className="max-w-4xl mx-auto mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Business Information</CardTitle>
                <CardDescription>Tell us about your business and what you offer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
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
                    placeholder="Describe your business, products, and services"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Street address"
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
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How can customers reach your business?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="www.yourbusiness.co.nz"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Social Media (Optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="facebook" className="text-sm">
                        Facebook
                      </Label>
                      <Input
                        id="facebook"
                        value={formData.socialMedia.facebook}
                        onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                        placeholder="Facebook page URL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram" className="text-sm">
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        value={formData.socialMedia.instagram}
                        onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                        placeholder="Instagram handle"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter" className="text-sm">
                        Twitter
                      </Label>
                      <Input
                        id="twitter"
                        value={formData.socialMedia.twitter}
                        onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                        placeholder="Twitter handle"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Owner Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="ownerName" className="text-sm">
                        Owner Name *
                      </Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange("ownerName", e.target.value)}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerEmail" className="text-sm">
                        Owner Email *
                      </Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                        placeholder="owner@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerPhone" className="text-sm">
                        Owner Phone *
                      </Label>
                      <Input
                        id="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                        placeholder="+64 21 123 4567"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Additional information about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Textarea
                    id="operatingHours"
                    value={formData.operatingHours}
                    onChange={(e) => handleInputChange("operatingHours", e.target.value)}
                    placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Sun: Closed"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="specialOffers">Special Offers or Services</Label>
                  <Textarea
                    id="specialOffers"
                    value={formData.specialOffers}
                    onChange={(e) => handleInputChange("specialOffers", e.target.value)}
                    placeholder="Any special offers, discounts, or unique services you provide"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Services/Products (Add tags)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.services.map((service) => (
                      <Badge key={service} variant="secondary" className="flex items-center gap-1">
                        {service}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeService(service)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a service or product"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addService(newService)
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => addService(newService)}>
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Business Images (Optional)</Label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors bg-orange-50/30">
                      <div className="flex flex-col items-center">
                        <div className="bg-orange-100 p-4 rounded-full mb-4">
                          <Camera className="h-8 w-8 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Business Images</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Show your business, products, or services to potential customers
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          Supported formats: JPEG, PNG, WebP • Maximum 5MB per image
                        </p>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          disabled={uploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          asChild
                          disabled={uploading}
                          className="bg-white hover:bg-orange-50 border-orange-300 text-orange-700"
                        >
                          <label htmlFor="image-upload" className="cursor-pointer">
                            {uploading ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="h-5 w-5 mr-2" />
                                Choose Images
                              </>
                            )}
                          </label>
                        </Button>
                      </div>
                    </div>

                    {uploadError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{uploadError}</AlertDescription>
                      </Alert>
                    )}

                    {uploadedImages.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Uploaded Images ({uploadedImages.length})</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
                          {uploadedImages.map((image, index) => (
                            <div key={image.filename} className="relative group">
                              <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-orange-300 transition-colors">
                                <img
                                  src={image.url || "/placeholder.svg"}
                                  alt={`Business image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "/placeholder.svg?height=128&width=128&text=Error"
                                  }}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(image.filename)}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                title={`Remove ${image.originalName}`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                {image.originalName}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>Please review your information and agree to our terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Business Summary</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {formData.businessName}
                    </p>
                    <p>
                      <strong>Category:</strong> {formData.category}
                    </p>
                    <p>
                      <strong>Location:</strong> {formData.address}, {formData.city}
                    </p>
                    <p>
                      <strong>Contact:</strong> {formData.phone} | {formData.email}
                    </p>
                    <p>
                      <strong>Owner:</strong> {formData.ownerName}
                    </p>
                    {formData.services.length > 0 && (
                      <p>
                        <strong>Services:</strong> {formData.services.join(", ")}
                      </p>
                    )}
                    {uploadedImages.length > 0 && (
                      <p>
                        <strong>Images:</strong> {uploadedImages.length} uploaded
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy *
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked)}
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      I agree to receive marketing communications and updates
                    </Label>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your business will be reviewed within 2-3 business days</li>
                    <li>• You'll receive an email confirmation once approved</li>
                    <li>• Your business will appear in our directory</li>
                    <li>• You can update your listing anytime by contacting us</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-orange-600 hover:bg-orange-700"
                disabled={!isStepValid()}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700"
                disabled={!formData.agreeToTerms || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
