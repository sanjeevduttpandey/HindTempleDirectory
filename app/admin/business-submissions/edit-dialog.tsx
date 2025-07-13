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
import type { BusinessSubmission } from "@/lib/types" // Ensure this type is comprehensive
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, X } from "lucide-react"
import Image from "next/image"

interface EditDialogProps {
  business: BusinessSubmission
  onClose: () => void
  onSave: (businessId: number, updatedData: Partial<BusinessSubmission>) => Promise<void>
}

export function EditDialog({ business, onClose, onSave }: EditDialogProps) {
  const [draft, setDraft] = useState<Partial<BusinessSubmission>>(business)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(business.image_url || null)

  useEffect(() => {
    setDraft(business)
    setImagePreview(business.image_url || null)
  }, [business])

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

  const handleArrayChange = (id: string, value: string) => {
    setDraft((prev) => ({
      ...prev,
      [id]: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }))
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setDraft((prev) => ({
      ...prev,
      social_media: {
        ...(prev.social_media as Record<string, string>),
        [platform]: value,
      },
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImageFile(null)
      setImagePreview(null)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setDraft((prev) => ({ ...prev, image_url: null }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    try {
      const dataToSave: Partial<BusinessSubmission> = { ...draft }

      // Handle image upload if a new file is selected
      if (imageFile) {
        const imageFormData = new FormData()
        imageFormData.append("file", imageFile)
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        })
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.error || "Failed to upload image.")
        }
        const uploadResult = await uploadResponse.json()
        dataToSave.image_url = uploadResult.url
      } else if (imagePreview === null && business.image_url !== null) {
        // If image was removed
        dataToSave.image_url = null
      }

      // Ensure array fields are sent as arrays (or stringified JSON if DB expects that)
      // For this setup, the API expects stringified JSON for arrays and objects
      if (Array.isArray(dataToSave.services)) {
        dataToSave.services = JSON.stringify(dataToSave.services)
      }
      if (Array.isArray(dataToSave.operating_hours)) {
        dataToSave.operating_hours = JSON.stringify(dataToSave.operating_hours)
      }
      if (typeof dataToSave.social_media === "object" && dataToSave.social_media !== null) {
        dataToSave.social_media = JSON.stringify(dataToSave.social_media)
      }

      await onSave(business.id, dataToSave)
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to save changes.")
    } finally {
      setIsSaving(false)
    }
  }

  const categories = [
    "Grocery Store",
    "Restaurant",
    "Catering",
    "Health & Wellness",
    "Astrology & Spiritual Services",
    "Clothing & Fashion",
    "Jewelry",
    "Education",
    "Event Management",
    "Travel & Tourism",
    "Real Estate",
    "Financial Services",
    "Legal Services",
    "IT & Consulting",
    "Arts & Culture",
    "Home Services",
    "Automotive",
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Business: {business.name}</DialogTitle>
          <DialogDescription>Make changes to the business details here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={draft.name || ""} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={draft.category || ""} onValueChange={(value) => handleSelectChange("category", value)}>
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
              Description
            </Label>
            <Textarea
              id="description"
              value={draft.description || ""}
              onChange={handleChange}
              className="col-span-3"
              rows={4}
            />
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
            <Label htmlFor="pincode" className="text-right">
              Pincode
            </Label>
            <Input id="pincode" value={draft.pincode || ""} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input id="phone" value={draft.phone || ""} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" value={draft.email || ""} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Website
            </Label>
            <Input id="website" type="url" value={draft.website || ""} onChange={handleChange} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="services" className="text-right">
              Services (comma-separated)
            </Label>
            <Input
              id="services"
              value={Array.isArray(draft.services) ? draft.services.join(", ") : draft.services || ""}
              onChange={(e) => handleArrayChange("services", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="operating_hours" className="text-right">
              Operating Hours (JSON array)
            </Label>
            <Textarea
              id="operating_hours"
              value={
                Array.isArray(draft.operating_hours)
                  ? JSON.stringify(draft.operating_hours, null, 2)
                  : draft.operating_hours || ""
              }
              onChange={handleChange}
              className="col-span-3"
              rows={4}
              placeholder='[{"day": "Mon", "open": "09:00", "close": "17:00"}]'
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="special_offers" className="text-right">
              Special Offers
            </Label>
            <Textarea
              id="special_offers"
              value={draft.special_offers || ""}
              onChange={handleChange}
              className="col-span-3"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="facebook" className="text-right">
              Facebook URL
            </Label>
            <Input
              id="facebook"
              value={(draft.social_media as any)?.facebook || ""}
              onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instagram" className="text-right">
              Instagram URL
            </Label>
            <Input
              id="instagram"
              value={(draft.social_media as any)?.instagram || ""}
              onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="twitter" className="text-right">
              Twitter URL
            </Label>
            <Input
              id="twitter"
              value={(draft.social_media as any)?.twitter || ""}
              onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_featured" className="text-right">
              Featured
            </Label>
            <Checkbox
              id="is_featured"
              checked={draft.is_featured || false}
              onCheckedChange={(checked) => setDraft((prev) => ({ ...prev, is_featured: checked as boolean }))}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="image_url" className="text-right">
              Image
            </Label>
            <div className="col-span-3 space-y-2">
              {imagePreview && (
                <div className="relative w-48 h-32 rounded-md overflow-hidden">
                  <Image src={imagePreview || "/placeholder.svg"} alt="Business Image" fill className="object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Input id="image_url" type="file" accept="image/*" onChange={handleImageChange} />
              <p className="text-sm text-gray-500">Upload a new image or clear the existing one.</p>
            </div>
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
