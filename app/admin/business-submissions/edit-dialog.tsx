"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface BusinessSubmission {
  id: string
  businessName: string
  category: string
  description: string
  address: string
  city: string
  phone: string
  email: string
  website?: string | null
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  services: string[]
  socialMedia: {
    facebook?: string | null
    instagram?: string | null
    twitter?: string | null
  }
  operatingHours?: string | null
  specialOffers?: string | null
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string | null
  reviewNotes?: string | null
  rating?: number | null
  isActive?: boolean | null
  images?: string[] | null
}

interface EditDialogProps {
  business: BusinessSubmission
  setBusiness: (business: BusinessSubmission | null) => void
  onSave: (id: string, updates: Partial<BusinessSubmission>) => void
  close: () => void
}

export function EditDialog({ business, onSave, close }: EditDialogProps) {
  const [draft, setDraft] = useState<BusinessSubmission>(business)

  // Update draft if the 'business' prop changes (e.g., after a save and re-fetch)
  useEffect(() => {
    setDraft(business)
  }, [business])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setDraft((prev) => ({ ...prev, [id]: value }))
  }

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setDraft((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [id]: value,
      },
    }))
  }

  const handleServicesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft((prev) => ({
      ...prev,
      services: e.target.value.split(",").map((s) => s.trim()),
    }))
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft((prev) => ({
      ...prev,
      images: e.target.value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean), // Filter out empty strings
    }))
  }

  const handleIsActiveChange = (checked: boolean) => {
    setDraft((prev) => ({ ...prev, isActive: checked }))
  }

  const handleSave = () => {
    // Ensure services and images are arrays, even if input was empty
    const servicesArray = Array.isArray(draft.services) ? draft.services : []
    const imagesArray = Array.isArray(draft.images) ? draft.images : []

    onSave(draft.id, {
      businessName: draft.businessName,
      category: draft.category,
      description: draft.description,
      address: draft.address,
      city: draft.city,
      phone: draft.phone,
      email: draft.email,
      website: draft.website,
      ownerName: draft.ownerName,
      ownerEmail: draft.ownerEmail,
      ownerPhone: draft.ownerPhone,
      services: servicesArray,
      socialMedia: draft.socialMedia,
      operatingHours: draft.operatingHours,
      specialOffers: draft.specialOffers,
      rating: draft.rating,
      isActive: draft.isActive,
      images: imagesArray,
    })
  }

  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Business: {business.businessName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="businessName" className="text-right">
              Business Name
            </Label>
            <Input id="businessName" value={draft.businessName} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input id="category" value={draft.category} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" value={draft.description} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address" value={draft.address} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input id="city" value={draft.city} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input id="phone" value={draft.phone} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" value={draft.email} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Website
            </Label>
            <Input id="website" value={draft.website || ""} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerName" className="text-right">
              Owner Name
            </Label>
            <Input id="ownerName" value={draft.ownerName} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerEmail" className="text-right">
              Owner Email
            </Label>
            <Input id="ownerEmail" value={draft.ownerEmail} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ownerPhone" className="text-right">
              Owner Phone
            </Label>
            <Input id="ownerPhone" value={draft.ownerPhone} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="services" className="text-right">
              Services (comma-separated)
            </Label>
            <Textarea
              id="services"
              value={draft.services?.join(", ") || ""}
              onChange={handleServicesChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">
              Image URLs (comma-separated)
            </Label>
            <Textarea
              id="images"
              value={draft.images?.join(", ") || ""}
              onChange={handleImagesChange}
              className="col-span-3"
              placeholder="e.g., https://example.com/img1.jpg, https://example.com/img2.png"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="facebook" className="text-right">
              Facebook URL
            </Label>
            <Input
              id="facebook"
              value={draft.socialMedia?.facebook || ""}
              onChange={handleSocialMediaChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instagram" className="text-right">
              Instagram URL
            </Label>
            <Input
              id="instagram"
              value={draft.socialMedia?.instagram || ""}
              onChange={handleSocialMediaChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="twitter" className="text-right">
              Twitter URL
            </Label>
            <Input
              id="twitter"
              value={draft.socialMedia?.twitter || ""}
              onChange={handleSocialMediaChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="operatingHours" className="text-right">
              Operating Hours
            </Label>
            <Input
              id="operatingHours"
              value={draft.operatingHours || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="specialOffers" className="text-right">
              Special Offers
            </Label>
            <Textarea
              id="specialOffers"
              value={draft.specialOffers || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              value={draft.rating || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isActive" className="text-right">
              Is Active
            </Label>
            <Switch
              id="isActive"
              checked={draft.isActive ?? true} // Default to true if null/undefined
              onCheckedChange={handleIsActiveChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
