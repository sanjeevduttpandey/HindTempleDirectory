"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Globe, Edit, Trash2, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { BusinessSubmission } from "@/lib/types" // Assuming this type is defined

interface ApprovedCardProps {
  business: BusinessSubmission
  onEdit: (business: BusinessSubmission) => void
  onDelete: (businessId: number) => void
}

export function ApprovedCard({ business, onEdit, onDelete }: ApprovedCardProps) {
  const displayServices = Array.isArray(business.services)
    ? business.services.join(", ")
    : typeof business.services === "string"
      ? business.services
      : "N/A"

  const displayOperatingHours = Array.isArray(business.operating_hours)
    ? business.operating_hours.map((oh: any) => `${oh.day}: ${oh.open}-${oh.close}`).join("; ")
    : typeof business.operating_hours === "string"
      ? business.operating_hours
      : "N/A"

  const socialMediaLinks =
    typeof business.social_media === "object" && business.social_media !== null ? business.social_media : {}

  return (
    <Card className="flex flex-col">
      <CardHeader className="relative pb-0">
        <div className="relative h-32 w-full rounded-t-lg overflow-hidden">
          <Image
            src={business.image_url || "/placeholder.svg?height=128&width=256&query=business"}
            alt={business.name}
            fill
            className="object-cover"
          />
          {business.is_featured && <Badge className="absolute top-2 left-2 bg-orange-600 text-white">Featured</Badge>}
          <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">{business.category}</Badge>
        </div>
        <div className="pt-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            {business.name}
            {business.status === "approved" && <CheckCircle className="h-5 w-5 text-green-500" />}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 mt-1">
            Submitted by: {business.submitter_email || "N/A"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-3 text-sm text-gray-700">
        <p className="line-clamp-3">{business.description}</p>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>
            {business.address}, {business.city}
          </span>
        </div>
        {business.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{business.phone}</span>
          </div>
        )}
        {business.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{business.email}</span>
          </div>
        )}
        {business.website && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <Link
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-orange-600"
            >
              Visit Website
            </Link>
          </div>
        )}
        {displayServices !== "N/A" && (
          <p>
            <strong>Services:</strong> {displayServices}
          </p>
        )}
        {displayOperatingHours !== "N/A" && (
          <p>
            <strong>Hours:</strong> {displayOperatingHours}
          </p>
        )}
        {business.special_offers && (
          <p>
            <strong>Offers:</strong> {business.special_offers}
          </p>
        )}
        {Object.keys(socialMediaLinks).length > 0 && (
          <div className="flex flex-wrap gap-2">
            <strong>Social:</strong>
            {socialMediaLinks.facebook && (
              <Link
                href={socialMediaLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook
              </Link>
            )}
            {socialMediaLinks.instagram && (
              <Link
                href={socialMediaLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                Instagram
              </Link>
            )}
            {socialMediaLinks.twitter && (
              <Link
                href={socialMediaLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Twitter
              </Link>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(business)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(business.id)}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
