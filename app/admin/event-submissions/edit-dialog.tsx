"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { EventSubmission } from "@/lib/types" // Ensure this type is comprehensive
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, X } from "lucide-react"
import Image from "next/image"

interface EditDialogProps {
  event: EventSubmission
  onClose: () => void
  onSave: (eventId: number, updatedData: Partial<EventSubmission>) => Promise<void>
}

export function EditDialog({ event, onClose, onSave }: EditDialogProps) {
  const [draft, setDraft] = useState<Partial<EventSubmission>>(event)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(event.image_urls || [])

  useEffect(() => {
    setDraft(event)
    setImagePreviews(event.image_urls || [])
    setImageFiles([]) // Clear any previously selected files
  }, [event])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    if (type === "checkbox") {
      setDraft((prev) => ({ ...prev, [id]: checked }))
    } else {
      setDraft((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleSelectChange = (id: string, value: string) => {
    setDraft((prev) => ({ ...prev, [id]: value }))
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const currentFeatures = Array.isArray(draft.features) ? draft.features : []
    if (checked) {
      setDraft((prev) => ({ ...prev, features: [...currentFeatures, feature] }))
    } else {
      setDraft((prev) => ({ ...prev, features: currentFeatures.filter((f) => f !== feature) }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/")
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })

    if (validFiles.length + imagePreviews.length > 3) {
      setError("Maximum 3 images allowed.")
      return
    }
    setError(null) // Clear previous image errors

    setImageFiles((prev) => [...prev, ...validFiles])

    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (indexToRemove: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== indexToRemove))
    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove))
    // If the removed image was an existing one, ensure its URL is removed from draft.image_urls
    setDraft((prev) => {
      const newImageUrls = (prev.image_urls || []).filter((_, i) => i !== indexToRemove)
      return {
        ...prev,
        image_urls: newImageUrls,
        image_url: newImageUrls[0] || null, // Update main image_url
      }
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    try {
      const dataToSave: Partial<EventSubmission> = { ...draft }

      // Upload new image files
      const uploadedImageUrls: string[] = []
      for (const file of imageFiles) {
        const imageFormData = new FormData()
        imageFormData.append("file", file)
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        })
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.error || `Failed to upload image: ${file.name}`)
        }
        const uploadResult = await uploadResponse.json()
        uploadedImageUrls.push(uploadResult.url)
      }

      // Combine existing image URLs (from imagePreviews that are not new files) with newly uploaded ones
      const finalImageUrls = imagePreviews.filter((url) => !url.startsWith("data:")).concat(uploadedImageUrls)

      dataToSave.image_urls = finalImageUrls
      dataToSave.image_url = finalImageUrls[0] || null // Set the first image as the main one

      // Ensure boolean and number fields are correctly typed
      dataToSave.is_free = draft.is_free
      dataToSave.is_featured = draft.is_featured
      dataToSave.max_participants = draft.max_participants ? Number(draft.max_participants) : null
      dataToSave.registration_fee = draft.registration_fee ? Number(draft.registration_fee) : 0.0

      await onSave(event.id, dataToSave)
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to save changes.")
    } finally {
      setIsSaving(false)
    }
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event: {event.title}</DialogTitle>
          <DialogDescription>Make changes to the event details here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={draft.title || ""} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event_type" className="text-right">
              Category
            </Label>
            <Select value={draft.event_type || ""} onValueChange={(value) => handleSelectChange("event_type", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Short Description
            </Label>
            <Textarea
              id="description"
              value={draft.description || ""}
              onChange={handleChange}
              className="col-span-3"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="full_description" className="text-right">
              Full Description
            </Label>
            <Textarea
              id="full_description"
              value={draft.full_description || ""}
              onChange={handleChange}
              className="col-span-3"
              rows={6}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start_date" className="text-right">
              Start Date
            </Label>
            <Input
              id="start_date"
              type="date"
              value={draft.start_date || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end_date" className="text-right">
              End Date
            </Label>
            <Input
              id="end_date"
              type="date"
              value={draft.end_date || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start_time" className="text-right">
              Start Time
            </Label>
            <Input
              id="start_time"
              type="time"
              value={draft.start_time || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end_time" className="text-right">
              End Time
            </Label>
            <Input
              id="end_time"
              type="time"
              value={draft.end_time || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Venue
            </Label>
            <Input id="location" value={draft.location || ""} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address" value={draft.address || ""} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Select value={draft.city || ""} onValueChange={(value) => handleSelectChange("city", value)}>
              <SelectTrigger className="col-span-3">
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="organizer_name" className="text-right">
              Organizer Name
            </Label>
            <Input
              id="organizer_name"
              value={draft.organizer_name || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="organizer_email" className="text-right">
              Organizer Email
            </Label>
            <Input
              id="organizer_email"
              type="email"
              value={draft.organizer_email || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="organizer_phone" className="text-right">
              Organizer Phone
            </Label>
            <Input
              id="organizer_phone"
              type="tel"
              value={draft.organizer_phone || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="organizer_website" className="text-right">
              Organizer Website
            </Label>
            <Input
              id="organizer_website"
              type="url"
              value={draft.organizer_website || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="max_participants" className="text-right">
              Max Participants
            </Label>
            <Input
              id="max_participants"
              type="number"
              value={draft.max_participants || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_free" className="text-right">
              Free Event
            </Label>
            <Checkbox
              id="is_free"
              checked={draft.is_free || false}
              onCheckedChange={(checked) => setDraft((prev) => ({ ...prev, is_free: checked as boolean }))}
              className="col-span-3"
            />
          </div>

          {!draft.is_free && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registration_fee" className="text-right">
                Registration Fee (NZD)
              </Label>
              <Input
                id="registration_fee"
                type="number"
                step="0.01"
                value={draft.registration_fee || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="requirements" className="text-right">
              Requirements
            </Label>
            <Textarea
              id="requirements"
              value={draft.requirements || ""}
              onChange={handleChange}
              className="col-span-3"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right">Features</Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              {featureOptions.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={Array.isArray(draft.features) && draft.features.includes(feature)}
                    onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                  />
                  <Label htmlFor={`feature-${feature}`} className="text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="images" className="text-right">
              Images (Max 3)
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative w-full h-24 rounded-md overflow-hidden">
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt={`Event Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {imagePreviews.length < 3 && (
                <Input id="images" type="file" accept="image/*" multiple onChange={handleImageUpload} />
              )}
              <p className="text-sm text-gray-500">Upload new images or remove existing ones.</p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={draft.status || "pending"} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_featured" className="text-right">
              Featured Event
            </Label>
            <Checkbox
              id="is_featured"
              checked={draft.is_featured || false}
              onCheckedChange={(checked) => setDraft((prev) => ({ ...prev, is_featured: checked as boolean }))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
