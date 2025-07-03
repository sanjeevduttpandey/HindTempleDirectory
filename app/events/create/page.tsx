"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, Upload, X, AlertCircle, Save, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FormData {
  title: string
  description: string
  category: string
  date: string
  startTime: string
  endTime: string
  venue: string
  address: string
  city: string
  organizer: string
  contactEmail: string
  contactPhone: string
  website: string
  maxAttendees: string
  price: string
  isFree: boolean
  requirements: string
  features: string[]
  agreeToTerms: boolean
  images: File[]
}

interface FormErrors {
  [key: string]: string
}

export default function CreateEventPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    address: "",
    city: "",
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    maxAttendees: "",
    price: "",
    isFree: true,
    requirements: "",
    features: [],
    agreeToTerms: false,
    images: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isDraftSaved, setIsDraftSaved] = useState(false)

  const totalSteps = 6

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("eventDraft")
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        setFormData((prev) => ({ ...prev, ...parsedDraft }))
      } catch (error) {
        console.error("Error loading draft:", error)
      }
    }
  }, [])

  // Save draft to localStorage
  const saveDraft = () => {
    const draftData = { ...formData }
    delete draftData.images // Don't save files to localStorage
    localStorage.setItem("eventDraft", JSON.stringify(draftData))
    setIsDraftSaved(true)
    setTimeout(() => setIsDraftSaved(false), 2000)
  }

  const categories = [
    "Religious",
    "Festival",
    "Cultural",
    "Educational",
    "Wellness",
    "Community Service",
    "Youth Programs",
    "Senior Activities",
    "Music & Arts",
    "Food & Cooking",
    "Sports & Recreation",
    "Charity",
    "Workshop",
    "Conference",
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
    "Napier",
    "Rotorua",
    "New Plymouth",
    "Invercargill",
    "Nelson",
    "Whangarei",
    "Other",
  ]

  const featureOptions = [
    "Food Provided",
    "Parking Available",
    "Wheelchair Accessible",
    "Child-Friendly",
    "Photography Allowed",
    "Live Streaming",
    "Translation Available",
    "Materials Provided",
    "Certificates Given",
    "Refreshments Included",
    "Take-Home Items",
    "Group Discounts",
    "Free WiFi",
    "Air Conditioned",
    "Outdoor Event",
    "Pet Friendly",
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 1: // Basic Information
        if (!formData.title.trim()) newErrors.title = "Event title is required"
        if (!formData.category) newErrors.category = "Category is required"
        if (!formData.description.trim()) newErrors.description = "Description is required"
        if (formData.description.length < 50) newErrors.description = "Description must be at least 50 characters"
        break

      case 2: // Date & Time
        if (!formData.date) newErrors.date = "Event date is required"
        if (!formData.startTime) newErrors.startTime = "Start time is required"
        if (!formData.endTime) newErrors.endTime = "End time is required"
        if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
          newErrors.endTime = "End time must be after start time"
        }
        // Validate date is not in the past (using local time for comparison)
        if (formData.date) {
          const selectedDate = new Date(formData.date)
          const today = new Date()
          today.setHours(0, 0, 0, 0) // Normalize today's date to start of day for comparison
          if (selectedDate < today) {
            newErrors.date = "Event date cannot be in the past"
          }
        }
        break

      case 3: // Location
        if (!formData.venue.trim()) newErrors.venue = "Venue name is required"
        if (!formData.address.trim()) newErrors.address = "Address is required"
        if (!formData.city) newErrors.city = "City is required"
        break

      case 4: // Registration & Pricing
        if (formData.maxAttendees && Number.parseInt(formData.maxAttendees) < 1) {
          newErrors.maxAttendees = "Maximum attendees must be at least 1"
        }
        if (!formData.isFree && (!formData.price || Number.parseFloat(formData.price) < 0)) {
          newErrors.price = "Price must be a valid positive number"
        }
        break

      case 5: // Organizer Information
        if (!formData.organizer.trim()) newErrors.organizer = "Organizer name is required"
        if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          newErrors.contactEmail = "Please enter a valid email address"
        }
        if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required"
        if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
          newErrors.website = "Website must be a valid URL (include http:// or https://)"
        }
        break

      case 6: // Final Review
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, features: [...formData.features, feature] })
    } else {
      setFormData({ ...formData, features: formData.features.filter((f) => f !== feature) })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/")
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })

    if (validFiles.length + formData.images.length > 3) {
      setErrors({ ...errors, images: "Maximum 3 images allowed" })
      return
    }

    setFormData({ ...formData, images: [...formData.images, ...validFiles] })

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear draft from localStorage on successful submission
      localStorage.removeItem("eventDraft")

      setIsSubmitted(true)
    } catch (error) {
      setSubmitError("Failed to create event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewEvent = () => {
    // This would open a preview modal or navigate to a preview page
    console.log("Preview event:", formData)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Created Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your event "{formData.title}" has been submitted for review. It will be published within 24 hours and
              participants can start registering.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/events">Browse Events</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/events/create">Create Another Event</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>

            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Diwali Celebration 2024"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select event category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Event Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your event, what participants can expect, and any special highlights..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              <p className="text-sm text-gray-500">{formData.description.length}/500 characters (minimum 50)</p>
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Date & Time</h3>

            <div className="space-y-2">
              <Label htmlFor="date">Event Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={errors.date ? "border-red-500" : ""}
                min={new Date().toISOString().split("T")[0]} // Ensures date picker starts from today in local time
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className={errors.startTime ? "border-red-500" : ""}
                />
                {errors.startTime && <p className="text-sm text-red-500">{errors.startTime}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className={errors.endTime ? "border-red-500" : ""}
                />
                {errors.endTime && <p className="text-sm text-red-500">{errors.endTime}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Location</h3>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue Name *</Label>
              <Input
                id="venue"
                placeholder="e.g., Auckland Town Hall"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className={errors.venue ? "border-red-500" : ""}
              />
              {errors.venue && <p className="text-sm text-red-500">{errors.venue}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Input
                id="address"
                placeholder="e.g., 301-305 Queen Street, Auckland Central"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                <SelectTrigger className={errors.city ? "border-red-500" : ""}>
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
              {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Registration & Pricing</h3>

            <div className="space-y-2">
              <Label htmlFor="maxAttendees">Maximum Attendees</Label>
              <Input
                id="maxAttendees"
                type="number"
                min="1"
                placeholder="e.g., 500"
                value={formData.maxAttendees}
                onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                className={errors.maxAttendees ? "border-red-500" : ""}
              />
              {errors.maxAttendees && <p className="text-sm text-red-500">{errors.maxAttendees}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFree"
                  checked={formData.isFree}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFree: checked as boolean })}
                />
                <Label htmlFor="isFree">This is a free event</Label>
              </div>

              {!formData.isFree && (
                <div className="space-y-2">
                  <Label htmlFor="price">Ticket Price (NZD)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g., 25.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Event Features</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {featureOptions.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                    />
                    <Label htmlFor={feature} className="text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Organizer Information</h3>

            <div className="space-y-2">
              <Label htmlFor="organizer">Organization/Organizer Name *</Label>
              <Input
                id="organizer"
                placeholder="e.g., Auckland Sanatan Society"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className={errors.organizer ? "border-red-500" : ""}
              />
              {errors.organizer && <p className="text-sm text-red-500">{errors.organizer}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="events@organization.org.nz"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className={errors.contactEmail ? "border-red-500" : ""}
                />
                {errors.contactEmail && <p className="text-sm text-red-500">{errors.contactEmail}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+64 9 123 4567"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className={errors.contactPhone ? "border-red-500" : ""}
                />
                {errors.contactPhone && <p className="text-sm text-red-500">{errors.contactPhone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://www.organization.org.nz"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className={errors.website ? "border-red-500" : ""}
              />
              {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements/What to Bring</Label>
              <Textarea
                id="requirements"
                placeholder="Any special requirements, dress code, items to bring, etc."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={3}
              />
            </div>

            {/* Event Images */}
            <div className="space-y-6">
              <h4 className="text-md font-semibold text-gray-900">Event Images (Optional)</h4>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        width={200}
                        height={150}
                        className="rounded-lg object-cover w-full h-32"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {formData.images.length < 3 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload event poster or promotional images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each. Maximum 3 images.</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button type="button" variant="outline" className="mt-4 bg-transparent" asChild>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>
              )}
              {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Review & Submit</h3>

            {/* Event Summary */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h4 className="font-semibold text-lg">{formData.title}</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Category:</strong> {formData.category}
                  </p>
                  <p>
                    <strong>Date:</strong> {formData.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {formData.startTime} - {formData.endTime}
                  </p>
                  <p>
                    <strong>Venue:</strong> {formData.venue}
                  </p>
                  <p>
                    <strong>City:</strong> {formData.city}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Organizer:</strong> {formData.organizer}
                  </p>
                  <p>
                    <strong>Contact:</strong> {formData.contactEmail}
                  </p>
                  <p>
                    <strong>Price:</strong> {formData.isFree ? "Free" : `$${formData.price} NZD`}
                  </p>
                  {formData.maxAttendees && (
                    <p>
                      <strong>Max Attendees:</strong> {formData.maxAttendees}
                    </p>
                  )}
                </div>
              </div>
              {formData.features.length > 0 && (
                <div>
                  <p>
                    <strong>Features:</strong> {formData.features.join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  className={errors.agreeToTerms ? "border-red-500" : ""}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I confirm that I have the authority to create this event and that all information provided is
                  accurate. I understand that the event will be reviewed before publication and agree to the platform's
                  terms of service. *
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
            </div>

            {submitError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/events" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sanatan New Zealand</h1>
              <p className="text-sm text-gray-600">Create Event</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Create Community Event</h2>
              <span className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Provide complete information about your event to help community members understand and participate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <div className="flex gap-2 flex-1">
                    {currentStep > 1 && (
                      <Button type="button" variant="outline" onClick={handlePrevious}>
                        Previous
                      </Button>
                    )}

                    <Button type="button" variant="outline" onClick={saveDraft} className="ml-auto bg-transparent">
                      <Save className="mr-2 h-4 w-4" />
                      {isDraftSaved ? "Saved!" : "Save Draft"}
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    {currentStep === totalSteps && (
                      <Button type="button" variant="outline" onClick={previewEvent}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    )}

                    {currentStep < totalSteps ? (
                      <Button type="button" onClick={handleNext} className="bg-orange-600 hover:bg-orange-700">
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating...
                          </>
                        ) : (
                          <>
                            <Calendar className="mr-2 h-5 w-5" />
                            Create Event
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Questions about creating events?{" "}
              <Link href="/help" className="text-orange-600 hover:underline">
                Check our guidelines
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
